import styles from './AlbumCreatePage.module.scss'
import CreateSongAlbum from './CreateSongAlbum';
import { X } from 'lucide-react'
import CoverCropper from '../../utils/custom/coverCropper';
import ModalOverlay from '../../shared/ModalOverlay';
import createAlbum from '../../services/artist/actions/createAlbum';
import InputField from './shared/inputField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { albumHandler } from './utils/albumHandler';


import useRegions from '../../hooks/global/useRegions';
import { useModal } from '../../hooks/global/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { useMessage } from '../../hooks/global/useMessage'
import { useForm, Controller } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react';
import { usePreviewImage } from '../../hooks/global/usePreviewImage';

export default function AlbumCreatePage() {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm();
    const modal = useModal();
    const { message, setMessage } = useMessage();
    const { regions, loading: regionsLoading, error: regionsError } = useRegions();

    // const mutation = useCreateAlbum()

    const { modalStateSongCreate } = useSelector((state) => state.view.modal);
    const { modalStateShowCropperCover } = useSelector((state) => state.view.modal);
    const { handleSave, previewImage, setPreviewImage } = usePreviewImage({ setValue });
    const [ mode, setMode ] = useState({ type: 'albumCover' });
    const [songs, setSongs] = useState([]);
    const contentRef = useRef();
    const [ isHover, setIsHover ] = useState(null);
    const [editingSongIndex, setEditingSongIndex] = useState(null);
    const onSubmit = albumHandler(setMessage, reset, setPreviewImage, setSongs, songs);

    const addSong = (newSong) => {
        if (!newSong || !newSong.audio || !newSong.audio.name) {
            console.error("Invalid song passed to addSong:", newSong);
            return;
        }

        setSongs((prevSongs) => {
            const identifier = newSong.originalFileName || newSong.audio.name;

            const existingIndex = prevSongs.findIndex(
                (song) => song?.audio?.name === identifier
            );

            if (existingIndex !== -1) {
                const updatedSongs = [...prevSongs];
                updatedSongs[existingIndex] = newSong;
                return updatedSongs;
            } else {
                return [...prevSongs, newSong];
            }
        });
    };

    const clearEditingSongIndex = () => {
        setEditingSongIndex(null);
    }

    const removeSong = (songIndex) => {
        setSongs((prevSongs) => prevSongs.filter((_, index) => index !== songIndex))
    } 
    return (
        <div className={styles['createAlbum']}>
            <div className={styles['createAlbum__container']} ref={contentRef}>
                <div className={styles['createAlbum__header']}>
                    <p className='white-label'>Album  </p>
                    <p className='green-label'>creation.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {message.error && <p className='error'>{message.error}</p>}
                    {message.success && <p className='success'>{message.success}</p>}
                    <div className={styles['createAlbum__details']}>
                        <div className={styles['createAlbum__detailsContainer']}>
                            <div className={styles['createAlbum__coverUpload']}>
                                <div className={styles['createAlbum__coverFile']}
                                    onMouseEnter={() => setIsHover(true)}
                                    onMouseLeave={() => setIsHover(false)}>
                                    <div className={styles['createAlbum__coverFile--preview']}>
                                        {previewImage && <div className={styles['preview__art']} style={{ backgroundImage: previewImage?.albumCover }}></div>}
                                        {isHover && (
                                            <>
                                                <div className={styles['preview__blackScreen']}></div>
                                                <div className={styles['preview__choose']} onClick={() => {
                                                    modal.openModal('showCropperCover')
                                                }}>Choose album cover</div>
                                            </>
                                        )}
                                    </div>
                                    {errors.cover && <p className='error'>{errors.cover.message}</p>}
                                </div>
                            </div>
                            <InputField 
                                label={'Album title'}
                                className={styles['createAlbum__item']}
                                required={'Album name is required'}
                                register={register}
                                name={'albumTitle'}
                                errors={errors} />
                            <InputField 
                                label={'Record label'}
                                className={styles['createAlbum__item']}
                                required={'Record label is required'}
                                register={register}
                                name={'recordLabel'}
                                errors={errors} />
                            <div className={styles['createAlbum__item']}>
                                <label>
                                    <p>Main language of album</p>
                                    <p className='error'>*</p>
                                </label>
                                <select {...register('language', { required: 'language is required'})}>
                                    <option value="">choose language</option>
                                    <option value="UA">Ukrainian</option>
                                    <option value="ENG(US)">English (United States)</option>
                                    <option value="ENG(UK)">English (United Kingdom)</option>
                                    <option value="DEU">German</option>
                                    <option value="POL">Polish</option>
                                    <option value="NOR">Norwegian</option>
                                    <option value="ESP">Spanish</option>
                                </select>
                                {errors.language && <p className='error'>{errors.language.message}</p>}
                            </div>
                            <div className={styles['createAlbum__item']}>
                                <label>
                                    <p>Main genre of album</p>
                                    <p className='error'>*</p>
                                </label>
                                <select {...register('genre', { required: 'genre is required'})}>
                                    <option value="">choose genre</option>
                                    <option value="mixed">Mixed</option>
                                    <option value="pop">Pop</option>
                                    <option value="rock">Rock</option>
                                    <option value="hip-hop">Hip-Hop</option>
                                    <option value="electronic">Electronic</option>
                                    <option value="jazz">Jazz</option>
                                    <option value="r&b">R&B</option>
                                    <option value="country">Country</option>
                                    <option value="metal">Metal</option>
                                </select>
                                {errors.genre && <p className='error'>{errors.genre.message}</p>}
                            </div>
                            <div className={styles['createAlbum__item']}>
                                <label>
                                    <p>Album type</p>
                                    <p className='error'>*</p>
                                </label>
                                <select {...register('type', { required: 'Choose Type' })}>
                                    <option value="">choose album type</option>
                                    <option value="Album">Album</option>
                                    <option value="Short-Album">Short-Album</option>
                                </select>
                                {errors.type && <p className='error'>{errors.type.message}</p>}
                            </div>
                            <InputField 
                                label={'Privacy type'}
                                className={styles['createAlbum__item']}
                                register={register}
                                type={'checkbox'}
                                name={'privacy'}
                                errors={errors} />
                            <InputField 
                                label={'Choose date'}
                                className={styles['createAlbum__item']}
                                register={register}
                                required={'Choose date'}
                                name={'date'}
                                component={
                                    <Controller
                                        name="date"
                                        control={control}
                                        defaultValue={null}
                                        rules={{ required: "Choose date" }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <DatePicker
                                                    placeholderText="Choose date"
                                                    selected={field.value}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    maxDate={new Date()}

                                                    onChange={(date) => {
                                                        const iso = date?.toISOString() || "";
                                                        setValue("date", iso, { shouldValidate: true });
                                                    }}
                                                    dateFormat="yyyy-MM-dd"
                                                />
                                                {fieldState.error && (
                                                    <p className='error'>{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                }
                                errors={errors} />
                            <InputField 
                                label={'Privacy type'}
                                className={styles['createAlbum__item']}
                                register={register}
                                required={'Album must have at least 3 songs'}
                                name={'songs'}
                                errors={errors} 
                                component={<div className={styles['songs']}>
                                    {songs.map((song, index) => (
                                        <div key={index} className={styles['song']}>
                                            <div className={styles['song__removeButton']} onClick={() => removeSong(index)}><X color="black" style={{cursor: 'pointer'}}/></div>
                                            <div className={styles['song__content']} onClick={() => {
                                                setEditingSongIndex(index);
                                                modal.openModal('songCreate');
                                            }}>
                                                <div className={styles['song__contentTitle']}>{song.title}</div>
                                                <div className={styles['song__contentGenre']}>{song.genre.map((genr) => genr.name)}</div>
                                                <div className={styles['song__contentDuration']}>{song.duration}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={styles['songs__addSongs']} onClick={() => {
                                        modal.openModal('songCreate')
                                        clearEditingSongIndex()
                                    }}>
                                        <div className={styles['songs__addSongs--icon']}></div>
                                    </div>
                                </div>}/>
                            <div className={styles['createAlbum__submitButton']}>
                                <button type="submit">Create Album</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* { modalStateSongCreate && <CreateSongAlbum 
                sendSong={addSong} 
                songToEdit={songs[editingSongIndex]}
                index={editingSongIndex}
                clearEditingSongIndex={clearEditingSongIndex}
                /> } */}

            {modalStateSongCreate && (
                <ModalOverlay onClose={() => modal.closeModal('songCreate')} minWidth={450}>
                    <CreateSongAlbum 
                        sendSong={addSong} 
                        songToEdit={songs[editingSongIndex]}
                        index={editingSongIndex}
                        clearEditingSongIndex={clearEditingSongIndex}
                        />
                </ModalOverlay>
            )}
            {modalStateShowCropperCover && (
                <ModalOverlay onClose={() => modal.closeModal('showCropperCover')}>
                    <CoverCropper onSave={handleSave} mode={mode} type="showCropperCover" />
                    <button className="cancelButton" onClick={() => modal.closeModal('showCropperCover')}>
                        Cancel
                    </button>
                </ModalOverlay>
            )}
        </div>
    )
}