import styles from './aboutPlaylistPage.module.scss';
import { Song } from '../../snippets/song-snippet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePalette } from 'react-palette';
import { Play, Pause } from 'lucide-react';
import { setSelectedSong, setActivePlaylist, togglePlayback, setActiveSong, setSelectedPlaylist } from '../../../../lib/redux/music/musicState';
import AlbumTrackInfo from '../../../../hooks/albumTrackInfo';
import ShowPage from '../../../../hooks/showPage';
import { fetchLikedCollection } from '../../../../services/user/fetchData/fetchLikedCollection';

export function LikedSongsPage() {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylist, activeSong, selectedPlaylist } = useSelector(state => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [totalDuration, setTotalDuration] = useState('');
    const [likedSongs, setLikedSongs] = useState([]);
    const user = useSelector(state => state.data.user)

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
        setIsPlaying(activePlaylist === selectedPlaylist && isMusicPlaying);
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
    const { data } = usePalette("/likedsongs.png");

    return (
        <div className={styles.foryou}>
            <div className={styles.playlist}>
                    <div className={styles.playlist__title} style={{ background: `linear-gradient(to bottom, ${data.lightVibrant}, ${data.darkMuted})` }}>
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
                                            <Song song={song} index={index + 1} claim={true}/>
                                        </div>
                                    ))
                                ) : (
                                    <p>No songs available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}