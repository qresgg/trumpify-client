import styles from './songCreatePage.module.scss'
import { useState } from 'react';
import axios from 'axios';
const SERVER_API_URL = 'http://localhost:8080';

export function SongPageCreate () {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [duration, setDuration] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clearForm = () => {
        setTitle('');
        setGenre('');
        setDuration('');
        setSuccess('Registration successful');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${SERVER_API_URL}/artist/createSong`,
                { title, genre, duration },
                { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true }
            );
            
            clearForm();
        } catch (error) {
            setError('Error during registration');
            console.error(error.response ? error.response.data : error);
        }
    }

    const handleInputChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 2) {
          value = value.slice(0, 2) + ':' + value.slice(2);
        }
        setDuration(value);
      };

    return (
        <>
            <div className={styles.artistCreate}>
                <div className={styles.artistCreate__container}>
                    <form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <label htmlFor="Title">Create name song</label>
                        <input 
                            type="text" 
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='enter name song'/>
                        <label htmlFor="genre"></label>
                        {/* <textarea 
                            name="bio" id="" rows='10' cols='50'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder='enter your biography'></textarea> */}
                        <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                            <option value="" disabled>Choose genre of song</option>
                            <option value="rock">Rock</option>
                            <option value="hip-hop">Hip-Hop</option>
                            <option value="pop">Pop</option>
                            <option value="electronic">Electronic</option>
                        </select>
                        <label htmlFor="duration">Enter song duration</label>
                        <input 
                            type="text" 
                            name='duration'
                            value={duration}
                            onChange={handleInputChange}
                            placeholder='enter duration of your song'
                            maxLength="5"/>
                        <button type='submit' value='send' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}