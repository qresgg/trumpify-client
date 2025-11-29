import createAlbum from "../../../services/artist/actions/createAlbum";
import { useMessage } from "../../../hooks/global/useMessage";

export const albumHandler = (setMessage, reset, setPreviewImage, setSongs, songs) => {
  const refreshData = () => {
    reset();
    setSongs([]);
    setPreviewImage('');
  }
  
  const onSubmit = async (data) => {
    try {
        const res = await createAlbum(data, songs);
        setMessage({ success: res?.message || "Album has been created successfully" })
        refreshData();
    } catch (error) {
        setMessage({ success: error.response || "Error during creation album!"})
        console.error(error.response ? error.response.data : error);
    }
  }

  return onSubmit;
}