import styles from "./aboutPlaylistPage.module.scss";
import { Song } from "../../snippets/song-snippet";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePalette } from "react-palette";
import { Play, Pause, Album } from "lucide-react";
import {
  setSelectedSong,
  setActivePlaylist,
  togglePlayback,
  setActiveSong,
  setPrevSong,
  setNextSong,
} from "../../../../lib/redux/music/musicState";
import AlbumTrackInfo from "../../../../hooks/albumTrackInfo";
import { redirectTo } from "../../../../services/global/functions/redirection";
import { getLikedSongs } from "../../../../services/user/Actions/userActionsService";
import OnLikeAlbum from "../../../../services/global/functions/album/likeAlbumHandler";
import { useRef } from "react";

export function AboutPlaylistPage() {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const dataRedux = useSelector((state) => state.data);
  const user = useSelector((state) => state.data.user);
  const { isMusicPlaying } = useSelector((state) => state.music);
  const { activePlaylist, selectedPlaylist } = useSelector(
    (state) => state.music.playlist
  );
  const { activeSong, selectedSong, prevSong } = useSelector(
    (state) => state.music.song
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLikedPlaylist, setIsLIkedPlaylist] = useState(false);
  
  useEffect(() => {
    if (user.user_library.some((playlist) => playlist._id === selectedPlaylist?._id)) {
      setIsLIkedPlaylist(true);
    } else {
      setIsLIkedPlaylist(false);
    }
  }, [selectedPlaylist, user.user_library]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (!selectedPlaylist?._id) return;
      try {
        const response = await getLikedSongs(selectedPlaylist._id);
        setLikedSongs(response.likedSongsInAlbum || []);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };
    fetchLikedSongs();
  }, [selectedPlaylist]);

  const handleSongState = (index) => {
    dispatch(setPrevSong(activePlaylist?.songs[index - 1]));
    dispatch(setNextSong(activePlaylist?.songs[index + 1]));
  };

  useEffect(() => {
    setIsPlaying(
      activePlaylist?._id === selectedPlaylist?._id && isMusicPlaying
    );
  }, [activePlaylist, isMusicPlaying, selectedPlaylist]);

  // useEffect(() => {
  //     if (selectedPlaylist) {
  //         const totalDur = new AlbumTrackInfo(selectedPlaylist);
  //         setTotalDuration(totalDur.totalDuration);
  //     }
  // }, [selectedPlaylist]);

  const togglePlay = () => {
    if (!selectedPlaylist?.songs?.length) return;
    dispatch(setActivePlaylist(selectedPlaylist));
    if (isPlaying) {
      dispatch(togglePlayback());
    }
  };

  const selectSong = (song) => {
    dispatch(setSelectedSong(song));
  };

  const trackCount = selectedPlaylist?.songs?.length || 0;
  const year = selectedPlaylist?.created_at
    ? new Date(selectedPlaylist.created_at).getFullYear()
    : "";
  const { data } = usePalette(selectedPlaylist?.cover || "");

  return (
    <div className={styles.foryou}>
      {selectedPlaylist ? (
        <div className={styles.playlist}>
          <div
            className={styles.playlist__title}
            style={{
              background: `linear-gradient(to bottom, ${data.lightVibrant}, ${data.darkMuted})`,
            }}>
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
                  <p className={styles.trackCount}>{trackCount} songs </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.playlist__tracks}>
            <div className={styles.nav}>
              <button className={styles.button__play} onClick={togglePlay}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <div className={styles.button__like} onClick={() => OnLikeAlbum(selectedPlaylist, isLikedPlaylist, setIsLIkedPlaylist, dispatch, dataRedux, timerRef)}>
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
