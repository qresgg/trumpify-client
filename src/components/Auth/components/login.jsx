import styles from './login.module.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000';

export function Login () {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('')
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
              `${API_URL}/auth/login`,
              { userName, password },
              { withCredentials: true } 
            );
            setSuccess('Login successful');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError('Error during login');
            console.error(error.response ? error.response.data : error);
        }
    };


    return (
        <>
        <div className={styles.login}>
            <div className={styles.login__container}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className={styles.logo}>LOGIN</div>
                <div className={styles.userName}>
                    <label htmlFor="usernameInput">User Name</label>
                    <input 
                        type="text" 
                        name="usernameInput"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className={styles.password}>
                    <label htmlFor="passwordInput">Password</label>
                    <input 
                        type="password" 
                        name="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" onClick={handleSubmit}>Register</button>
                <div className={styles.another_type_register}></div>
                <div className={styles.footer}></div>
            </div>
        </div>
        </>
    )
}
