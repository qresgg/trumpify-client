import style from './playlist-snippet.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { usePlaybackControl } from '../../../hooks/global/usePlaybackControl';
export function Playlist({
    playlist,
    libWidth
}) {
    const dispatch = useDispatch();
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(playlist, 'playlist');

    const [isHover, setIsHover] = useState(false);
    const urlImage = playlist.cover;
    const albumCover = playlist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};

    const dynamicPlaylistWidth = {
        display: libWidth < 350 ? 'none' : 'block'
    }
    const selectedTemplate = isSelected ? {
        backgroundColor: '#2A2A2A',
        borderRadius: '5px'
    } : {}
    return (
        <div className={style.playlist}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={selectedTemplate}>
            <div 
                className={style.playlist__state} 
                onClick={togglePlay}
                style={{background: isHover ? 'black' : 'none'}}>
                {isHover && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={style.playlist__art} style={albumCover}></div>
            <div className={style.playlist__info}>
                <div className={style.playlist__info__name} style={{color: isPlaying ? '#3BE477': 'white'}}>{playlist.title}</div>
                <div className={style.playlist__info__additional}><p style={dynamicPlaylistWidth}>{playlist.type}</p>&nbsp; • &nbsp;<p>{playlist.artist_name}</p></div>
                {isPlaying && <div className={style.playlist__audioVisualizer}></div>}
            </div>
        </div>
    )
}