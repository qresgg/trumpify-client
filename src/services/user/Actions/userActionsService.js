import axios from "axios";
import { getAccessToken } from '../../global/functions/functions';
import { SERVER_API_URL } from '../../global/variable';

const UserAction = async (url, data) => {
    const token = getAccessToken();

    try {
        const response = await axios.put(`${SERVER_API_URL}/actions/${url}`, data, {
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

const likeSong = async (song) => UserAction('like-song', { song });
const unLikeSong = async (song) => UserAction('unlike-song', { song });

const getLikedSongs = async (id) => {
    const token = getAccessToken();
    try {
        const response = await axios.get(`${SERVER_API_URL}/actions/getLikedSongs/${id}`, {
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

export { likeSong, unLikeSong, getLikedSongs};