import axios from "axios";
import { getAccessToken } from '../global/functions';
import { SERVER_API_URL } from '../global/variable';

const findData = async (type, id) => {
    const token = getAccessToken();
    
    try{
        const response = await axios.get(`${SERVER_API_URL}/find/${type}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        return response.data;
    } catch(err) {
        throw new Error('Failed to fetch user data');
    }
}

const findContent = async (type, id) => findData(type, id);

export { findContent }