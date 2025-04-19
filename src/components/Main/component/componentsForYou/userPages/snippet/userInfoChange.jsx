import { useState, useEffect } from 'react';
import styles from './userInfoChange.module.scss';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { updateUserName, uploadAvatar } from '../../../../../../services/user/changeData/userDataChange';
import { UserImage } from '../../../../../../hooks/UserImage';
import { useForm } from 'react-hook-form';
import { setData } from '../../../../../../lib/redux/data/dataSlice';
import { useDispatch } from 'react-redux';
import { isValidPassword, isValidEmail, isValidUserName } from '../../../../../../lib/regexp';

export function InfoChange({
    onOpened
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist);
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    const [isHover, setIsHover] = useState(false)
    const [previewImage, setPreviewImage] = useState(null);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const onSubmit = async (data) => {
        if (!isValidUserName(data?.username)) {
            setMessage({ error: "Username doesn't comply with our policy", success: "" });
            return;
        }
        try {
            if (data) {
                if (data.avatar) {
                    await uploadAvatar(data.avatar);
                    dispatch(setData({
                        user: {
                            ...user,
                            user_avatar_url: data.avatar
                        }
                    }));
                }
                if (data.username) {
                    await updateUserName(data.username);
                    dispatch(setData({
                        user: {
                            ...user,
                            user_name: data.username
                        }
                    }));
                }
                onOpened(data);
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValue('avatar', file)
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(`url(${event.target.result})`);
            };
            reader.readAsDataURL(file); 
        }
    }

    return (
        <>
            <div className={styles.container}
            style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: Math.min(500, windowSize.width * 0.8),
                    }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.title}>
                        <p>Profile's info</p>
                        <button><X onClick={() => onOpened()}></X></button>
                    </div>
                    <div className={styles.mainChange}>
                        <div className={styles.changePFP} 
                            onMouseEnter={() => setIsHover(true)} 
                            onMouseLeave={() => setIsHover(false)}>
                        {isHover 
                        ? <div className={styles.upload}>
                            <input type="file" accept="image/*" style={{display: 'none'}} id="imageInput" {...register("avatar", {onChange: (e) => handleFileChange(e) })}/>
                            <p onClick={() => document.getElementById("imageInput").click()}>Click to choose photo for Avatar</p></div> 
                        : previewImage ? <div className={styles.image} style={{backgroundImage: previewImage}}> </div> : <UserImage width={'180px'} height={'180px'}/>}
                        </div>
                        <div className={styles.changeName}>
                            <p>username: </p>
                            <input {...register("username")} defaultValue={user.user_name}/>
                            <button type="submit">Save</button>
                        </div>
                    </div>
                    <div className={styles.attentions}>
                        Continuing, you provide Trumpify access to the selected image. Please do not upload files that you do not have the right to distribute.
                    </div>
                </form>
            </div>
        </>
    )
}