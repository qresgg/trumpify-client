import styles from './footer.module.scss';
import { ActiveSong } from './components/activeSong';
import { SongController } from './components/songController';
import { AudioController } from './components/audioController';
import { useState, useRef, useEffect, act} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, setNextSong, setSelectedSong, stopMusic, togglePlayback } from '../../lib/redux/music/musicState'

export function Footer () {
    const dispatch = useDispatch()
    const audioRef = useRef(null);
    const { isMusicPlaying } = useSelector((state) => state.music)
    const { activeSong, nextSong } = useSelector((state) => state.music.song)
    const song = useSelector((state) => state.music.song)

    const [currentSong, setCurrentSong] = useState(null)

    useEffect(() => {
        if (activeSong) {
            setCurrentSong(activeSong);
            dispatch(setSelectedSong(activeSong));

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
                dispatch(setNextSong());
            } else {
                dispatch(stopMusic());
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
        <div className={styles.footer}>
            <audio ref={audioRef}>
                {activeSong?.song_file ? (
                    <>
                        <source src={currentSong?.song_file} type="audio/ogg" />
                        Your browser does not support the audio element.
                    </>
                ) : (
                    <p>No audio source available</p>
                )}
            </audio>

            <div className={styles.activeSong}>
                <ActiveSong />
            </div>
            <div className={styles.controller}>
                <SongController audioRef={audioRef}/>
            </div>
            <div className={styles.audioMixer}>
                <AudioController audioRef={audioRef}/>
            </div>
        </div>
    )
}