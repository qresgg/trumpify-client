import styles from "./library.module.scss";
import { LikedSongsPlaylist } from "../snippets/likedsongs-snippet";
import { Playlist } from "../snippets/playlist-snippet";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../lib/redux/pages/viewSlice";
import { setSelectedPlaylist } from "../../../lib/redux/music/musicState";
import { redirectPlaylist, redirectPage } from "../../../services/global/functions/redirection";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToLoadedOne } from "../../../lib/redux/data/loadedSlice";

export default function Library({ width, onResize }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);

    return (
        <>
            <div className={styles['library']} style={{ width: `${width}px` }}>
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
                <div className={styles['library__playlists']}>
                    <div onClick={() => redirectPage("likedSongs", dispatch)}>
                        <LikedSongsPlaylist />
                    </div>
                    {user?.user_library?.map((playlist, index) => (
                        <Link to={`/page/album/${playlist._id}`} className="link-reset">
                          <div key={index}>
                            <Playlist playlist={playlist} libWidth={width} />
                          </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles['resizer']} onMouseDown={onResize}></div>
        </>
    );
}
