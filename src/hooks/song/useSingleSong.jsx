import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setActivePlaylist, setSelectedPlaylist, setActiveSong, setSelectedSong } from "../../lib/redux/music/musicState";

export function useSingleSong(){
    const dispatch = useDispatch();
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);

    const setActiveSingleSong = (item) => {
        dispatch(setActiveSong({ song: item, index: 0 }));

        if (!selectedPlaylist?.songs?.some(song => song._id === item._id)) {
            dispatch(setActivePlaylist(null));
            dispatch(setSelectedPlaylist(null));
          }
    }
    const setSelectedSingleSong = (item) => {
        dispatch(setSelectedSong(item));
    }

    return { setActiveSingleSong, setSelectedSingleSong };
}