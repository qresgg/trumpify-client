import styles from './styles/audio.controller.module.scss'
import { AudioBar } from '../../components/Footer/snippets/audioBar-snippet'

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