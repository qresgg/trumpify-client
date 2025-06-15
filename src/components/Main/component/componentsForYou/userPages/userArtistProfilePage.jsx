import { useDispatch, useSelector } from 'react-redux';
import styles from './userArtistProfilePage.module.scss'
import { Song } from '../../../snippets/song-snippet';
import { usePopularSongs } from '../../../../../hooks/artist/usePopularSongs';
import { useEffect, useState } from 'react';
import { setActivePlaylist, setSelectedPlaylist } from '../../../../../lib/redux/music/musicState';
import getPopularSongsArtistPage from '../../../../../services/artist/data/get/popularSongsData';
import { Selection } from '../snippets/selection-snippet';
import getSongData from '../../../../../services/artist/data/get/songData';
import getArtistReleases from '../../../../../services/artist/data/get/artistReleases';

export function UserArtistProfilePage() {
    const dispatch = useDispatch()
    const { currentArtistPage } = useSelector((state) => state.view)
    const [songs, setSongs] = useState({});
    const [halfSongs, setHalfSongs] = useState()
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const getPopSongs = async () => {
            try {
                const res = await getPopularSongsArtistPage(currentArtistPage.artist_id);
                if (res) {
                    dispatch(setActivePlaylist({ songs: res}));
                    dispatch(setSelectedPlaylist({ songs: res}));
                    setSongs(res);
                } else {
                    setSongs(null)
                }
            } catch (error) {
                console.error(error)
            }
        }
        const getReleases = async () => {
            try {
                const res = await getArtistReleases(currentArtistPage.artist_id);
                console.log('RESPONSSE', res);
            } catch (error) {
                console.error(error)
            }
        }
        getPopSongs();
        getReleases();
    }, [currentArtistPage])

    // useEffect(() => {
    //     const artistPages = {
    //         songs: songs
    //     }
    //     songs && dispatch(setActivePlaylist(artistPages))
    // }, [currentArtistPage])

    return (
        <div className={styles.profile}>
            <div className={styles.header}></div>
            <div className={styles.title} style={{ backgroundImage: `url(${currentArtistPage?.artist_banner})` }}>
                <div className={styles.addiction}>
                    <div className={styles.info}>
                        <div className={styles.backgroundBlur}></div>
                        <div className={styles.isProfile}>{currentArtistPage.artist_is_verified && <p className={styles.verifiedIco}>Verified</p>} Artist</div>
                        <div className={styles.userName}>{currentArtistPage.artist_name}</div>
                        <div className={styles.playlistCount}>0 listeners per month</div>
                    </div>
                </div>
            </div>
            <div className={styles.statistic}>  
                <div className={styles.popular_songs}>
                    <div className={styles.popular_songs__title}>Popular songs</div>
                    <div className={styles.popular_songs__list}>
                        <div className={styles.container}>
                            <div className={styles.tabulation}>
                                <div className={styles.tabulation__start}>
                                    <div className={styles.tabulation__id}>#</div>
                                    <div className={styles.tabulation__name}>Name</div>
                                </div>
                                <div className={styles.tabulation__end}>
                                    <div className={styles.tabulation__duration}>Dur</div>
                                </div>
                            </div>
                            {songs && (
                                <div className={styles.songs__plate}>
                                    {isExpanded ? (
                                        Array.isArray(songs) ? (
                                            songs.map((song, index) => (
                                            <Song
                                                song={song}
                                                index={index}
                                            />
                                        ))) : (
                                            <div>LOADING...</div>
                                        )
                                    ) : (
                                        Array.isArray(songs) ? (
                                            songs.map((song, index) => (
                                            <Song
                                                song={song}
                                                index={index}
                                            />
                                        ))) : (
                                            <div>LOADING...</div>
                                        )
                                    )}
                                    <div className={styles.songs__plate__button} onClick={() => setIsExpanded(!isExpanded)}>Show more</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.artist_chose}></div>
                <div className={styles.music}>
                    <Selection title="Discography" fetchFunction={getArtistReleases} id={currentArtistPage.artist_id}/>
                </div>
            </div>
        </div>
    )
}