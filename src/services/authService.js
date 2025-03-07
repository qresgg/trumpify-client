import axios from 'axios';

const SERVER_API_URL = 'http://localhost:8080';

// const apiRequest = async (url, options = {}) => {
//     const token = await checkAuth();
//     if (token) {
//         const response = await axios({
//             ...options,
//             url: `${SERVER_API_URL}${url}`,
//             headers: {
//                 ...options.headers,
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data;
//     } else {
//         throw new Error('Authentication required');
//     }
// };

const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        try {
            const response = await axios.get(`${SERVER_API_URL}/auth/verifyToken`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return token;
            } else {
                const newToken = await refreshAccessToken();
                return newToken;
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            const newToken = await refreshAccessToken();
            return newToken;
        }
    } else {
        return null;
    }
};

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${SERVER_API_URL}/auth/token`, null, { withCredentials: true });
        if (response.data.access_token) {

            localStorage.setItem('accessToken', response.data.access_token);
            return response.data.access_token;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
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