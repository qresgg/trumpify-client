import styles from './registration.module.scss'
import axios from 'axios';
import { useState } from 'react';

const SERVER_API_URL = 'http://localhost:8080';

export function Registration () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
              `${SERVER_API_URL}/auth/register`,
              { userName, email, password },
              { withCredentials: true } 
            );
            setSuccess('Registration successful');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError('Error during registration');
            console.error(error.response ? error.response.data : error);
        }
    };

    return (
        <>
        <div className={styles.register}>
            <div className={styles.register__container}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className={styles.logo}>REGISTER</div>
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
                <div className={styles.userName}>
                    <label htmlFor="usernameInput">User Name</label>
                    <input 
                        type="text" 
                        name="usernameInput"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <button type="submit" onClick={handleSubmit}>Register</button>
                <div className={styles.another_type_register}></div>
                <div className={styles.footer}></div>
            </div>
        </div>
        </>
    )
}
