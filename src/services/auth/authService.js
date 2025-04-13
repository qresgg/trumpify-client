import axios from 'axios';
import { getAccessToken } from '../global/functions.js';
import { SERVER_API_URL } from '../global/variable';

const apiClient = axios.create({
    baseURL: SERVER_API_URL,
    withCredentials: true,
});

const checkAuth = async (retryCount = 0, maxRetries = 3) => {
    const token = getAccessToken();
    if (token) {
        try {
            const response = await axios.post(`${SERVER_API_URL}/auth/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return response.status === 200 ? token : await refreshAccessToken();
        } catch (error) {
            console.error('Token verification failed:', error);
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access - Invalid token');
            }

            if (retryCount < maxRetries) {
                await refreshAccessToken();
                console.log('refreshsed')
                return await checkAuth(retryCount + 1, maxRetries);
            } else {
                console.error('Max retries reached. Unable to verify token.');
                return null;
            }
        }
    } else {
        return await refreshAccessToken();
    }
};
apiClient.interceptors.response.use(null, async (error) => {
    if (error.response && error.response.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            console.log('incterceptor');
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(error.config);
        }
    }
    return Promise.reject(error);
});

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${SERVER_API_URL}/auth/refresh`, {}, { withCredentials: true });
        if (response.data.access_token) {

            console.log('refreshed')
            localStorage.setItem('accessToken', response.data.access_token);
            return response.data.access_token;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
    }
    return null;
};

const login = async (email, password) => {
   try {
        const response = await axios.post(
            `${SERVER_API_URL}/auth/login`,
            { email, password },
            { withCredentials: true } 
        );
        localStorage.setItem('accessToken', response.data.access_token);
   } catch (error) {
        console.log('failed to login', error)
   }
}

const logout = async () => {
    try {
        const response = await axios.post(`${SERVER_API_URL}/auth/logout`, {}, { withCredentials: true });
        localStorage.removeItem("accessToken"); 
        window.location.reload();
        return response.data;
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        throw error;
    }
}

const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${SERVER_API_URL}/auth/register`,
            { username, email, password },
            { withCredentials: true}
        );
        return response.data;
    } catch (error) {
        console.error("failed to register", error);
        throw new Error(error.response?.data?.message)
    }
}

export { login, logout, checkAuth, register}