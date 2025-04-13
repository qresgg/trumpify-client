import styles from './audioController.module.scss'
import { AudioBar } from '../snippets/audioBar-snippet'

export function AudioController({
    audioRef
}) {

    return(
        <>
            <div className={styles.container}>
                <div className={styles.audioIcon}>
                    <div></div>
                </div>
                <AudioBar audioRef={audioRef}/>
            </div>
        </>
    )
}