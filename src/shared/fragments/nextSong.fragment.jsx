import styles from './styles/nextSong.fragment.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'

export default function NextSong() {
    const dispatch = useDispatch();
    const { nextSong } = useSelector((state) => state.music.song)
    const [liked, setLiked] = useState(false);
    const timerRef = useRef(null);
    const data = useSelector((state) => state.data)

    const songCover = nextSong ? {
        backgroundImage: `url('${nextSong.song_cover}')`
    } : [];

    return (
        <>
            {nextSong && (
                <div className={styles['container']}>
                    <div className={styles['container__left']}>
                        <div className={styles['container__cover']}>
                            <div className={styles['container__cover-image']} style={songCover}></div>
                        </div>
                        <div className={styles['container__info']}>
                            <div className={styles['container__info-title']}>{nextSong.title}</div>
                            <div className={styles['container__info-features']}>
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