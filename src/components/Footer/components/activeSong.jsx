import styles from './activeSong.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import OnLikeSong from '../../../services/global/functions/likeSongHandler'
import likeChecker from '../../../services/global/functions/song/likeChecker'

export function ActiveSong() {
    const dispatch = useDispatch();
    const { activeSong } = useSelector((state) => state.music)
    const [liked, setLiked] = useState(false);
    const timerRef = useRef(null);
    const data = useSelector((state) => state.data)

    const songCover = activeSong ? {
        backgroundImage: `url('${activeSong.song_cover}')`
    } : [];

    useEffect(() => {
        likeChecker(activeSong, data, setLiked)
    }, [activeSong, data])

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
                    <div className={styles.likes__container} onClick={() => OnLikeSong(activeSong, liked, setLiked, dispatch, data, timerRef)}>
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