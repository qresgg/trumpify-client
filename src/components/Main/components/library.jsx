import styles from "./styles/library.module.scss";
import Playlist from "../../../shared/fragments/playlist.fragment";
import LikedSongsPlaylist from "../../../shared/fragments/likedSongs.fragment";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {toggleLibraryState} from "../../../lib/redux/pages/viewSlice";

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);
    const libraryState = useSelector((state) => state.view.mobileStates.library);

    return (
        <>
            <div className={styles['library']} style={{ display: libraryState ? 'block' : 'none'}}>
                <div className={styles['library__header']}>
                    <div className={styles['library__title']}>
                        <div className={styles['library__media']}>
                            <div className={styles['library__media-icon']}></div>
                            <div className={styles['library__media-title']}>Your Library</div>
                        </div>
                        <div className={styles['library__playlist-new']}></div>
                        <div className={styles['library__resize-max']}></div>
                    </div>
                    <div className={styles['library__tags']}></div>
                </div>
                <div className={styles['library__playlists']} onClick={() => dispatch(toggleLibraryState(false))}>
                    <Link to={`/page/collection/liked/${user.user_library}`} className="link-reset">
                        <LikedSongsPlaylist />
                    </Link>
                    {/*{user?.user_library?.map((playlist, index) => (*/}
                    {/*    <div key={index}>*/}
                    {/*        <Link to={`/page/album/${playlist._id}`} className="link-reset">*/}
                    {/*            <Playlist playlist={playlist} />*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
            </div>
            {/* <div className={styles['resizer']} onMouseDown={onResize}></div> */}
        </>
    );
}
