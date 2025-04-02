import styles from './song-snippet.module.scss'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pause, Play} from 'lucide-react';
import { togglePlayback, setSelectedSong, setActiveSong, setActivePlaylist} from "../../../lib/redux/music/musicState";
import { likeSong, unLikeSong } from '../../../services/user/Actions/userActionsService';
import { setData } from '../../../lib/redux/data/dataSlice';
import { updateLikedSongsCount } from '../../../services/global/functions';

export function Song({
    song,
    index,
    claim
}) {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { isMusicPlaying, activePlaylist, activeSong, selectedSong, selectedPlaylist } = useSelector((state) => state.music);
    const data = useSelector((state) => state.data)
    const [likedSong, setLikedSong] = useState(false)
    const timerRef = useRef(null);
    useEffect(() => {
        setLikedSong(claim)
    }, [selectedPlaylist, claim])

    const OnLikeSong = async () => {
        clearTimeout(timerRef.current);
        
        const prevLikeRef = likedSong;
        const newLikeState = !likedSong;
        setLikedSong(newLikeState);
    
        timerRef.current = setTimeout(async () => {
            try {
                const response = prevLikeRef 
                ? await unLikeSong(song) 
                : await likeSong(song);
                updateLikedSongsCount(dispatch, data.user, data.artist, response.likedSongs)
            } catch (error) {
                console.error(error.response ? error.response.data : error);
            }
        }, 1200);
    };
    
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
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
            <div className={styles.song__id} onClick={handleSongClick}>
                {isHover ? (isPlaying ? <Pause size={20}/> : <Play size={20}/>) : <div>{index}</div>}
            </div>
            <div className={styles.song__title}>
                <div className={styles.song__title__name} style={{color: isPlaying ? '#3BE477' : 'white' }}>{song.title}</div>
                <div className={styles.song__title__artist}>
                    {song.features.map((feat) => feat.name).join(', ')}
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.song__like} onClick={OnLikeSong}>
                    {likedSong 
                    ? <div className={styles.liked}></div> 
                    : <div className={styles.notliked}></div>}
                </div>
                <div className={styles.song__duration}>
                    <div className={styles.song__duration__time}>
                        {song.duration}
                    </div>
                </div>
            </div>
        </div>
    )
}