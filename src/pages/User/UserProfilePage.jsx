import styles from './userProfilePage.module.scss'
import { InfoChange } from './snippet/userInfoChange';
import { UserImage } from '../../hooks/UserImage';
import { setView } from '../../lib/redux/pages/viewSlice';
// import { isOriginPage } from '../../../../../services/auth/isOriginPage';
import fetchColors from '../../utils/custom/colorPalette';
import { MainContainerSkeleton } from '../../components/Main/loadings/mainContainer-skeleton';
import { addToLoadedOne } from '../../lib/redux/data/loadedSlice';

import { useModal } from '../../hooks/global/useModal';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchUserDataById } from '../../services/user.service';

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
    const [originUser, setOriginUser] = useState(true);
    const [gradient, setGradient] = useState(null);

    const fetchUserData = async () => {
        if (!id) return;
        setLoading(true);
        try{
            const res = await fetchUserDataById(id);
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
                        <div className={styles['profile__addition']} onClick={() => modal.openModal('userPage')}>
                            <div className={styles['profile__userImage']}>
                                {user?.user_avatar_url !== 'none' ? (
                                    <UserImage avatar={currentUserPage.user_avatar_url}/>
                                ):(
                                    <div className={styles['profile__icon']} style={{ backgroundImage: `url('https://placehold.co/100x100/1F1F1F/FFFFFF?text=?')`}}></div>
                                )}
                            </div>
                            <div className={styles['profile__info']}>
                                <div className={styles['profile__infoLabel']}>Profile</div>
                                <div className={styles['profile__infoName']}>{currentUserPage.user_name}</div>
                                <div className={styles['profile__infoPlaylistsCount']}>0 Playlist is public</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['profile__statistic']}>

                    </div>
                    { (modalStateUserPage && currentUserPage.edit_permission)&& <InfoChange /> }
                </div>
            )}
        </>
    )
}