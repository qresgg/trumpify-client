import styles from './relocateFromSearchBar.module.scss'
import { findContent } from '../../../../services/search/findService'
import { setSelectedPlaylist } from '../../../../lib/redux/music/musicState'

export function RelocateFromSearchBar({
    result,
    index
}) {
    const handleClick = async () => {
        try{
            const newData = await findContent(result.definition, result._id)
            result.definition == ('Album' || 'Playlist') && setSelectedPlaylist(newData);
        } catch(e) {
            console.error({ message: e })
        }
    }

    return (
        <div key={index} className={styles.resultData} onClick={handleClick}>
            <div className={styles.frame}>
                <img src={result.song_cover || result.cover || result.url_avatar}/>
            </div>
            <div className={styles.resultData__title}>{result.title || result.name}</div>
        </div>
    )
}