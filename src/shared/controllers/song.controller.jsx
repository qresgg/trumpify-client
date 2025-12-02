import { ProgressBar } from '../snippets/progressBar.snippet'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExtraButton} from "../snippets/extraButton.snippet";
import { setActiveSong, setPrevSong, togglePlayback, setNextSong } from '../../lib/redux/music/musicState'
import {FloatingProgressBar} from "../snippets/floatingProgressBar.snippet";

export function SongController({
    audioRef,
    styles,
    config = {
        type: "pc",
        extraButtons: true,
    }
}) {
    const [pause, setPause] = useState(false)
    const { isMusicPlaying } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const device = useSelector((state) => state.data.device);

    const [loopPressed, setLoopPressed] = useState(false)
    const [shufflePressed, setShufflePressed] = useState(false)

    const getComputedStyle = (config, type) => {
        if(type === "main"){
            if(config.type === "mobile"){
                return styles.songController__state_m
            } else if (config.type === "pc"){
                return styles.songController__state
            } else {
                console.log("error config type")
            }
        } else if (type === "extra"){
            if(config.type === "mobile"){
                return styles.songController__extraState_m
            } else if (config.type === "pc"){
                return styles.songController__extraState
            } else {
                console.log("error config type")
            }
        }
    }

    const isMobileDevice = (() => {
        if (typeof device === 'string') {
            const d = device.toLowerCase();
            return d === 'mobile' || d === 'phone' || d === 'mob';
        }
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 480;
        }
        return false;
    })();

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
                <ExtraButton
                    hidden={!config.extraButtons}
                    className={`${styles.button__shuffle} ${getComputedStyle(config, "extra")}`}
                    title={"shuffle"}
                    onClick={handleLoop}
                    />
                <ExtraButton
                    hidden={!config.extraButtons}
                    className={`${styles.button__prevSong} ${getComputedStyle(config, "extra")}`}
                    title={"prev song"}
                    onClick={() => (dispatch(setPrevSong()))}
                />
                <div onClick={handlePause} className={getComputedStyle(config, "main")}>
                    {isMusicPlaying
                        ? <div className={styles.button__pause} title='pause' ></div>
                        : <div className={styles.button__play} title='play' ></div>
                    }
                </div>
                <ExtraButton
                    hidden={!config.extraButtons}
                    className={`${styles.button__nextSong} ${getComputedStyle(config, "extra")}`}
                    title={"next song"}
                    onClick={() => (dispatch(setNextSong()))}
                />
                <ExtraButton
                    hidden={!config.extraButtons}
                    className={`${styles.button__loop} ${getComputedStyle(config, "extra")}`}
                    title={"loop"}
                    style={pressedTemplate}
                    onClick={handleLoop}
                />
            </div>
            <div className={styles.songController__bar}>
                {isMobileDevice
                    ? <FloatingProgressBar audioRef={audioRef} />
                    : <ProgressBar audioRef={audioRef} />
                }
            </div>
        </div>
    );
}