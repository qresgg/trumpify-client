import styles from './song-snippet.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pause, Play} from 'lucide-react';
import {isMusicPlaying, togglePlayback, setSelectedSong, setActiveSong, setActivePlaylist} from "../../../lib/musicState";

export function Song({
    song,
    index,
}) {
    const dispatch = useDispatch();
    const [isHoovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isMusicPlaying, activePlaylist, activeSong, selectedSong, selectedPlaylist, activeSongId} = useSelector((state) => state.music);
    // const [likeSong, setLikedSong]

    // const likeSong = () => {

    // }

    useEffect(() => {
        if (activeSong === song && isMusicPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false)
        }
    }, [isMusicPlaying, activeSong, song]);

    const togglePlay = () => {
        dispatch(setActiveSong({song: song, index: index}));
        if (!activePlaylist) {
            dispatch(setActivePlaylist(selectedPlaylist));
        }

        if (isPlaying) {
            dispatch(togglePlayback());
        }
    }

    const handleSongClick = () => {
        togglePlay();
    };
    return (
        <div className={styles.song} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
            <div className={styles.song__id} onClick={handleSongClick}>
                {isHoovering ? (isPlaying ? <Pause size={20}/> : <Play size={20}/>) : <div>{index}</div>}
            </div>
            <div className={styles.song__title}>
                <div className={styles.song__title__name} style={{color: isPlaying ? '#3BE477' : 'white'}}>{song.title}</div>
                <div className={styles.song__title__artist}>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.song__like}>0</div>
                <div className={styles.song__duration}>
                    <div className={styles.song__duration__time}>
                        {song.duration}
                    </div>
                </div>
            </div>
        </div>
    )
}