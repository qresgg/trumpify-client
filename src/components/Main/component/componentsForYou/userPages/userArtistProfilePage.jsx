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

export default function UserArtistProfilePage() {
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
                <div className={styles['profile__header']}></div>
                <div className={styles['profile__banner']} style={{ backgroundImage: `url(${currentArtistPage?.artist_banner})` }}>
                    <div className={styles['profile__content']}>
                    <div className={styles['profile__info']}>
                        <div className={styles['profile__blur']}></div>
                        <div className={styles['profile__verified-label']}>
                            {currentArtistPage?.artist_is_verified && (
                                <p className={styles['profile__verified']}>Verified</p>
                            )} Artist
                        </div>
                        <div className={styles['profile__username']}>
                            {currentArtistPage?.artist_name}
                        </div>
                    </div>
                    </div>
                </div>

                <div className={styles['profile__section']}>
                    <div className={styles.songs}>
                        <div className={styles['songs__title']}>Popular songs</div>

                        <div className={styles['songs__list']}>
                            <div className={styles['songs__wrapper']}>
                            <div className={styles['songs__header']}>
                                <div className={styles['songs__header-left']}>
                                <div className={styles['songs__col-id']}>#</div>
                                <div className={styles['songs__col-name']}>Name</div>
                                </div>
                                <div className={styles['songs__header-right']}>
                                <div className={styles['songs__col-duration']}>Dur</div>
                                </div>
                            </div>

                            {songs && (
                                <div className={styles['songs__plate']}>
                                {Array.isArray(songs) ? (
                                    songs.map((song, index) => (
                                    <Song key={song._id} song={song} index={index} />
                                    ))
                                ) : (
                                    <div>LOADING...</div>
                                )}
                                    <div
                                        className={styles['songs__more-button']}
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        Show more
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>

                    <div className={styles['profile__suggestions']}></div>

                    <div className={styles['profile__discography']}>
                        <Selection title="Discography" fetchFunction={getArtistReleases} id={id} />
                    </div>
                </div>
            </div>
        )}
       </>
    )
}