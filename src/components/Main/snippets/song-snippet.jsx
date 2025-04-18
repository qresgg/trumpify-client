import styles from './song-snippet.module.scss'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pause, Play} from 'lucide-react';
import { togglePlayback, setSelectedSong, setActiveSong, setActivePlaylist} from "../../../lib/redux/music/musicState";
import OnLikeSong from '../../../services/global/functions/song/likeSongHandler';
import likeChecker from '../../../services/global/functions/song/likeChecker';

export function Song({
    song,
    index,
    songPrevNext,
    cover = false
}) {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const { isMusicPlaying } = useSelector((state) => state.music);
    const { activePlaylist, selectedPlaylist } = useSelector((state) => state.music.playlist);
    const { activeSong, selectedSong, prevSong } = useSelector((state) => state.music.song);

    const data = useSelector((state) => state.data)
    const [likedSong, setLikedSong] = useState(false)
    const timerRef = useRef(null);

    useEffect(() => {
        likeChecker(song, data, setLikedSong)
    }, [data.user.user_likedSongsList, song, selectedPlaylist])
    
    useEffect(() => {
        setIsSelected(song._id === selectedSong?._id);
    }, [selectedSong, selectedPlaylist])
    
    useEffect(() => {
        if (activeSong?._id === song?._id && isMusicPlaying) {
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
        }
    }, [isMusicPlaying, activeSong, song]);

    useEffect(() => {
        if (activeSong?._id === song?._id) {
            songPrevNext(index);
        }
    }, [activeSong])

    const togglePlay = () => {
        dispatch(setActiveSong({ song: song }));
        if (!activePlaylist) {
            dispatch(setActivePlaylist(selectedPlaylist));
        }
        if (isPlaying) {
            dispatch(togglePlayback());
        }
    }
    const selectedTemplate = isSelected ? {
        backgroundColor: '#2A2A2A',
        borderRadius: '5px'
    } : {}

    return (
        <div 
        className={styles.song} 
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={selectedTemplate}>
            <div className={styles.song__id} onClick={togglePlay}>
                {isHover || (selectedSong?._id === song?._id) 
                    ? (isPlaying ? <Pause size={20}/> : <Play size={20}/>) 
                    : <div>{index + 1}</div>}
            </div>
            <div className={styles.leftPanel}>
                { cover && <img src={song?.song_cover} width={36} height={36}/>}
                <div className={styles.leftPanel__title}>
                    <div 
                        className={styles.leftPanel__name} 
                        style={{color: isPlaying ? '#3BE477' : 'white' }}>
                        {song.title}
                    </div>
                    <div className={styles.leftPanel__artist}>
                        {song.features.map((feat) => feat.name).join(', ')}
                    </div>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div 
                    className={styles.song__like} 
                    onClick={() => OnLikeSong(song, likedSong, setLikedSong, dispatch, data, timerRef)}>
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