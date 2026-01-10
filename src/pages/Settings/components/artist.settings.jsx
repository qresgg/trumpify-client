import styles from '../styles/artistSettings.module.scss';
import { changeArtistInfo } from '../../../utils/custom/changeArtistProfile';
import CoverCropper from '../../../utils/custom/coverCropper';
import BannerCropper from '../../../utils/custom/bannerCropper';
import AvatarCropper from '../../../shared/wrappers/AvatarCropper';
import ModalOverlay from '../../../shared/wrappers/ModalOverlay';
import { ARTISTBIO_REGEX } from '../../../lib/regexp';
import InputField from '../../Create/shared/inputField';

import useRegions from '../../../hooks/global/meta/useRegions';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useMessage } from '../../../hooks/global/useMessage';
import { usePreviewImage } from '../../../hooks/global/usePreviewImage';
import { useModal } from '../../../hooks/global/useModal';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { customOptionCountry, customSingleValueCountry, customTheme } from '../../Create/shared/func/customRenderItem';
import { customSelectStyles } from '../../Create/shared/func/customStyles';
import SelectField from '../../Create/shared/selectField';

export default function ArtistSettings(){
    const dispatch = useDispatch();
    const dataRedux = useSelector((state) => state.data);
    const user = useSelector((state) => state.data.user);
    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm({ 
        defaultValues: {
            artistName: dataRedux.artist.artist_name,
            bio: dataRedux.artist.artist_bio
        }
    });
    const { regions, loading: regionsLoading, error: regionsError } = useRegions();

    useEffect(() => {
        if (user) {
            reset({
                artistName: dataRedux.artist.artist_name,
                bio: dataRedux.artist.artist_bio
            });
        }
    }, [user, reset]);

    const { handleSave, previewImage, setPreviewImage } = usePreviewImage({ setValue })
    const { message, setMessage } = useMessage();
    const modal = useModal();
    const { modalStateShowCropperArtistConfig } = useSelector((state) => state.view.modal)
    const [ showCropper, setShowCropper ] = useState(false);
    const [ mode, setMode ] = useState({ type: null });

    const [ hoverBanner, setHoverBanner ] = useState(false);
    const [ hoverAvatar, setHoverAvatar ] = useState(false);

    return (
        <div className={styles['artistSettings']}>
            <h1>Artist Settings</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                {message.error && <p className='error'>{message.error}</p>}
                {message.success && <p className='success'>{message.success}</p>}
                {/* <div className={styles['artistSettings__item']}>
                    <div className={styles['artistSettings__itemHeader']}>
                        <p>Banner</p>
                    </div>
                    <div className={styles['artistSettings__preview']}>
                        <div className={styles['artistSettings__previewBanner']} onClick={() => {
                                modal.openModal('showCropperArtistConfig')
                                setMode({ type: 'banner' })
                            }}
                            onMouseEnter={() => setHoverBanner(true)} 
                            onMouseLeave={() => setHoverBanner(false)}
                            style={{ backgroundImage: previewImage?.banner }}>
                            {hoverBanner && (
                                <div className={styles['artistSettings__previewText']}>Choose photo for banner</div>
                            )} 
                        </div>
                    </div>
                </div> */}
                {/* <div className={styles['artistSettings__item']}>
                    <div className={styles['artistSettings__itemHeader']}>
                        <p>Avatar</p>
                    </div>
                    <div className={styles['artistSettings__preview']}>
                        <div className={styles['artistSettings__previewAvatar']} onClick={() => {
                                modal.openModal('showCropperArtistConfig')
                                setMode({ type: 'artistAvatar' })
                            }}
                            onMouseEnter={() => setHoverAvatar(true)} 
                            onMouseLeave={() => setHoverAvatar(false)}
                            style={{ backgroundImage: previewImage?.artistAvatar }}> 
                            {hoverAvatar && (
                                <div className={styles['artistSettings__previewText']}>Choose photo for avatar</div>
                            )}
                        </div>
                    </div>
                </div> */}
                <InputField 
                    label={'Banner'}
                    className={styles['artistSettings__item']}
                    register={register}
                    name={'banner'}
                    component={<div className={styles['artistSettings__preview']}>
                        <div className={styles['artistSettings__previewBanner']} onClick={() => {
                                modal.openModal('showCropperArtistConfig')
                                setMode({ type: 'banner' })
                            }}
                            onMouseEnter={() => setHoverBanner(true)} 
                            onMouseLeave={() => setHoverBanner(false)}
                            style={{ backgroundImage: previewImage?.banner }}>
                            {hoverBanner && (
                                <div className={styles['artistSettings__previewText']}>Choose photo for banner</div>
                            )} 
                        </div>
                    </div>}
                    errors={errors}
                />
                <InputField 
                    label={'Avatar'}
                    className={styles['artistSettings__item']}
                    register={register}
                    name={'avatar'}
                    component={<div className={styles['artistSettings__preview']}>
                        <div className={styles['artistSettings__previewAvatar']} onClick={() => {
                                modal.openModal('showCropperArtistConfig')
                                setMode({ type: 'artistAvatar' })
                            }}
                            onMouseEnter={() => setHoverAvatar(true)} 
                            onMouseLeave={() => setHoverAvatar(false)}
                            style={{ backgroundImage: previewImage?.artistAvatar }}> 
                            {hoverAvatar && (
                                <div className={styles['artistSettings__previewText']}>Choose photo for avatar</div>
                            )}
                        </div>
                    </div>}
                    errors={errors}
                />
                <InputField 
                    label={'Pseudonym'}
                    className={styles['artistSettings__item']}
                    register={register}
                    name={'artistName'}
                    errors={errors}
                />
                <InputField 
                    label={'Biography'}
                    className={styles['artistSettings__item']}
                    register={register}
                    pattern={{
                        value: /^[A-Z]+$/i,
                        message: "Only letters are allowed"
                    }}
                    name={'bio'}
                    type={'textarea'}
                    errors={errors}
                />
                <InputField 
                    label={'Change region'}
                    className={styles['artistSettings__item']}
                    register={register}
                    name={'region'}
                    errors={errors}
                    component={
                    <SelectField 
                        control={control}
                        name={'region'}
                    />}
                />
                <InputField 
                    label={'Privacy of region'}
                    className={styles['artistSettings__item']}
                    register={register}
                    name={'privacyRegion'}
                    type={'checkbox'}
                    errors={errors}
                />
                <div className={styles['artistSettings__submitButton']}>
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