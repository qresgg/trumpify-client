import styles from './config.module.scss';
import { useForm } from 'react-hook-form';
import { previewFromFile } from '../../../../../../utils/custom/previewFromFile';
import { useState, useEffect } from 'react';
import { changeArtistName } from '../../../../../../utils/custom/changeArtistProfile';
import { useDispatch, useSelector } from 'react-redux';
import BannerCropper from '../../../../../../utils/custom/bannerCropper';

export const ArtistConfig = () => {
    const dispatch = useDispatch();
    const dataRedux = useSelector((state) => state.data);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [ previewImage, setPreviewImage ] = useState(null)
    const [ message, setMessage ] = useState({ success: '', error: '' })

    const [showCropper, setShowCropper] = useState(false);

    const handleBannerSave = (file) => {
        setShowCropper(false);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(`url(${reader.result})`);
            setValue('banner', file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.config}>
            <form onSubmit={handleSubmit((data) => changeArtistName(data, dataRedux, dispatch))}>
                <div className={styles.headerCont}>
                    <div className={styles.container}>
                        <div className={styles.container__item}>
                            <div className={styles.header}>
                                <p>Banner</p>
                                <p className={styles.red}>*</p>
                            </div>
                            <div className={styles.content}>
                                <div
                                className={styles.content__preview}
                                onClick={() => setShowCropper(true)}
                                style={{ backgroundImage: previewImage }}
                                ></div>
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
                                    <div className={styles.avatar}></div>
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
            {showCropper && (
                <>
                    <div className={styles.blackscreen} onClick={() => setShowCropper(!showCropper)}></div>
                    <div className={styles.modal}>
                        <BannerCropper onSave={handleBannerSave} />
                        <button onClick={() => setShowCropper(false)} className={styles.cancelbutton}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}