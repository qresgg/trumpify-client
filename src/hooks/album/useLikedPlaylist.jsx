import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useLikedPlaylist = () => {
  const [isLikedPlaylist, setIsLikedPlaylist] = useState(false);
  const { selectedPlaylist } = useSelector((state) => state.music.playlist);
  const user = useSelector((state) => state.data.user);

  useEffect(() => {
    setIsLikedPlaylist(user.user_library.some((playlist) => playlist._id === selectedPlaylist?._id));
  }, [selectedPlaylist, user.user_library]);

  return [isLikedPlaylist, setIsLikedPlaylist];
};