import styles from './GeneralSettings.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ChangePassword } from './changes/changePassword';
import { ChangeEmail } from './changes/changeEmail';
import { UserImage } from '../../../hooks/UserImage';
import { Link } from 'react-router-dom';

export default function GeneralSettings() {
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist)

    const [activeChange, setActiveChange] = useState(null);
    const toggleChange = (id) => {
        setActiveChange((prevId) => (prevId === id ? null : id));
    };
    
    return (
        <div className={styles['generalSettings']}>
            <h1>General Settings</h1>
            <div className={styles['generalSettings__item']}>
                <div className={styles['generalSettings__itemContainer']}>
                    {user?.user_avatar_url !== 'none' ? (
                        <UserImage width={'48px'} height={'48px'}/>
                    ):(
                        <div className={styles['generalSettings__icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                    )}
                    <div className={styles['generalSettings__name']}>{user.user_name}</div>
                </div>
                <Link to={`/page/user/${user._id}`} className='link-reset'>
                    <button>View Profile</button>
                </Link>
            </div>
            {artist == 'none' ? (
                <div className={styles['generalSettings__item']}>
                    <p>You don't have artist profile</p>
                    <Link to="/create/artist" className='link-reset'>
                        <button>Create Artist Profile</button>  
                    </Link>
                </div> 
            ) : (<div className={styles['generalSettings__item']}>
                <div className={styles['generalSettings__itemContainer']}>
                    <div className={styles['generalSettings__userAvatar']}></div>
                    <div className={styles['generalSettings__name']}>{artist.artist_name}</div>
                </div>
                <Link to={`/page/artist/${artist._id}`} className='link-reset'>
                    <button>View Profile</button>
                </Link>
            </div>)}
            <div className={styles['generalSettings__item']}>
                <div className={styles['generalSettings__itemContainer']}>
                    <div className={styles['generalSettings__caption']}>Email address</div>
                    <div className={styles['generalSettings__data']}>{user.user_email}</div>
                </div>
                <button onClick={() => toggleChange(1)}>Change Email Address</button>
            </div>
            {activeChange === 1 && (
                <ChangeEmail />
            )}
            <div className={styles['generalSettings__item']}>
                <div className={styles['generalSettings__itemContainer']}>
                    <div className={styles['generalSettings__caption']}>Password</div>
                    <div className={styles['generalSettings__data']}>**************</div>
                </div>
                <button onClick={() => toggleChange(2)}>Change Password</button>
            </div>
            {activeChange === 2 && (
                <ChangePassword />
            )}
        </div>
    )
}