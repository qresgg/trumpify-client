import styles from '../auth.module.scss'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setAuthView } from '../../../lib/redux/pages/viewSlice';

export function Login ({
    switchAuth
}) {
    const dispatch = useDispatch();
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
        <>
            <div className={styles.auth}>
                <div className={styles.auth__container}>
                    <div className={styles.contik}>
                        <div className={styles.auth__container__logo}></div>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            {message?.error && <p className='error'>{message?.error}</p>}
                            {message?.success && <p className='success'>{message?.success}</p>}
                            <div className={styles.section}>Log in</div>

                            <div className={styles.inputData}>
                                <label>Email</label>
                                <input type="email"{...register('email')}/>
                                {errors.email && <p className='error'>{errors.email.message}</p>}
                            </div>

                            <div className={styles.inputData}>
                                <label>Password</label>
                                <input {...register('password')} type={visibility.input1 ? "text" : "password"} required id='input1'/>
                                <div className={styles.showButton} 
                                    onMouseDown={() => toggleVisibility('input1')} 
                                    onMouseUp={() => toggleVisibility('input1')}>{visibility.input1 ? 'Hide' : 'Show'}</div>
                                {errors.password && <p className='error'>{errors.password.message}</p>}
                            </div>

                            <div className={styles.authButton}>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <div className={styles.another_type_register}></div>
                        <div className={styles.breakLine}></div>
                        <div className={styles.loginButton}>
                            <div className={styles.loginButton__text}>Don't have an account?</div>
                            <div className={styles.loginButton__button} onClick={() => dispatch(setAuthView('register'))}>Sign up</div>
                        </div>
                        <div className={styles.footer}>
                            {!isAdClosed && (
                                <div className={styles.footer__ad}>
                                    <div className={styles.footer__floatingtext}>
                                        <div className={styles.footer__floatingtext__attention}>advertisement</div>
                                        <div className={styles.footer__floatingtext__cancel} onClick={() => setIsAdClosed(!isAdClosed)}>X</div>
                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
