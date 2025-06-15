import styles from './relocateFromSearchBar.module.scss'
import { findContent } from '../../../../services/search/findService'
import { setActiveSong, setSelectedPlaylist, setSelectedSong } from '../../../../lib/redux/music/musicState'
import ShowPage from '../../../../hooks/showPage'
import { useDispatch } from 'react-redux'

export function RelocateFromSearchBar({
    result,
    index
}) {
    const dispatch = useDispatch()

    const handleClick = async () => {
        ShowPage(result.definition, result._id, dispatch)
    }
    
    const playMusic = async (song) => {
        dispatch(setActiveSong({ song: song, index: 0}))
        dispatch(setSelectedSong(song))
    }

    return (
        <div key={index} className={styles.resultData} onClick={() => {
            if(result.definition === "Song") {
                return playMusic(result); 
            } else {
                return handleClick();
            }
        }} >
            <div className={styles.frame}>
                <img src={result.song_cover || result.cover || result.url_avatar || result.artist_avatar}/>
            </div>
            <div className={styles.resultData__title}>{result.title || result.name || result.user_name}</div>
        </div>
    )
}