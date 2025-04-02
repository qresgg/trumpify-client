import styles from './songController.module.scss'
import { ProgressBar } from '../snippets/progressBar-snippet'

export function SongController() {
    
    return(
        <div className={styles.songController}>
            <div className={styles.upper}>
                <div className={styles.panel}>
                    <div className={styles.panel__shuffle}>
                        <div></div>
                    </div>
                    <div className={styles.panel__prevSong}>
                        <div></div>
                    </div>
                    <div className={styles.panel__pause}>
                        <div></div>
                    </div>
                    <div className={styles.panel__nextSong}>
                        <div></div>
                    </div>
                    <div className={styles.panel__loop}>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className={styles.lower}>
                <ProgressBar />
            </div>
        </div>
    )
}