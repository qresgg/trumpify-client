import styles from './aboutPlaylistPage.module.scss';
import { Song } from '../../snippets/song-snippet';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause } from 'lucide-react';
import { setSelectedSong, setActivePlaylist, togglePlayback, setActiveSong, setSelectedPlaylist, setNextSong, setPrevSong } from '../../../../lib/redux/music/musicState';
import ShowPage from '../../../../hooks/showPage';
import { fetchLikedCollection } from '../../../../services/user/fetchData/fetchLikedCollection';
import fetchColors from '../../../../utils/custom/colorPalette';
import Skeleton from 'react-loading-skeleton';
import { useLikedCollection } from '../../../../hooks/collection/useLikedCollection';
import { usePlaybackControl } from '../../../../hooks/global/usePlaybackControl';

export default function LikedSongsPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.data.user)
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(selectedPlaylist, 'album');
    const likedSongs = useLikedCollection();

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
        <div className={styles['foryou']}>
            <div className={styles['playlist']}>
                    <div className={styles['playlist__title']} style={{ background: `linear-gradient(to bottom,rgb(0, 102, 254),rgba(255, 251, 0, 0.6))` }}>
                        <div className={styles['playlist__title-container']}>
                            <div className={styles['playlist__image']} style={coverImg}></div>
                            <div className={styles['playlist__info']}>
                                <div className={styles['playlist__info-type']}>Collection</div>
                                <div className={styles['playlist__info-album-name']}>Liked Songs</div>
                                <div className={styles['playlist__info-meta']}>
                                    <p className={styles['playlist__track-count']} onClick={() => selectArtist(user.user_id)}>{user.user_name}</p>
                                    <p className={styles.trackCount}>• {user.user_likedSongsCount} songs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['playlist__tracks']}>
                        <div className={styles['playlist__nav']}>
                            <button className={styles['playlist__button--play']} onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>
                        </div>
                        <div className={styles['playlist__track-list']}>
                            <div className={styles['playlist__header']}>
                                <div className={styles['playlist__header-start']}>
                                    <div className={styles['playlist__header-id']}>#</div>
                                    <div className={styles['playlist__header-title']}>Name</div>
                                </div>
                                <div className={styles['playlist__header-end']}>
                                    <div className={styles['playlist__header-duration']}>Dur</div>
                                </div>
                            </div>
                            <div className={styles['playlist__track-plate']}>
                                {likedSongs.length > 0 ? (
                                    likedSongs.map((song, index) => (
                                        <div key={index} onClick={() => selectSong(song)}>
                                            <Song song={song} index={index} cover={true}/>
                                        </div>
                                    ))
                                ) : (
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <div className={styles['skeleton']} key={index}> 
                                            <div className={styles['skeleton__left-panel']}>
                                                <Skeleton width={36} height={36} baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                                {/* className={styles.skeleton__title} */}
                                                <div> 
                                                    <Skeleton width={Math.floor(Math.random() * 120) + 50} baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                                    <Skeleton width={Math.floor(Math.random() * 120) + 50} baseColor="#4B4B4B" highlightColor="#1ED760"/>
                                                </div>
                                            </div>
                                            <div className={styles['skeleton__right-panel']}>
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