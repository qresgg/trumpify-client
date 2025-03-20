import styles from './dropdownmenu.module.scss';
import { setView } from '../../../lib/viewSlice';
import { useDispatch, useSelector } from 'react-redux';

export function DropdownMenu({onLogout, dropDownMenuState}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)

    const routePage = (page) => {
        dispatch(setView(page));
        dropDownMenuState(dropDownMenuState());
    }
return (
    <div className={styles.dropdownMenu}>
        <div className={styles.dropdownMenu__Item} onClick={() => routePage("userProfile")}>Profile</div>
        {user.artistName != 'none' && <div className={styles.dropdownMenu__Item} onClick={() => routePage("userArtistProfile")}>Artist Page</div> }
        <div className={styles.dropdownMenu__Item} onClick={() => routePage("settings")}>Settings</div>
        <div className={styles.dropdownMenu__Item} onClick={() => onLogout()}>Log out</div>
    </div>
);
}