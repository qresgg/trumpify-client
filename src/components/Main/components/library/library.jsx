import styles from "./library.module.scss";
import Playlist from "../../shared/Playlist-snippet";
import LikedSongsPlaylist from "../../shared/Likedsongs-snippet";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Library() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);

    return (
        <>
            <div className={styles['library']}>
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
                    <Link to={`/page/likedCollection/${user.user_liked_songs_id}`} className="link-reset"> 
                        <LikedSongsPlaylist />
                    </Link>
                    {user?.user_library?.map((playlist, index) => (
                        <div key={index}>
                            <Link to={`/page/album/${playlist._id}`} className="link-reset">
                                <Playlist playlist={playlist} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className={styles['resizer']} onMouseDown={onResize}></div> */}
        </>
    );
}
