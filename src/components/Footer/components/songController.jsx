import styles from './songController.module.scss'
import { ProgressBar } from '../snippets/progressBar-snippet'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlayback } from '../../../lib/redux/music/musicState'

export function SongController({
    audioRef
}) {
    const [pause, setPause] = useState(false)
    const { isMusicPlaying } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const [loopPressed, setLoopPressed] = useState(false)
    const [shufflePressed, setShufflePressed] = useState(false)

    const handlePause = () => {
        setPause(!pause)
        dispatch(togglePlayback())
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef?.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }, 500); 

        return () => clearInterval(interval);
    }, [audioRef]);

    useEffect(() => {
        const updateDuration = () => {
            if (audioRef?.current) {
                setDuration(audioRef.current.duration || 0);
            }
        };

        if (audioRef?.current) {
            audioRef.current.addEventListener('loadedmetadata', updateDuration);
        }
    }, [audioRef]);

    const handleLoop = () => {
        setLoopPressed(!loopPressed)
        if (loopPressed) {
            audioRef.current.loop = false
        } else {
            audioRef.current.loop = true
        }
    }
    const pressedTemplate = loopPressed ? {
        filter: 'brightness(0) saturate(100%) invert(60%) sepia(57%) saturate(564%) hue-rotate(89deg) brightness(94%) contrast(104%)',
        opacity: 1
    } : {
        opacity: 0.6
    }

    return (
        <div className={styles.main}>
            <div className={styles.currentTime}>
                {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </div>
            <div className={styles.songController}>
                <div className={styles.upper}>
                    <div className={styles.panel}>
                        <div className={styles.panel__shuffle} title='shuffle'>
                            <div></div>
                        </div>
                        <div className={styles.panel__prevSong} title='previous song'>
                            <div></div>
                        </div>
                        <div onClick={handlePause}>
                            {isMusicPlaying
                            ? <div className={styles.panel__pause} title='pause'>
                                <div></div>
                            </div>
                            : <div className={styles.panel__play} title='play'>
                                <div></div>
                            </div>}
                        </div>
                        <div className={styles.panel__nextSong} title='next song'>
                            <div></div>
                        </div>
                        <div className={styles.panel__loop} 
                            title='loop' 
                            style={pressedTemplate}
                            onClick={handleLoop}>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className={styles.lower}>
                    <ProgressBar audioRef={audioRef} />
                </div>
            </div>
            <div className={styles.duration}>
                {duration ? new Date(duration * 1000).toISOString().substr(14, 5) : '00:00'}
            </div>
        </div>
    );
}