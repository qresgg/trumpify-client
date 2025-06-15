import styles from './config.module.scss';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { changeArtistInfo } from '../../../../../../utils/custom/changeArtistProfile';
import { useDispatch, useSelector } from 'react-redux';
import CoverCropper from '../../../../../../utils/custom/coverCropper';
import BannerCropper from '../../../../../../utils/custom/bannerCropper';
import AvatarCropper from '../../../../../../utils/custom/avatarCropper';
import { useMessage } from '../../../../../../hooks/global/useMessage';
import { usePreviewImage } from '../../../../../../hooks/global/usePreviewImage';
import { useModal } from '../../../../../../hooks/useModal';
import ModalOverlay from '../../../../snippets/ModalOverlay';

export const ArtistConfig = () => {
    const dispatch = useDispatch();
    const dataRedux = useSelector((state) => state.data);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { message, setMessage } = useMessage();
    const modal = useModal();

    const { modalStateShowCropperArtistConfig } = useSelector((state) => state.view.modal)
    
    const [ showCropper, setShowCropper ] = useState(false);
    const [ mode, setMode ] = useState({ type: 'null' });

    const { handleSave, previewImage, setPreviewImage } = usePreviewImage({ setValue })

    return (
        <div className={styles.config}>
            <form onSubmit={handleSubmit((data) => changeArtistInfo(data, dataRedux, dispatch, setMessage))}>
                {message.error && <p className='error'>{message.error}</p>}
                {message.success && <p className='success'>{message.success}</p>}
                <div className={styles.headerCont}>
                    <div className={styles.container}>
                        <div className={styles.container__item}>
                            <div className={styles.header}>
                                <p>Banner</p>
                                <p className={styles.red}>*</p>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__preview}
                                    onClick={() => {
                                        modal.openModal('showCropperArtistConfig')
                                        setMode({ type: 'banner' })
                                    }}
                                    style={{ backgroundImage: previewImage?.banner }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.container__item}>
                            <div className={styles.header}>
                                <p>Avatar</p>
                                <p className={styles.red}>*</p>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.content__preview}>
                                    <div className={styles.avatar}
                                        onClick={() => {
                                            modal.openModal('showCropperArtistConfig')
                                            setMode({ type: 'artistAvatar' })
                                        }}
                                        style={{ backgroundImage: previewImage?.artistAvatar }}> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.container__item}>
                        <div className={styles.header}>
                            <p>Artist name</p>
                            <p className={styles.red}>*</p>
                        </div>
                        <div className={styles.content}>
                            <input type="text" {...register('artistName')}/>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.container__item}>
                        <div className={styles.header}>
                            <p>Biography</p>
                            <p className={styles.red}>*</p>
                        </div>
                        <div className={styles.content}>
                            <textarea className={styles.tarea} rows='15' cols='50' {...register('bio')}/>
                        </div>
                    </div>
                </div>
                <button type="submit"> Confirm changes </button>
            </form>
            {modalStateShowCropperArtistConfig && (
                <ModalOverlay onClose={() => modal.closeModal('showCropperArtistConfig')}>
                    { mode?.type === 'artistAvatar' ? (
                        <>
                            <CoverCropper onSave={handleSave} mode={mode} type="showCropperArtistConfig" />
                            <button className="cancelButton" onClick={() => modal.closeModal('showCropperArtistConfig')}>
                                Cancel
                            </button>
                        </>
                    ) : <>
                            <BannerCropper onSave={handleSave} mode={mode} type="showCropperArtistConfig" />
                            <button className="cancelButton" onClick={() => modal.closeModal('showCropperArtistConfig')}>
                                Cancel
                            </button>
                        </>}
                </ModalOverlay>
            )}
        </div>
    )
}