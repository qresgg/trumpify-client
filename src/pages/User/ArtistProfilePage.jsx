import styles from './ArtistProfilePage.module.scss'
import Song from '../../components/Main/shared/Song-snippet';
import { Play, Pause } from 'lucide-react'
import { addToLoadedOne } from '../../lib/redux/data/loadedSlice';

import { setActivePlaylist, setSelectedPlaylist } from '../../lib/redux/music/musicState';
import { Selection } from '../../shared/SelectionSlider';

import getPopularSongsArtistPage from '../../services/artist/queries/getPopularSongs';
import getSongData from '../../services/artist/queries/getSongData';
import getArtistReleases from '../../services/artist/queries/getReleases';

// import { isOriginArtistPage } from '../../../../../services/auth/isOriginPage';
import { setView } from '../../lib/redux/pages/viewSlice';
import { MainContainerSkeleton } from '../../components/Main/loadings/mainContainer-skeleton';

import { findContent } from '../../services/search/searchService';

import { usePlaybackControl } from '../../hooks/global/usePlaybackControl';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ArtistProfilePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const artist = useSelector((state) => state.data.artist);
    const selectedPlaylist = useSelector((state) => state.music.playlist.selectedPlaylist);
    const [ loading, setLoading ] = useState(true);
    const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, "album");

    const { currentArtistPage } = useSelector((state) => state.view)
    const { artists } = useSelector((state) => state.loaded)
    const [songs, setSongs] = useState({});
    const [halfSongs, setHalfSongs] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [originArtist, setOriginArtist] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchAll = async () => {
            setLoading(true);
            try {
                let artistData = artists?.find(artist => artist._id === id);
                
                if (!artistData) {
                    const res = await findContent('Artist', id);
                    artistData = res;
                    dispatch(addToLoadedOne({ type: "artist", value: res }));
                }

                dispatch(setView({ view: 'currentArtistPage', value: artistData }));

                const [songsRes, releasesRes] = await Promise.all([
                    getPopularSongsArtistPage(id),
                    getArtistReleases(id)
                ]);

                setSongs(songsRes ?? null);
                dispatch(setSelectedPlaylist({ _id: artistData._id, songs: songsRes ?? [] }));

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id, dispatch, artists]);


    if (loading) {
        return <MainContainerSkeleton>Album Loading...</MainContainerSkeleton>;
    }

    return (
        <>
            {!loading && (
                <div className={styles['profile']}>
                    <div className={styles['profile__header']}></div>
                    <div className={styles['profile__bannerAbstract']} style={{ backgroundImage: `url(${currentArtistPage?.artist_banner})` }}></div>
                    <div className={styles['profile__banner']} style={{ backgroundImage: `url(${currentArtistPage?.artist_banner})` }}>
                        <div className={styles['profile__content']}>
                        <div className={styles['profile__info']}>
                            <div className={styles['profile__blur']}></div>
                            <div className={styles['profile__verifiedLabel']}>
                                {currentArtistPage?.artist_is_verified && (
                                    <p className={styles['profile__verified']}>Verified</p>
                                )} Artist
                            </div>
                            <div className={styles['profile__artistName']}>
                                {currentArtistPage?.artist_name}
                                {currentArtistPage?.artist_region?.region?.code}
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className={styles['profile__section']}>
                        <div className={styles['songs']}>
                            <div onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </div>
                            <div className={styles['songs__title']}>Popular songs</div>
                            <div className={styles['songs__list']}>
                                <div className={styles['songs__wrapper']}>
                                <div className={styles['songs__header']}>
                                    <div className={styles['songs__headerLeft']}>
                                        <div className={styles['songs__colId']}>#</div>
                                        <div className={styles['songs__colName']}>Name</div>
                                    </div>
                                    <div className={styles['songs__headerRight']}>
                                        <div className={styles['songs__colDuration']}>Dur</div>
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
                                            className={styles['songs__moreButton']}
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