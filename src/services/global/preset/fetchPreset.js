import axios from "axios";
import { getAccessToken } from "../functions/functions";
import { SERVER_API_URL } from "../variable";

export const fetchDataAPI = async (type) => {
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