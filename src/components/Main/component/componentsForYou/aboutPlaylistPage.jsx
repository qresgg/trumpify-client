import styles from "./aboutPlaylistPage.module.scss";
import { Song } from "../../snippets/song-snippet";
import { Play, Pause, Album } from "lucide-react";
import { setSelectedPlaylist } from "../../../../lib/redux/music/musicState";
import { redirectTo } from "../../../../services/global/functions/redirection";
import OnLikeAlbum from "../../../../services/global/functions/album/likeAlbumHandler";
import { isOriginArtistPage } from "../../../../services/auth/isOriginPage";
import { Link } from "react-router-dom";
import { MainContainerSkeleton } from "../../Loadings/mainContainer-skeleton";

import getAlbumById from "../../../../services/artist/data/get/albumById";
import { selectAlbumById, albumAdded } from "../../../../lib/redux/data/albumSlice";
import { findContent } from "../../../../services/search/findService";

import { useRef, useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLikedPlaylist } from "../../../../hooks/album/useLikedPlaylist";
import { useGradient } from "../../../../hooks/album/useGradient";
import { usePlaylistDuration } from "../../../../hooks/album/usePlaylistDuration";
import { usePlaybackControl } from "../../../../hooks/global/usePlaybackControl";
import { useTimeStamp } from "../../../../hooks/album/useTimeStamp";
import { addToLoadedOne } from "../../../../lib/redux/data/loadedSlice";

export function AboutPlaylistPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const albums = useSelector((state) => state.loaded.albums);

    const dataRedux = useSelector((state) => state.data);
    const artist = useSelector((state) => state.data.artist);
    const selectedPlaylist = useSelector((state) => state.music.playlist.selectedPlaylist);

    const timerRef = useRef(null);
    const [originArtist, setOriginArtist] = useState(false);

    const [isLikedPlaylist, setIsLikedPlaylist] = useLikedPlaylist();
    const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, "album");
    const { day, month, year, fullDate } = useTimeStamp(selectedPlaylist?.created_at);
    const totalDuration = usePlaylistDuration();
    const gradient = useGradient();

    const fetchAlbum = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await findContent("Album", id);
        dispatch(setSelectedPlaylist(res));
        dispatch(addToLoadedOne({ type: "album", value: res}));
      } catch (err) {
        console.error("Album fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      const album = albums?.find(album => album._id === id);
      if (album) {
        dispatch(setSelectedPlaylist(album));
        setLoading(false);
      } else {
        fetchAlbum();
      }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedPlaylist && artist) {
            setOriginArtist(isOriginArtistPage(artist, selectedPlaylist));
        }
    }, [selectedPlaylist, artist]);

    if (loading || !selectedPlaylist) {
        return <MainContainerSkeleton />;
    }

    return (
        <div className={styles.foryou}>
            {!loading ? (
                <div className={styles.playlist}>
                    <div className={styles.playlist__title} style={gradient}>
                        <div className={styles.playlist__title__container}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${selectedPlaylist.cover})`,
                                }}
                            ></div>
                            <div className={styles.info}>
                                <div className={styles.info__type}>{selectedPlaylist.type}</div>
                                <div className={styles.info__albumName}>
                                    {selectedPlaylist.title}
                                </div>
                                <div className={styles.info__otherInfo}>
                                    <Link to={`/page/artist/${selectedPlaylist.artist}`} className="link-reset">
                                      <p className={styles.artist}>
                                        {originArtist ? "(You) " : ""}
                                        {selectedPlaylist.artist_name}
                                      </p>
                                    </Link>
                                    <p className={styles.year}>• {year} •</p>
                                    <p className={styles.trackCount}>
                                        {selectedPlaylist?.songs?.length} songs, {totalDuration}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.playlist__tracks}>
                        <div className={styles.nav}>
                            <button className={styles.button__play} onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>
                            <div
                                className={styles.button__like}
                                onClick={() =>
                                    OnLikeAlbum(
                                        selectedPlaylist,
                                        isLikedPlaylist,
                                        setIsLikedPlaylist,
                                        dispatch,
                                        dataRedux,
                                        timerRef
                                    )
                                }
                            >
                                {isLikedPlaylist ? (
                                    <div className={styles.liked}></div>
                                ) : (
                                    <div className={styles.notliked}></div>
                                )}
                            </div>
                        </div>
                        <div className={styles.tracks}>
                            <div className={styles.tabulation}>
                                <div className={styles.tabulation__start}>
                                    <div className={styles.tabulation__id}>#</div>
                                    <div className={styles.tabulation__name}>Title</div>
                                </div>
                                <div className={styles.tabulation__end}>
                                    <div className={styles.tabulation__duration}>Dur</div>
                                </div>
                            </div>
                            <div className={styles.tracks__trackplate}>
                                {selectedPlaylist?.songs?.length > 0 ? (
                                    selectedPlaylist.songs.map((song, index) => (
                                        <div key={index}>
                                            <Song song={song} index={index} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No songs available</p>
                                )}
                            </div>
                            <div className={styles.tracks__endInfo}>
                                <div className={styles.tracks__endInfo__releaseDate}>
                                    {fullDate}
                                </div>
                                <div className={styles.tracks__endInfo__labelTitle}>
                                    © {year} {selectedPlaylist.record_label}.
                                </div>
                                <div className={styles.tracks__endInfo__labelTitle}>
                                    ℗ {year} {selectedPlaylist.record_label}.
                                </div>
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
