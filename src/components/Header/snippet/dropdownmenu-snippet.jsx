import styles from './dropdownmenu-snippet.module.scss';
import { setView } from '../../../lib/viewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedArtistPage, setSelectedUserPage } from '../../../lib/viewSlice';

export function DropdownMenu({onLogout, dropDownMenuState}) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data)

    const routePage = (page) => {
        dispatch(setView(page));
        page == "userArtistProfile" && dispatch(setSelectedArtistPage(data.artist))
        page == "userProfile" && dispatch(setSelectedUserPage(data.user))
        dropDownMenuState(dropDownMenuState());
    }
return (
    <div className={styles.dropdownMenu}>
        <div className={styles.dropdownMenu__Item} onClick={() => routePage("userProfile")}>Profile</div>
        {data.artist != 'none' && <div className={styles.dropdownMenu__Item} onClick={() => routePage("userArtistProfile")}>Artist Page</div> }
        <div className={styles.dropdownMenu__Item} onClick={() => routePage("settings")}>Settings</div>
        <div className={styles.dropdownMenu__Item} onClick={() => onLogout()}>Log out</div>
    </div>
);
}