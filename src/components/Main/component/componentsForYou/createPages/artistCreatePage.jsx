import styles from './createForm.module.scss'
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { createArtist } from '../../../../../services/artistService';
const SERVER_API_URL = 'http://localhost:8080';

export function ArtistPageCreate () {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [message, setMessage] = useState({ success: '', error: ''});

    const onSubmit = async (data) => {
        try {
            const response = await createArtist(data);
            setMessage({ success: response.message})
        } catch (error) {
            const errorMessage = error.response?.data?.message || "error during creation artist profile";
            setMessage({ error: errorMessage, success: "" });
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.main__container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {message.error && <p style={{ color: 'red' }}>{message.error}</p>}
                        {message.success && <p style={{ color: 'green' }}>{message.success}</p>}
                        <div>
                            <label>Create your artist name</label>
                            <input {...register('artistName')}/>
                            {errors.artistName && <p>{errors.artistName.message}</p>}
                        </div>
                        <div>
                            <label>Enter your bio</label>
                            <textarea 
                                {...register("bio", { required: 'Artist must have biography'})} rows='20' cols='50' placeholder='enter your biography' className={styles.tarea}></textarea>
                            {errors.bio && <p>{errors.bio.message}</p>}
                        </div>
                        <div>
                            <label>Enter your actual password</label>
                            <input type="password" {...register('password', { required: 'password is required'})}/>
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <div>
                            <label>Confirm your actual password</label>
                            <input type="password" {...register('confirmPassword', { required: 'password confirmation is required'})}/>
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}