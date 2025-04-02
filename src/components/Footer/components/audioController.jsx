import styles from './audioController.module.scss'
import { ProgressBar } from '../snippets/progressBar-snippet'

export function AudioController() {

    return(
        <>
            <div className={styles.container}>
                <div className={styles.audioIcon}>
                    <div></div>
                </div>
                <ProgressBar type="music" initialProgress="50"/>
            </div>
        </>
    )
}