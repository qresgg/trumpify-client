import styles from "./styles/playlistPage.module.scss";
import Song from "../../shared/fragments/song.fragment";

import { Play, Pause, Album } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLoadingSkeleton } from "../../shared/loaders/main.loading-skeleton";

import { useRef, useEffect, useState, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePlaybackControl } from "../../hooks/global/usePlaybackControl";
import { useTimeStamp } from "../../hooks/album/useTimeStamp";
import {useColorGrade} from "../../hooks/album/useColorGrade";
import {useDeviceDetect} from "../../hooks/global/useDeviceDetect";
import {usePlaylistLoader} from "../../hooks/loaders/usePlaylistLoader";
import {useLikeAlbum} from "../../hooks/global/actions/useLikeAlbum";

export default function PlaylistPage({ type }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const deviceType = useDeviceDetect();
    const timerRef = useRef(null);
    const state = useSelector((state) => state);

    const { loading, playlist, likeInit } = usePlaylistLoader(id, type);

    const dataRedux = useSelector((state) => state.data);
    const artist = useSelector((state) => state.data.artist);
    const selectedPlaylist = useSelector((state) => state.music.playlist.selectedPlaylist);
    const selectedSong = useSelector((state) => state.music.song.selectedSong);

    // const [isLikedPlaylist, setIsLikedPlaylist] = useLikedPlaylist();
    const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, "album");
    const { colorGrade, getLightColor } = useColorGrade();

    const { day, month, year, fullDate } = useTimeStamp(selectedPlaylist?.created_at);

    //const [originArtist, setOriginArtist] = useState(false);

    const { isLiked, isLoading, toggleLike } = useLikeAlbum(
        id,
        selectedPlaylist?.is_liked
    );
    // TODO: ТРЕБА ЗРОБИТИ ЛОГІКУ ДЛЯ ЛАЙНУТИХ АЛЬБОМІВ

    useEffect(() => {
        const bill = async () => {
            const bg = await getLightColor()
            console.log(bg)
        }
        bill()
    }, [])

    useEffect(() => {
        console.log('Type playlist page: ', type);
    }, [selectedPlaylist, artist]);

    // useEffect(() => {
    //     console.log(selectedPlaylist)
    // }, [selectedPlaylist])

    if (loading || !selectedPlaylist) {
        return <MainLoadingSkeleton />;
    }

    return (
        <div className={styles['forYou']}>
            {!loading ? (
                <div className={styles['playlist']} style={deviceType === "mobile" && selectedSong ? {overflow: "hidden"} : {overflow: "scroll"}}>
                    <div className={styles['playlist__container']} style={colorGrade}>
                        <div className={styles['playlist__title']}>
                            <div className={styles['playlist__image']}>
                                {type === "default"
                                ? ( <div className={styles['playlist__customImg']}
                                         style={{
                                             backgroundImage: `url(${selectedPlaylist.cover})`,
                                         }}>
                                    </div>)
                                : (<div className={styles['playlist__img']}></div>)}
                            </div>
                            <div className={styles['playlist__info']}>
                                <div className={styles['playlist__type']}>{selectedPlaylist.type}</div>
                                <div className={styles['playlist__name']}>
                                    {selectedPlaylist.title}
                                </div>
                                <div className={styles['playlist__meta']}>
                                    <Link to={`/page/artist/${selectedPlaylist.artist}`} className="link-reset">
                                        <p className={styles['playlist__artist']}>
                                            {/*{originArtist ? "(You) " : ""}*/}
                                            {selectedPlaylist.artist_name || selectedPlaylist.user_name}
                                        </p>
                                    </Link>
                                    {type === "default" && (
                                        <p className={styles['playlist__year']}>• {year}</p>
                                    )}
                                    <p className={styles['playlist__songCount']}>
                                        • {selectedPlaylist?.songs?.length} songs, {" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['playlist__songs']}>
                        <div className={styles['playlist__nav']}>
                            <button className={styles['playlist__button--play']} onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>
                            {type === "default" && (
                                <div className={styles['playlist__button--like']} onClick={toggleLike}>
                                    {isLiked
                                        ? <div className={styles['playlist__button--like-icon--active']}></div>
                                        : <div className={styles['playlist__button--like-icon--inactive']}></div>}
                                </div>
                            )}
                        </div>
                        <div className={styles['playlist__songList']}>
                            <div className={styles['playlist__header']}>
                                <div className={styles['playlist__header-start']}>
                                    <div className={styles['playlist__header-id']}>#</div>
                                    <div className={styles['playlist__header-title']}>Title</div>
                                </div>
                                <div className={styles['playlist__header-end']}>
                                    <div className={styles['playlist__header-duration']}>Dur</div>
                                </div>
                            </div>
                            <div className={styles['playlist__songPlate']}>
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
                            {type === "default" && (
                                <div className={styles['playlist__footer']}>
                                    <div className={styles['playlist__releaseDate']}>
                                        {fullDate}
                                    </div>
                                    <div className={styles['playlist__recordLabel']}>
                                        © {year} {selectedPlaylist.record_label}.
                                    </div>
                                    <div className={styles['playlist__recordLabel']}>
                                        ℗ {year} {selectedPlaylist.record_label}.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles['playlist__empty']}>There is no playlist</div>
            )}
        </div>
    );
}
