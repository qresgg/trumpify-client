import styles from './relocateFromSearchBar.module.scss'
import { setActiveSong, setSelectedPlaylist, setSelectedSong } from '../../../../lib/redux/music/musicState'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { setView } from '../../../../lib/redux/pages/viewSlice'

export function RelocateFromSearchBar({ result, index }) {
    const dispatch = useDispatch()

    const playMusic = async (song) => {
        dispatch(setActiveSong({ song: song, index: 0}))
        dispatch(setSelectedSong(song))
    }

    const handleClick = () => {
        switch (result.definition) {
            case 'Album': 
                dispatch(setSelectedPlaylist(result));
                break;
            case 'Artist':
                dispatch(setView({ view: "currentArtistPage", value: result }));
                break;
            case 'User': 
                dispatch(setView({ view: 'currentUserPage', value: result }));
                break;
            default:
                break;
        }
    };

    const getLinkPath = () => {
        const id = result._id;
        switch (result.definition) {
            case 'Album': return `/page/album/${id}`;
            case 'Artist': return `/page/artist/${id}`;
            case 'User': return `/page/user/${id}`;
            case 'LikedCollection': return `/page/likedCollection/${id}`;
            default: return '';
        }
    };

    return (
        <Link to={getLinkPath()} onClick={handleClick} className="link-reset">
            <div key={index} className={styles.resultData}>
                <div className={styles.frame}>
                    <img src={result.song_cover || result.cover || result.url_avatar || result.artist_avatar}/>
                </div>
                <div className={styles.resultData__title}>{result.title || result.artist_name || result.user_name}</div>
            </div>
        </Link>
    )
}