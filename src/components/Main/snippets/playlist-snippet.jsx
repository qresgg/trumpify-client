import style from './playlist-snippet.module.scss';
import { REGEXP_IMAGEURL } from '../../../lib/regexp';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setActivePlaylist, togglePlaylistPlayback, togglePlayback, setActiveSong, setSelectedPlaylist } from '../../../lib/redux/music/musicState';
import { Pause, Play} from 'lucide-react';
export function Playlist({
    playlist,
    libWidth,
    type='playlist'
}) {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylist, selectedPlaylist} = useSelector((state) => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const urlImage = playlist.cover;
    const albumCover = playlist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};

    const dynamicPlaylistWidth = {
        display: libWidth < 350 ? 'none' : 'block'
    }
    useEffect(() => {
        setIsSelected(playlist._id === selectedPlaylist?._id);
    }, [selectedPlaylist])

    useEffect(() => {
        if (activePlaylist?._id === playlist?._id && isMusicPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false)
        }
    }, [activePlaylist, isMusicPlaying, playlist]);
    
    const togglePlay = async () => {
        if (activePlaylist === playlist) {
            dispatch(togglePlayback());
        } else {
            dispatch(setActivePlaylist(playlist));
            dispatch(setActiveSong({ song: playlist.songs[0], index: 0 })); 
        }
    };
    const handlePlaylistClick = () => {
        togglePlay();
    };

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
                onClick={handlePlaylistClick}
                style={{background: isHover ? 'black' : 'none'}}>
                {isHover && (isPlaying ? <Pause size={24}/> : <Play size={24}/>)}
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