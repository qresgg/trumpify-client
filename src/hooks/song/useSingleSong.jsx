import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setActivePlaylist, setSelectedPlaylist, setActiveSong, setSelectedSong } from "../../lib/redux/music/musicState";
import {useMusicActions} from "../global/useMusicActions";

export function useSingleSong(){
    const dispatch = useDispatch();
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);
    const musicPlayer = useMusicActions()

    const setActiveSingleSong = (item) => {
        musicPlayer.setActivePlaylist({ song: item, index: 0 });

        if (!selectedPlaylist?.songs?.some(song => song._id === item._id)) {
            musicPlayer.closeActivePlaylist();
            musicPlayer.closeSelectedPlaylist();
          }
    }
    const setSelectedSingleSong = (item) => {
        musicPlayer.selectSong(item);
    }

    return { setActiveSingleSong, setSelectedSingleSong };
}