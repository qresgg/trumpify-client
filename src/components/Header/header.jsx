import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './Header.module.scss';
import { setModalView, setView } from '../../lib/redux/pages/viewSlice';
import { DropdownMenu } from './snippet/dropdownmenu-snippet';
import { UserImage } from '../../hooks/UserImage';
import { SearchBar } from './snippet/searchBar-snippet';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/global/useModal';
import { setSelectedPlaylist } from '../../lib/redux/music/musicState';

import ModalOverlay from '../../shared/ModalOverlay';

export default function Header () {
    const dispatch = useDispatch();
    const { handleLogout } = useAuth();
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist);
    const { modalStateDropDownMenu, modalStateSearchMenu } = useSelector((state) => state.view.modal);
    const modal = useModal()

    return (
        <div className={styles['header']}>
            {modalStateDropDownMenu && <div className={styles['blackScreen']} onClick={() => modal.closeModal('dropDownMenu')}></div>}
            {modalStateSearchMenu && <div className={styles['blackScreen']} onClick={() => modal.closeModal('searchMenu')}></div>}
            <div className={styles['navBar']}>
                <div className={styles['navBar__logo']}>
                    <div className={styles['navBar__logo--icon']}></div>
                </div>
                <Link to="/" className='link-reset'>
                    <div className={styles['navBar__home']} onClick={() => dispatch(setSelectedPlaylist(null))}>
                        <div className={styles['navBar__home--icon']}></div>
                    </div>
                </Link>
                <SearchBar/>
                <Link to="create/song" className='link-reset'>
                    <button className={artist._id ? 'bg-prodGreenColor' : 'bg-errorColor'}>New Song</button>
                </Link>
                <Link to="create/album" className='link-reset'>
                    <button className={artist._id ? 'bg-prodGreenColor' : 'bg-errorColor'}>New Album</button>
                </Link>
            </div>
            <div className={styles['userBar']}>
                {/* <div className={styles['user-bar__subscription']}>Learn more about Premium</div> */}
                <div className={styles['userBar__dropMenu']}>
                    <div className={styles['userBar__profile']} onClick={modalStateDropDownMenu ? () => modal.closeModal('dropDownMenu') : () => modal.openModal('dropDownMenu')} title={user?.user_name}>
                        {user?.user_avatar_url !== 'none' ? (
                            <UserImage width={'48px'} height={'48px'}/>
                        ):(
                            <div className={styles['userBar__profile--icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                        )}
                    </div>
                    {modalStateDropDownMenu && <DropdownMenu onLogout={handleLogout}/>}
                </div>
            </div>
        </div>
    )
}