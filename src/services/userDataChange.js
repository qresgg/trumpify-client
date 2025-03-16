import axios from 'axios';
import { getAccessToken } from './tokenService';

const changePassword = async (password) => {
  const token = getAccessToken();
  
  try {
    const response = await axios.put(`http://localhost:8080/settings/change-password`, { password }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) { 
    console.error('Error fetching user data:', error); 
  }
};
const changeEmail = async (email, newEmail) => {
  const token = getAccessToken();
  
  try {
    const response = await axios.put(`http://localhost:8080/settings/change-email`, { email, newEmail }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) { 
    console.error('Error fetching user data:', error); 
  }
}

const updatePassword = async (password) => {
  try {
    const data = await changePassword(password);
    
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const updateEmail = async (email, newEmail) => {
  try {
    const data = await changeEmail(email, newEmail);
    
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export { updatePassword, updateEmail }