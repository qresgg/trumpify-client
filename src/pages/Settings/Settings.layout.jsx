import styles from './styles/settingsLayout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { UserImage } from '../../hooks/UserImage';
import { Settings } from 'lucide-react';

export default function SettingsLayout() {
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist)

    return (
        <div className={styles['settings']}>
            <div className={styles['settings__header']}>
                <Link to="/settings/general" className="link-reset">
                    <div className={styles['container']}>
                        <div className={styles['container__icon']}>
                            <Settings />
                        </div>
                        <div className={styles['container__info']}>
                            <div className={styles['container__name']}>General</div>
                            <div className={styles['container__description']}>Global settings</div>
                        </div>
                    </div>
                </Link>
                <Link className="link-reset">
                    <div className={styles['container']}>
                        {user?.user_avatar_url !== 'none' ? (
                            <UserImage width={'48px'} height={'48px'}/>
                        ):(
                            <div className={styles['container__icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                        )}
                        <div className={styles['container__info']}>
                            <div className={styles['container__name']}>{user.user_name}</div>
                            <div className={styles['container__description']}>Your personal account</div>
                        </div>
                    </div>
                </Link>
                <Link to="/settings/artist" className="link-reset">
                    <div className={styles['container']}>
                        {artist && 
                        (<>
                            <div className={styles['container__icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                            <div className={styles['container__info']}>
                                <div className={styles['container__name']}>{artist.artist_name}</div>
                                <div className={styles['container__description']}>Artist profile</div>
                            </div>
                        </>)}
                    </div>
                </Link>
            </div>
            <div className={styles['settings__main']}>
                <div className={styles['settings__panel']}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}