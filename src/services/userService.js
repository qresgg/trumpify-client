import axios from 'axios';
import { getAccessToken } from './tokenService';

export const fetchUserData = async () => {
  const token = getAccessToken();
  try {
    const response = await axios.get('http://localhost:4000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data132');
  }
};
