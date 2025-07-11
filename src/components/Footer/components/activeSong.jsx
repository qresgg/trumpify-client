import styles from './activeSong.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import OnLikeSong from '../../../services/handlers/handleLikeSong'
import { redirectFromFeature } from '../../../utils/helpful/getRedirection'
import { useLikeChecker } from '../../../hooks/song/useLikeChecker'

export function ActiveSong() {
    const dispatch = useDispatch();
    const { activeSong, selectedSong } = useSelector((state) => state.music.song)
    const timerRef = useRef(null);
    const data = useSelector((state) => state.data)
    const { liked, setLiked } = useLikeChecker({ song: activeSong});

    const songCover = activeSong ? {
        backgroundImage: `url('${activeSong.song_cover}')`
    } : [];

    return (
        <>
            {activeSong && (
                <div className={styles.container}>
                <div className={styles.cover}>
                    <div className={styles.cover__image} style={songCover}></div>
                </div>
                <div className={styles.info}>
                    <div className={styles.info__title}>{activeSong.title}</div>
                    <div className={styles.info__feature}>
                        {activeSong?.features
                            .filter((feat) => feat.roles.some(role => role.role === 'main vocal'))
                            .map((feat, index, arr) => (
                                <span key={feat.id || index} onClick={() => redirectFromFeature('Artist', feat.name, dispatch)}>
                                    {feat.name}
                                    {index < arr.length - 1 && <span>, </span>}
                                </span>
                            ))
                        }
                    </div>
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