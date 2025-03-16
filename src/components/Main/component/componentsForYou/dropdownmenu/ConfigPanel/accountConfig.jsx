import styles from './accountConfig.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ChangePassword } from './capitalize/changePassword';
import { ChangeEmail } from './capitalize/changeEmail';
import { setView } from '../../../../../../lib/viewSlice';

export function AccountConfig() {
    const userG = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [activeChange, setActiveChange] = useState(null);
    const toggleChange = (id) => {
        setActiveChange((prevId) => (prevId === id ? null : id));
    };
    
    return (
        <>
            <div>
                <div className={styles.accountConfig}>
                    <h1>Account</h1>
                    <div className={styles.setting}>
                        <div className={styles.container}>
                            <div className={styles.user_avatar}></div>
                            <div>{userG.userName}</div>
                        </div>
                        <button>View Profile</button>
                    </div>
                    {userG.artistName == 'none' ? (
                        <div className={styles.setting}>
                            <p>You don't have artist profile</p>
                            <button onClick={() => dispatch(setView("artistCreate"))}>Create Artist Profile</button>  
                        </div> 
                    ) : (<div className={styles.setting}>
                        <div className={styles.container}>
                            <div className={styles.user_avatar}></div>
                            <div>{userG.artistName}</div>
                        </div>
                        <button>View Profile</button>
                    </div>)}
                    <div className={styles.setting}>
                        <div className={styles.container}>
                            <div className={styles.title}>Change Email</div>
                            <div className={styles.data}>{userG.userEmail}</div>
                        </div>
                        <button onClick={() => toggleChange(1)}>Change</button>
                    </div>
                    {activeChange === 1 && (
                        <ChangeEmail />
                    )}
                    <div className={styles.setting}>
                        <div className={styles.container}>
                            <div className={styles.title}>Change Password</div>
                            <div className={styles.data}>**************</div>
                        </div>
                        <button onClick={() => toggleChange(2)}>Change</button>
                    </div>
                    {activeChange === 2 && (
                        <ChangePassword />
                    )}
                </div>
            </div>
        </>
    )
}