import axios from 'axios';
import { getAccessToken } from './tokenService';

const SERVER_API_URL = 'http://localhost:8080';

const createRecord = async (type, data, songs = []) => {
    const token = getAccessToken();
    try {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'cover' && value instanceof FileList) {
                formData.append('cover', value[0]);
            } else {
                formData.append(key, value);
            }
        });

        songs.forEach((song, index) => {
            formData.append(`songs[${index}]`, JSON.stringify(song));
        });

        console.log(formData)

        const response = await axios.post(
            `${SERVER_API_URL}/artist/${type}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            }
        );

        return response.data; 
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createSong = (data) => createRecord('create-song', data)
const createAlbum = (data, songs) => createRecord('create-album', data, songs)

const createArtist = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${SERVER_API_URL}/artist/create-artist`, 
        data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('failed to create artist profile', error);
        throw error;
    }
} 

export { createSong, createAlbum, createArtist};
