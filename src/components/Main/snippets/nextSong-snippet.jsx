import styles from './nextSong-snippet.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import OnLikeSong from '../../../services/global/functions/song/likeSongHandler'
import likeChecker from '../../../services/global/functions/song/likeChecker'

export function NextSong() {
    const dispatch = useDispatch();
    const { nextSong } = useSelector((state) => state.music.song)
    const [liked, setLiked] = useState(false);
    const timerRef = useRef(null);
    const data = useSelector((state) => state.data)

    const songCover = nextSong ? {
        backgroundImage: `url('${nextSong.song_cover}')`
    } : [];

    useEffect(() => {
        likeChecker(nextSong, data, setLiked)
    }, [nextSong, data])

    return (
        <>
            {nextSong && (
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.cover}>
                            <div className={styles.cover__image} style={songCover}></div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.info__title}>{nextSong.title}</div>
                            <div className={styles.info__feature}>
                                {nextSong?.features
                                    .filter((feat) => feat.roles.some(role => role.role === 'main vocal'))
                                    .map((feat) => feat.name)
                                    .join(', ')
                                }</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}