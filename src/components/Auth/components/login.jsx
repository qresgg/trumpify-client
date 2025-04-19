import styles from '../auth.module.scss'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';

export function Login ({
    success,
    error
}) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { handleLogin } = useAuth();
    const [isAdClosed, setIsAdClosed] = useState(false);
    const [message, setMessage] = useState({ success: "", error: "" });

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.auth__container}>
                    <div className={styles.contik}>
                        <div className={styles.auth__container__logo}></div>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            <div className={styles.section}>Log in</div>

                            <div className={styles.inputData}>
                                <label>Email</label>
                                <input type="email"{...register('email')}/>
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>

                            <div className={styles.inputData}>
                                <label>Password</label>
                                <input type="password" {...register('password')}/>
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>

                            <div className={styles.authButton}>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <div className={styles.another_type_register}></div>
                        <div className={styles.breakLine}></div>
                        <div className={styles.loginButton}>
                            <div className={styles.loginButton__text}>Don't have an account?</div>
                            <div className={styles.loginButton__button}>Sign up</div>
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
