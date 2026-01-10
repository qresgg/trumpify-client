import styles from './styles/playlist.fragment.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { usePlaybackControl } from '../../hooks/global/usePlaybackControl';
export default function Playlist({ playlist, libWidth }) {
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
        <div className={styles['playlist']}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={selectedTemplate}>
            <div 
                className={styles['playlist__state-button']} 
                onClick={togglePlay}
                style={{background: isHover ? 'black' : 'none'}}>
                {isHover && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={styles['playlist__cover']} style={albumCover}></div>
            <div className={styles['playlist__info']}>
                <div className={styles['playlist__title']} style={{color: isPlaying ? '#3BE477': 'white'}}>{playlist.title}</div>
                <div className={styles['playlist__artist']}><p style={dynamicPlaylistWidth}>{playlist.type}</p>&nbsp; • &nbsp;<p>{playlist.artist_name}</p></div>
                {isPlaying && <div className={styles['playlist__audio-visualizer']}></div>}
            </div>
        </div>
    )
}