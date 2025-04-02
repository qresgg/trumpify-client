import styles from './footer.module.scss';
import { ActiveSong } from './components/activeSong';
import { SongController } from './components/songController';
import { AudioController } from './components/audioController';

export function Footer () {
    return (
        <div className={styles.footer}>
            <div className={styles.activeSong}>
                <ActiveSong />
            </div>
            <div className={styles.controller}>
                <SongController />
            </div>
            <div className={styles.audioMixer}>
                <AudioController />
            </div>
        </div>
    )
}