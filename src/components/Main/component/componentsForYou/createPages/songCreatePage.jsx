import styles from './createForm.module.scss'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSong } from '../../../../../services/artist/artistService';
import { X } from 'lucide-react';

export function SongPageCreate () {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [previewImage, setPreviewImage] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [artists, setArtists] = useState([]);

    const onSubmit = async (data) => {
        try {
            if (artists.length !== 0) {
                console.log(data)
                const formData = { ...data, artists: JSON.stringify(artists) };
                await createSong(formData)
                setSuccess('Song created successfully');
                setError('')
            } else {
                setError('Song must have at least 1 artist')
            }
        } catch (error) {
            setError('Error during creation song');
            setSuccess('')
            console.error(error.response ? error.response.data : error);
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(`url(${event.target.result})`);
            };
            reader.readAsDataURL(file); 
        }
    }
    const previewContainer = {
        backgroundImage: previewImage,
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <div>
                            <label>Choose song cover</label>
                            <div className={styles.file}>
                                <input type="file" accept="image/*"{...register('cover', { required: 'cover is required'})} onChange={handleFileChange}/>
                                <div className={styles.preview} style={previewContainer}></div>
                            </div>
                            {errors.cover && <p>{errors.cover.message}</p>}
                        </div>
                        <div>
                            <label>Create name song</label>
                            <input {...register('title', { required: 'title is required'})} />
                            {errors.songTitle && <p>{errors.songTitle.message}</p>}
                        </div>
                        <div>
                            <label>Choose genre of song</label>
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
                            <label>Enter song duration</label>
                            <input type="file" accept='audio/*' {...register('audio')}/>
                            {errors.audio && <p>{errors.audio.message}</p>}
                            {errors.duration && <p>{errors.duration.message}</p>}
                        </div>
                        <div>
                            <label>Does your song have explicit lyrics?</label>
                            <input type="checkbox" {...register('explicit')} />
                            {errors.explicit && <p>{errors.explicit.message}</p>}
                        </div>
                        <div>
                            <label>Choose your song's type</label>
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
                            <label>Add artists on feat</label>
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
                    </form>
                </div>
            </div>
        </>
    )
}