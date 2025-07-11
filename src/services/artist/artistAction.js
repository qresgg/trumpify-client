import axios from 'axios';
import { getAccessToken } from '../../utils/helpful/getGlobalItems';
import { SERVER_API_URL } from '../../lib/constants';

const updateArtistSetting = async (url, data) => {
  const token = getAccessToken();
  
  try {
    const response = await axios.put(`${SERVER_API_URL}/settings/${url}`, data, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.message;
    throw new Error(errorMsg);
  }
};

const updateArtistName = async (artistName) => updateArtistSetting('change-artist-name', { artistName });
const updateBio = async (bio) => updateArtistSetting('change-artist-bio', { bio });

const uploadArtistImage = async (file, type, name) => {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append(name, file);

  try {
    const response = await axios.put(`${SERVER_API_URL}/settings/${type}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.message;
    throw new Error(errorMsg);
  }
};

const uploadAvatar = async (avatarFile) => uploadArtistImage(avatarFile, 'change-artist-avatar', 'avatar');
const uploadBanner = async (bannerFile) => uploadArtistImage(bannerFile, 'change-artist-banner', 'banner');

export { updateArtistName, updateBio, uploadAvatar, uploadBanner };