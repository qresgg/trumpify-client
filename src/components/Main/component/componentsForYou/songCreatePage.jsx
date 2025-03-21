import styles from './createForm.module.scss'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { createSong } from '../../../../services/artistService';
const SERVER_API_URL = 'http://localhost:8080';

export function SongPageCreate () {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [previewImage, setPreviewImage] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (data) => {
        try {
            await createSong(data)
            setSuccess('Song created successfully');
        } catch (error) {
            setError('Error during creation song');
            console.error(error.response ? error.response.data : error);
        }
    }

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length > 2) {
          value = value.slice(0, 2) + ':' + value.slice(2);
        }
        const [minutes, seconds] = value.split(':');
        if (seconds && parseInt(seconds, 10) > 59) {
            value = `${minutes}:59`;
        }
        setValue('duration', value);
      };
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
                            <input {...register('duration', { required: 'duration is required'})} onChange={handleInputChange} placeholder="MM:SS" maxLength={5}/>
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
                        <button type="submit">Create Song</button>
                    </form>
                </div>
            </div>
        </>
    )
}