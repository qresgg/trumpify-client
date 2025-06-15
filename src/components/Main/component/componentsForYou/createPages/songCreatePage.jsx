import styles from './createForm.module.scss'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createSong } from '../../../../../services/artist/artistService';
import { X } from 'lucide-react';
import { handleAudioFileChange } from '../../../../../utils/custom/durationFromFile';
import { useMessage } from '../../../../../hooks/global/useMessage';
import { useArtistsRoleActions } from '../../../../../hooks/album/useArtistsRoleActions';
import { usePreviewImage } from '../../../../../hooks/global/usePreviewImage';
import CoverCropper from '../../../../../utils/custom/coverCropper';
import ModalOverlay from '../../../snippets/ModalOverlay';
import { useModal } from '../../../../../hooks/useModal';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function SongPageCreate () {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm();
    const { removeArtist, removeRoleFromArtist, addArtistWithRole, artists, setArtists } = useArtistsRoleActions();
    const { handleSave, previewImage, setPreviewImage } = usePreviewImage({ setValue });

    const { modalStateShowCropperCover } = useSelector((state) => state.view.modal);

    const modal = useModal()
    const [ mode, setMode ] = useState({ type: 'songCover' });
    const { message, setMessage } = useMessage()
    const [ songFileChosen, setSongFileChosen ] = useState(null)
    const [ isHover, setIsHover ] = useState(null);

    const onSubmit = async (data) => {
        try {
            if (artists.length !== 0) {
                const res = await createSong({ data, artists })
                setMessage({ message: res ? res.message : 'Song has been created successfully' })
            } else {
                setMessage({ error: 'Song must have at least 1 artist'})
            }
        } catch (error) {
            setMessage({ error: error.response.data || 'Error during creation song '})
            console.error(error.response ? error.response.data : error);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <div className={styles.main__container__header}>
                    <p className={styles.white}>Create a </p>
                    <p className={styles.green}>new song.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" accept='audio/*' id="audioFile" style={{ display: 'none' }} onChange={(e) => handleAudioFileChange(e, setValue, setSongFileChosen)}/>
                    {!songFileChosen && (
                    <div className={styles.songFile}>
                        <div className={styles.songFile__caption}>
                            <p className={styles.white}>Upload your </p>
                            <p className={styles.green}>audio file.</p>
                        </div>
                        <div className={styles.songFile__description}>Mp3, under 10mb</div>
                        <div className={styles.songFile__container} onClick={() => document.getElementById("audioFile")?.click()}>
                            <div className={styles.songFile__container__image}></div>
                            <div className={styles.songFile__container__caption}></div>
                            <div className={styles.songFile__container__button}>
                                Choose files
                            </div>
                        </div>
                    </div>
                    )}
                    {songFileChosen && (
                        <div className={styles.songDetails}>
                            <div className={styles.upperContainer}>
                                {message.error && <p className='error'>{message.error}</p>}
                                {message.success && <p className='success'>{message.success}</p>}
                            </div>
                            <div className={styles.mainContainer}>
                                <div className={styles.songDetails__leftContainer}>
                                    <div className={styles.file}
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
                                <div className={styles.songDetails__rightContainer}>
                                    <div className={styles.songDetails__rightContainer__data}>
                                        <label>
                                            <p>Song title</p>
                                            <p className={styles.red}>*</p>
                                        </label>
                                        <input {...register('title', { required: 'title is required'})} />
                                        {errors.songTitle && <p>{errors.songTitle.message}</p>}
                                    </div>
                                    <div className={styles.songDetails__rightContainer__data}>
                                        <label>
                                            <p>Choose genre of song</p>
                                        </label>
                                        <select {...register('genre', { required: 'genre is required'})}>
                                            <option value="" disabled>-_-_-Choose-_-_-</option>
                                            <option value="pop">Pop</option>
                                            <option value="rock">Rock</option>
                                            <option value="hip-hop">Hip-Hop</option>
                                            <option value="electronic">Electronic</option>
                                            <option value="jazz">Jazz</option>
                                            <option value="r&b">R&B</option>
                                            <option value="country">Country</option>
                                            <option value="metal">Metal</option>
                                        </select>
                                        {errors.genre && <p>{errors.genre.message}</p>}
                                    </div>
                                    <div className={styles.songDetails__rightContainer__data}>
                                        <div className={styles.songDetails__rightContainer__data__double}>
                                            <div className={styles.double__container}>
                                                <label className={styles.label}>
                                                    <p className={styles.double__container__p}>Does your song have explicit lyrics?</p>
                                                </label>
                                                <input type="checkbox" {...register('explicit')} />
                                                {errors.explicit && <p className='error'>{errors.explicit.message}</p>}
                                            </div>
                                            <div className={styles.double__container}>
                                                <label className={styles.label}>
                                                    <p>Date</p>
                                                    <p className={styles.red}>*</p>
                                                </label>
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.songDetails__rightContainer__data}>
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
                                    <div className={styles.songDetails__rightContainer__data}>
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
                                    <div className={styles.songDetails__rightContainer__data}>
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
                                </div>
                            </div>
                            <div className={styles.lowerContainer}>
                                <button type="submit">Create Song</button>
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