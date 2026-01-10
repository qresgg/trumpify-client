import styles from "../footer.module.scss";
import {ActiveSong} from "./activeSong";
import {SongController} from "../../../shared/controllers/song.controller";
import {Link} from "react-router-dom";
import {musicPlayer} from "../../../lib/redux/music/musicState";
import {useMusicActions} from "../../../hooks/global/useMusicActions";
import {useDispatch, useSelector} from "react-redux";
import {toggleLibraryState, toggleSongInfoState} from "../../../lib/redux/pages/viewSlice";

export function NavPanelFooter() {
    const dispatch = useDispatch();
    const musicPlayer = useMusicActions();
    const libState = useSelector((state) => state.view.mobileStates.library);

    const openLibrary = () => {
        dispatch(toggleLibraryState());
    }
    const closeOtherTabs = () => {
        dispatch(toggleLibraryState(false));
        musicPlayer.closeSelectedSong();
        musicPlayer.closeSelectedPlaylist();
    }

    return (
        <div className={styles['navPanel']}>
            <Link to="/" className='link-reset' onClick={() => closeOtherTabs()}>
                <div className={styles['navPanel__home']}>
                    <div className={styles['navBar__home--icon']}>Home</div>
                </div>
            </Link>
            <div className={'color-white'}>
                Search
            </div>
            <div className={'color-white'} onClick={() => openLibrary()}>
                Your Library
            </div>
        </div>
    )
}