import styles from '../footer.module.scss'
import { ProgressBar } from '../snippets/progressBar-snippet'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, setPrevSong, togglePlayback, setNextSong } from '../../../lib/redux/music/musicState'

export function SongController({
    audioRef
}) {
    const [pause, setPause] = useState(false)
    const { isMusicPlaying } = useSelector((state) => state.music)
    const dispatch = useDispatch()
   

    const [loopPressed, setLoopPressed] = useState(false)
    const [shufflePressed, setShufflePressed] = useState(false)
    
    const handlePause = () => {
        setPause(!pause)
        dispatch(togglePlayback())
    }

    const handleLoop = () => {
        setLoopPressed(prevState => {
            const newState = !prevState;
            audioRef.current.loop = newState;
            return newState;
        });
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space") {
                handlePause();
            } else if (event.code === "KeyL") {
                handleLoop();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])
    const pressedTemplate = loopPressed ? {
        filter: 'brightness(0) saturate(100%) invert(60%) sepia(57%) saturate(564%) hue-rotate(89deg) brightness(94%) contrast(104%)',
        opacity: 1
    } : {}

    return (
        <div className={styles.songController__container}>
            <div className={styles.songController__buttons}>
                <div className={styles.button__shuffle} title='shuffle'>
                    <div></div>
                </div>
                <div className={styles.button__prevSong} title='previous song'>
                    <div onClick={() => (dispatch(setPrevSong()))}></div>
                </div>
                <div onClick={handlePause}>
                    {isMusicPlaying
                        ? <div className={styles.button__pause} title='pause'></div>
                        : <div className={styles.button__play} title='play'></div>
                    }
                </div>
                <div className={styles.button__nextSong} title='next song'>
                    <div onClick={() => (dispatch(setNextSong()))}></div>
                </div>
                <div className={styles.button__loop} title='loop' style={pressedTemplate} onClick={handleLoop}>
                    <div></div>
                </div>
            </div>
            <div className={styles.songController__bar}>
                <ProgressBar audioRef={audioRef} />
            </div>
        </div>
    );
}