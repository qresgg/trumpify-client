import { getAccessToken } from '../../../utils/helpful/getGlobalItems';
import { SERVER_API_URL } from '../../../lib/constants';
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