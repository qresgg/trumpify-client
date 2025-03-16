import axios from 'axios';

const SERVER_API_URL = 'http://localhost:8080';
const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const response = await axios.post(`${SERVER_API_URL}/auth/verify    `, {}, {
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

            return await refreshAccessToken();
        }
    } else {
        return null;
    }
};

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${SERVER_API_URL}/auth/refresh`, {}, { withCredentials: true });
        if (response.data.access_token) {

            localStorage.setItem('accessToken', response.data.access_token);
            return response.data.access_token;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
    }
    return null;
};

const login = async (userName, password) => {
    const response = await axios.post(
        `${SERVER_API_URL}/auth/login`,
        { userName, password },
        { withCredentials: true } 
    );
    localStorage.setItem('accessToken', response.data.access_token);
    console.log('Access token saved to localStorage')
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

export { login, logout, checkAuth}