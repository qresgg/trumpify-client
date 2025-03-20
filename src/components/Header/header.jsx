import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './header.module.scss';
import { setView } from '../../lib/viewSlice';
import { DropdownMenu } from './snippet/dropdownmenu';
import { UserImage } from '../../hooks/UserImage';

export function Header ({
    onLogout
}) {
    const dispatch = useDispatch();
    const [isDDMenuOpen, setIsDDMenuOpen] = useState(false);

    const handleDropDownMenu = () => {
        setIsDDMenuOpen(!isDDMenuOpen);
    }

    return (
        <div className={styles.header}>
            <div className={styles.navBar}>
                <div className={styles.navBar__logo}>1</div>
                <div className={styles.navBar__home} onClick={() => dispatch(setView("home"))}></div>
                <input className={styles.navBar__search} type="text" />
                <button onClick={() => dispatch(setView("artistCreate"))}>Create Artist Profile</button>
                <button onClick={() => dispatch(setView("songCreate"))}>Create Song</button>
                <button onClick={() => dispatch(setView("albumCreate"))}>Create Album</button>
            </div>
            <div className={styles.userBar}>
                <div className={styles.userBar__subscription}>Дізнатись більше про Premium</div>
                <div className={styles.pp_dropdown}>
                    <div className={styles.userBar__profile} onClick={handleDropDownMenu}>
                        <UserImage width={'48px'} height={'48px'}/>
                    </div>
                    {isDDMenuOpen && <DropdownMenu onLogout={onLogout} dropDownMenuState={handleDropDownMenu}/>}
                </div>
            </div>
        </div>
    )
}