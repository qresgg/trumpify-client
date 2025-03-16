import styles from './aboutPlaylistPage.module.scss';
import { Song } from '../../snippets/song-snippet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePalette } from 'react-palette';
import { REGEXP_IMAGEURL, REGEXP_COLLAB } from '../../../../lib/regexp';
import { Play, Pause } from 'lucide-react';
import { playPlaylist, pauseMusic, setActivePlaylist, playTrack, pauseTrack} from "../../../../lib/musicState";
import AlbumTrackInfo from "../../../../hooks/albumTrackInfo";

export function AboutPlaylistPage({ 
    selectedPlaylist, 
    onSelectSong, 
    id 
}) {
    const dispatch = useDispatch();
    const { activePlaylist, isMusicPlaying, activePlaylistIndex, activeTrackIndex, activeTrack} = useSelector((state) => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [totalDuration, setTotalDuration] = useState('');

    useEffect(() => {
        isMusicPlaying ? (activePlaylistIndex == selectedPlaylist._id ? setIsPlaying(true) : setIsPlaying(false)) : setIsPlaying(false);
    }, [activePlaylistIndex, isMusicPlaying, selectedPlaylist])

    const togglePlay = () => {
        if (isPlaying) {
            dispatch(pauseMusic());
        } else {
            dispatch(playPlaylist(id));
            if (activePlaylistIndex !== id) {
                dispatch(playTrack({ song: selectedPlaylist.tracks[0], index: 1 }));
            } else if (activeTrackIndex !== null) {
                dispatch(playTrack({ song: activeTrack, index: activeTrackIndex }));
            }
        }
    };

    const handlePlaylistClick = () => {
        dispatch(setActivePlaylist({ selectedPlaylist, id }));  
        togglePlay();
    };

    useEffect(() => {
        const totalDur = new AlbumTrackInfo(selectedPlaylist);
        setTotalDuration(totalDur.totalDuration);
    }, [selectedPlaylist]);

    const trackCount = selectedPlaylist ? selectedPlaylist.tracks.length : 0;
    const formattedArtist = selectedPlaylist ? selectedPlaylist.artist.replace(REGEXP_IMAGEURL, '').toLowerCase() : null;
    const formattedTitle = selectedPlaylist ? selectedPlaylist.title.replace(REGEXP_IMAGEURL, '').toLowerCase() : null;

    const urlImage = selectedPlaylist ? `/album-covers/${formattedArtist}_${formattedTitle}.jpg` : null;
    const { data, loading, error } = usePalette(urlImage);

    const albumCover = selectedPlaylist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};
    const backgroundGradient = selectedPlaylist ? {
        background: `linear-gradient(to bottom, ${data.lightMuted}, ${data.darkMuted})`
    } : {};
    return (
        <>
            <div className={styles.foryou}>
                {selectedPlaylist && (
                    <div className={styles.playlist}>
                        <div className={styles.playlist__title} style={backgroundGradient}>
                            <div className={styles.playlist__title__container}>
                                <div className={styles.image} style={albumCover}></div>
                                <div className={styles.info}>
                                    <div className={styles.info__type}>{selectedPlaylist.type}</div>
                                    <div className={styles.info__albumName}>{selectedPlaylist.title}</div>
                                    <div className={styles.info__otherInfo}>
                                        <p className={styles.artist}>{selectedPlaylist.artist}</p>
                                        <p className={styles.year}>• {selectedPlaylist.year} •</p>
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
                                    {selectedPlaylist.tracks.map((song, index) => (
                                        <div key={index} title={index + 1}  onClick={() => onSelectSong(song, albumCover)}>
                                            <Song song={song} index={index + 1} playlist={selectedPlaylist} id={id}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
