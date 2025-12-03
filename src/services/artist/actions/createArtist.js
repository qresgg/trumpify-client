import axios from "axios";
import { getAccessToken } from "../../../utils/helpful/getGlobalItems";
import { SERVER_API_URL } from "../../../lib/constants";

const createArtist = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${SERVER_API_URL}/artist/create-artist`, 
        data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('failed to create artist profile', error);
        throw error;
    }
}
export default createArtist;