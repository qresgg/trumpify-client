import { useDispatch, useSelector } from 'react-redux';
import { usePopularSongs } from '../../../../../hooks/artist/usePopularSongs';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToLoadedOne } from '../../../../../lib/redux/data/loadedSlice';

import styles from './userArtistProfilePage.module.scss'
import { Song } from '../../../snippets/song-snippet';
import { setActivePlaylist, setSelectedPlaylist } from '../../../../../lib/redux/music/musicState';
import getPopularSongsArtistPage from '../../../../../services/artist/data/get/popularSongsData';
import { Selection } from '../snippets/selection-snippet';
import getSongData from '../../../../../services/artist/data/get/songData';
import getArtistReleases from '../../../../../services/artist/data/get/artistReleases';
import { isOriginArtistPage } from '../../../../../services/auth/isOriginPage';
import { setView } from '../../../../../lib/redux/pages/viewSlice';
import { MainContainerSkeleton } from '../../../Loadings/mainContainer-skeleton';

import { findContent } from '../../../../../services/search/findService';

export function UserArtistProfilePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);

    const { currentArtistPage } = useSelector((state) => state.view)
    const { artists } = useSelector((state) => state.loaded)
    const [songs, setSongs] = useState({});
    const [halfSongs, setHalfSongs] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [originArtist, setOriginArtist] = useState(false);

    useEffect(() => {
        const getPopSongs = async () => {
            try {
                const res = await getPopularSongsArtistPage(id);
                if (res) {
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
                const res = await getArtistReleases(id);
            } catch (error) {
                console.error(error)
            }
        }
        getPopSongs();
        getReleases();
    }, [id, dispatch])

    const fetchArtist = async () => {
        if (!id) return;
        setLoading(true)
        try {
            const res = await findContent('Artist', id);
            dispatch(setView({ view: 'currentArtistPage', value: res}));
            dispatch(addToLoadedOne({ type: "artist", value: res}));
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
      const artist = artists?.find(artists => artists._id === id);
      if (artist) {
        dispatch(setView({ view: 'currentArtistPage', value: artist}));
        setLoading(false);
      } else {
        fetchArtist();
      }
    }, [id, dispatch]);

    if (loading) {
        return <MainContainerSkeleton>Album Loading</MainContainerSkeleton>;
    }

    return (
       <>
        {!loading && (
            <div className={styles.profile}>
                <div className={styles.header}></div>
                <div className={styles.title} style={{ backgroundImage: `url(${currentArtistPage?.artist_banner})` }}>
                    <div className={styles.addiction}>
                        <div className={styles.info}>
                            <div className={styles.backgroundBlur}></div>
                            <div className={styles.isProfile}>{currentArtistPage?.artist_is_verified && <p className={styles.verifiedIco}>Verified</p>} Artist</div>
                            <div className={styles.userName}>{currentArtistPage?.artist_name}</div>
                            {/* <div className={styles.playlistCount}>0 listeners per month</div> */}
                        </div>
                    </div>
                </div>
                <div className={styles.statistic}>  
                    {originArtist && (
                        <>
                            
                        </>
                    )}
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
                                                <Fragment key={song._id}>
                                                    <Song
                                                        song={song}
                                                        index={index}
                                                    />
                                                </Fragment>
                                            ))) : (
                                                <div>LOADING...</div>
                                            )
                                        ) : (
                                            Array.isArray(songs) ? (
                                                songs.map((song, index) => (
                                                <Fragment key={song._id}>
                                                    <Song
                                                        song={song}
                                                        index={index}
                                                    />
                                                </Fragment>
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
                        <Selection title="Discography" fetchFunction={getArtistReleases} id={id}/>
                    </div>
                </div>
            </div>
        )}
       </>
    )
}