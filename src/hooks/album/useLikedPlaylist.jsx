import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useLikedPlaylist = () => {
  const [isLikedPlaylist, setIsLikedPlaylist] = useState(false);
  const { selectedPlaylist } = useSelector((state) => state.music.playlist);
  const user = useSelector((state) => state.data.user);

  useEffect(() => {
    if (!selectedPlaylist || !user?.user_library) {
      setIsLikedPlaylist(false);
      return;
    }

    const isLiked = user.user_library.some(
      (playlist) => playlist._id === selectedPlaylist._id
    );

    setIsLikedPlaylist(isLiked);
  }, [selectedPlaylist, user?.user_library]);

  return [isLikedPlaylist, setIsLikedPlaylist];
};