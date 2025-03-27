import { useForm } from 'react-hook-form'
import styles from '../login.module.scss'

export function SignIn({
    onClickData,
    success,
    error
}) {
    const { register, handleSubmit, formState: { errors }} = useForm();
    return (
        <>
            <form onSubmit={handleSubmit(onClickData)}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className={styles.logo}>LOGIN</div>
                <div className={styles.email}>
                    <label>Email</label>
                    <input type="email"{...register('email')}/>
                </div>
                <div className={styles.password}>
                    <label>Password</label>
                    <input type="password" {...register('password')}/>
                </div>
                <button type="submit">SIGN IN</button>
            </form>
            <div className={styles.another_type_register}></div>
            <div className={styles.footer}></div>
        </>
    )
}