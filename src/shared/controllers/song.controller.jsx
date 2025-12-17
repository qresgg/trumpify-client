import { ProgressBar } from '../snippets/progressBar.snippet'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExtraButton} from "../snippets/extraButton.snippet";
import {FloatingProgressBar} from "../snippets/floatingProgressBar.snippet";
import styles from "./styles/song.controller.module.scss"
import {isMobileDevice} from "../../utils/global/getDeviceType";
import {useMusicActions} from "../../hooks/global/useMusicActions";

export function SongController({
    audioRef,
    config = {
        type: "pc",
        extraButtons: true,
        floatingBar: false,
        centered: true
    }
}) {
    const [pause, setPause] = useState(false)
    const { isMusicPlaying } = useSelector((state) => state.music)
    const dispatch = useDispatch()
    const device = useSelector((state) => state.data.device);
    const musicPlayer = useMusicActions();

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
                musicPlayer.togglePlay();
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
        <div className={`${styles.songController__container} ${config.centered && 'w-full'}`}>
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
                    onClick={() => musicPlayer.prevSong()}
                />
                <div onClick={() => musicPlayer.togglePlayback()} className={getComputedStyle(config, "main")}>
                    {isMusicPlaying
                        ? <div className={styles.button__pause} title='pause' ></div>
                        : <div className={styles.button__play} title='play' ></div>
                    }
                </div>
                <ExtraButton
                    hidden={!config.extraButtons}
                    className={`${styles.button__nextSong} ${getComputedStyle(config, "extra")}`}
                    title={"next song"}
                    onClick={() => musicPlayer.nextSong()}
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
                {isMobileDevice(device.type) && config.floatingBar
                    ? <FloatingProgressBar audioRef={audioRef} />
                    : <ProgressBar audioRef={audioRef} />
                }
            </div>
        </div>
    );
}