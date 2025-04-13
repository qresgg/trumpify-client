import { getAccessToken } from '../../global/functions';
import { SERVER_API_URL } from '../../global/variable';
import axios from 'axios';

const fetchLikedSong = async (id) => {
    const token = getAccessToken();
    try {
        const response = await axios.get(`${SERVER_API_URL}/actions/getLikedSong/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to fetch user data');
    }
}

export { fetchLikedSong };