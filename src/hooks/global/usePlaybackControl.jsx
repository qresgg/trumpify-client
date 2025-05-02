import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePlayback,
  setActivePlaylist,
  setActiveSong,
} from "../../lib/redux/music/musicState";

export const usePlaybackControl = (entity, type) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const { isMusicPlaying } = useSelector((state) => state.music);
  const { activePlaylist, selectedPlaylist } = useSelector((state) => state.music.playlist);
  const { activeSong, selectedSong } = useSelector((state) => state.music.song);

  const isPlaylist = type === "playlist" || type === "album";

  useEffect(() => {
    if (isPlaylist) {
      setIsPlaying(activePlaylist?._id === entity?._id && isMusicPlaying);
    } else {
      setIsPlaying(activeSong?._id === entity?._id && isMusicPlaying);
    }
  }, [activePlaylist, activeSong, entity, isMusicPlaying]);

  useEffect(() => {
    if (isPlaylist) {
      setIsSelected(entity?._id === selectedPlaylist?._id);
    } else {
      setIsSelected(entity?._id === selectedSong?._id);
    }
  }, [selectedPlaylist, selectedSong]);

  const togglePlay = () => {
    if (!entity) return;

    if (isPlaylist) {
      if (!entity?.songs?.length) return;

      if (activePlaylist?._id === entity?._id) {
        dispatch(togglePlayback());
      } else {
        dispatch(setActivePlaylist(entity));
        dispatch(setActiveSong({ song: entity.songs[0], index: 0 }));
      }
    } else {
      if (activeSong?._id === entity?._id) {
        dispatch(togglePlayback());
      } else {
        dispatch(setActiveSong({ song: entity }));
        if (activePlaylist !== selectedPlaylist) {
          dispatch(setActivePlaylist(selectedPlaylist));
        }
      }
    }
  };

  return { isPlaying, togglePlay, isSelected };
};