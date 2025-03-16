import styles from './song-snippet.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pause, Play} from 'lucide-react';
import { playPlaylist, pauseMusic, isMusicPlaying, setActiveTrack, activePlaylistIndex, setSelectedSong} from "../../../lib/musicState";

export function Song({
    song,
    index,
    playlist,
    id,
    onSelectSong
}) {
    const dispatch = useDispatch();
    const [isHoovering, setIsHovering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isMusicPlaying, activeTrackIndex, activePlaylistIndex, selectedSong} = useSelector((state) => state.music);

    useEffect(() => {
        if(isMusicPlaying){
            if(activePlaylistIndex == id && activeTrackIndex == index){
                setIsPlaying(true) 
            } else{
                setIsPlaying(false)
            }
        } else {
            setIsPlaying(false)
        }
    }, [activePlaylistIndex, id, isMusicPlaying]);

    useEffect(() => {
        if(activeTrackIndex != index){
            setIsPlaying(false);
        } 
    })
    const togglePlay = () => {
        if (isPlaying) {
            dispatch(pauseMusic());
        } else {
            dispatch(playPlaylist(id));
        }
        setIsPlaying(!isPlaying);
    }

    const handleSongClick = () => {
        dispatch(setActiveTrack({ index: index, song: song, id: id}));
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
                    <p><span>E</span>{song.featuring.map((feat) => feat.artist).join(', ')}</p>
                </div>
            </div>
            <div className={styles.song__duration}>
                <div className={styles.song__duration__time}>
                    {song.duration}
                </div>
            </div>
        </div>
    )
}