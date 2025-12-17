import styles from './footer.module.scss';
import { ActiveSong } from './components/activeSong';
import { SongController } from '../../shared/controllers/song.controller';
import { AudioController } from '../../shared/controllers/audio.controller';
import { useState, useRef, useEffect, act} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { musicPlayer } from '../../lib/redux/music/musicState';
import {isMobileDevice} from "../../utils/global/getDeviceType";
import {useMusicActions} from "../../hooks/global/useMusicActions";
import {useDeviceDetect} from "../../hooks/global/useDeviceDetect";
import {AudioPanelFooter} from "../Header/components/audioPanel.footer";
import {NavPanelFooter} from "../Header/components/navPanel.footer";

export function Footer ({ audioRef }) {
    const dispatch = useDispatch()
    const { isMusicPlaying } = useSelector((state) => state.music)
    const { activeSong, nextSong } = useSelector((state) => state.music.song)
    const song = useSelector((state) => state.music.song)
    const deviceType = useDeviceDetect();
    const musicPlayer = useMusicActions();

    const [currentSong, setCurrentSong] = useState(null)

    useEffect(() => {
        if (activeSong) {
            setCurrentSong(activeSong);
            dispatch(musicPlayer.selectSong(activeSong));

            let audio = audioRef.current;

            if (audio) {
                audio.pause();
                audio.src = activeSong.song_file;
                audio.load();
                if (isMusicPlaying) {
                    audio.play().catch((error) => {
                        console.error('Audio playback failed:', error);
                    });
                }
            }
        } else {
            setCurrentSong(null);
        }
    }, [activeSong]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleAudioEnded = () => {
            if (activeSong && audioRef.current.ended) {
                dispatch(musicPlayer.nextSong());
            } else {
                dispatch(musicPlayer.stop());
            }
        };

        if (audio) {
            audio.addEventListener('ended', handleAudioEnded);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleAudioEnded);
            }
        };
    }, [audioRef, activeSong, nextSong, dispatch]);

    useEffect(() => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.play().catch((error) => {
                    console.error('Audio playback failed:', error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMusicPlaying]);

    useEffect(() => {
        if (!activeSong && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
        }
    }, [activeSong]);



    return (
        <div className={`${styles.footer}`}>
            {deviceType === "desktop"
                ? <AudioPanelFooter audioRef={audioRef}/>
                : <NavPanelFooter />}
        </div>
    )
}