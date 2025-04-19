import styles from '../auth.module.scss'
import { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidUserName} from '../../../lib/regexp';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { register } from '../../../services/auth/authService';
import { useDispatch } from 'react-redux';
import { redirectPage } from '../../../services/global/functions/redirection';
import { AnimatePresence, motion } from 'framer-motion';

export function Registration ({
    switchAuth
}) {
    const dispatch = useDispatch();
    const { register: hookRegister, handleSubmit, formState: { errors }, setValue } = useForm();
    const [message, setMessage] = useState({ success: "", error: "" });
    const [passwordValidation, setPasswordValidation] = useState({});
    const [isAdClosed, setIsAdClosed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (data) => {
        if (!isValidPassword(data.password) || !isValidEmail(data.email) || !isValidUserName(data.userName)) {
            setMessage({ error: "All fields are required", success: "" });
            return;
        }
        if (data.password !== data.passwordConfirm) {
            setMessage({ error: "Passwords do not match", success: "" });
            return;
        }

        try {
            const response = await register(data.userName, data.email, data.password);
            setMessage({ success: response.message || "Registration successful!", error: "" });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error during registration";
            setMessage({ error: errorMessage, success: "" });
        }
    };
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
    return (
        <>
            <div className={styles.auth}>
                <div className={styles.auth__container}>
                    <div className={styles.contik}>
                        <div className={styles.auth__container__logo}></div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {message.error && <p style={{ color: 'red' }}>{message.error}</p>}
                            {message.success && <p style={{ color: 'green' }}>{message.success}</p>}
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
                                <input {...hookRegister('password', { required: "password is required"})} onChange={handlePasswordChange} type="password"/>
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
                                            <input {...hookRegister('passwordConfirm', { required: "confirmation is required"})} type="password"/>
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
                            <div className={styles.loginButton__button} onClick={switchAuth}>Log in here</div>
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
