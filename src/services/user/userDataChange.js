import axios from 'axios';
import { getAccessToken } from '../../utils/helpful/getGlobalItems';
import { SERVER_API_URL } from '../../lib/constants';

const updateSetting = async (url, data) => {
  const token = getAccessToken();
  
  try {
    const response = await axios.put(`${SERVER_API_URL}/settings/${url}`, data, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating setting:', error);
  }
};

const updatePassword = async (password) => updateSetting('change-password', { password });
const updateEmail = async (email, newEmail) => updateSetting('change-email', { email, newEmail });
const updateUserName = async (userName) => updateSetting('change-userName', { userName });

const uploadImage = async (avatarFile) => {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append("avatar", avatarFile);

  try {
    const response = await axios.put(`${SERVER_API_URL}/settings/change-avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading avatar:', error);
  }
};

const uploadAvatar = async (avatarFile) => uploadImage(avatarFile);


export { updatePassword, updateEmail, updateUserName, uploadAvatar };