import styles from './likedsongs-snippet.module.scss'
import { useEffect, useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlaylist } from '../../../lib/redux/music/musicState';

export function LikedSongsPlaylist() {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylistIndex, activeTrack, selectedPlaylist} = useSelector((state) => state.music);
    const user = useSelector((state) => state.data.user)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    
    const handlePlaylistClick = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <div className={styles.likedSongs}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <div className={styles.likedSongs__state} 
                style={{background: isHover ? 'black' : 'none'}}
                onClick={handlePlaylistClick}>
                {isHover && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={styles.likedSongs__art}></div>
            <div className={styles.likedSongs__info}>
                <div className={styles.title}>Liked songs</div>
                <div className={styles.additionalInfo}><p>Collection</p>&nbsp; • &nbsp;<p>{user.user_likedSongsCount} songs</p></div>
            </div>
        </div>
    )
}