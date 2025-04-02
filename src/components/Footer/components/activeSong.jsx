import styles from './activeSong.module.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export function ActiveSong() {
    const { activeSong } = useSelector((state) => state.music)
    const [liked, setLiked] = useState(false);
    const songCover = activeSong ? {
        backgroundImage: `url('${activeSong.song_cover}')`
    } : [];
    const OnLikeSong = () => {
        setLiked(!liked);
    }

    return (
        <>
            {activeSong && (
                <div className={styles.container}>
                <div className={styles.cover}>
                    <div className={styles.cover__image} style={songCover}></div>
                </div>
                <div className={styles.info}>
                    <div className={styles.info__title}>{activeSong.title}</div>
                    <div className={styles.info__feature}>{activeSong.features.map((feat) => feat.name).join(', ')}</div>
                </div>
                <div className={styles.likes}>
                    <div className={styles.likes__container} onClick={OnLikeSong}>
                        {liked 
                        ? <div className={styles.liked}></div> 
                        : <div className={styles.notliked}></div>}
                    </div>
                </div>
            </div>
            )}
        </>
    )
}