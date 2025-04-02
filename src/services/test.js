import axios from "axios";
import { getAccessToken } from "./global/functions";
import { SERVER_API_URL } from "./global/variable";

const sendMusic = async (file) => {
    const token = getAccessToken();
    try {
        const formData = new FormData();
        formData.append('audio', file, file.name);

        const response = await axios.post(`${SERVER_API_URL}/api/musicTEST`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export { sendMusic }