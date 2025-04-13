import { useDispatch, useSelector } from 'react-redux';
import styles from './info.module.scss';
import { setSelectedSong } from '../../../lib/redux/music/musicState';
import { X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import OnLikeSong from '../../../services/global/functions/likeSongHandler';
import { usePalette } from 'react-palette';
import { findContent } from '../../../services/search/findService';
import likeChecker from '../../../services/global/functions/song/likeChecker';

export function Info({ 
    width, 
    onResize 
}) {
    const dispatch = useDispatch();
    const { selectedSong, selectedPlaylist } = useSelector((state) => state.music)
    const [albumName, setAlbumName] = useState(null);
    const [liked, setLiked] = useState(false);
    const dataRedux = useSelector((state) => state.data)
    const timerRef = useRef(null);
    const [songArtist, setSongArtist] = useState([])
    const user = useSelector((state) => state.data.user)

    useEffect(() => {
        selectedSong && setAlbumName(selectedPlaylist ? selectedPlaylist.title : 'Liked Songs')
    }, [selectedSong])

    useEffect(() => {
        likeChecker(selectedSong, dataRedux, setLiked)
    }, [selectedSong, user])

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await findContent('Artist', selectedSong.artist)
                setSongArtist(response);
            } catch (error) {
                console.error(error)
            }
        }
        selectedSong && fetchArtist();
    }, [selectedSong])

    const { data } = usePalette(selectedSong?.song_cover);
    
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
                        <div className={styles.song__backcolor} style={{ background: `linear-gradient(to bottom, ${data.lightMuted}, ${data.darkMuted})`}}></div>
                        <div className={styles.song__container}>
                            <div className={styles.image_container}>
                                <img src={selectedSong.song_cover}/>
                            </div>
                            <div className={styles.title}>
                                <div className={styles.title__container}>
                                    <div className={styles.title__songName}>{selectedSong.title}</div>
                                    <div className={styles.title__artists}>{selectedSong.features.map((feat) => feat.name).join(', ')}</div>
                                </div>
                                <div className={styles.isLiked} onClick={() => OnLikeSong(selectedSong, liked, setLiked, dispatch, dataRedux, timerRef)}>
                                    {liked 
                                    ? <div className={styles.liked} title='Unlike song'></div>
                                    : <div className={styles.notliked} title='Like song'></div>}
                                </div>
                            </div>
                            <div className={styles.artistAccount}>
                                <div className={styles.artist}>
                                    <div className={styles.artist__preview}>

                                    </div>
                                    <div className={styles.artist__details}>
                                        <div className={styles.artist__details__name}>{songArtist.artist_name}</div>
                                        <div className={styles.artist__details__listeners}>{songArtist.artist_listeners} monthly listeners</div>
                                        <div className={styles.artist__details__bio}>{songArtist.artist_bio}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.featuresSong}>
                                <div className={styles.featuresSong__container}>
                                    <div className={styles.upperTitle}>
                                        <div className={styles.upperTitle__caption}>Credits</div>
                                        <div className={styles.upperTitle__button}>Show all</div>
                                    </div>
                                        {selectedSong.features.map((feat, index) => (
                                            <div className={styles.feature} key={index}>
                                                <div className={styles.featName}>{feat.name}</div>
                                                <div className={styles.featRole}>{feat.roles.map((role) => (
                                                    role.role
                                                )).join(', ')}</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}