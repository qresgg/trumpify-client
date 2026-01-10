import { useEffect, useState } from "react";
import PlaylistDuration from "../../utils/helpful/getPlaylistDuration";
import { useSelector } from "react-redux";

const usePlaylistDuration = () => {
  const [totalDuration, setTotalDuration] = useState("");
  const { selectedPlaylist } = useSelector((state) => state.music.playlist);

  useEffect(() => {
    if (selectedPlaylist?.artist) {
      const totalDur = new PlaylistDuration(selectedPlaylist);
      setTotalDuration(totalDur.totalDuration);
    }
  }, [selectedPlaylist]);

  return totalDuration;
};