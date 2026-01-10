import styles from './SongCreatePage.module.scss'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { audioHandle } from '../../utils/global/audioUtils';
import { useMessage } from '../../hooks/global/useMessage';
import { useArtistsRoleActions } from '../../hooks/album/useArtistsRoleActions';
import { usePreviewImage } from '../../hooks/global/usePreviewImage';
import CoverCropper from '../../utils/custom/coverCropper';
import { useModal } from '../../hooks/global/useModal';

import createSong from '../../services/artist/actions/createSong';
import ModalOverlay from '../../shared/wrappers/ModalOverlay';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select'
import InputField from './shared/inputField';
import { customTheme, customOptionGenre, customSingleValueGenre } from './shared/func/customRenderItem';
import useGenres from '../../hooks/global/meta/useGenres';
import { customSelectStyles } from './shared/func/customStyles';

import FileDropPreview from './shared/fileDropzone';

export default function SongPageCreate () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();
    const { removeArtist, removeRoleFromArtist, addArtistWithRole, artists, setArtists } = useArtistsRoleActions();
    const { handleSave, previewImage, setPreviewImage } = usePreviewImage({ setValue });
    const { genres, loading: genresLoading, error: genresError } = useGenres();

    const { modalStateShowCropperCover } = useSelector((state) => state.view.modal);

    const modal = useModal()
    const [ mode, setMode ] = useState({ type: 'songCover' });
    const { message, setMessage } = useMessage()
    const [ songFileChosen, setSongFileChosen ] = useState(null)
    const [ audioFront, setAudioFront ] = useState(null);
    const [ isHover, setIsHover ] = useState(null);

    const onSubmit = async (data) => {
        try {
            if (artists.length !== 0) {
                console.log(data, artists)
                const res = await createSong({ ...data, artists})
                setMessage({ success: res ? res.message : 'Song has been created successfully' })
            } else {
                setMessage({ error: 'Song must have at least 1 artist'})
            }
        } catch (error) {
            setMessage({ error: error.response || 'Error during creation song '})
            console.error(error.response ? error.response.data : error);
        }
    }

    return (
        <div className={styles['createSong']}>
            <div className={styles['createSong__container']}>
                <div className={styles['createSong__header']}>
                    <p className={'white-label'}>Create a </p>
                    <p className={'green-label'}>new song.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" accept='audio/*' id="audioFile" style={{ display: 'none' }} onChange={(e) => audioHandle(e, setValue, setSongFileChosen, setAudioFront)}/>
                    {!songFileChosen && (
                    <FileDropPreview 
                        title={'Upload your audio file'}
                        description={'Mp3, wav, odd, mpeg, under 10mb'}
                        setValue={setValue}
                        setSongFileChosen={setSongFileChosen}
                        setAudioFront={setAudioFront}/>
                    )}
                    {songFileChosen && (
                        <div className={styles['songDetails']}>
                            <div className={styles['songDetails__audioName']}>{audioFront.name}</div>
                            <div className={styles['songDetails__message']}>
                                {message.error && <p className='error'>{message.error}</p>}
                                {message.success && <p className='success'>{message.success}</p>}
                            </div>
                            <div className={styles['songDetails__container']}>
                                <div className={styles['songDetails__left']}>
                                    <div className={styles['songDetails__file']}
                                        onMouseEnter={() => setIsHover(true)}
                                        onMouseLeave={() => setIsHover(false)}>
                                        <div className={styles.preview}>
                                            {previewImage && <div className={styles.preview__art} style={{ backgroundImage: previewImage?.songCover }}></div>}
                                            {isHover && (
                                                <>
                                                    <div className={styles.preview__blackscreen}></div>
                                                    <div className={styles.preview__choose} onClick={() => modal.openModal('showCropperCover')}>Choose song cover</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {errors.cover && <p>{errors.cover.message}</p>}
                                </div>
                                <div className={styles['songDetails__right']}>
                                    <InputField 
                                        label={'Song title'}
                                        className={styles['songDetails__data']}
                                        required={'Title is required'}
                                        register={register}
                                        name={'title'}
                                        errors={errors}
                                        />
                                    <InputField 
                                        label={'Song genre'}
                                        register={register}
                                        errors={errors}
                                        className={styles['songDetails__data']}
                                        component={
                                            genresLoading ? (
                                                <div>Genres is loading...</div>
                                            ) : genresError ? (
                                                <div className='error'>{genresError}</div>
                                            ) : (
                                                <Controller
                                                    control={control}
                                                    name="genre"
                                                    rules={{ required: 'At least one genre is required' }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            isMulti
                                                            theme={customTheme}
                                                            options={genres}
                                                            onChange={(selectedOptions) => {
                                                                const MAX_GENRES = 4;
                                                                const limitedOptions = selectedOptions.slice(0, MAX_GENRES);
                                                                field.onChange(limitedOptions);
                                                            }}
                                                            value={field.value || []}
                                                            getOptionLabel={(option) => option.name}
                                                            getOptionValue={(option) => option.id}
    
                                                            components={{
                                                                Option: customOptionGenre,
                                                                MultiValueLabel: customSingleValueGenre,
                                                            }}
                                                            placeholder="Select up to 4 genres"
                                                            isSearchable={false}
                                                            styles={customSelectStyles}/>
                                                    )}
                                                />
                                            )
                                        }/>
                                    <div className={styles['songDetails__data']}>
                                        <div className={styles.double__container}>
                                            <label className={styles.label}>
                                                <p className={styles.double__container__p}>Does your song have explicit lyrics?</p>
                                            </label>
                                            <input type="checkbox" {...register('explicit')} />
                                            {errors.explicit && <p className='error'>{errors.explicit.message}</p>}
                                        </div>
                                        <InputField 
                                            label={'Choose date'}
                                            className={styles['songDetails__data']}
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
                                    </div>
                                    <div className={styles['songDetails__data']}>
                                        <label>
                                            <p>Choose your song's type</p>
                                        </label>
                                        <select {...register('type')}>
                                            <option value="" disabled>-_-_-Choose-_-_-</option>
                                            <option value="single">Single</option>
                                            <option value="instrumental">Instrumental</option>
                                            <option value="cover">Cover</option>
                                            <option value="remix">Remix</option>
                                            <option value="radio">Radio Edition</option>
                                        </select>
                                    </div>
                                    <div className={styles['songDetails__data']}>
                                        <label>
                                            <p>Add artists on feat</p>
                                            <p className={styles.red}>*</p>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Artist Name"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const artistName = e.target.value.trim();
                                                    if (artistName) {
                                                        addArtistWithRole(artistName, 'main vocal');
                                                        e.target.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                        <select onChange={(e) => {
                                            const selectedRole = e.target.value;
                                            if (artists.length > 0) {
                                                const lastArtist = artists[artists.length - 1];
                                                addArtistWithRole(lastArtist.name, selectedRole); 
                                            }
                                        }}>
                                            <option value="" disabled>-_-_-Choose Role-_-_-</option>
                                            <option value="main vocal">Main vocal</option>
                                            <option value="back vocal">Back vocal</option>
                                            <option value="author">Author</option>
                                            <option value="co-author">Co-author</option>
                                            <option value="invited guest">Invited guest</option>
                                            <option value="writer">Writer</option>
                                            <option value="composer">Composer</option>
                                            <option value="producer">Producer</option>
                                        </select>
                                    </div>
                                    <div className={styles['songDetails__data']}>
                                        <label>
                                            <p>Preview</p>
                                        </label>
                                        <div className={styles.previewFeatScroll}>
                                            {artists.map((artist, index) => (
                                                <div key={index} className={styles.previewFeature__artistContainer}>
                                                    <div className={styles.artistData}>
                                                        <button className={styles.artistData__removeArtist} onClick={() => removeArtist(index)} type="button"><X /></button>
                                                        <div className={styles.artistData__previewData}>
                                                            <div className={styles.artistData__previewData__name}>{artist.name}</div>
                                                            <div className={styles.artistData__previewData__roles}>
                                                                {artist.roles.map((role, i) => (
                                                                    <div key={i} className={styles.artistData__container}>
                                                                        <p className={styles.artistData__container__role}>{role}{i < artist.roles.length - 1 && ','}</p>
                                                                        <div className={styles.artistData__container__roleRemover}>
                                                                            <X onClick={() => removeRoleFromArtist(artist.name, role)} color='red'/>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles['songDetails__data']}>
                                        <button type="submit">Create Song</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            {modalStateShowCropperCover && (
                <ModalOverlay onClose={() => modal.closeModal('showCropperCover')}>
                    <CoverCropper onSave={handleSave} mode={mode} type="showCropperCover" />
                    <button onClick={() => modal.closeModal('showCropperCover')} className="cancelButton">
                        Cancel
                    </button>
                </ModalOverlay>
            )}
        </div>
    )
}