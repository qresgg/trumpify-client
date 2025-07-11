import styles from './userProfilePage.module.scss'
import { InfoChange } from './snippet/userInfoChange';
import { UserImage } from '../../hooks/UserImage';
import { setView } from '../../lib/redux/pages/viewSlice';
// import { isOriginPage } from '../../../../../services/auth/isOriginPage';
import fetchColors from '../../utils/custom/colorPalette';
import { MainContainerSkeleton } from '../../components/Main/Loadings/mainContainer-skeleton';
import { addToLoadedOne } from '../../lib/redux/data/loadedSlice';

import { useModal } from '../../hooks/global/useModal';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getUserData } from '../../services/user/queries/fetchUserData';
import getUserById from '../../services/user/queries/getUserData';

export default function UserProfilePage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);

    const { users } = useSelector((state) => state.loaded)
    const { currentUserPage } = useSelector((state) => state.view);
    const { modalStateUserPage } = useSelector((state) => state.view.modal);
    const modal = useModal();

    const user = useSelector((state) => state.data.user)
    const [updateInfo, setUpdateInfo] = useState(false);
    const [originUser, setOriginUser] = useState(false);
    const [gradient, setGradient] = useState(null);

    const fetchUserData = async () => {
        if (!id) return;
        setLoading(true);
        try{
            const res = await getUserById(id);
            dispatch(setView({ view: 'currentUserPage', value: res}));
            dispatch(addToLoadedOne({ type: "user", value: res}));
        } catch (error) {
            console.error();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const user = users?.find(users => users._id === id);
        if (user) {
            dispatch(setView({ view: 'currentUserPage', value: user}));
            setLoading(false);
        } else {
            fetchUserData();
        }
    }, [id, dispatch]);

    // useEffect(() => {
    //     setOriginUser(isOriginPage(user, currentUserPage));
    // }, [currentUserPage, user])

    useEffect(() => {      
        const getColors = async () => {
            setGradient(await fetchColors(currentUserPage));
        }
        getColors();
    }, [currentUserPage]);

    if (loading) {
        return <MainContainerSkeleton>Album Loading</MainContainerSkeleton>;
    }

    return (
        <>
            {!loading && (
                <div className={styles['profile']}>
                    <div className={styles['profile__title']} style={gradient}>
                        <div className={styles['profile__addiction']} onClick={() => modal.openModal('userPage')}>
                            <div className={styles['profile__user-image']}>
                                {user?.user_avatar_url !== 'none' ? (
                                    <UserImage width={'210px'} height={'210px'} avatar={currentUserPage.user_avatar_url}/>
                                ):(
                                    <div className={styles['profile__icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                                )}
                            </div>
                            <div className={styles['profile__info']}>
                                <div className={styles['profile__info-label']}>Profile</div>
                                <div className={styles['profile__info-name']}>{currentUserPage.user_name}</div>
                                <div className={styles['profile__playlist-count']}>0 Playlist is public</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['profile__statistic']}>

                    </div>
                    { (modalStateUserPage && originUser)&& <InfoChange /> }
                </div>
            )}
        </>
    )
}