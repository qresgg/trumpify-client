import style from './playlist-snippet.module.scss';
import { REGEXP_IMAGEURL } from '../../../lib/regexp';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { playPlaylist, pauseMusic, setActivePlaylist, playTrack } from "../../../lib/musicState";
import { Pause, Play} from 'lucide-react';
import { setView } from '../../../lib/viewSlice';
export function Playlist({
    playlist,
    libWidth,
    ID
}) {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylistIndex, activeTrack, activeTrackIndex} = useSelector((state) => state.music);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHoovering, setIsHovering] = useState(false);

    const formattedArtist = playlist ? playlist.artist.replace(REGEXP_IMAGEURL, '').toLowerCase() : null;
    const formattedTitle = playlist ? playlist.title.replace(REGEXP_IMAGEURL, '').toLowerCase(): null;

    const urlImage = playlist ? `/album-covers/${formattedArtist}_${formattedTitle}.jpg` : null;
    const albumCover = playlist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};

    const dynamicPlaylistWidth = {
        display: libWidth < 350 ? 'none' : 'block'
    }
    useEffect(() => {
        if(isMusicPlaying){
            if(activePlaylistIndex == ID){
                setIsPlaying(true) 
            } else{
                setIsPlaying(false)
            }
        } else {
            setIsPlaying(false)
        }
    }, [activePlaylistIndex, ID, isMusicPlaying]);
    

    const togglePlay = () => {
        if (isPlaying) {
            dispatch(pauseMusic());
        } else {
            dispatch(playPlaylist(ID));
            if (activePlaylistIndex !== ID) {
                dispatch(playTrack({ song: playlist.tracks[0], index: 1 }));
            } else if (activeTrackIndex !== null) {
                dispatch(playTrack({ song: activeTrack, index: activeTrackIndex }));
            }
        }
    };
    // console.log(activeTrack)
    // console.log(activeTrackIndex)

    const handlePlaylistClick = () => {
        dispatch(setActivePlaylist({playlist, ID}));
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
                <div className={style.playlist_AdditionalInfo}><p style={dynamicPlaylistWidth}>{playlist.type}</p>&nbsp; • &nbsp;<p>{playlist.artist}</p></div>
                {isPlaying && <div className={style.playlist_AudioVisualizer}></div>}
            </div>
        </div>
    )
}