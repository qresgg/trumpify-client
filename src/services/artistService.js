import axios from 'axios';
import { getAccessToken } from './tokenService';

const SERVER_API_URL = 'http://localhost:8080';

const createRecord = async (type, data) => {
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
const createAlbum = (data) => createRecord('create-album', data)

export { createSong, createAlbum };
