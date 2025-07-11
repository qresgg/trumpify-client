import axios from 'axios';
import { getAccessToken } from '../../utils/helpful/getGlobalItems';
import { SERVER_API_URL } from '../../lib/constants';

const apiClient = axios.create({
    baseURL: SERVER_API_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
  response => {
    const newToken = response.headers['new-access-token'];
    if (newToken) {
      localStorage.setItem('accessToken', newToken);
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${SERVER_API_URL}/auth/token`, {}, {
          withCredentials: true
        });
        
        const newToken = response.data.access_token;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
    try {
        const response = await apiClient.post('/auth/refresh', {});
        if (response.data.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
            return response.data.access_token;
        }
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
    return null;
};

const checkAuth = async () => {
    const token = getAccessToken();
    if (!token) return null;

    try {
        await apiClient.post('/auth/verify', {});
        return token;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        localStorage.setItem('accessToken', response.data.access_token);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

const logout = async () => {
    try {
        await apiClient.post('/auth/logout', {});
        localStorage.removeItem("accessToken");
        window.location.reload();
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};

const register = async (username, email, password) => {
    try {
        const response = await apiClient.post('/auth/register', { username, email, password });
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

export { login, logout, checkAuth, register, apiClient };