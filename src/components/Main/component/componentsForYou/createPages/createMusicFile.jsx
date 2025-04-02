import { useForm } from 'react-hook-form'
import styles from './createForm.module.scss'
import { sendMusic } from '../../../../../services/test';
export function CreateMusicFile() {
    const { register, handleSubmit, formState: { error }} = useForm();
    
    const onSubmit = async (data) => {
        try {
            const response = await sendMusic(data.audio[0]);
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" accept='audio/*' {...register('audio')}/>
                <button type='submit'>SEND</button>
            </form>
        </div>
    )
}