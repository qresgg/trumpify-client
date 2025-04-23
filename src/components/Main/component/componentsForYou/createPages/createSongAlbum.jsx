import { X } from 'lucide-react';
import styles from './createSongAlbum.module.scss';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../../../hooks/useModal';
import { removeArtist, removeRoleFromArtist, addArtistWithRole } from '../../../../../services/global/functions/song/createSongServices';

export function CreateSongAlbum({ toggleModal, sendSong }) {
    const modal = useModal();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [ message, setMessage ] = useState({ success: '', error: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [artists, setArtists] = useState([]);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });


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
                setSuccess('Song created successfully');
                sendSong({ ...data, artists });
            } else {
                setError('Error song cant be created without artist and role')
            }
        } catch (error) {
            setError('Error during creation song');
            console.error(error.response ? error.response.data : error);
        }
    };

    return (
        <>
            <div className={styles.main} style={{
            position: 'fixed',
            top: '28%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: Math.min(500, windowSize.width * 0.8),
            height: Math.min(300, windowSize.height * 0.5)
        }}>
                <div className={styles.main__container}>
                    <div className={styles.closeWindow}>
                        <X onClick={() => modal.closeModal()} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <div>
                            <label>Create name song</label>
                            <input {...register('title', { required: 'title is required' })} />
                            {errors.title && <p>{errors.title.message}</p>}
                        </div>
                        <div>
                            <label>Choose genre of song</label>
                            <select {...register('genre', { required: 'genre is required' })}>
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
                            <input type="file" accept='audio/*' {...register('audio')}/>
                            {errors.audio && <p>{errors.audio.message}</p>}
                        </div>
                        <div>
                            <label>Does your song have explicit lyrics?</label>
                            <input type="checkbox" {...register('explicit')} />
                            {errors.explicit && <p>{errors.explicit.message}</p>}
                        </div>
                        <div>
                            <label>Add artists on feat</label>
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
                        <div>
                            <label>Preview</label>
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
                                            onClick={() => removeArtist(index, setArtists)}>
                                            <X />
                                        </button>
                                        <div className={styles.roleList}>
                                            {artist.roles.map((role, idx) => (
                                                <span key={idx} className={styles}>
                                                    <div>{role}{' '}</div>
                                                    <X onClick={() => removeRoleFromArtist(artist.name, role, setArtists)} color='red'/>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button type="submit">Add song to album</button>
                    </form>
                </div>
            </div>
        </>
    );
}