import styles from './song-snippet.module.scss';
import OnLikeSong from '../../../services/handlers/handleLikeSong';

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pause, Play} from 'lucide-react';
import { usePlaybackControl } from '../../../hooks/global/usePlaybackControl';
import { useSingleSong } from '../../../hooks/song/useSingleSong';
import { setSelectedSong } from '../../../lib/redux/music/musicState';
import { useLikeChecker } from '../../../hooks/song/useLikeChecker';

export default function Song({
    song,
    index,
    cover = false,
    clear = false,
}) {
    const dispatch = useDispatch();
    const { activePlaylist, selectedPlaylist } = useSelector((state) => state.music.playlist);
    const { activeSong } = useSelector((state) => state.music.song);
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(song, 'song', index);
    const { setActiveSingleSong, setSelectedSingleSong } = useSingleSong();
    const { liked, setLiked } = useLikeChecker({ song: song });
    
    const [isHover, setIsHover] = useState(false);
    const data = useSelector((state) => state.data)
    const timerRef = useRef(null);
    
    const selectedTemplate = isSelected ? {
        backgroundColor: '#2A2A2A',
        borderRadius: '5px'
    } : {}

    return (
        <div 
            className={styles['song']} 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={selectedTemplate}
            onClick={() => dispatch(setSelectedSong(song))}>
            <div className={styles['song__state-button']} onClick={togglePlay}>
                {isHover || (setSelectedSingleSong?._id === song?._id) 
                    ? (isPlaying ? <Pause size={16}/> : <Play size={16}/>) 
                    : (isPlaying ? <Pause size={16}/> : <div>{index + 1}</div>) }
            </div>
            <div className={styles['song__left-panel']}>
                { cover && <img src={song?.song_cover} width={36} height={36}/>}
                <div className={styles['song__title']}>
                    <div className={styles['song__name']} style={{color: isPlaying ? '#3BE477' : 'white' }}>
                        {song.title}
                    </div>
                    <div className={styles['song__artist']}>
                        {song?.is_explicit && (
                            <div className='explicit'>E</div>
                        )}
                        {song?.features
                            .filter((feat) => feat.roles.some(role => role.role === 'main vocal'))
                            .map((feat) => feat.name)
                            .join(', ')
                        }
                    </div>
                </div>
            </div>
            <div className={styles['song__right-panel']}>
                <div 
                    className={styles['song__state-like']} 
                    onClick={() => OnLikeSong(song, liked, setLiked, dispatch, data, timerRef)}>
                    {liked
                        ? <div className={styles['song__state-like--liked']}></div> 
                        : <div className={styles['song__state-like--notliked']}></div>}
                </div>
                <div className={styles['song__duration']}>
                    <div className={styles['song__duration-time']}>
                        {song.duration}
                    </div>
                </div>
            </div>
        </div>
    )
}