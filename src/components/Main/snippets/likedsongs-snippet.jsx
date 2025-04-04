import styles from './likedsongs-snippet.module.scss'
import { useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export function LikedSongsPlaylist() {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylistIndex, activeTrack, activeTrackIndex} = useSelector((state) => state.music);
    const user = useSelector((state) => state.data.user)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHoovering, setIsHovering] = useState(false);

    // useEffect(() => {
    //     if(isMusicPlaying){
    //         if(activePlaylistIndex == ID){
    //             setIsPlaying(true) 
    //         } else{
    //             setIsPlaying(false)
    //         }
    //     } else {
    //         setIsPlaying(false)
    //     }
    // }, [activePlaylistIndex, ID, isMusicPlaying]);
    const handlePlaylistClick = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <div className={styles.likedSongs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            <div className={styles.likedSongs__state} 
                style={{background: isHoovering ? 'black' : 'none'}}
                onClick={handlePlaylistClick}>
                {isHoovering && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={styles.likedSongs__art}></div>
            <div className={styles.likedSongs__info}>
                <div className={styles.title}>Liked songs</div>
                <div className={styles.additionalInfo}><p>Collection</p>&nbsp; • &nbsp;<p>{user.user_likedSongsCount} songs</p></div>
            </div>
        </div>
    )
}