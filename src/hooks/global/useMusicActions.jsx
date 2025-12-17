import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { musicPlayer } from "../../lib/redux/music/musicState";

export const useMusicActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(musicPlayer, dispatch);
};
