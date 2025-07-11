import styles from './playlist-snippet.module.scss';
import { useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { usePlaybackControl } from '../../../hooks/global/usePlaybackControl';

export default function LikedSongsPlaylist() {
    const dispatch = useDispatch();
    const { selectedPlaylist, activePlaylist } = useSelector((state) => state.music.playlist);
    const user = useSelector((state) => state.data.user);
    const [isHover, setIsHover] = useState(false);
    const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, 'playlist');
    // const 

    return (
        <div className={styles['playlist']}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <div 
                className={styles['playlist__state-button']} 
                style={{background: isHover ? 'black' : 'none'}}
                onClick={togglePlay}>
                {isHover && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={styles['playlist__cover']}>
                <div className={styles['playlist__cover-liked']}></div>
            </div>
            <div className={styles['playlist__info']}>
                <div className={styles['playlist__title']}>Liked songs</div>
                <div className={styles['playlist__artist']}><p>Collection</p>&nbsp; • &nbsp;<p>{user?.user_likedSongsCount} songs</p></div>
                {isPlaying && <div className={styles['playlist__audio-visualizer']}></div>}
            </div>
        </div>
    )
}