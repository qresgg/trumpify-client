import { useSelector } from 'react-redux';
import styles from './info.module.scss';
import { useState, useEffect } from 'react';

export function Info({ width, onResize, albumCover }) {
    const { selectedSong, selectedPlaylist } = useSelector((state) => state.music)
    const [savedAlbum, setSavedAlbum] = useState([]);
    useEffect(() => {
        if (selectedSong) {
            setSavedAlbum(selectedPlaylist);
        }
    }, [selectedSong])
    
    // const songCover = background: `url(${selectedSong.song_cover})`
    return (
        <>
            {selectedSong && (
                <>
                    <div className={styles.resizer} onMouseDown={onResize}></div>
                    <div className={styles.song} style={{ width: `${width}px` }}>
                        <div className={styles.song__albumTitle}></div>
                        <div className={styles.song__container}>
                            <img src={selectedSong.song_cover}/>
                            <div className={styles.title}>
                                    <div className={styles.title__songName}><a href="#">{selectedSong.title}</a></div>
                                    <div className={styles.title__artists}>{selectedSong.features.map((feat, index) => (
                                        <span key={index}>
                                            <a href='#'>{feat.artist}</a>
                                            {index < selectedSong.features.length - 1 && ', '}
                                        </span>
                                    ))}</div>
                                </div>
                                <div className={styles.artistAccount}>
                                    <div className={styles.artist}>
                                        <div className={styles.artist__preview}>123</div>
                                        <div className={styles.artist__details}>
                                            <div className={styles.artist__details__name}>Future</div>
                                            <div className={styles.artist__details__listeners}>50 000 000 listeners per month</div>
                                            <div className={styles.artist__details__description}>Chart-topping and influential rapper Future is known for a uniquely fluid and melodic yet mumbling vocal style. He busted out of the South at the dawn of the 2010s...</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.songdetailInfo}>
123
                                </div>
                                <div className={styles.songdetailInfo}>
123
                                </div>
                                <div className={styles.songdetailInfo}>
123
                                </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}