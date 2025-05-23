import { X } from 'lucide-react';
import styles from './createForm.module.scss';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../../../hooks/useModal';
import { removeArtist, removeRoleFromArtist, addArtistWithRole } from '../../../../../services/global/functions/song/createSongServices';
import { handleAudioFileChange } from '../../../../../utils/custom/durationFromFile';

export function CreateSongAlbum({ sendSong }) {
    const modal = useModal();
    const { register, handleSubmit, formState: { errors },   setValue, reset } = useForm();
    const [ message, setMessage ] = useState({ success: '', error: '' });
    const [artists, setArtists] = useState([]);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [ songFileChosen, setSongFileChosen ] = useState(false);
    const [ audioFront, setAudioFront ] = useState(null);


    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onSubmit = async (data) => {
        try {
            if(artists.length !== 0) {
                setMessage({ success: 'Song created successfully', error: ''});
                sendSong({ ...data, artists });
                reset();
            } else {
                setMessage({ success: '', error: 'Error song cant be created without artist and role'});
            }
        } catch (error) {
            setMessage({ success: '', error: 'Error during creation song'});
            console.error(error.response ? error.response.data : error);
        }
    };
    const removeArtist = (artistIndex) => {
        setArtists((prevArtists) => prevArtists.filter((_, index) => index !== artistIndex));
    };

    const removeRoleFromArtist = (artistName, role) => {
        setArtists((prevArtists) => {
            return prevArtists.map((artist) => {
                if (artist.name === artistName) {
                    return { ...artist, roles: artist.roles.filter((r) => r !== role) };
                }
                return artist;
            }).filter((artist) => artist.roles.length > 0);
        });
    };
    const addArtistWithRole = (artistName, role) => {
        setArtists((prevArtists) => {
            const existingArtist = prevArtists.find((artist) => artist.name === artistName);
            if (existingArtist) {
                const updatedArtists = prevArtists.map((artist) => {
                    if (artist.name === artistName && !artist.roles.includes(role)) {
                        return { ...artist, roles: [...artist.roles, role] };
                    }
                    return artist;
                });
                return updatedArtists;
            }
            return [...prevArtists, { name: artistName, roles: [role] }];
        });
    };

    return (
        <>
            <div className={styles.mainModal} style={{
            position: 'fixed',
            top: '23%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: Math.min(500, windowSize.width * 0.8),
            height: Math.min(300, windowSize.height * 0.5)
        }}>
                <div className={styles.mainModal__container}>
                    <div className={styles.closeWindow}>
                        <p>loaded song name = {audioFront?.name}</p>
                        <X onClick={() => modal.closeModal()} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="file" accept='audio/*' id="audioFile" style={{ display: 'none' }} onChange={(event) => handleAudioFileChange(event, setValue, setSongFileChosen, setAudioFront)}/>
                        {!songFileChosen && (
                            <div className={styles.songFile}>
                                <div className={styles.songFile__caption}>
                                    <p className={styles.white}>Upload your </p>
                                    <p className={styles.green}>audio file.</p>
                                </div>
                                <div className={styles.songFile__description}>Mp3, under 10mb</div>
                                <div className={styles.songFile__container} onClick={() => document.getElementById("audioFile")?.click()}>
                                    <div className={styles.songFile__container__image}></div>
                                    <div className={styles.songFile__container__caption}></div>
                                    <div className={styles.songFile__container__button}>
                                        Choose files
                                    </div>
                                </div>
                            </div>
                        )}
                        {songFileChosen && (
                            <div className={styles.songDetails}>
                            <div className={styles.songDetails__rightContainer}>
                                {message.error && <p className='error'>{message.error}</p>}
                                {message.success && <p className='success'>{message.success}</p>}
                                <div className={styles.songDetails__rightContainer__data}>
                                    <label>
                                        <p>Song title</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <input {...register('title', { required: 'title is required' })} />
                                    {errors.title && <p className='error'>{errors.title.message}</p>}
                                </div>
                                <div className={styles.songDetails__rightContainer__data}>
                                    <label>
                                        <p>Song genre</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <select {...register('genre', { required: 'genre is required' })}>
                                        <option value="">choose genre</option>
                                        <option value="pop">Pop</option>
                                        <option value="rock">Rock</option>
                                        <option value="hip-hop">Hip-Hop</option>
                                        <option value="electronic">Electronic</option>
                                        <option value="jazz">Jazz</option>
                                        <option value="r&b">R&B</option>
                                        <option value="country">Country</option>
                                        <option value="metal">Metal</option>
                                    </select>
                                    {errors.genre && <p className='error'>{errors.genre.message}</p>}
                                </div>
                                <div className={styles.songDetails__rightContainer__data}>
                                    <label>
                                        <p>Does your song have explicit lyrics?</p>
                                    </label>
                                    <input type="checkbox" {...register('explicit')} />
                                    {errors.explicit && <p className='error'>{errors.explicit.message}</p>}
                                </div>
                                <div className={styles.songDetails__rightContainer__data}>
                                    <label>
                                        <p>Add artist on feat</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Artist Name"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const artistName = e.target.value.trim();
                                                if (artistName) {
                                                    addArtistWithRole(artistName, 'main vocal', setArtists);
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <select onChange={(e) => {
                                        const selectedRole = e.target.value;
                                        if (artists.length > 0) {
                                            const lastArtist = artists[artists.length - 1];
                                            addArtistWithRole(lastArtist.name, selectedRole, setArtists); 
                                        }
                                    }}>
                                        <option value="" disabled>-_-_-Choose Role-_-_-</option>
                                        <option value="main vocal">Main vocal</option>
                                        <option value="back vocal">Back vocal</option>
                                        <option value="author">Author</option>
                                        <option value="co-author">Co-author</option>
                                        <option value="invited guest">Invited guest</option>
                                        <option value="writer">Writer</option>
                                        <option value="composer">Composer</option>
                                        <option value="producer">Producer</option>
                                    </select>
                                </div>
                                <div className={styles.songDetails__rightContainer__data}>
                                    <label>
                                        <p>Preview</p>
                                    </label>
                                    <div className={styles.previewFeatScroll}>
                                        {artists.map((artist, index) => (
                                            <div key={index} className={styles.previewFeature__artistContainer}>
                                                <div className={styles.artistData}>
                                                    <button className={styles.artistData__removeArtist} onClick={() => removeArtist(index)} type="button"><X /></button>
                                                    <div className={styles.artistData__previewData}>
                                                        <div className={styles.artistData__previewData__name}>{artist.name}</div>
                                                        <div className={styles.artistData__previewData__roles}>
                                                            {artist.roles.map((role, i) => (
                                                                <div key={i} className={styles.artistData__container}>
                                                                    <p className={styles.artistData__container__role}>{role}{i < artist.roles.length - 1 && ','}</p>
                                                                    <div className={styles.artistData__container__roleRemover}>
                                                                        <X onClick={() => removeRoleFromArtist(artist.name, role)} color='red'/>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit">Add song to album</button>
                            </div>
                        </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}