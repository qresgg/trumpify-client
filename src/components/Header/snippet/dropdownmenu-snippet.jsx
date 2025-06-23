import styles from './dropdownmenu-snippet.module.scss';
import { setView } from '../../../lib/redux/pages/viewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModalView } from '../../../lib/redux/pages/viewSlice';
import { useModal } from '../../../hooks/useModal';

export function DropdownMenu({onLogout}) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data)
    const user_id = useSelector((state) => state.data.user._id)
    const artist_id = useSelector((state) => state.data.artist._id)
    const modal = useModal();
    const { modalStateDropDownMenu } = useSelector((state) => state.view.modal);

    const routePage = (page) => {
        page == "userArtistProfile" && dispatch(setView({ view: 'currentArtistPage', value: data.artist }))
        page == "userProfile" && dispatch(setView({ view: 'currentUserPage', value: data.user }))
        modal.closeModal('dropDownMenu');
    }
return (
        <div className={styles.dropdownMenu}>
            <Link to={`/page/user/${user_id}`} className='link-reset'>
                <div className={styles.dropdownMenu__Item} onClick={() => routePage("userProfile")}>
                    Profile
                </div>
            </Link>
            {data.artist != 'none' && (
                <Link to={`/page/artist/${artist_id}`} className='link-reset'>
                    <div className={styles.dropdownMenu__Item} onClick={() => routePage("userArtistProfile")}>
                        Artist Page
                    </div>
                </Link>
            )}
            <Link to={`/settings`} className='link-reset'>
                <div className={styles.dropdownMenu__Item} onClick={() => routePage("userArtistProfile")}>
                    Settings
                </div>
            </Link>
            <div className={styles.dropdownMenu__Item} onClick={() => onLogout()}>Log out</div>
        </div>
    );
}