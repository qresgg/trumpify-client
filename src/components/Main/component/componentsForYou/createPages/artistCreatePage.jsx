import styles from './createForm.module.scss'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createArtist } from '../../../../../services/artist/artistService';
import { useMessage } from '../../../../../hooks/global/useMessage';
import { fetchUserData } from '../../../../../services/user/fetchData/fetchUserData';
import { setData as setReduxData } from '../../../../../lib/redux/data/dataSlice';

export function ArtistPageCreate () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const { message, setMessage } = useMessage();

    const onSubmit = async (data) => {
        try {
            const response = await createArtist(data);
            setMessage({ success: response.message });
            reset();

            const userData = await fetchUserData();
            dispatch(setReduxData(userData));
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error during creation artist profile";
            setMessage({ error: errorMessage });
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.main__container}>
                    <div className={styles.main__container__header}>
                        <p className={styles.white}>Become  </p>
                        <p className={styles.green}>a new artist.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {message.error && <p className='error'>{message.error}</p>}
                        {message.success && <p className='success'>{message.success}</p>}
                        <div className={styles.artistDetails}>
                            <div className={styles.artistDetails__rightContainer}>
                                <div className={styles.albumDetails__rightContainer__data}>
                                    <label>
                                        <p>Choose unique artist name</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <input {...register('artistName', { required: "Artist name required" })}/>
                                    {errors.artistName && <p>{errors.artistName.message}</p>}
                                </div>
                                <div className={styles.albumDetails__rightContainer__data}>
                                    <label>
                                        <p>Biography</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <textarea 
                                        {...register("bio", { required: 'Artist must have biography'})} rows='15' cols='50' placeholder='enter your biography' className={styles.tarea}></textarea>
                                    {errors.bio && <p>{errors.bio.message}</p>}
                                </div>
                                <div className={styles.albumDetails__rightContainer__data}>
                                    <label>
                                        <p>Enter your actual user password</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <input type="password" {...register('password', { required: 'password is required'})}/>
                                    {errors.password && <p>{errors.password.message}</p>}
                                </div>
                                <div className={styles.albumDetails__rightContainer__data}>
                                    <label>
                                        <p>Confirm actual user password</p>
                                        <p className={styles.red}>*</p>
                                    </label>
                                    <input type="password" {...register('confirmPassword', { required: 'password confirmation is required'})}/>
                                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                                </div>
                            </div>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}