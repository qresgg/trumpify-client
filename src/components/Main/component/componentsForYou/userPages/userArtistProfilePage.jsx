import { useDispatch, useSelector } from 'react-redux';
import styles from './userArtistProfilePage.module.scss'
import { Song } from '../../../snippets/song-snippet';
import { useSongNavigation } from '../../../../../hooks/album/useSongNavigation';
import { usePopularSongs } from '../../../../../hooks/artist/usePopularSongs';
export function UserArtistProfilePage() {
    const { currentArtistPage } = useSelector((state) => state.view)
    const songs = usePopularSongs();
    const handleSongState = useSongNavigation(songs);

    // useEffect(() => {
    //     dispatch(setActivePlaylist(currentArtistPage));
    //     dispatch(setSelectedPlaylist(currentArtistPage));
    // }, [])
    
    return (
        <div className={styles.profile}>
            <div className={styles.header}></div>
            <div className={styles.title}>
                <div className={styles.addiction}>
                    <div className={styles.info}>
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
                            <div className={styles.songs__plate}>
                                {Array.isArray(songs) ? (
                                    songs.map((song, i) => <Song song={song} index={i} songPrevNext={handleSongState} clear={true}/>)
                                ) : (
                                    <div>LOADING...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.artist_chose}></div>
                <div className={styles.music}></div>
            </div>
        </div>
    )
}