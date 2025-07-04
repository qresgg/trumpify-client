import styles from '../auth.module.scss'
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Registration () {
    const dispatch = useDispatch();
    const { register: hookRegister, handleSubmit, formState: { errors }, setValue } = useForm();
    const { message, handleRegistration } = useAuth();
    const [passwordValidation, setPasswordValidation] = useState({});
    const [isAdClosed, setIsAdClosed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [visibility, setVisibility] = useState({
        input1: false,
        input2: false,
    });

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setValue('password', newPassword);
        setPasswordValidation({
            minLength: newPassword.length >= 8,
            hasUpperCase: /[A-Z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
            hasSpecialChar: /[^A-Za-z0-9]/.test(newPassword),
        });
    };
    const handlePasswordCheck = () => {
        !isOpen && setIsOpen(true);
    }
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
                        <form onSubmit={handleSubmit(handleRegistration)}>
                            {message?.error && <p className='error'>{message?.error}</p>}
                            {message?.success && <p className='success'>{message?.success}</p>}
                            <div className={styles.section}>Sign up</div>

                            <div className={styles.inputData}>
                                <label>Email</label>
                                <input {...hookRegister('email', { required: "email is required"})}/>
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>

                            <div className={styles.inputData}>
                                <label>Username</label>
                                <input {...hookRegister('userName', { required: "user name is required"})}/>
                                {errors.userName && <p>{errors.userName.message}</p>}
                            </div>

                            <div className={styles.inputData} onFocus={handlePasswordCheck}>
                                <label>Password</label>
                                <input onChange={handlePasswordChange} type={visibility.input1 ? "text" : "password"} required id='input1'/>
                                <div className={styles.showButton} 
                                    onMouseDown={() => toggleVisibility('input1')} 
                                    onMouseUp={() => toggleVisibility('input1')}>{visibility.input1 ? 'Hide' : 'Show'}</div>
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}>
                                        <div className={styles.passwordChecker}>
                                            <div className={styles.passwordChecker__container}>
                                                <div className={styles.passwordChecker__container__text}>
                                                <p>Password must contain:</p>
                                                    <p>{passwordValidation.minLength ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 8 characters</p>
                                                    <p>{passwordValidation.hasUpperCase ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 1 uppercase letter</p>
                                                    <p>{passwordValidation.hasNumber ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 1 number </p>
                                                    <p>{passwordValidation.hasSpecialChar ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 1 special character </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                    )}
                                {passwordValidation.minLength && passwordValidation.hasUpperCase && passwordValidation.hasNumber && passwordValidation.hasSpecialChar && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}>
                                        <div className={styles.inputData}>
                                            <label>Password Confirmation</label>
                                            <input {...hookRegister('passwordConfirm', { required: "confirmation is required"})} type={visibility.input2 ? "text" : "password"} id="input2"/>
                                            <div className={styles.showButton} 
                                                onMouseDown={() => toggleVisibility('input2')} 
                                                onMouseUp={() => toggleVisibility('input2')}>{visibility.input2 ? 'Hide' : 'Show'}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className={styles.authButton}>
                                <button type="submit">Register</button>
                            </div>
                        </form>
                        <div className={styles.another_type_register}></div>
                        <div className={styles.breakLine}></div>
                        <div className={styles.loginButton}>
                            <div className={styles.loginButton__text}>Already have an account?</div>
                            <Link to="/login" className="link-reset">
                                <div className={styles.loginButton__button}>Log in here</div>
                            </Link>
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
