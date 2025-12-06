import styles from './registration.module.scss'
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Registration () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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
            <div className={styles['register']}>
                <div className={styles['register__container']}>
                    <div className={styles['register__logo']}></div>
                    <div className={styles['register__upperContainer']}>
                        <form onSubmit={handleSubmit(handleRegistration)}>
                            {message?.error && <p className='error'>{message?.error}</p>}
                            {message?.success && <p className='success'>{message?.success}</p>}
                            <div className={styles["register__section"]}>Sign up</div>

                            <div className={styles['register__input']}>
                                <label>Email</label>
                                <input {...register('email', { required: "email is required"})}/>
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>

                            <div className={styles['register__input']}>
                                <label>Username</label>
                                <input {...register('userName', { required: "user name is required"})}/>
                                {errors.userName && <p>{errors.userName.message}</p>}
                            </div>

                            <div className={styles['register__input']} onFocus={handlePasswordCheck}>
                                <label>Password</label>
                                <input onChange={handlePasswordChange} type={visibility.input1 ? "text" : "password"} required id='input1'/>
                                <div className={styles['password__showButton']}
                                     onMouseEnter={() => toggleVisibility('input1')}
                                     onMouseLeave={() => toggleVisibility('input1')}
                                     onTouchStart={() => toggleVisibility('input1')}
                                     onTouchEnd={() => toggleVisibility('input1')}
                                >{visibility.input1 ? 'Hide' : 'Show'}</div>
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div key="passwordCheck"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4 }}>
                                        <div className={styles['password__checker']}>
                                            <p>Password must contain:</p>
                                            <p>{passwordValidation.minLength ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 8 characters</p>
                                            <p>{passwordValidation.hasUpperCase ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 1 uppercase letter</p>
                                            <p>{passwordValidation.hasNumber ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 1 number </p>
                                            <p>{passwordValidation.hasSpecialChar ? <Check color="green" size={16} /> : <X color="red" size={16} />} At least 1 special character </p>
                                        </div>
                                    </motion.div>
                                )}
                                {passwordValidation.minLength && passwordValidation.hasUpperCase && passwordValidation.hasNumber && passwordValidation.hasSpecialChar && (
                                    <motion.div
                                        key="confirmationInput"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}>
                                        <div className={styles['register__input']}>
                                            <label>Password Confirmation</label>
                                            <input {...register('passwordConfirm', { required: "confirmation is required"})} type={visibility.input2 ? "text" : "password"} id="input2"/>
                                            <div className={styles['password__showButton']}
                                                 onMouseEnter={() => toggleVisibility('input2')}
                                                 onMouseLeave={() => toggleVisibility('input2')}
                                                 onTouchStart={() => toggleVisibility('input2')}
                                                 onTouchEnd={() => toggleVisibility('input2')}
                                            >{visibility.input2 ? 'Hide' : 'Show'}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className={styles['register__submitButton']}>
                                <button type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className={styles["register__middleContainer"]}>
                        {/*<div className={styles['links']}></div>*/}
                        {/*<div className={styles['breakLine']}></div>*/}
                        <div className={styles['toLogin']}>
                            <div className={styles['toLogin__text']}>Already have an account?</div>
                            <Link to="/login" className="link-reset">
                                <div className={styles['toLogin__button']}>Log in here</div>
                            </Link>
                        </div>
                    </div>
                    <div className={styles["register__lowerContainer"]}>
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
        </>
    )
}
