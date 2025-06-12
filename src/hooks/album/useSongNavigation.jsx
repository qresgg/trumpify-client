import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrevSong, setNextSong } from "../../lib/redux/music/musicState";

export const useSongNavigation = (customSongs = null) => {
  const dispatch = useDispatch();
  const { activePlaylist } = useSelector((state) => state.music.playlist);
  
  const songs = customSongs || activePlaylist?.songs || [];

  const handleSongState = useCallback((index) => {
    if (!songs.length) return;

    if (index > 0 && songs[index - 1]) {
      dispatch(setPrevSong(songs[index - 1]));
    }

    if (index < songs.length - 1 && songs[index + 1]) {
      dispatch(setNextSong(songs[index + 1]));
    }
  }, [songs, dispatch]);

  

  return handleSongState;
};