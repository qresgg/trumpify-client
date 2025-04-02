import { useState } from 'react';
import styles from './userInfoChange.module.scss';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { updateUserName, uploadAvatar } from '../../../../../../services/user/changeData/userDataChange';
import { UserImage } from '../../../../../../hooks/UserImage';
import { useForm } from 'react-hook-form';

export function InfoChange({
    onOpened
}) {
    const user = useSelector((state) => state.data.user);
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    const [isHover, setIsHover] = useState(false)
    const [previewImage, setPreviewImage] = useState('');

    const onSubmit = async (data) => {
        try {
            if (data.avatar) {
                await uploadAvatar(data.avatar);
            }
            if (data.username) {
                await updateUserName(data.username);
            }
            onOpened(data);
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
            <div className={styles.container}>
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
                            <input type="file" accept="image/*" style={{display: 'none'}} id="imageInput" onChange={handleFileChange} {...register("avatar")}/>
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