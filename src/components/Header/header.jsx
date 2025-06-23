import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './header.module.scss';
import { setModalView, setView } from '../../lib/redux/pages/viewSlice';
import { DropdownMenu } from './snippet/dropdownmenu-snippet';
import { UserImage } from '../../hooks/UserImage';
import { SearchBar } from './snippet/searchBar-snippet';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';

export function Header () {
    const dispatch = useDispatch();
    const { handleLogout } = useAuth();
    const user = useSelector((state) => state.data.user);
    const { modalStateDropDownMenu, modalStateSearchMenu } = useSelector((state) => state.view.modal);
    const modal = useModal()

    return (
        <div className={styles.header}>
            {modalStateDropDownMenu && <div className={styles.blackScreen} onClick={() => modal.closeModal('dropDownMenu')}></div>}
            {modalStateSearchMenu && <div className={styles.blackScreen} onClick={() => modal.closeModal('searchMenu')}></div>}
            <div className={styles.navBar}>
                <div className={styles.navBar__logo}>
                    <div className={styles.logo}></div>
                </div>
                <Link to="/">
                    <div className={styles.navBar__home}>
                        <div className={styles.navBar__home__icon}></div>
                    </div>
                </Link>
                <SearchBar/>
                <Link to="create/song"><button>New Song</button></Link>
                <Link to="create/album"><button>New Album</button></Link>
            </div>
            <div className={styles.userBar}>
                {/* <div className={styles.userBar__subscription}>Learn more about Premium</div> */}
                <div className={styles.pp_dropdown}>
                    <div className={styles.userBar__profile} onClick={() => modal.openModal('dropDownMenu')} title={user?.user_name}>
                        <UserImage width={'48px'} height={'48px'}/>
                    </div>
                    {modalStateDropDownMenu && <DropdownMenu onLogout={handleLogout}/>}
                </div>
            </div>
        </div>
    )
}