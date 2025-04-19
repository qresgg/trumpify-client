import styles from './aboutPlaylistPage.module.scss';
import { Song } from '../../snippets/song-snippet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause } from 'lucide-react';
import { setSelectedSong, setActivePlaylist, togglePlayback, setActiveSong, setSelectedPlaylist, setNextSong, setPrevSong } from '../../../../lib/redux/music/musicState';
import AlbumTrackInfo from '../../../../hooks/albumTrackInfo';
import ShowPage from '../../../../hooks/showPage';
import { fetchLikedCollection } from '../../../../services/user/fetchData/fetchLikedCollection';
import fetchColors from '../../../../hooks/global/colorPalette';
import Skeleton from 'react-loading-skeleton';

export function LikedSongsPage() {
    const dispatch = useDispatch();
    const { isMusicPlaying } = useSelector(state => state.music);
    const { activePlaylist, selectedPlaylist } = useSelector(state => state.music.playlist);
    const { selectedSong, activeSong } = useSelector(state => state.music.song);

    const [isPlaying, setIsPlaying] = useState(false);
    const [totalDuration, setTotalDuration] = useState('');
    const [likedSongs, setLikedSongs] = useState([]);
    const user = useSelector(state => state.data.user)

    const handleSongState = (index) => {
    }
    const playlist = useSelector((state) => state.user?.user_likedCollection)

    useEffect(() => {
        const fetchLiked = async () => {
            try{
                const response = await fetchLikedCollection();
                setLikedSongs(response.songs);
                dispatch(setSelectedPlaylist(response));
            } catch (error) {
                console.error(error);
                setLikedSongs([]);
            }
        }
        fetchLiked();
    }, []);

    useEffect(() => {
        setIsPlaying(activePlaylist?._id === selectedPlaylist?._id && isMusicPlaying);
    }, [activePlaylist, isMusicPlaying, selectedPlaylist]);

    const togglePlay = () => {
        if (!selectedPlaylist?.songs?.length) return;
        dispatch(setActivePlaylist(selectedPlaylist));
        if (isPlaying) {
            dispatch(togglePlayback());
        } else {
            dispatch(setActiveSong({ song: selectedPlaylist.songs[0], index: 1 }));
        }
    };

    const selectSong = (song) => {
        dispatch(setSelectedSong(song));
    };

    const selectArtist = (artistId) => {
        ShowPage('artist-profile', artistId, dispatch);
    };
    
    const coverImg = {
        backgroundImage: 'url("/likedsongs.png")'
    }

    return (
        <div className={styles.foryou}>
            <div className={styles.playlist}>
                    <div className={styles.playlist__title} style={{ background: `linear-gradient(to bottom,rgb(0, 102, 254),rgba(255, 251, 0, 0.6))` }}>
                        <div className={styles.playlist__title__container}>
                            <div className={styles.image} style={coverImg}></div>
                            <div className={styles.info}>
                                <div className={styles.info__type}>Collection</div>
                                <div className={styles.info__albumName}>Liked Songs</div>
                                <div className={styles.info__otherInfo}>
                                    <p className={styles.artist} onClick={() => selectArtist(user.user_id)}>{user.user_name}</p>
                                    <p className={styles.trackCount}>• {user.user_likedSongsCount} songs{totalDuration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.playlist__tracks}>
                        <div className={styles.nav}>
                            <button className={styles.button__play} onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>
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
                                {likedSongs.length > 0 ? (
                                    likedSongs.map((song, index) => (
                                        <div key={index} onClick={() => selectSong(song)}>
                                            <Song song={song} index={index} songPrevNext={() => handleSongState} cover={true}/>
                                        </div>
                                    ))
                                ) : (
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <div className={styles.skeleton} key={index}> 
                                            <div className={styles.skeleton__leftPanel}>
                                                <Skeleton width={36} height={36} baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                                <div className={styles.skeleton__title}>
                                                    <Skeleton width={Math.floor(Math.random() * 120) + 50} baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                                    <Skeleton width={Math.floor(Math.random() * 120) + 50} baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                                </div>
                                            </div>
                                            <div className={styles.skeleton__rightPanel}>
                                                <Skeleton baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}