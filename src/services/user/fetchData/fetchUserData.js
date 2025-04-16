import { getAccessToken } from '../../global/functions/functions';
import { SERVER_API_URL } from '../../global/variable';
import axios from 'axios';

const fetchUserData = async () => {
  const token = getAccessToken();
  try {
    const response = await axios.get(`${SERVER_API_URL}/api/getUser`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

export { fetchUserData };