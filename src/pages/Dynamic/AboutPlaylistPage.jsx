import styles from "./aboutPlaylistPage.module.scss";
import Song from "../../components/Main/shared/Song-snippet";

import { Play, Pause, Album } from "lucide-react";
import { setSelectedPlaylist } from "../../lib/redux/music/musicState";
import OnLikeAlbum from "../../services/handlers/handleLikeAlbum";
import { isOriginArtistPage } from "../../utils/helpful/getOriginPage";
import { Link } from "react-router-dom";
import { MainContainerSkeleton } from "../../components/Main/loadings/mainContainer-skeleton";

import getAlbumById from "../../services/artist/queries/getAlbumById";
import { selectAlbumById, albumAdded } from "../../lib/redux/data/albumSlice";
import { findContent } from "../../services/search/searchService";

import { useRef, useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLikedPlaylist } from "../../hooks/album/useLikedPlaylist";
import { useGradient } from "../../hooks/album/useGradient";
import { usePlaylistDuration } from "../../hooks/album/usePlaylistDuration";
import { usePlaybackControl } from "../../hooks/global/usePlaybackControl";
import { useTimeStamp } from "../../hooks/album/useTimeStamp";
import { addToLoadedOne } from "../../lib/redux/data/loadedSlice";

export default function AboutPlaylistPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const albums = useSelector((state) => state.loaded.clearableData.albums);

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
      const album = albums?.find(album => album.data._id === id);
      if (album) {
        dispatch(setSelectedPlaylist(album.data));
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

    // useEffect(() => {
    //     console.log(selectedPlaylist)
    // }, [selectedPlaylist])

    if (loading || !selectedPlaylist) {
        return <MainContainerSkeleton />;
    }

    return (
        <div className={styles['foryou']}>
            {!loading ? (
                <div className={styles['playlist']}>
                    <div className={styles['playlist__title']} style={gradient}>
                        <div className={styles['playlist__title-container']}>
                            <div className={styles['playlist__image']}
                                style={{
                                    backgroundImage: `url(${selectedPlaylist.cover})`,
                                }}>
                            </div>
                            <div className={styles['playlist__info']}>
                                <div className={styles['playlist__info-type']}>{selectedPlaylist.type}</div>
                                <div className={styles['playlist__info-album-name']}>
                                    {selectedPlaylist.title}
                                </div>
                                <div className={styles['playlist__info-meta']}>
                                    <Link to={`/page/artist/${selectedPlaylist.artist}`} className="link-reset">
                                      <p className={styles['playlist__artist']}>
                                        {/*{originArtist ? "(You) " : ""}*/}
                                        {selectedPlaylist.artist_name}
                                      </p>
                                    </Link>
                                    <p className={styles['playlist__year']}>• {year} •</p>
                                    <p className={styles['playlist__track-count']}>
                                        {selectedPlaylist?.songs?.length} songs, {totalDuration}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['playlist__tracks']}>
                        <div className={styles['playlist__nav']}>
                            <button className={styles['playlist__button--play']} onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>
                            <div className={styles['playlist__button--like']} onClick={() => OnLikeAlbum({
                                    album: selectedPlaylist,
                                    likedAlbum: isLikedPlaylist,
                                    setLikedAlbum: setIsLikedPlaylist,
                                    dispatch,
                                    data: dataRedux,
                                    timerRef
                                })
                                }
                            >
                                {isLikedPlaylist ? (
                                    <div className={styles['playlist__button--like-icon--active']}></div>
                                ) : (
                                    <div className={styles['playlist__button--like-icon--inactive']}></div>
                                )}
                            </div>
                        </div>
                        <div className={styles['playlist__track-list']}>
                            <div className={styles['playlist__header']}>
                                <div className={styles['playlist__header-start']}>
                                    <div className={styles['playlist__header-id']}>#</div>
                                    <div className={styles['playlist__header-title']}>Title</div>
                                </div>
                                <div className={styles['playlist__header-end']}>
                                    <div className={styles['playlist__header-duration']}>Dur</div>
                                </div>
                            </div>
                            <div className={styles['playlist__track-plate']}>
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
                            <div className={styles['playlist__footer']}>
                                <div className={styles['playlist__footer-release-date']}>
                                    {fullDate}
                                </div>
                                <div className={styles['playlist__footer-label']}>
                                    © {year} {selectedPlaylist.record_label}.
                                </div>
                                <div className={styles['playlist__footer-label']}>
                                    ℗ {year} {selectedPlaylist.record_label}.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles['playlist--empty']}>There is no playlist</div>
            )}
        </div>
    );
}
