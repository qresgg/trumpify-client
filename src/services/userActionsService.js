import axios from "axios";
import { getAccessToken } from "./tokenService";

const UserAction = async (url, data) => {
    const token = getAccessToken();

    try {
        const response = await axios.put(`http://localhost:8080/actions/${url}`, data, {
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
const unLikeSong = async (song) => UserAction('un-like-song', {song});

export { likeSong, unLikeSong };