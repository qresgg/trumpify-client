import styles from './footer.module.scss';
import { ActiveSong } from './components/activeSong';
import { SongController } from '../../shared/controllers/song.controller';
import { AudioController } from './components/audioController';
import { useState, useRef, useEffect, act} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setActiveSong, setNextSong, setSelectedSong, stopMusic, togglePlayback } from '../../lib/redux/music/musicState';

export function Footer ({ audioRef }) {
    const dispatch = useDispatch()
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
            <div className={styles.activeSong}>
                <ActiveSong />
            </div>
            <div className={styles.songController}>
                <SongController audioRef={audioRef} styles={styles} config={
                    {
                        type: "pc",
                        extraButtons: true,
                    }
                }/>
            </div>
            <div className={styles.audioMixer}>
                <AudioController audioRef={audioRef}/>
            </div>
        </div>
    )
}