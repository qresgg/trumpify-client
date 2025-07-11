import axios from 'axios';
import { getAccessToken } from '../../utils/helpful/getGlobalItems';
import { SERVER_API_URL } from '../../lib/constants';

const createRecord = async (type, data, songs = []) => {
    const token = getAccessToken();
    try {
        const formData = new FormData();
        
        Object.entries(data).forEach(([key, value]) => {
            if (key === ('cover') && value instanceof FileList) {
                formData.append('cover', value[0]);
            } else if (key === ("audio") && value instanceof FileList) {
                formData.append('audio', value[0])
            } else {
                formData.append(key, value);
            }
        });

        console.log('FormData entries:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        songs.forEach((song, index) => {
            const { audio, ...textData } = song;
            formData.append(`songs[${index}]`, JSON.stringify(textData));

            if (audio && audio instanceof File) {
                formData.append(`songs[${index}][audio]`, audio);
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
