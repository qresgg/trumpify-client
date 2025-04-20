import styles from './likedsongs-snippet.module.scss'
import { useEffect, useState } from 'react';
import { Pause, Play} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlaylist } from '../../../lib/redux/music/musicState';
import { setActiveSong, setActivePlaylist, togglePlayback} from '../../../lib/redux/music/musicState';
import { getLikedSongs } from '../../../services/user/Actions/userActionsService';

export function LikedSongsPlaylist() {
    const dispatch = useDispatch();
    const { isMusicPlaying, activePlaylist, activeTrack, selectedPlaylist} = useSelector((state) => state.music);
    const user = useSelector((state) => state.data.user)
    const [isSelected, setIsSelected] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);
    // const playlist = useSelector((state) => state.user?.user_likedCollection)

    // useEffect(() => {
    //     setIsSelected(playlist?._id === selectedPlaylist?._id);
    // }, [selectedPlaylist])
    
    // useEffect(() => {
    //     console.log(activePlaylist)
    //     console.log(playlist)
    //     if (activePlaylist?._id === playlist?._id && isMusicPlaying) {
    //         setIsPlaying(true);
    //     } else {
    //         setIsPlaying(false)
    //     }
    // }, [activePlaylist, isMusicPlaying, playlist]);
    
    // const togglePlay = async () => {
    //     if (activePlaylist?._id === playlist?._id) {
    //         dispatch(togglePlayback());
    //     } else {
    //         dispatch(setActivePlaylist(playlist));
    //         console.log('changed activeplaylist', playlist)
    //         // dispatch(setActiveSong({ song: playlist.songs[0], index: 0 })); 
    //     }
    // };
    const handlePlaylistClick = () => {
        // togglePlay();
    };

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
                <div className={styles.additionalInfo}><p>Collection</p>&nbsp; • &nbsp;<p>{user?.user_likedSongsCount} songs</p></div>
            </div>
        </div>
    )
}