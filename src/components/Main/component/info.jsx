import { useDispatch, useSelector } from 'react-redux';
import styles from './info.module.scss';
import { setSelectedSong } from '../../../lib/redux/music/musicState';
import { X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import OnLikeSong from '../../../services/global/functions/song/likeSongHandler';
import { findContent } from '../../../services/search/findService';
import fetchColors from '../../../utils/custom/colorPalette';
import { NextSong } from '../snippets/nextSong-snippet';
import { redirectTo, redirectFromFeature } from '../../../services/global/functions/redirection';
import { Link } from 'react-router-dom';
import { useLikeChecker } from '../../../hooks/song/useLikeChecker';

export default function Info({ 
    width, 
    onResize 
}) {
    const dispatch = useDispatch();
    const { selectedSong } = useSelector((state) => state.music.song);
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);
    const song = useSelector((state) => state.music.song);
    const [ gradient, setGradient ] = useState(null)
    const { liked, setLiked } = useLikeChecker({ song: selectedSong });

    const [albumName, setAlbumName] = useState(null);
    const dataRedux = useSelector((state) => state.data);
    const timerRef = useRef(null);
    const [songArtist, setSongArtist] = useState([]);
    const user = useSelector((state) => state.data.user);

    useEffect(() => {
        selectedSong && setAlbumName(selectedPlaylist ? selectedPlaylist.title : 'Liked Songs')
    }, [selectedSong])

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

    useEffect(() => {      
        const getColors = async () => {
            setGradient(await fetchColors(selectedSong));
        }
        getColors();
    }, [selectedSong]);
    
    return (
        <>
            {selectedSong && (
                <>
                    <div className={styles['resizer']} onMouseDown={onResize}></div>

                    <div className={styles['song']} style={{ width: `${width}px` }}>
                        <div className={styles['song__header']}>
                            <div className={styles['song__album-name']}>{albumName}</div>
                            <div className={styles['song__album-info']}>
                                <X onClick={() => dispatch(setSelectedSong(null))}/>
                            </div>
                        </div>
                        <div className={styles['song__background']} style={gradient}></div>
                        <div className={styles['song__content']}>
                            <div className={styles['song__image-wrapper']}>
                                <img src={selectedSong.song_cover}/>
                            </div>
                            <div className={styles['song__title']}>
                                <div className={styles['song__title-content']}>
                                    <div className={styles['song__name']}>{selectedSong.title}</div>
                                    <div className={styles['song__artists']}>
                                    {selectedSong.features
                                        .filter(feat => feat.roles.some(role => role.role === 'main vocal'))
                                        .map((feat, index, arr) => (
                                            <span key={feat.id || index} onClick={() => redirectFromFeature('Artist', feat.name, dispatch)}>
                                                {feat.name}
                                                {index < arr.length - 1 && <span>, </span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles['song__like-button']} onClick={() => OnLikeSong(selectedSong, liked, setLiked, dispatch, dataRedux, timerRef)}>
                                    {liked 
                                    ? <div className={styles['song__liked']} title='Unlike song'></div>
                                    : <div className={styles['song__not-liked']} title='Like song'></div>}
                                </div>
                            </div>
                            <div className={styles['song__artist']}>
                                <div
                                    className={styles['song__artist-preview']}
                                    style={
                                        songArtist.artist_avatar !== 'none'
                                        ? { background: `url(${songArtist.artist_avatar}) center/cover no-repeat` }
                                        : undefined
                                    }
                                    />
                                <Link to={`page/artist/${songArtist._id}`} className='link-reset'>
                                    <div className={styles['song__artist-details']} onClick={() => redirectTo('Artist', selectedSong.artist, dispatch)}>
                                        <div className={styles['song__artist-name']}>{songArtist.artist_name}</div>
                                        {/* <div className={styles.artist__details__listeners}>{songArtist.artist_listeners} monthly listeners</div> */}
                                        <div className={styles['song__artist-bio']}>{songArtist.artist_bio}</div>
                                    </div>
                                </Link>
                            </div>
                            <div className={styles['song__details']}>
                                <div className={styles['song__details-content']}>
                                    <div className={styles['song__credits-header']}>
                                        <div className={styles['song__credits-title']}>Credits</div>
                                        {/* <div className={styles.upperTitle__button}>Show all</div> */}
                                    </div>
                                        {selectedSong.features.map((feat, index) => (
                                            <div className={styles['song__feature']} key={index}>
                                                <div className={styles['song__feature-name']}>{feat.name}</div>
                                                <div className={styles['song__feature-roles']}>
                                                    {feat.roles.map((role, idx, arr) => (
                                                        <span key={idx} className={styles['song__role']}>
                                                            {role.role}
                                                            {idx < arr.length - 1 && <span>, </span>}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {song?.nextSong && (<div className={styles['song__details']}>
                                <div className={styles['song__details-content']}>
                                    <div className={styles['song__credits-header']}>
                                        <div className={styles['song__credits-title']}>Next song</div>
                                    </div>
                                    <NextSong />
                                </div>
                            </div>)}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}