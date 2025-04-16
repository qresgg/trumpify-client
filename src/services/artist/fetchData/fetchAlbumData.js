import axios from "axios";
import { getAccessToken } from "../../global/functions/functions";
import { SERVER_API_URL } from "../../global/variable";

const fetchData = async (type) => {
    const token = getAccessToken();
    try {
        const response = await axios.get(`${SERVER_API_URL}/api/${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        withCredentials: true,
        });
    
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }
}

export const getAlbumData = async () => {
    try {
        const data = await fetchData("getAlbum");
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}