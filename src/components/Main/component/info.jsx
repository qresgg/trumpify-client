import { useDispatch, useSelector } from 'react-redux';
import styles from './info.module.scss';
import { setSelectedSong } from '../../../lib/redux/music/musicState';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Info({ 
    width, 
    onResize 
}) {
    const dispatch = useDispatch();
    const { selectedSong, selectedPlaylist } = useSelector((state) => state.music)
    const [albumName, setAlbumName] = useState(null);
    useEffect(() => {
        selectedSong && setAlbumName(selectedPlaylist ? selectedPlaylist.title : 'Liked Songs')
    }, [selectedSong])
    
    return (
        <>
            {selectedSong && (
                <>
                    <div className={styles.resizer} onMouseDown={onResize}></div>
                    <div className={styles.song} style={{ width: `${width}px` }}>
                        <div className={styles.song__albumTitle}>
                            <div className={styles.albumName}>{albumName}</div>
                            <div className={styles.closeInfo}><X onClick={() => dispatch(setSelectedSong(null))}/></div>
                        </div>
                        <div className={styles.song__container}>
                            <div className={styles.image_container}>
                                <img src={selectedSong.song_cover}/>
                            </div>
                            <div className={styles.title}>
                                    <div className={styles.title__songName}>{selectedSong.title}</div>
                                    <div className={styles.title__artists}>{selectedSong.features.map((feat) => feat.name).join(', ')}</div>
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