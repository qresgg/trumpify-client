import styles from './albumCreatePage.module.scss'
import { useForm } from 'react-hook-form'
import axios from 'axios';
const SERVER_API_URL = 'http://localhost:8080';

export function AlbumCreatePage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${SERVER_API_URL}/artist/createAlbum`,
                { data },
                { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true }
            );
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Album title</label>
                        <input {...register("albumTitle", { required: "required" })} />
                        {errors.albumTitle && <p>{errors.albumTitle.message}</p>}
                    </div>
                    <div>
                        <label>Record label</label>
                        <input {...register("recordLabel", { required: "REC required" })} />
                        {errors.recordLabel && <p>{errors.recordLabel.message}</p>}
                    </div>
                    <div>
                        <label>Language</label>
                        <input {...register("language", { required: "LAN required" })} />
                        {errors.language && <p>{errors.language.message}</p>}
                    </div>
                    <div>
                        <label>Genre</label>
                        <input {...register("genre", { required: "GENRE required" })} />
                        {errors.genre && <p>{errors.genre.message}</p>}
                    </div>
                    <div>
                        <label>Type</label>
                        <select {...register('type', { required: 'Choose Type' })}>
                            <option disabled>--- Choose ---</option>
                            <option value="Album">Album</option>
                            <option value="Short-Album">Short-Album</option>
                        </select>
                        {errors.type && <p>{errors.type.message}</p>}
                    </div>
                    {/* <div>
                        <label>Type</label>
                        <select {...register('type', { required: 'Choose Type' })}>
                            <option disabled>--- Choose ---</option>
                            <option value="Album">Album</option>
                            <option value="Short-Album">Short-Album</option>
                        </select>
                        {errors.type && <p>{errors.type.message}</p>}
                    </div> */}
                    <button type="submit">Create Album</button>
                </form>
            </div>
        </div>
    )
}