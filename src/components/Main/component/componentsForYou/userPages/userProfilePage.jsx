import { useDispatch, useSelector } from 'react-redux';
import styles from './userProfilePage.module.scss'
import { usePalette } from 'react-palette';
import { useEffect, useState } from 'react';
import { InfoChange } from './snippet/userInfoChange';
import { UserImage } from '../../../../../hooks/UserImage';
import { getUserData } from '../../../../../services/user/userService';
import { setSelectedUserPage } from '../../../../../lib/redux/pages/viewSlice';

export function UserProfilePage() {
    const dispatch = useDispatch();
    const { currentUserPage } = useSelector((state) => state.view)
    const user = useSelector((state) => state.data.user)
    const [isOpened, setIsOpened] = useState(false)
    const [updateInfo, setUpdateInfo] = useState(false);
    const [originUser, setOriginUser] = useState(false);

    useEffect(() => {
        if (user.user_id === currentUserPage.user_id){
            setOriginUser(true);
            console.log('This is your page')
        }
        const fetchUserData = async () => {
            try{
                const response = await getUserData();
                dispatch(setSelectedUserPage(response.user));
            } catch (error) {
                console.error();
            }
        }

        fetchUserData();
    }, [updateInfo])

    const urlImage = currentUserPage.user_avatar_url;
    const { data, loading, error } = usePalette(urlImage);
    
    const handleIsOpened = (data) => {
        setIsOpened(false);
        if (data){
            setUpdateInfo(!updateInfo);
        }
    }
    const openModal = () => {
        originUser && setIsOpened(true);
    }
    const backgroundGradient = {
        background: `linear-gradient(to bottom, ${data.lightMuted}, ${data.darkMuted})`
    }

    return (
        <div className={styles.profile}>
                { isOpened && <div className={styles.blackScreen}></div>}
                <div className={styles.title} style={backgroundGradient}>
                    <div className={styles.addiction} onClick={openModal}>
                        <div className={styles.image}>
                            <UserImage width={'210px'} height={'210px'}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.isProfile}>Profile</div>
                            <div className={styles.userName}>{currentUserPage.user_name}</div>
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