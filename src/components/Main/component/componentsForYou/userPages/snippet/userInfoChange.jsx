import { useEffect, useState } from 'react';
import { setUserName } from '../../../../../../lib/userSlice';
import styles from './userInfoChange.module.scss';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, uploadAvatar } from '../../../../../../services/userDataChange';
import { setUrlAvatar } from '../../../../../../lib/userSlice';
import { UserImage } from '../../../../../../hooks/UserImage';

export function InfoChange({
    onOpened
}) {
    const user = useSelector((state) => state.user.user);
    const [userName, setUserName] = useState('');
    const [isHover, setIsHover] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        console.log(selectedImage);
    }, [selectedImage])
    useEffect(() => {
        setUserName(user.userName)
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            onOpened();
            selectedImage && await uploadAvatar(selectedImage);
            await updateUserName(userName);
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }

    return (
        <>
            <div className={styles.container}>
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
                        <input type="file" accept="image/*" style={{display: 'none'}} id="imageInput" onChange={(e) => setSelectedImage(e.target.files[0])}/>
                        <p onClick={() => document.getElementById("imageInput").click()}>Click to choose photo for Avatar</p></div> 
                    : <UserImage width={'180px'} height={'180px'}/>}
                    </div>
                    <div className={styles.changeName}>
                        <p>username: </p>
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                <div className={styles.attentions}>
                    Continuing, you provide Trumpify access to the selected image. Please do not upload files that you do not have the right to distribute.
                </div>
            </div>
        </>
    )
}