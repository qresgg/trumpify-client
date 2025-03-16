import styles from './artistCreatePage.module.scss'
import { useState } from 'react';
import axios from 'axios';
const SERVER_API_URL = 'http://localhost:8080';

export function ArtistPageCreate () {
    const [artistName, setArtistName] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clearForm = () => {
        setArtistName('');
        setBio('');
        setPassword('');
        setConfirmPassword('');
        setSuccess('Registration successful');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${SERVER_API_URL}/artist/createProfile`,
                { artistName, bio, password, confirmPassword },
                { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true }
            );
            
            clearForm();
        } catch (error) {
            setError('Error during registration');
            console.error(error.response ? error.response.data : error);
        }
    }

    return (
        <>
            <div className={styles.artistCreate}>
                <div className={styles.artistCreate__container}>
                    <form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <label htmlFor="artistName">Create your artist name</label>
                        <input 
                            type="text" 
                            name='artistName'
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            placeholder='enter your artist name'/>
                        <label htmlFor="bio"></label>
                        <textarea 
                            name="bio" id="" rows='10' cols='50'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder='enter your biography'></textarea>
                        <label htmlFor="password">Enter your user password</label>
                        <input 
                            type="password" 
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='enter your password'/>
                        <label htmlFor="confirmPassword">Confirm your password</label>
                        <input 
                            type="password" 
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='enter your password confirmation'/>
                        <button type='submit' value='send' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}