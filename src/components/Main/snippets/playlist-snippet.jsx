import style from './playlist-snippet.module.scss';
import { REGEXP_IMAGEURL } from '../../../lib/regexp';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setActivePlaylist, togglePlaylistPlayback, togglePlayback, setActiveSong } from '../../../lib/musicState';
import { Pause, Play} from 'lucide-react';
import { setView } from '../../../lib/viewSlice';
export function Playlist({
    playlist,
    libWidth
}) {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylist, selectedPlaylist, activeSongId} = useSelector((state) => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHoovering, setIsHovering] = useState(false);

    const urlImage = playlist.cover;
    const albumCover = playlist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};

    const dynamicPlaylistWidth = {
        display: libWidth < 350 ? 'none' : 'block'
    }
    useEffect(() => {
        if (activePlaylist == playlist && isMusicPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false)
        }
    }, [activePlaylist, isMusicPlaying, playlist]);
    
    const togglePlay = async () => {
        if (activePlaylist === playlist) {
            dispatch(togglePlayback());
        } else {
            await dispatch(setActivePlaylist(playlist));
            await dispatch(setActiveSong({ song: playlist.songs[0], index: 0 })); 
        }
    };

    const handlePlaylistClick = () => {
        togglePlay();
    };
    return (
        <div className={style.playlist}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            <div 
                className={style.playlist__state} 
                onClick={handlePlaylistClick}
                style={{background: isHoovering ? 'black' : 'none'}}>
                {isHoovering && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
            </div>
            <div className={style.playlist__art} style={albumCover}></div>
            <div className={style.playlist__info}>
                <div className={style.playlist_Name} style={{color: isPlaying ? '#3BE477': 'white'}}>{playlist.title}</div>
                <div className={style.playlist_AdditionalInfo}><p style={dynamicPlaylistWidth}>{playlist.type}</p>&nbsp; • &nbsp;<p>{playlist.artist_name}</p></div>
                {isPlaying && <div className={style.playlist_AudioVisualizer}></div>}
            </div>
        </div>
    )
}