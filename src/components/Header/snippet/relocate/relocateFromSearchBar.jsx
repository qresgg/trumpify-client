import styles from './relocateFromSearchBar.module.scss'
import { findContent } from '../../../../services/search/findService'
import { setSelectedPlaylist } from '../../../../lib/redux/music/musicState'
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

    return (
        <div key={index} className={styles.resultData} onClick={handleClick}>
            <div className={styles.frame}>
                <img src={result.song_cover || result.cover || result.url_avatar}/>
            </div>
            <div className={styles.resultData__title}>{result.title || result.name || result.user_name}</div>
        </div>
    )
}