import styles from './accountConfig.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ChangePassword } from './AccountChanges/changePassword';
import { ChangeEmail } from './AccountChanges/changeEmail';
import { UserImage } from '../../../hooks/UserImage';
import { Link } from 'react-router-dom';

export function AccountConfig() {
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist)

    const dispatch = useDispatch();

    const [activeChange, setActiveChange] = useState(null);
    const toggleChange = (id) => {
        setActiveChange((prevId) => (prevId === id ? null : id));
    };
    
    return (
        <div className={styles.accountConfig}>
            <h1>Account</h1>
            <div className={styles.setting}>
                <div className={styles.container}>
                    {user?.user_avatar_url !== 'none' ? (
                        <UserImage width={'48px'} height={'48px'}/>
                    ):(
                        <div className={styles['container__icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                    )}
                    <div className={styles.name}>{user.user_name}</div>
                </div>
                <Link to={`/page/user/${user._id}`} className='link-reset'>
                    <button>View Profile</button>
                </Link>
            </div>
            {artist == 'none' ? (
                <div className={styles.setting}>
                    <p>You don't have artist profile</p>
                    <Link to="/create/artist" className='link-reset'>
                        <button>Create Artist Profile</button>  
                    </Link>
                </div> 
            ) : (<div className={styles.setting}>
                <div className={styles.container}>
                    <div className={styles.user_avatar}></div>
                    <div className={styles.name}>{artist.artist_name}</div>
                </div>
                <Link to={`/page/artist/${artist._id}`} className='link-reset'>
                    <button>View Profile</button>
                </Link>
            </div>)}
            <div className={styles.setting}>
                <div className={styles.container}>
                    <div className={styles.title}>Email address</div>
                    <div className={styles.data}>{user.user_email}</div>
                </div>
                <button onClick={() => toggleChange(1)}>Change Email Address</button>
            </div>
            {activeChange === 1 && (
                <ChangeEmail />
            )}
            <div className={styles.setting}>
                <div className={styles.container}>
                    <div className={styles.title}>Password</div>
                    <div className={styles.data}>**************</div>
                </div>
                <button onClick={() => toggleChange(2)}>Change Password</button>
            </div>
            {activeChange === 2 && (
                <ChangePassword />
            )}
        </div>
    )
}