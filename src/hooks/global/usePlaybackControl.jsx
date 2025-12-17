import { useEffect, useState, useCallback, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrevSong, setNextSong } from "../../lib/redux/music/musicState";
import {useMusicActions} from "./useMusicActions";

export const usePlaybackControl = (entity, type, index = null, isSingle) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const musicPlayer = useMusicActions()

  const { isMusicPlaying, currentIndex } = useSelector((state) => state.music);
  const { activePlaylist, selectedPlaylist } = useSelector((state) => state.music.playlist);
  const { activeSong, selectedSong } = useSelector((state) => state.music.song);

  const isPlaylist = type === "playlist" || type === "album";
  const songs = activePlaylist?.songs;
  
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
          musicPlayer.togglePlayback();
      } else {
            musicPlayer.setActiveSong(entity);
            musicPlayer.selectPlaylist(entity);
            musicPlayer.setActiveSong({ song: entity.songs[0], index: 0 });
      }
    } else {
      if (activeSong?._id === entity?._id) {
            musicPlayer.togglePlayback();
      } else {
            const i = index ?? 0;
            musicPlayer.setActiveSong({ song: entity.songs[0], index: i });
        
        if (isSingle) {
            musicPlayer.closeActivePlaylist();
            musicPlayer.closeActiveSong();
        }

        if (activePlaylist !== selectedPlaylist) {
            musicPlayer.setActivePlaylist(selectedPlaylist);
        }
      }
    }
  };

  return { isPlaying, togglePlay, isSelected };
};