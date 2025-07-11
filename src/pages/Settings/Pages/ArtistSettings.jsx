import styles from './ArtistSettings.module.scss';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { changeArtistInfo } from '../../../utils/custom/changeArtistProfile';
import { useDispatch, useSelector } from 'react-redux';
import CoverCropper from '../../../utils/custom/coverCropper';
import BannerCropper from '../../../utils/custom/bannerCropper';
import AvatarCropper from '../../../utils/custom/avatarCropper';
import { useMessage } from '../../../hooks/global/useMessage';
import { usePreviewImage } from '../../../hooks/global/usePreviewImage';
import { useModal } from '../../../hooks/global/useModal';
import ModalOverlay from '../../../components/Main/snippets/ModalOverlay';

import { ARTISTBIO_REGEX } from '../../../lib/regexp';

export default function ArtistSettings(){
    const dispatch = useDispatch();
    const dataRedux = useSelector((state) => state.data);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({ 
        defaultValues: dataRedux.artist ? {
            artistName: dataRedux.artist.artist_name,
            bio: dataRedux.artist.artist_bio
        } : {}
    });
    const { handleSave, previewImage, setPreviewImage } = usePreviewImage({ setValue })
    const { message, setMessage } = useMessage();
    const modal = useModal();
    const { modalStateShowCropperArtistConfig } = useSelector((state) => state.view.modal)
    const [ showCropper, setShowCropper ] = useState(false);
    const [ mode, setMode ] = useState({ type: null });

    const [ hoverBanner, setHoverBanner ] = useState(false);
    const [ hoverAvatar, setHoverAvatar ] = useState(false);

    return (
        <div className={styles['artist-settings']}>
            <h1>Artist Settings</h1>
            <form onSubmit={handleSubmit((data) => changeArtistInfo(data, dataRedux, dispatch, setMessage))}>
                {message.error && <p className='error'>{message.error}</p>}
                {message.success && <p className='success'>{message.success}</p>}
                <div className={styles['artist-settings__container']}>
                    <div className={styles['artist-settings__item']}>
                        <div className={styles['artist-settings__item-header']}>
                            <p>Banner</p>
                        </div>
                        <div className={styles['artist-settings__preview']}>
                            <div className={styles['artist-settings__preview-banner']} onClick={() => {
                                    modal.openModal('showCropperArtistConfig')
                                    setMode({ type: 'banner' })
                                }}
                                onMouseEnter={() => setHoverBanner(true)} 
                                onMouseLeave={() => setHoverBanner(false)}
                                style={{ backgroundImage: previewImage?.banner }}>
                                {hoverBanner && (
                                    <div className={styles['artist-settings__preview-text']}>Choose photo for banner</div>
                                )} 
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['artist-settings__container']}>
                    <div className={styles['artist-settings__item']}>
                        <div className={styles['artist-settings__item-header']}>
                            <p>Avatar</p>
                        </div>
                        <div className={styles['artist-settings__preview']}>
                            <div className={styles['artist-settings__preview-banner']}>
                                <div className={styles['artist-settings__preview-avatar']} onClick={() => {
                                        modal.openModal('showCropperArtistConfig')
                                        setMode({ type: 'artistAvatar' })
                                    }}
                                    onMouseEnter={() => setHoverAvatar(true)} 
                                    onMouseLeave={() => setHoverAvatar(false)}
                                    style={{ backgroundImage: previewImage?.artistAvatar }}> 
                                    {hoverAvatar && (
                                        <div className={styles['artist-settings__preview-text']}>Choose photo for avatar</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['artist-settings__container']}>
                    <div className={styles['artist-settings__item']}>
                        <div className={styles['artist-settings__item-header']}>
                            <p>Pseudonym</p>
                        </div>
                        <div className={styles['artist-settings__preview']}>
                            <input type="text" {...register('artistName')}/>
                        </div>
                    </div>
                </div>
                <div className={styles['artist-settings__container']}>
                    <div className={styles['artist-settings__item']}>
                        <div className={styles['artist-settings__item-header']}>
                            <p>Biography</p>
                        </div>
                        <div className={styles['artist-settings__preview']}>
                            <textarea className={styles['artist-settings__bio-area']} rows='7' cols='25' 
                            {...register('bio', {
                                pattern: {
                                    value: ARTISTBIO_REGEX,
                                    message: "The biography can only contain letters, numbers, spaces, and punctuation marks (.,!?():;'-), with a maximum of 1000 characters. Special symbols, HTML, or code are not allowed."
                                }
                            })}
                            placeholder='Write your biography'/>
                        </div>
                    </div>
                </div>
                <div className={styles['artist-settings__container']}>
                    <div className={styles['artist-settings__item']}>
                        <div className={styles['artist-settings__item-header']}>
                            <p>Privacy</p>
                        </div>
                        <div className={styles['artist-settings__preview']}>
                            <input type='checkbox' className={styles['artist-settings__bio-area']}  {...register('privacy')}
                            placeholder='Write your privacy'/>
                        </div>
                    </div>
                </div>
                <div className={styles['artist-settings__submit-button']}>
                    <button type="submit"> Update profile </button>
                </div>
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