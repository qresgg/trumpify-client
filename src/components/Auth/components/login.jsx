import styles from './Login.module.scss'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import InputField from '../../../pages/Create/shared/inputField';

export default function Login () {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { handleLogin, message } = useAuth();
    const [isAdClosed, setIsAdClosed] = useState(false);
    const [visibility, setVisibility] = useState({
        input1: false,
        input2: false,
    });

    const toggleVisibility = (inputName) => {
        setVisibility((prev) => ({
            ...prev,
            [inputName]: !prev[inputName]
        }));
    }

    return (
        <div className={styles['login']}>
            <div className={styles['login__container']}>
                <div className={styles['login__logo']}></div>
                <div className={styles['login__upper-container']}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        {message?.error && <p className='error'>{message?.error}</p>}
                        {message?.success && <p className='success'>{message?.success}</p>}
                        <div className={styles['login__section']}>Log in</div>
                        <InputField 
                            label={'Email'}
                            className={styles['login__container-item']}
                            register={register}
                            name={'email'}
                            errors={errors}
                        />
                        <div className={styles['login__container-item']}>
                            <label>Password</label>
                            <input {...register('password')} type={visibility.input1 ? "text" : "password"} required id='input1'/>
                            <div className={styles['login__container-show']} 
                                onMouseDown={() => toggleVisibility('input1')} 
                                onMouseUp={() => toggleVisibility('input1')}>{visibility.input1 ? 'Hide' : 'Show'}</div>
                            {errors.password && <p className='error'>{errors.password.message}</p>}
                        </div>
                        <div className={styles['login__submit-button']}>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                {/* <div className={styles.another_type_register}></div> */}
                {/* <div className={styles['login__breakline']}></div> */}
                <div className={styles['login__register-container']}>
                    <div className={styles['login__register-text']}>Don't have an account?</div>
                    <Link to="/register" className="link-reset">
                        <div className={styles['login__register-button']}>Sign up</div>
                    </Link>
                </div>
                <div className={styles['login__lower-container']}>
                    {!isAdClosed && (
                        <div className={styles['login__ad']}>
                            <div className={styles['login__ad-floating']}>
                                <div className={styles['login__ad-floating--text']}>advertisement</div>
                                <div className={styles['login__ad-floating--remove']} onClick={() => setIsAdClosed(!isAdClosed)}>X</div>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}
