import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './header.module.scss';
import { setView } from '../../lib/redux/pages/viewSlice';
import { DropdownMenu } from './snippet/dropdownmenu-snippet';
import { UserImage } from '../../hooks/UserImage';
import { SearchBar } from './snippet/searchBar-snippet';
import { useAuth } from '../../hooks/useAuth';

export function Header ({
    onLogout
}) {
    const dispatch = useDispatch();
    const [isDDMenuOpen, setIsDDMenuOpen] = useState(false);
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
    const [isBlackScreen, setIsBlackScreen] = useState(false);
    const { handleLogout } = useAuth();
    const user = useSelector((state) => state.data.user)

    const handleDropDownMenu = () => {
        setIsDDMenuOpen(!isDDMenuOpen);
        setIsBlackScreen(!isBlackScreen);
    }
    const handleSearchDropMenu = () => {
        setIsSearchMenuOpen(!isSearchMenuOpen);
        setIsBlackScreen(!isBlackScreen);
    }
    const BlackScreen = () => {
        setIsSearchMenuOpen(false);
        setIsDDMenuOpen(false);
        setIsBlackScreen(false);
    }

    return (
        <div className={styles.header}>
            {isBlackScreen && <div className={styles.blackScreen} onClick={BlackScreen}></div>}
            <div className={styles.navBar}>
                <div className={styles.navBar__logo}>
                    <div className={styles.logo}></div>
                </div>
                <div className={styles.navBar__home} onClick={() => dispatch(setView("home"))}>
                    <div className={styles.navBar__home__icon}></div>
                </div>
                <SearchBar searchBarState={handleSearchDropMenu} menuState={isSearchMenuOpen}/>
                <button onClick={() => dispatch(setView("artistCreate"))}>Create Artist Profile</button>
                <button onClick={() => dispatch(setView("songCreate"))}>Create Song</button>
                <button onClick={() => dispatch(setView("albumCreate"))}>Create Album</button>
            </div>
            <div className={styles.userBar}>
                {/* <div className={styles.userBar__subscription}>Learn more about Premium</div> */}
                <div className={styles.pp_dropdown}>
                    <div className={styles.userBar__profile} onClick={handleDropDownMenu} title={user.user_name}>
                        <UserImage width={'48px'} height={'48px'}/>
                    </div>
                    {isDDMenuOpen && <DropdownMenu onLogout={handleLogout} dropDownMenuState={handleDropDownMenu}/>}
                </div>
            </div>
        </div>
    )
}