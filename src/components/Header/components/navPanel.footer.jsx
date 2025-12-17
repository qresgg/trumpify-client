import styles from "../../Footer/footer.module.scss";
import {ActiveSong} from "../../Footer/components/activeSong";
import {SongController} from "../../../shared/controllers/song.controller";
import {Link} from "react-router-dom";
import {musicPlayer} from "../../../lib/redux/music/musicState";
import {useMusicActions} from "../../../hooks/global/useMusicActions";

export function NavPanelFooter() {
    const musicPlayer = useMusicActions();

    return (
        <div className={styles['navPanel']}>
            <Link to="/" className='link-reset'>
                <div className={styles['navPanel__home']} onClick={() => musicPlayer.closeSelectedSong()}>
                    <div className={styles['navBar__home--icon']}>Home</div>
                </div>
            </Link>
            <div className={'color-white'}>
                Search
            </div>
            <div className={'color-white'}>
                Your Library
            </div>
        </div>
    )
}