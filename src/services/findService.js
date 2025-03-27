import axios from "axios";
import { getAccessToken } from "./tokenService";

const SERVER_API_URL = 'http://localhost:8080';

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

const findContent = async (type, id) => findData(type = 'Artist', id);
// const findAlbum = async (id) => 

export { findContent }