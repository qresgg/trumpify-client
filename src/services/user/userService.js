import axios from 'axios';
import { getAccessToken } from '../global/functions/functions';
import { SERVER_API_URL } from '../global/variable';

const fetchData = async (type) => {
  const token = getAccessToken();
  try {
    const response = await axios.get(`${SERVER_API_URL}/api/${type}`, {
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

const getUserData = async () => {
  try {
    const data = await fetchData('getUser');
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const getUserLibrary = async () => {
  try {
    const data = await fetchData('getLibrary');
    return data;
  } catch (error) {
    console.error('Error fetching user library:', error);
  }
};

const searchData = async (value) => {
  const token = getAccessToken();
  
  try {
    const response = await axios.get(`${SERVER_API_URL}/api/search`, {
      params: { query: value },
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

export { getUserData, searchData, getUserLibrary }
