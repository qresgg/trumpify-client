import { useState, useEffect } from 'react';
import styles from './userInfoChange.module.scss';
import { X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import AvatarCropper from '../../../utils/custom/avatarCropper'

import { getUserNameRules } from '../../../utils/helpful/getGlobalItems';
import { changeAvaUserName } from '../../../utils/custom/changeUserProfile';
import { useMessage } from '../../../hooks/global/useMessage';
import { useModal } from '../../../hooks/global/useModal';
import { usePreviewImage } from '../../../hooks/global/usePreviewImage';

export function InfoChange() {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();
    const {message, setMessage} = useMessage();
    const modal = useModal();
    const [mod, setMod] = useState({ avatar: true });

    const modalStateShowCropperUserPage = useSelector((state) => state.view.modal.modalStateShowCropperUserPage)

    const user = useSelector((state) => state.data.user);
    const artist = useSelector((state) => state.data.artist);
    const dataRedux = useSelector((state) => state.data)
    const {previewImage, setPreviewImage, handleSave } = usePreviewImage({ setValue })

    const [isHover, setIsHover] = useState(false)

    return (
        <div className={styles.modalOverlay} onClick={() => modal.closeModal('userPage')} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit((data) => changeAvaUserName(data, dataRedux, dispatch, setMessage ))}>
                    <div className={styles.title}>
                        <p>Profile's info</p>
                        <button>
                            <X color='white' onClick={() => modal.closeModal('userPage')}></X>
                        </button>
                    </div>
                    <div className={styles.mainChange}>
                        <div className={styles.changePFP} 
                            onMouseEnter={() => setIsHover(true)} 
                            onMouseLeave={() => setIsHover(false)}>
                            <div className={styles.upload}>
                                {previewImage && <div className={styles.image} style={{ backgroundImage: previewImage?.avatar }}> </div>}
                                {isHover && (
                                    <>
                                        <div className={styles.blackscreen}></div>
                                        <p className={styles.chooseImg} onClick={() => modal.openModal('showCropperUserPage')}>Click to choose photo for Avatar</p>
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
                {modalStateShowCropperUserPage && (
                    <>
                        <div className={styles.modal}>
                            <AvatarCropper onSave={handleSave} mod={mod}/>
                            <button onClick={() => modal.closeModal('showCropperUserPage')} className={styles.cancelbutton}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}