import styles from './song-snippet.module.scss'

export function Song({
    song,
    id
}) {
    return (
        <div className={styles.song}>
            <div className={styles.song__id}>{id}</div>
            <div className={styles.song__title}>
                <div className={styles.song__title__name}>{song.title}</div>
                <div className={styles.song__title__artist}>
                    <p><span>E</span>{song.featuring.map((feat) => feat.artist).join(', ')}</p>
                </div>
            </div>
            <div className={styles.song__duration}>
                <div className={styles.song__duration__time}>
                    {song.duration}
                </div>
            </div>
        </div>
    )
}