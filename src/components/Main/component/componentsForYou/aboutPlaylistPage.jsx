import styles from "./aboutPlaylistPage.module.scss";
import { Song } from "../../snippets/song-snippet";
import { useSelector, useDispatch } from "react-redux";
import { Play, Pause, Album } from "lucide-react";
import { setSelectedSong, setActivePlaylist } from "../../../../lib/redux/music/musicState";
import { redirectTo } from "../../../../services/global/functions/redirection";
import OnLikeAlbum from "../../../../services/global/functions/album/likeAlbumHandler";
import { useRef } from "react";

import { useLikedPlaylist } from "../../../../hooks/album/useLikedPlaylist";
import { useGradient } from "../../../../hooks/album/useGradient";
import { usePlaylistDuration } from "../../../../hooks/album/usePlaylistDuration";
import { usePlaybackControl } from "../../../../hooks/global/usePlaybackControl";
import { useSongNavigation } from "../../../../hooks/album/useSongNavigation";

export function AboutPlaylistPage() {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const dataRedux = useSelector((state) => state.data);
  const { activePlaylist, selectedPlaylist } = useSelector(
    (state) => state.music.playlist
  );
  const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, 'album');
  const totalDuration = usePlaylistDuration();
  const [isLikedPlaylist, setIsLikedPlaylist] = useLikedPlaylist();
  const gradient = useGradient();
  const handleSongState = useSongNavigation();

  const selectSong = (song) => {
    dispatch(setSelectedSong(song));
  };

  const trackCount = selectedPlaylist?.songs?.length || 0;
  const year = selectedPlaylist?.created_at
    ? new Date(selectedPlaylist.created_at).getFullYear()
    : "";

  return (
    <div className={styles.foryou}>
      {selectedPlaylist ? (
        <div className={styles.playlist}>
          <div
            className={styles.playlist__title}
            style={gradient}>
            <div className={styles.playlist__title__container}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${selectedPlaylist.cover})` }}
              ></div>
              <div className={styles.info}>
                <div className={styles.info__type}>{selectedPlaylist.type}</div>
                <div className={styles.info__albumName}>
                  {selectedPlaylist.title}
                </div>
                <div className={styles.info__otherInfo}>
                  <p
                    className={styles.artist}
                    onClick={() =>
                      redirectTo("Artist", selectedPlaylist.artist, dispatch)
                    }
                  >
                    {selectedPlaylist.artist_name}
                  </p>
                  <p className={styles.year}>• {year} •</p>
                  <p className={styles.trackCount}>{trackCount} songs, {totalDuration} </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.playlist__tracks}>
            <div className={styles.nav}>
              <button className={styles.button__play} onClick={togglePlay}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <div className={styles.button__like} onClick={() => OnLikeAlbum(selectedPlaylist, isLikedPlaylist, setIsLikedPlaylist, dispatch, dataRedux, timerRef)}>
                {isLikedPlaylist 
                  ? <div className={styles.liked}></div> 
                  : <div className={styles.notliked}></div>}
              </div>
            </div>
            <div className={styles.tracks}>
              <div className={styles.tabulation}>
                <div className={styles.tabulation__start}>
                  <div className={styles.tabulation__id}>#</div>
                  <div className={styles.tabulation__name}>Name</div>
                </div>
                <div className={styles.tabulation__end}>
                  <div className={styles.tabulation__duration}>Dur</div>
                </div>
              </div>
              <div className={styles.tracks__trackplate}>
                {trackCount > 0 ? (
                  selectedPlaylist.songs.map((song, index) => (
                    <div key={index} onClick={() => selectSong(song)}>
                      <Song
                        song={song}
                        index={index}
                        songPrevNext={handleSongState}
                      />
                    </div>
                  ))
                ) : (
                  <p>No songs available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>There is no playlist</div>
      )}
    </div>
  );
}
