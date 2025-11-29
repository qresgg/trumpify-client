import axios from "axios";
import { getAccessToken } from "../../utils/helpful/getGlobalItems";
import { SERVER_API_URL } from "../../lib/constants";

export const basicRequest = async ({ method, route, endpoint, id = null, data = null }) => {
    const token = getAccessToken();
    if (!token) throw new Error('Access token is missing');

    const url = id
        ? `${SERVER_API_URL}/${route}/${endpoint}ById/${id}`
        : `${SERVER_API_URL}/${route}/${endpoint}My`;
    
    const config = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };

    if (!['get', 'delete'].includes(method.toLowerCase()) && data) {
        config.data = data;
    }
    // console.log(config)

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user data');
    }
}

export const basicRequestImage = async ({ method, route, endpoint, file, type }) => {
    const token = getAccessToken();
    if (!token) throw new Error('Access token is missing');

    // console.log({ method, route, endpoint, file, type })

    const formData = new FormData();
    formData.append(type, file);

    const url = `${SERVER_API_URL}/${route}/${endpoint}My`;

    const config = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: formData,
        withCredentials: true,
    };

    try {
        const response = await axios.request(config);
    
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user data');
    }
}