import styles from './aboutPlaylistPage.module.scss';
import { Song } from '../../snippets/song-snippet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePalette } from 'react-palette';
import { REGEXP_IMAGEURL, REGEXP_COLLAB } from '../../../../lib/regexp';
import { Play, Pause } from 'lucide-react';
import { setSelectedSong, setActivePlaylist, togglePlayback, setActiveSong } from '../../../../lib/musicState';
//import { playPlaylist, pauseMusic, setActivePlaylist, playTrack, pauseTrack, setSelectedSong} from "../../../../lib/musicState";
import AlbumTrackInfo from "../../../../hooks/albumTrackInfo";

export function AboutPlaylistPage({ 
    id 
}) {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylist, activeTrackIndex, activeSong, selectedPlaylist, activeSongId} = useSelector((state) => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [totalDuration, setTotalDuration] = useState('');

    // useEffect(() => {
    //     isMusicPlaying ? (activePlaylistIndex == selectedPlaylist._id ? setIsPlaying(true) : setIsPlaying(false)) : setIsPlaying(false);
    // }, [activePlaylistIndex, isMusicPlaying, selectedPlaylist])

    useEffect(() => {
        if (activePlaylist === selectedPlaylist && isMusicPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false)
        }
    }, [activePlaylist, isMusicPlaying, selectedPlaylist]);

    const togglePlay = () => {
        dispatch(setActivePlaylist( selectedPlaylist ));  
        if (isPlaying) {
            dispatch(togglePlayback());
        }
        
        if (activePlaylist !== selectedPlaylist && selectedPlaylist?.songs?.length > 0) {
            dispatch(setActiveSong({ song: selectedPlaylist.songs[0], index: 1 }));
        }
    };

    const handlePlaylistClick = () => {
        togglePlay();
    };

    const selectSong = (song) => {
        dispatch(setSelectedSong(song));
    }

    useEffect(() => {
        const totalDur = new AlbumTrackInfo(selectedPlaylist);
        setTotalDuration(totalDur.totalDuration);
    }, [selectedPlaylist]);

    const trackCount = selectedPlaylist ? selectedPlaylist.songs.length : 0;
    const year = new Date(selectedPlaylist.created_at).getFullYear();

    const { data, loading, error } = usePalette(selectedPlaylist.cover);

    const backgroundGradient = selectedPlaylist ? {
        background: `linear-gradient(to bottom, ${data.lightMuted}, ${data.darkMuted})`
    } : {};
    const albumCover = selectedPlaylist && {
        backgroundImage: `url(${selectedPlaylist.cover})`
    }
    return (
        <>
            <div className={styles.foryou}>
                {selectedPlaylist ? (
                    <div className={styles.playlist}>
                        <div className={styles.playlist__title} style={backgroundGradient}>
                            <div className={styles.playlist__title__container}>
                                <div className={styles.image} style={albumCover}></div>
                                <div className={styles.info}>
                                    <div className={styles.info__type}>{selectedPlaylist.type}</div>
                                    <div className={styles.info__albumName}>{selectedPlaylist.title}</div>
                                    <div className={styles.info__otherInfo}>
                                        <p className={styles.artist}>{selectedPlaylist.artist_name}</p>
                                        <p className={styles.year}>• {year} •</p>
                                        <p className={styles.trackCount}>{trackCount} songs, {totalDuration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.playlist__tracks}>
                            <div className={styles.nav}>
                                <button className={styles.button__play} onClick={handlePlaylistClick}>
                                    <div className={styles.play__ico}>
                                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                                    </div>
                                </button>
                                <button></button>
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
                                {selectedPlaylist?.songs?.length > 0 ? (
                                    selectedPlaylist.songs.map((song, index) => (
                                        <div key={index} title={index + 1} onClick={() => selectSong(song)}>
                                            <Song song={song} index={index + 1} playlist={selectedPlaylist} id={id}/>
                                        </div>
                                    ))
                                    ) : (
                                    <p>No songs available</p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                ) : <div>НЕМА ПЛЕЙЛИСТА</div>}
            </div>
        </>
    );
}
