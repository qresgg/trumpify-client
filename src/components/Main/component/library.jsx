import styles from "./library.module.scss";
import { LikedSongsPlaylist } from "../snippets/likedsongs-snippet";
import { Playlist } from "../snippets/playlist-snippet";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../lib/redux/pages/viewSlice";
import { setSelectedPlaylist } from "../../../lib/redux/music/musicState";
import {
  redirectPlaylist,
  redirectPage,
} from "../../../services/global/functions/redirection";
import { useEffect } from "react";

export function Library({ width, onResize }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);

  return (
    <>
      <div className={styles.library} style={{ width: `${width}px` }}>
        <div className={styles.library__tags}>
          <div className={styles.title}>
            <div className={styles.mediatek}>
              <div className={styles.mediatek__icon}></div>
              <div className={styles.mediatek__title}>Your Library</div>
            </div>
            <div className={styles.new__playlist}></div>
            <div className={styles.max__resize}></div>
          </div>
          <div className={styles.tag}></div>
        </div>
        <div className={styles.library__playlists}>
          <div onClick={() => redirectPage("likedSongs", dispatch)}>
            <LikedSongsPlaylist />
          </div>
          {user?.user_library?.map((playlist, index) => (
            <div
              onClick={() => redirectPlaylist(playlist, "playlist", dispatch)}
              key={index}
            >
              <Playlist playlist={playlist} libWidth={width} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.resizer} onMouseDown={onResize}></div>
    </>
  );
}