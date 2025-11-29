import axios from "axios";
import { getAccessToken } from "../../utils/helpful/getGlobalItems";
import { SERVER_API_URL } from "../../lib/constants";

export const fetchReference = async (type) => {
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

export const getRegions = async () => {
    try {
        const regions = await fetchReference("getRegions");
        return regions;
    } catch (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
};