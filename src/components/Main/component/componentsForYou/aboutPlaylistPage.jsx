import styles from './aboutPlaylistPage.module.scss';
import { Song } from '../../snippets/song-snippet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePalette } from 'react-palette';
import { Play, Pause } from 'lucide-react';
import { setSelectedSong, setActivePlaylist, togglePlayback, setActiveSong } from '../../../../lib/musicState';
import AlbumTrackInfo from '../../../../hooks/albumTrackInfo';
import { setSelectedArtistPage } from '../../../../lib/viewSlice';
import ShowPage from '../../../../hooks/showPage';
import { getLikedSongs } from '../../../../services/userActionsService';

export function AboutPlaylistPage({ id }) {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylist, activeSong, selectedPlaylist } = useSelector(state => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [totalDuration, setTotalDuration] = useState('');
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        console.log(likedSongs)
    }, [likedSongs])

    useEffect(() => {
        const fetchLikedSongs = async () => {
            if (!selectedPlaylist?._id) return;
            try {
                const response = await getLikedSongs(selectedPlaylist._id);
                console.log(response)
                setLikedSongs(response.likedSongsInAlbum || []);
            } catch (error) {
                console.error("Error fetching liked songs:", error);
            }
        };
        fetchLikedSongs();
    }, [selectedPlaylist]);

    useEffect(() => {
        setIsPlaying(activePlaylist === selectedPlaylist && isMusicPlaying);
    }, [activePlaylist, isMusicPlaying, selectedPlaylist]);

    useEffect(() => {
        if (selectedPlaylist) {
            const totalDur = new AlbumTrackInfo(selectedPlaylist);
            setTotalDuration(totalDur.totalDuration);
        }
    }, [selectedPlaylist]);

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

    const trackCount = selectedPlaylist?.songs?.length || 0;
    const year = selectedPlaylist?.created_at ? new Date(selectedPlaylist.created_at).getFullYear() : '';
    const { data } = usePalette(selectedPlaylist?.cover || '');

    return (
        <div className={styles.foryou}>
            {selectedPlaylist ? (
                <div className={styles.playlist}>
                    <div className={styles.playlist__title} style={{ background: `linear-gradient(to bottom, ${data.lightMuted}, ${data.darkMuted})` }}>
                        <div className={styles.playlist__title__container}>
                            <div className={styles.image} style={{ backgroundImage: `url(${selectedPlaylist.cover})` }}></div>
                            <div className={styles.info}>
                                <div className={styles.info__type}>{selectedPlaylist.type}</div>
                                <div className={styles.info__albumName}>{selectedPlaylist.title}</div>
                                <div className={styles.info__otherInfo}>
                                    <p className={styles.artist} onClick={() => selectArtist(selectedPlaylist.artist)}>{selectedPlaylist.artist_name}</p>
                                    <p className={styles.year}>• {year} •</p>
                                    <p className={styles.trackCount}>{trackCount} songs, {totalDuration}</p>
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
                                {trackCount > 0 ? (
                                    selectedPlaylist.songs.map((song, index) => {
                                        const isLiked = likedSongs.some(likedSong => likedSong === song._id);
                                        return (
                                            <div key={index} onClick={() => selectSong(song)}>
                                                <Song song={song} index={index + 1} claim={isLiked ? true : false} />
                                            </div>
                                        )
                                        })
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