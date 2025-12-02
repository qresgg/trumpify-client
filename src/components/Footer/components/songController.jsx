import { ProgressBar } from '../../../shared/snippets/progressBar.snippet'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, setPrevSong, togglePlayback, setNextSong } from '../../../lib/redux/music/musicState'

export function SongController({
    audioRef,
    styles,
    config = {
        type: "pc",
        extraButtons: true
    }
}) {
    const [pause, setPause] = useState(false)
    const { isMusicPlaying } = useSelector((state) => state.music)
    const dispatch = useDispatch()
   

    const [loopPressed, setLoopPressed] = useState(false)
    const [shufflePressed, setShufflePressed] = useState(false)

    const getComputedStyle = (config) => {
        if(config.type === "mobile"){
            return styles.songController__state_m
        } else if (config.type === "pc"){
            return styles.songController__state
        } else {
            console.log("error config type")
        }
    }

    useEffect(() => {
        const elems = document.querySelectorAll('[data-tag="extraButton"]');
        if (!config.extraButtons) {
            elems.forEach(elem => {
                elem.classList.add('hidden')
            });
        }
    }, [config.extraButtons])
    
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
                <div className={styles.button__shuffle} title='shuffle' data-tag={"extraButton"}>
                    <div></div>
                </div>
                <div className={styles.button__prevSong} title='previous song' data-tag={"extraButton"}>
                    <div onClick={() => (dispatch(setPrevSong()))}></div>
                </div>
                <div onClick={handlePause} className={getComputedStyle(config)}>
                    {isMusicPlaying
                        ? <div className={styles.button__pause} title='pause' ></div>
                        : <div className={styles.button__play} title='play' ></div>
                    }
                </div>
                <div className={styles.button__nextSong} title='next song' data-tag={"extraButton"}>
                    <div onClick={() => (dispatch(setNextSong()))}></div>
                </div>
                <div className={styles.button__loop} title='loop' style={pressedTemplate} onClick={handleLoop} data-tag={"extraButton"}>
                    <div></div>
                </div>
            </div>
            <div className={styles.songController__bar}>
                <ProgressBar audioRef={audioRef} />
            </div>
        </div>
    );
}