import styles from './dropdownmenu-snippet.module.scss';
import { setView } from '../../../lib/redux/pages/viewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModalView } from '../../../lib/redux/pages/viewSlice';
import { useModal } from '../../../hooks/global/useModal';

export function DropdownMenu({ onLogout }) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data)
    const user_id = useSelector((state) => state.data.user._id)
    const artist_id = useSelector((state) => state.data.artist._id)
    const modal = useModal();

    return (
        <div className={"modalOverlay"}
            onClick={() => modal.closeModal("dropDownMenu")}>
            <div className={"modal"}>
                <div className={styles.dropdownMenu}>
                    <Link to={`/page/user/${user_id}`} className='link-reset'>
                        <div className={styles.dropdownMenu__Item}>
                            Profile
                        </div>
                    </Link>
                    {data.artist !== 'none' && (
                        <Link to={`/page/artist/${artist_id}`} className='link-reset'>
                            <div className={styles.dropdownMenu__Item}>
                                Artist Page
                            </div>
                        </Link>
                    )}
                    <Link to={`/settings/general`} className='link-reset'>
                        <div className={styles.dropdownMenu__Item}>
                            Settings
                        </div>
                    </Link>
                    <div className={styles.dropdownMenu__Item} onClick={() => onLogout()}>Log out</div>
                </div>
            </div>
        </div>
    );
}