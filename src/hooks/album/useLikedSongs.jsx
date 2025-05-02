import { useEffect, useState } from "react";
import { getLikedSongs } from "../../services/user/Actions/userActionsService";
import { useSelector } from "react-redux";


// HOOK IS NOT IN USE
export const useLikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const { selectedPlaylist } = useSelector((state) => state.music.playlist);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (!selectedPlaylist?._id) return;
      try {
        const response = await getLikedSongs(selectedPlaylist._id);
        setLikedSongs(response.likedSongsInAlbum || []);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };
    fetchLikedSongs();
  }, [selectedPlaylist]);

  return likedSongs;
};

