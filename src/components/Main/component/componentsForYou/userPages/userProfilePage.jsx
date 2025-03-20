import { useSelector } from 'react-redux';
import styles from './userProfilePage.module.scss'
import { usePalette } from 'react-palette';
import { useEffect, useState } from 'react';
import { InfoChange } from './snippet/userInfoChange';
import { UserImage } from '../../../../../hooks/UserImage';

export function UserProfilePage() {
    const user = useSelector((state) => state.user.user);
    const cloud = useSelector((state) => state.user)
    const [isOpened, setIsOpened] = useState(false)
    const [userName, setUserName] = useState('');

    const urlImage = user.urlAvatar;
    console.log(urlImage);
    
    const { data, loading, error } = usePalette(urlImage);

    useEffect(() => {
        console.log(user.userName)
    }, [user])

    const handleIsOpened = () => {
        setIsOpened(false);
    }
    const backgroundGradient = {
        background: `linear-gradient(to bottom, ${data.lightMuted}, ${data.darkMuted})`
    }

    return (
        <div className={styles.profile}>
                { isOpened && <div className={styles.blackScreen}></div>}
                <div className={styles.title} style={backgroundGradient}>
                    <div className={styles.addiction} onClick={() => setIsOpened(true)}>
                        <div className={styles.image}>
                            <UserImage width={'210px'} height={'210px'}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.isProfile}>Profile</div>
                            <div className={styles.userName}>{user.userName}</div>
                            <div className={styles.playlistCount}>0 Playlist is public</div>
                        </div>
                    </div>
                </div>
                <div className={styles.statistic}>  
                    12312
                </div>
            
            { isOpened &&  <InfoChange onOpened={handleIsOpened}/> }
        </div>
    )
}