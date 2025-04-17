import { useDispatch, useSelector } from 'react-redux';
import styles from './userProfilePage.module.scss'
import { useEffect, useState } from 'react';
import { InfoChange } from './snippet/userInfoChange';
import { UserImage } from '../../../../../hooks/UserImage';
import { getUserData } from '../../../../../services/user/userService';
import { setSelectedUserPage } from '../../../../../lib/redux/pages/viewSlice';
import { isOriginPage } from '../../../../../services/auth/isOriginPage';
import fetchColors from '../../../../../hooks/global/colorPalette';

export function UserProfilePage() {
    const dispatch = useDispatch();
    const { currentUserPage } = useSelector((state) => state.view)
    const user = useSelector((state) => state.data.user)
    const [isOpened, setIsOpened] = useState(false)
    const [updateInfo, setUpdateInfo] = useState(false);
    const [originUser, setOriginUser] = useState(false);
    const [gradient, setGradient] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await getUserData();
                if (currentUserPage === user) {
                    dispatch(setSelectedUserPage(response.user));
                }
            } catch (error) {
                console.error();
            }
        }

        fetchUserData();
    }, [updateInfo])

    useEffect(() => {
        setOriginUser(isOriginPage(user, currentUserPage));
    }, [currentUserPage, user])

    
    const handleIsOpened = (data) => {
        setIsOpened(false);
        if (data){
            setUpdateInfo(!updateInfo);
        }
    }
    const openModal = () => {
        originUser && setIsOpened(true);
    }

    useEffect(() => {      
        const getColors = async () => {
            setGradient(await fetchColors(currentUserPage));
        }
        getColors();
    }, [currentUserPage]);

    return (
        <div className={styles.profile}>
                { isOpened && <div className={styles.blackScreen}></div>}
                <div className={styles.title} style={gradient}>
                    <div className={styles.addiction} onClick={openModal}>
                        <div className={styles.image}>
                            <UserImage width={'210px'} height={'210px'} avatar={currentUserPage.user_avatar_url}/>
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