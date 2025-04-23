import styles from './createForm.module.scss'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSong } from '../../../../../services/artist/artistService';
import { X } from 'lucide-react';
import { previewFromFile } from '../../../../../utils/custom/previewFromFile';

export function SongPageCreate () {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [ previewImage, setPreviewImage ] = useState(null);
    const [ artists, setArtists ] = useState([]);
    const [ message, setMessage ] = useState({ success: '', error: '' })
    const [ songFileChosen, setSongFileChosen ] = useState(null)
    const [ isHover, setIsHover ] = useState(null);

    const onSubmit = async (data) => {
        try {
            if (artists.length !== 0) {
                const formData = { ...data, artists: JSON.stringify(artists) };
                console.log(data)
                await createSong(formData)
                setMessage({ success: 'Song has been created successfully', error: '' })
            } else {
                setMessage({ success: '', error: 'Song must have at least 1 artist'})
            }
        } catch (error) {
            setMessage({ success: '', error: 'Error during creation song '})
            console.error(error.response ? error.response.data : error);
        }
    }

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
    
    const handleAudioFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const audio = new Audio(url);
            audio.addEventListener('loadedmetadata', () => {
                setValue('audio', file)
                setValue('duration', audio.duration)
                setSongFileChosen(true);
            });
        } else {
            console.log("File hasn't been chosen.");
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

    return (
        <>
            <div className={styles.main}>
                <div className={styles.main__container}>
                    <div className={styles.main__container__header}>
                        <p className={styles.white}>Create a </p>
                        <p className={styles.green}>new song.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="file" accept='audio/*' {...register('audio')} id="audioFile" style={{ display: 'none' }} onChange={handleAudioFileChange}/>
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
                            {message.error && <p style={{ color: 'red' }}>{message.error}</p>}
                            {message.success && <p style={{ color: 'green' }}>{message.success}</p>}
                            <div className={styles.songDetails__leftContainer}>
                                <div className={styles.file}
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        {...register('cover')} 
                                        onChange={(e) => previewFromFile(e, setPreviewImage, setValue, 'cover')} 
                                        style={{ display: 'none'}}
                                        id="imageFile"/>
                                    <div className={styles.preview}>
                                        {previewImage && <div className={styles.preview__art} style={{ backgroundImage: previewImage }}></div>}
                                        {isHover && (
                                            <>
                                                <div className={styles.preview__blackscreen}></div>
                                                <div className={styles.preview__choose} onClick={() => document.getElementById('imageFile')?.click()}>Choose song cover</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {errors.cover && <p>{errors.cover.message}</p>}
                            </div>
                            <div className={styles.songDetails__rightContainer}>
                                <div>
                                    <label>
                                        <p>Song title</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <input {...register('title', { required: 'title is required'})} />
                                    {errors.songTitle && <p>{errors.songTitle.message}</p>}
                                </div>
                                <div>
                                    <label>
                                        <p>Choose genre of song</p>
                                    </label>
                                    <select {...register('genre', { required: 'genre is required'})}>
                                        <option value="" disabled>-_-_-Choose-_-_-</option>
                                        <option value="pop">Pop</option>
                                        <option value="rock">Rock</option>
                                        <option value="hip-hop">Hip-Hop</option>
                                        <option value="electronic">Electronic</option>
                                        <option value="jazz">Jazz</option>
                                        <option value="r&b">R&B</option>
                                        <option value="country">Country</option>
                                        <option value="metal">Metal</option>
                                    </select>
                                    {errors.genre && <p>{errors.genre.message}</p>}
                                </div>
                                <div>
                                    <label>
                                        <p>Does your song have explicit lyrics?</p>
                                    </label>
                                    <input type="checkbox" {...register('explicit')} />
                                    {errors.explicit && <p>{errors.explicit.message}</p>}
                                </div>
                                <div>
                                    <label>
                                        <p>Choose your song's type</p>
                                    </label>
                                    <select {...register('type')}>
                                        <option value="" disabled>-_-_-Choose-_-_-</option>
                                        <option value="single">Single</option>
                                        <option value="instrumental">Instrumental</option>
                                        <option value="cover">Cover</option>
                                        <option value="remix">Remix</option>
                                        <option value="radio">Radio Edition</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        <p>Add artists on feat</p>
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
                                                    addArtistWithRole(artistName, 'main vocal');
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <select onChange={(e) => {
                                        const selectedRole = e.target.value;
                                        if (artists.length > 0) {
                                            const lastArtist = artists[artists.length - 1];
                                            addArtistWithRole(lastArtist.name, selectedRole); 
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
                                <div>
                                    <label>
                                        <p>Preview</p>
                                    </label>
                                    <div className={styles.previewFeature}>
                                        {artists.map((artist, index) => (
                                            <div key={index} className={styles.previewFeature__topLevel}>
                                                <div>
                                                    <strong>{artist.name}</strong>
                                                    <div className={styles.role}>
                                                        {artist.roles.join(', ')}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeArtist(index)}>
                                                    <X />
                                                </button>
                                                <div className={styles.roleList}>
                                                    {artist.roles.map((role, idx) => (
                                                        <span key={idx} className={styles}>
                                                            <div>{role}{' '}</div>
                                                            <X onClick={() => removeRoleFromArtist(artist.name, role)} color='red'/>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit">Create Song</button>
                            </div>
                        </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}