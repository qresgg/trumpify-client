import axios from "axios";
import { getAccessToken } from "../../../utils/helpful/getGlobalItems";
import { SERVER_API_URL } from "../../../lib/constants";

const createSong = async (data) => {
  const token = getAccessToken();
  try {
    console.log('CS', data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if ((key === 'cover' || key === 'audio') && value instanceof FileList) {
        formData.append(key, value[0]);
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    const response = await axios.post(
      `${SERVER_API_URL}/artist/create/Song`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export default createSong;