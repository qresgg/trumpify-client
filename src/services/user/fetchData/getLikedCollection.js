import axios from "axios";
import { getAccessToken } from "../../global/functions";
import { SERVER_API_URL } from "../../global/variable";

const fetchLikedCollection = async () => {
    const token = getAccessToken();
    try {
        const response = await axios.get(`${SERVER_API_URL}/api/getLikedCollection`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch liked collection');
    }
}
export { fetchLikedCollection}