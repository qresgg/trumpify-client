import axios from 'axios';
import { getAccessToken } from './tokenService';

const { SERVER_API_URL } = process.env;

const fetchUserData = async () => {
  const token = getAccessToken();
  try {
    const response = await axios.get(`http://localhost:8080/api/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

const getUserData = async () => {
  try {
    const data = await fetchUserData();
  return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export { getUserData }
