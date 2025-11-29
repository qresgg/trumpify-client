import axios from "axios";
import { getAccessToken } from "../../../utils/helpful/getGlobalItems";
import { SERVER_API_URL } from "../../../lib/constants";

const createAlbum = async (data, songs = []) => {
    const token = getAccessToken();
    try {
        const formData = new FormData();
        console.log('data nad songs', data, songs)
        
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'cover' && value instanceof FileList) {
                formData.append('cover', value[0]);
            } else if (key === 'audio' && value instanceof File) {
                formData.append('audio', value);
            } else if (key === 'audio' && value instanceof FileList) {
                formData.append('audio', value[0]);
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
            `${SERVER_API_URL}/artist/create/Album`,
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

export default createAlbum;