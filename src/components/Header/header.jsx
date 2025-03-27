import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './header.module.scss';
import { setView } from '../../lib/viewSlice';
import { DropdownMenu } from './snippet/dropdownmenu-snippet';
import { UserImage } from '../../hooks/UserImage';
import { SearchBar } from './snippet/searchBar-snippet';

export function Header ({
    onLogout
}) {
    const dispatch = useDispatch();
    const [isDDMenuOpen, setIsDDMenuOpen] = useState(false);
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
    const [isBlackScreen, setIsBlackScreen] = useState(false);


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
                <div className={styles.navBar__logo}>1</div>
                <div className={styles.navBar__home} onClick={() => dispatch(setView("home"))}></div>
                <SearchBar searchBarState={handleSearchDropMenu} menuState={isSearchMenuOpen}/>
                <button onClick={() => dispatch(setView("artistCreate"))}>Create Artist Profile</button>
                <button onClick={() => dispatch(setView("songCreate"))}>Create Song</button>
                <button onClick={() => dispatch(setView("albumCreate"))}>Create Album</button>
            </div>
            <div className={styles.userBar}>
                {/* <div className={styles.userBar__subscription}>Learn more about Premium</div> */}
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