import axios from "axios";
import { getAccessToken } from "../../global/functions/functions";
import { SERVER_API_URL } from '../../global/variable';

const AlbumAction = async (url, data) => {
    const token = getAccessToken();

    try {
        const response = await axios.put(`${SERVER_API_URL}/artist/${url}`, data, {
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

const likeAlbum = async (album) => AlbumAction('like-album', { album });
const unLikeAlbum = async (album) => AlbumAction('unlike-album', { album });

export { likeAlbum, unLikeAlbum };