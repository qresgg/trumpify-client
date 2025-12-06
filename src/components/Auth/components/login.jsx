import styles from './login.module.scss'
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
                <div className={styles['login__upperContainer']}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        {message?.error && <p className='error'>{message?.error}</p>}
                        {message?.success && <p className='success'>{message?.success}</p>}
                        <div className={styles['login__section']}>Log in</div>
                        <InputField 
                            label={'Email'}
                            className={styles['login__input']}
                            register={register}
                            name={'email'}
                            errors={errors}
                        />
                        <div className={styles['login__input']}>
                            <label>Password</label>
                            <input {...register('password')} type={visibility.input1 ? "text" : "password"} required id='input1'/>
                            <div className={styles['password__showButton']}
                                 onMouseEnter={() => toggleVisibility('input1')}
                                 onMouseLeave={() => toggleVisibility('input1')}
                                 onTouchStart={() => toggleVisibility('input1')}
                                 onTouchEnd={() => toggleVisibility('input1')}
                            >{visibility.input1 ? 'Hide' : 'Show'}</div>
                            {errors.password && <p className='error'>{errors.password.message}</p>}
                        </div>
                        <div className={styles['login__submitButton']}>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <div className={styles['login__middleContainer']}>
                    {/* <div className={styles['links}></div> */}
                    {/* <div className={styles['breakline']}></div> */}
                    <div className={styles['toRegister']}>
                        <div className={styles['toRegister__text']}>Don't have an account?</div>
                        <Link to="/register" className="link-reset">
                            <div className={styles['toRegister__button']}>Sign up</div>
                        </Link>
                    </div>
                </div>
                <div className={styles['login__lowerContainer']}>
                    {!isAdClosed && (
                        <div className={styles['ad']}>
                            <div className={styles['ad__container']}>
                                <div className={styles['ad__header']}>advertisement</div>
                                <div className={styles['ad__remove']} onClick={() => setIsAdClosed(!isAdClosed)}>X</div>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}
