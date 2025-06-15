import styles from './config.module.scss';
import { useForm } from 'react-hook-form';
import { previewFromFile } from '../../../../../../utils/custom/previewFromFile';
import { useState, useEffect } from 'react';
import { changeArtistInfo } from '../../../../../../utils/custom/changeArtistProfile';
import { useDispatch, useSelector } from 'react-redux';
import BannerCropper from '../../../../../../utils/custom/bannerCropper';
import { useMessage } from '../../../../../../hooks/global/useMessage';

export const ArtistConfig = () => {
    const dispatch = useDispatch();
    const dataRedux = useSelector((state) => state.data);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { message, setMessage } = useMessage()
    
    const [ showCropper, setShowCropper ] = useState(false);
    const [ mode, setMode ] = useState({ type: null });

    const [ previewImage, setPreviewImage ] = useState({
        avatar: '',
        banner: ''
    });

    useEffect(() => {
        if (dataRedux?.artist) {
            setPreviewImage({
                avatar: `url(${dataRedux.artist.artist_avatar})`,
                banner: `url(${dataRedux.artist.artist_banner})`,
            });
        }
    }, []);

    const handleSave = (file, mode) => {
        setShowCropper(false);

        const reader = new FileReader();
        reader.onloadend = () => {
            if (mode?.type === 'avatar') {
                setPreviewImage(prev => ({
                    ...prev,
                    avatar: `url(${reader.result})`
                }));
                setValue('avatar', file)
            } else if (mode?.type === 'banner'){
                setPreviewImage(prev => ({
                    ...prev,
                    banner: `url(${reader.result})`
                }));
                setValue('banner', file)
            }
        };
        reader.readAsDataURL(file);
    };



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
                                        setShowCropper(true)
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
                                            setShowCropper(true)
                                            setMode({ type: 'avatar' })
                                        }}
                                        style={{ backgroundImage: previewImage?.avatar }}> 
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
            {showCropper && (
                <>
                    <div className={styles.blackscreen} onClick={() => setShowCropper(!showCropper)}></div>
                    <div className={styles.modal}>
                        <BannerCropper onSave={handleSave} mode={mode}/>
                        <button onClick={() => setShowCropper(false)} className={styles.cancelbutton}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}