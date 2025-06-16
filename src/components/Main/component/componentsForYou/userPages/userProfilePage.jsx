import { useDispatch, useSelector } from 'react-redux';
import styles from './userProfilePage.module.scss'
import { useEffect, useState } from 'react';
import { InfoChange } from './snippet/userInfoChange';
import { UserImage } from '../../../../../hooks/UserImage';
import { getUserData } from '../../../../../services/user/userService';
import { setSelectedUserPage } from '../../../../../lib/redux/pages/viewSlice';
import { isOriginPage } from '../../../../../services/auth/isOriginPage';
import fetchColors from '../../../../../utils/custom/colorPalette';
import { useModal } from '../../../../../hooks/useModal';

export function UserProfilePage() {
    const dispatch = useDispatch();
    const { currentUserPage } = useSelector((state) => state.view);
    const { modalStateUserPage } = useSelector((state) => state.view.modal);
    const modal = useModal();

    const user = useSelector((state) => state.data.user)
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

    useEffect(() => {      
        const getColors = async () => {
            setGradient(await fetchColors(currentUserPage));
        }
        getColors();
    }, [currentUserPage]);

    return (
        <div className={styles.profile}>
                <div className={styles.title} style={gradient}>
                    <div className={styles.addiction} onClick={() => modal.openModal('userPage')}>
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

                </div>
            { (modalStateUserPage && originUser)&& <InfoChange /> }
        </div>
    )
}