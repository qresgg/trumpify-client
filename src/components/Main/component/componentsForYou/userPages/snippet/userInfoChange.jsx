import { useState, useEffect } from 'react';
import styles from './userInfoChange.module.scss';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserImage } from '../../../../../../hooks/UserImage';
import { useForm } from 'react-hook-form';
import { setData } from '../../../../../../lib/redux/data/dataSlice';
import { useDispatch } from 'react-redux';
import { getUserNameRules } from '../../../../../../services/global/functions/functions';
import { previewFromFile } from '../../../../../../utils/custom/previewFromFile';
import { changeAvaUserName } from '../../../../../../utils/custom/changeProfile';

export function InfoChange({
    onOpened
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist);
    const dataRedux = useSelector((state) => state.data)
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();
    const [message, setMessage] = useState({ error: "", success: "" });
    const [previewImage, setPreviewImage] = useState(null)

    const [isHover, setIsHover] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                <form onSubmit={handleSubmit((data) => changeAvaUserName(data, dataRedux, dispatch, onOpened))}>
                    <div className={styles.title}>
                        <p>Profile's info</p>
                        <button>
                            <X color='white' onClick={() => onOpened()}></X>
                        </button>
                    </div>
                    <div className={styles.mainChange}>
                        <div className={styles.changePFP} 
                            onMouseEnter={() => setIsHover(true)} 
                            onMouseLeave={() => setIsHover(false)}>
                            <div className={styles.upload}>
                                <input type="file" accept="image/*" style={{display: 'none'}} id="imageInput" onChange={(e) => previewFromFile(e, setPreviewImage, setValue, 'avatar')}/>
                                {previewImage ? <div className={styles.image} style={{ backgroundImage: previewImage }}> </div> : <UserImage width={'180px'} height={'180px'}/>}
                                {isHover && (
                                    <>
                                        <div className={styles.blackscreen}></div>
                                        <p className={styles.chooseImg} onClick={() => document.getElementById("imageInput").click()}>Click to choose photo for Avatar</p>
                                    </>
                                )}
                            </div> 
                        </div>
                        <div className={styles.changeName}>
                            <p>Username: </p>
                            <input {...register("username")} defaultValue={user.user_name}/>
                            <p className={styles.rules}>{getUserNameRules()}</p>
                            <div className={styles.button}>
                                <button type="submit">Save</button>
                            </div>
                            {message.error && <div className='error'>{message.error}</div>}
                        </div>
                    </div>
                    <div className={styles.attentions}>
                        Continuing, you provide <strong>soundwave™</strong> access to the selected image. Please do not upload files that you do not have the right to distribute.
                    </div>
                </form>
            </div>
        </>
    )
}