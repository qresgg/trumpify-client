import styles from './registration.module.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidUserName} from '../../../lib/regexp';
import { Check, X } from 'lucide-react';

const SERVER_API_URL = 'http://localhost:8080';

export function Registration () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    
    const [error, setError] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorUserName, setErrorUserName] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (password && !isValidPassword(password)) {
            setErrorPassword('Invalid password format');
        } else {
            setErrorPassword('');
        }
    }, [password]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isValidEmail(email)) {
            setErrorEmail('Invalid email format');
            return;
        }
        
        if(!isValidUserName(userName)) {
            setErrorUserName('Invalid username format');
            return;
        }

        try {
            const response = await axios.post(
              `${SERVER_API_URL}/auth/register`,
              { userName, email, password },
              { withCredentials: true } 
            );
            clearForm();
        } catch (error) {
            setError('Error during registration');
            console.error(error.response ? error.response.data : error);
        }
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setSuccess('Registration successful');
        window.location.reload();
    }
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        return { minLength, hasUpperCase, hasNumber, hasSpecialChar };
    };
    const passwordValidation = validatePassword(password);

    return (
        <>
        <div className={styles.register}>
            <div className={styles.register__container}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className={styles.logo}>REGISTER</div>
                <div className={styles.userName}>
                    <label htmlFor="usernameInput">User Name</label>
                    <input 
                        type="text" 
                        name="usernameInput"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className={styles.email}>
                    <label htmlFor="emailInput">Email</label>
                    <input 
                        type="email" 
                        name="emailInput" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.password}>
                    <label htmlFor="passwordInput">Password</label>
                    <input 
                        type="password" 
                        name="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
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
                <button type="submit" onClick={handleSubmit}>Register</button>
                <div className={styles.another_type_register}></div>
                <div className={styles.footer}></div>
            </div>
        </div>
        </>
    )
}
