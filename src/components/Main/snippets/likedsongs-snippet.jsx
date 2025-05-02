import style from './playlist-snippet.module.scss';
import { useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { usePlaybackControl } from '../../../hooks/global/usePlaybackControl';

export function LikedSongsPlaylist() {
    const dispatch = useDispatch();
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);
    const user = useSelector((state) => state.data.user);
    const [isHover, setIsHover] = useState(false);
    const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, 'playlist');

    return (
        <div className={style.playlist}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <div 
                className={style.playlist__state} 
                style={{background: isHover ? 'black' : 'none'}}
                onClick={togglePlay}>
                {isHover && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={style.playlist__art}>
                <div className={style.likedSongs}></div>
            </div>
            <div className={style.playlist__info}>
                <div className={style.playlist__info__name}>Liked songs</div>
                <div className={style.playlist__info__additional}><p>Collection</p>&nbsp; • &nbsp;<p>{user?.user_likedSongsCount} songs</p></div>
                {/* {isPlaying && <div className={style.playlist__audioVisualizer}></div>} */}
            </div>
        </div>
    )
}