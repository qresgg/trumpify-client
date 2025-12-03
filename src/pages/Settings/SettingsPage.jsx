import styles from './SettingsPage.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../lib/redux/pages/viewSlice';
import ArtistSettings from './Pages/ArtistSettings.module.scss';
import { Outlet, Link } from 'react-router-dom';
import { UserImage } from '../../hooks/UserImage';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
    const dispatch = useDispatch();
    const settingsView = useSelector((state) => state.view.settingsView);
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist)

    return (
        <div className={styles['settings-page']}>
            <div className={styles['settings-page__header']}>
                <Link to="/settings/general" className="link-reset">
                    <div className={styles['settings-page__container']}>
                        <div className={styles['settings-page__container-icon']}>
                            <Settings />
                        </div>
                        <div className={styles['settings-page__info']}>
                            <div className={styles['settings-page__info-name']}>General</div>
                            <div className={styles['settings-page__info-desc']}>Global settings</div>
                        </div>
                    </div>
                </Link>
                <Link className="link-reset">
                    <div className={styles['settings-page__container']}>
                        {user?.user_avatar_url !== 'none' ? (
                            <UserImage width={'48px'} height={'48px'}/>
                        ):(
                            <div className={styles['settings-page__container-icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                        )}
                        <div className={styles['settings-page__info']}>
                            <div className={styles['settings-page__info-name']}>{user.user_name}</div>
                            <div className={styles['settings-page__info-desc']}>Your personal account</div>
                        </div>
                    </div>
                </Link>
                <Link to="/settings/artist" className="link-reset">
                    <div className={styles['settings-page__container']}>
                        {artist && 
                        (<>
                            <div className={styles['settings-page__container-icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                            <div className={styles['settings-page__info']}>
                                <div className={styles['settings-page__info-name']}>{artist.artist_name}</div>
                                <div className={styles['settings-page__info-desc']}>Artist profile</div>
                            </div>
                        </>)}
                    </div>
                </Link>
            </div>
            <div className={styles['settings-page__main']}>
                <div className={styles['settings-page__panel']}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}