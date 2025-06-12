import styles from "./aboutPlaylistPage.module.scss";
import { Song } from "../../snippets/song-snippet";
import { useSelector, useDispatch } from "react-redux";
import { Play, Pause, Album } from "lucide-react";
import { setSelectedSong, setActivePlaylist } from "../../../../lib/redux/music/musicState";
import { redirectTo } from "../../../../services/global/functions/redirection";
import OnLikeAlbum from "../../../../services/global/functions/album/likeAlbumHandler";
import { useRef, useEffect, useState, use } from "react";
import { isOriginArtistPage } from "../../../../services/auth/isOriginPage";

import { useLikedPlaylist } from "../../../../hooks/album/useLikedPlaylist";
import { useGradient } from "../../../../hooks/album/useGradient";
import { usePlaylistDuration } from "../../../../hooks/album/usePlaylistDuration";
import { usePlaybackControl } from "../../../../hooks/global/usePlaybackControl";
import { useSongNavigation } from "../../../../hooks/album/useSongNavigation";
import { useTimeStamp } from "../../../../hooks/album/useTimeStamp";

export function AboutPlaylistPage() {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const dataRedux = useSelector((state) => state.data);
  const artist = useSelector((state) => state.data.artist);
  const [originArtist, setOriginArtist] = useState(false);
  const { activePlaylist, selectedPlaylist } = useSelector(
    (state) => state.music.playlist
  );
  const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, 'album');
  const totalDuration = usePlaylistDuration();
  const [isLikedPlaylist, setIsLikedPlaylist] = useLikedPlaylist();
  const gradient = useGradient();
  const handleSongState = useSongNavigation();
  const { day, month, year, fullDate} = useTimeStamp(selectedPlaylist.created_at)

  const selectSong = (song) => {
    dispatch(setSelectedSong(song));
  };

  useEffect(() => {
      setOriginArtist(isOriginArtistPage(artist?.artist_id, selectedPlaylist?.artist));
  }, [selectedPlaylist, artist])
  
  const trackCount = selectedPlaylist?.songs?.length || 0;

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
                    }>
                    {originArtist ? '(You) ' : ''}
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
              <div className={styles.tracks__endInfo}>
                <div className={styles.tracks__endInfo__releaseDate}>{fullDate}.</div>
                <div className={styles.tracks__endInfo__labelTitle}>© {year} {selectedPlaylist.record_label}.</div>
                <div className={styles.tracks__endInfo__labelTitle}>℗ {year} {selectedPlaylist.record_label}.</div>
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
