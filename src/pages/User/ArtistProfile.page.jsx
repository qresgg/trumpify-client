import styles from './styles/artistProfilePage.module.scss'
import Song from '../../shared/fragments/song.fragment';
import { Play, Pause } from 'lucide-react'
import { Selection } from '../../shared/wrappers/SelectionSlider';
import { setView } from '../../lib/redux/pages/viewSlice';
import { MainLoadingSkeleton } from '../../shared/loaders/main.loading-skeleton';
import { usePlaybackControl } from '../../hooks/global/usePlaybackControl';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useMusicActions} from "../../hooks/global/useMusicActions";
import {fetchPopSongs, fetchReleases} from "../../services/api.service";
import {fetchArtistById} from "../../services/artist.service";
import {useArtistLoader} from "../../hooks/loaders/useArtistLoader";

export default function ArtistProfilePage() {
    const { id } = useParams();
    const { loading } = useArtistLoader(id);

    const dispatch = useDispatch();
    const artist = useSelector((state) => state.data.artist);
    const selectedPlaylist = useSelector((state) => state.music.playlist.selectedPlaylist);
    const { isPlaying, togglePlay } = usePlaybackControl(selectedPlaylist, "album");
    const musicPlayer = useMusicActions();

    const { currentArtistPage } = useSelector((state) => state.view)
    const [isExpanded, setIsExpanded] = useState(false);

    if (loading) {
        return <MainLoadingSkeleton>Album Loading...</MainLoadingSkeleton>;
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

                                {selectedPlaylist?.songs && (
                                    <div className={styles['songs__plate']}>
                                    {Array.isArray(selectedPlaylist?.songs) ? (
                                        selectedPlaylist?.songs.map((song, index) => (
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
                            <Selection title="Discography" fetchFunction={fetchReleases} id={id} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}