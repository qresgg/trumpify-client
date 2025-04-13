import styles from './footer.module.scss';
import { ActiveSong } from './components/activeSong';
import { SongController } from './components/songController';
import { AudioController } from './components/audioController';
import { useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { stopMusic, togglePlayback } from '../../lib/redux/music/musicState'

export function Footer () {
    const dispatch = useDispatch()
    const audioRef = useRef(null);
    const musicState = useSelector((state) => state.music)
    const { activeSong, isMusicPlaying } = useSelector((state) => state.music)
    const [currentSong, setCurrentSong] = useState(null)

    useEffect(() => {
        if (activeSong) {
            setCurrentSong(activeSong);

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

        const handleTimeUpdate = () => {
            if (audio.ended) {
                dispatch(stopMusic());
            }
        };

        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
        }
    }, [audioRef]);

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