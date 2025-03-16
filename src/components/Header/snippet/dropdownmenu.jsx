import styles from './dropdownmenu.module.scss';
import { setView } from '../../../lib/viewSlice';
import { useDispatch } from 'react-redux';

export function DropdownMenu({onLogout, dropDownMenuState}) {
    const dispatch = useDispatch();

    const routePage = (page) => {
        dispatch(setView(page));
        dropDownMenuState(dropDownMenuState());
    }
return (
    <div className={styles.dropdownMenu}>
        <div className={styles.dropdownMenu__Item} onClick={() => routePage("userProfile")}>Profile</div>
        <div className={styles.dropdownMenu__Item}>Artist Page</div>
        <div className={styles.dropdownMenu__Item} onClick={() => routePage("settings")}>Settings</div>
        <div className={styles.dropdownMenu__Item} onClick={() => onLogout()}>Log out</div>
    </div>
);
}