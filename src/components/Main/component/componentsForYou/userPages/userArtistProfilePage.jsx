import { useSelector } from 'react-redux';
import styles from './userArtistProfilePage.module.scss'
import { usePalette } from 'react-palette';
import { useState } from 'react';
import infoChange from './snippet/userInfoChange';

export function UserArtistProfilePage() {
    const user = useSelector((state) => state.user.user);
    const [isOpened, setIsOpened] = useState(false)
    console.log(isOpened)

    // const urlImage = selectedPlaylist ? `/album-covers/${formattedArtist}_${formattedTitle}.jpg` : null;
    // const { data, loading, error } = usePalette(urlImage);

    return (
        <div className={styles.profile}>
            { isOpened && <div className={styles.blackScreen}></div>}
            <div className={styles.header}></div>
            <div className={styles.title}>
                <div className={styles.addiction} onClick={() => setIsOpened(true)}>
                    <div className={styles.info}>
                        <div className={styles.isProfile}>Verified artist</div>
                        <div className={styles.userName}>{user.artistName}</div>
                        <div className={styles.playlistCount}>0 listeners per month</div>
                    </div>
                </div>
            </div>
            <div className={styles.statistic}>  
                <div className={styles.popular_songs}>
                    <div className={styles.popular_songs__title}>Popular songs</div>
                    <div className={styles.popular_songs__list}></div>
                </div>
                <div className={styles.artist_chose}></div>
                <div className={styles.music}></div>
            </div>
        </div>
    )
}