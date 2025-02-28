import styles from '../main.module.scss';
import { Song } from '../snippets/song-snippet';
import { usePalette } from 'react-palette';


export function ForYou({selectedPlaylist}){

    const trackCount = selectedPlaylist ? selectedPlaylist.tracks.length : 0;
    const convertToSeconds = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }
    const convertToMMSS = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    const totalDurationInSeconds = selectedPlaylist
        ? selectedPlaylist.tracks.reduce((acc, track) => acc + convertToSeconds(track.duration), 0)
        : 0;
    const totalDuration = convertToMMSS(totalDurationInSeconds)

    const regex = /[\s.,']+/g;
    
    const formattedArtist = selectedPlaylist ? selectedPlaylist.artist.replace(regex, '').toLowerCase() : null;
    const formattedTitle = selectedPlaylist ? selectedPlaylist.title.replace(regex, '').toLowerCase(): null;

    const urlImage = selectedPlaylist ? `/album-covers/${formattedArtist}_${formattedTitle}.jpg` : null;
    const albumCover = selectedPlaylist ? {
        backgroundImage: `url("${urlImage}")`
    } : {};

    const { data, loading, error } = usePalette(urlImage)

    return(
        <>
            <div className={styles.foryou}>
                {selectedPlaylist && (
                    <div className={styles.playlist}>
                        <div className={styles.playlist__title} style={{background: `linear-gradient(to bottom, white, ${data.muted})`}}>
                            <div className={styles.playlist__title__container}>
                                <div className={styles.image} style={albumCover}></div>
                                <div className={styles.info}>
                                    <div className={styles.info__type}>{selectedPlaylist.type}</div>
                                    <div className={styles.info__albumName}>{selectedPlaylist.title}</div>
                                    <div className={styles.info__otherInfo}>
                                        <p className={styles.artist}>{selectedPlaylist.artist} •</p>
                                        <p className={styles.year}>{selectedPlaylist.year} •</p>
                                        <p className={styles.trackCount}>{trackCount} songs, {totalDuration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.playlist__tracks}>
                            <div className={styles.nav}>
                                <button></button>
                                <button></button>
                            </div>
                            <div className={styles.tracks}>
                                <div className={styles.tabulation}>
                                    <div className={styles.tabulation__start}>
                                        <div className={styles.tabulation__id}>#</div>
                                        <div className={styles.tabulation__name}>Назва</div>
                                    </div>
                                    <div className={styles.tabulation__end}>
                                        <div className={styles.tabulation__duration}>Час</div>
                                    </div>
                                </div>
                                <div className={styles.tracks__trackplate}>
                                    {selectedPlaylist.tracks.map((song, index) => (
                                        <Song song={song} id={index + 1}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}