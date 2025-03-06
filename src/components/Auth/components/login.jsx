import styles from './login.module.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { fetchUserData } from '../../../services/userService';

const API_URL = 'http://localhost:4000';

export function Login () {
    const [user, setUser] = useState(null);
    
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
            localStorage.setItem('accessToken', response.data.access_token);
            console.log('Access token saved to localStorage')

            setUserName('');
            setPassword('');
            setSuccess('Login successful');
        } catch (error) {
            setError('Error during login');
            console.error(error.response ? error.response.data : error);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
          try {
            const data = await fetchUserData();
            setUser(data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        getUserData();
    }, [success]);

    return (
        <>
        <div className={styles.login}>
            <div className={styles.login__container}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                {user && (<div>YOU ARE LOGINED AS {user.name}</div>)}
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
