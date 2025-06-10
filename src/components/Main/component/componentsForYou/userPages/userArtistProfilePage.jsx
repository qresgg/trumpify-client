import { useDispatch, useSelector } from 'react-redux';
import styles from './userArtistProfilePage.module.scss'
import { Song } from '../../../snippets/song-snippet';
import { useSongNavigation } from '../../../../../hooks/album/useSongNavigation';
import { usePopularSongs } from '../../../../../hooks/artist/usePopularSongs';
import { useState } from 'react';
export function UserArtistProfilePage() {
    const { currentArtistPage } = useSelector((state) => state.view)
    const songs = usePopularSongs();
    const halfSongs = songs.slice(0, 5);
    const handleSongState = useSongNavigation(songs);

    const [isExpanded, setIsExpanded] = useState(false);

    // const data = {
    //     popular: popularArtist,
    //     albums: albumsArtist,
    //     singles: singlesArtist
    // }
    
    return (
        <div className={styles.profile}>
            <div className={styles.header}></div>
            <div className={styles.title}>
                <div className={styles.addiction}>
                    <div className={styles.info}>
                        <div className={styles.isProfile}>{currentArtistPage.artist_isVerified && <p className={styles.verifiedIco}>Verified</p>} Artist</div>
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
                                {isExpanded ? (
                                    Array.isArray(songs) ? (
                                        songs.map((song, index) => (
                                        <Song
                                            song={song}
                                            index={index}
                                            songPrevNext={handleSongState}
                                        />
                                    ))) : (
                                        <div>LOADING...</div>
                                    )
                                ) : (
                                    Array.isArray(halfSongs) ? (
                                        halfSongs.map((song, index) => (
                                        <Song
                                            song={song}
                                            index={index}
                                            songPrevNext={handleSongState}
                                        />
                                    ))) : (
                                        <div>LOADING...</div>
                                    )
                                )}
                                <div className={styles.songs__plate__button} onClick={() => setIsExpanded(!isExpanded)}>Show more</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.artist_chose}></div>
                <div className={styles.music}>
                    <div className={styles.music__header}>
                        <div className={styles.music__header__title}>Disk</div>
                        <div className={styles.music__header__showall}></div>
                    </div>
                    <div className={styles.music__tags}></div>
                    <div className={styles.music__list}>

                    </div>
                </div>
            </div>
        </div>
    )
}