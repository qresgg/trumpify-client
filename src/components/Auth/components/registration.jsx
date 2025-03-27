import styles from './registration.module.scss'
import { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidUserName} from '../../../lib/regexp';
import { Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { register } from '../../../services/authService';

export function Registration () {
    const { register: hookRegister, handleSubmit, formState: { errors }, setValue } = useForm();
    const [message, setMessage] = useState({ success: "", error: "" });
    const [passwordValidation, setPasswordValidation] = useState({});

    const onSubmit = async (data) => {
        if (!isValidPassword(data.password) || !isValidEmail(data.email) || !isValidUserName(data.userName)) {
            setMessage({ error: "All fields are required", success: "" });
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
    return (
        <>
        <div className={styles.register}>
            <div className={styles.register__container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {message.error && <p style={{ color: 'red' }}>{message.error}</p>}
                    {message.success && <p style={{ color: 'green' }}>{message.success}</p>}
                    <div className={styles.logo}>REGISTER</div>

                    <div className={styles.userName}>
                        <label>User Name</label>
                        <input {...hookRegister('userName', { required: "user name is required"})}/>
                        {errors.userName && <p>{errors.userName.message}</p>}
                    </div>

                    <div className={styles.email}>
                        <label>Email</label>
                        <input {...hookRegister('email', { required: "email is required"})}/>
                    </div>

                    <div className={styles.password}>
                        <label>Password</label>
                        <input {...hookRegister('password', { required: "password is required"})} onChange={handlePasswordChange} type="password"/>
                    </div>

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
                    <button type="submit">Register</button>
                </form>
                <div className={styles.another_type_register}></div>
                <div className={styles.footer}></div>
            </div>
        </div>
        </>
    )
}
