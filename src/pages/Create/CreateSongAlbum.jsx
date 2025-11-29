import { X } from 'lucide-react';
import styles from './CreateSongAlbum.module.scss';
import { audioHandle } from '../../utils/global/audioUtils';

import Select from 'react-select'
import { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useModal } from '../../hooks/global/useModal';
import { useMessage } from '../../hooks/global/useMessage';
import { useArtistsRoleActions } from '../../hooks/album/useArtistsRoleActions';

import useGenres from '../../hooks/global/useGenres';
import { customTheme, customOptionGenre, customSingleValueGenre } from './shared/func/customRenderItem';

import InputField from './shared/inputField';
import { customSelectStyles } from './shared/func/customStyles';

export default function CreateSongAlbum({ sendSong, songToEdit, clearEditingSongIndex }) {
    const modal = useModal();
    const [ windowSize, setWindowSize ] = useState({ width: window.innerWidth, height: window.innerHeight });
    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm({
        defaultValues: {
            title: songToEdit ? songToEdit.title : null,
            genre: songToEdit ? songToEdit.genre : [],
            explicit: songToEdit ? songToEdit.explicit : false,
            duration: songToEdit ? songToEdit.duration : null,
            audio: songToEdit ? songToEdit.audio : null
        }
    });
    const { removeArtist, removeRoleFromArtist, addArtistWithRole, artists, setArtists } = useArtistsRoleActions();
    const { message, setMessage } = useMessage();
    const [ songFileChosen, setSongFileChosen ] = useState(false);
    const [ audioFront, setAudioFront ] = useState(null);
    const { genres, loading: genresLoading, error: genresError } = useGenres();

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => { 
        if (songToEdit && Array.isArray(songToEdit.artists)) {
            songToEdit.artists.forEach((artist) => {
                if (artist?.name && Array.isArray(artist.roles)) {
                    const flatRoles = artist.roles.flat();

                    addArtistWithRole(artist.name, flatRoles);
                }
            });
        }
    }, [songToEdit]);

    const onSubmit = async (data) => {
        try {
            if(artists.length !== 0) {
                // console.log('data', {...data, artists});
                sendSong({ ...data, artists });
                setMessage({ success: 'Song created successfully' });
                clearAll();
            } else {
                setMessage({ error: 'Error song cant be created without artist and role'});
            }
        } catch (error) {
            setMessage({ error: 'Error during creation song' });
            console.error(error.response ? error.response.data : error);
        }
    };

    const clearAll = () => {
        reset();
        setArtists([])
        clearEditingSongIndex();
        modal.closeModal('songCreate');
    }

    return (
        <div className={styles['createSong__modal']}>
            <div className={styles['createSong__modalContainer']}>
                <div className={styles['createSong__modalHeader']}>
                    {audioFront && <p title={audioFront.name}>chosen file = {audioFront.name || songToEdit.audio.name}</p>}
                    <X onClick={() => modal.closeModal('songCreate')} />
                </div>
                <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("ERRORS", errors))}>
                    <input type="file" accept='audio/*' id="audioFile" style={{ display: 'none' }} onChange={(event) => audioHandle(event, setValue, setSongFileChosen, setAudioFront)}/>
                    {!songFileChosen && !songToEdit && (
                        <div className={styles['songFile']}>
                            <div className={styles['songFile__title']}>
                                <p className='white-label'>Upload your </p>
                                <p className='green-label'>audio file.</p>
                            </div>
                            <div className={styles['songFile__description']}>Mp3, under 10mb</div>
                            <div className={styles['songFile__container']} onClick={() => document.getElementById("audioFile")?.click()}>
                                <div className={styles['songFile__image']}></div>
                                <div className={styles['songFile__caption']}></div>
                                <div className={styles['songFile__button']}>Choose files</div>
                            </div>
                        </div>
                    )}
                    {(songFileChosen || songToEdit) && (
                        <div className={styles['songDetails']}>
                            {/* <div className={styles['songDetails__genres']}>
                                {watchedGenres?.map((genre) => (
                                    <p key={genre.name} className={styles['songDetails__genre']}>
                                        {genre.name}
                                        <X onClick={() => {
                                            const newGenres = watchedGenres.filter(g => g.name !== genre.name);
                                            setValue("genre", newGenres);
                                            }}/>
                                    </p>
                                ))}
                            </div> */}
                            <div className={styles['songDetails__container']}>
                                {message.error && <p className='error'>{message.error}</p>}
                                {message.success && <p className='success'>{message.success}</p>}
                                <InputField 
                                    label={'Song title'} 
                                    required={'Title is required'}
                                    register={register}
                                    name={'title'}
                                    errors={errors}
                                    className={styles['songDetails__item']}/>
                                <InputField 
                                    label={'Song genre'}
                                    register={register}
                                    errors={errors}
                                    className={styles['songDetails__item']}
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
                                {/* <div className={styles['songDetails__item']}>
                                    <label>
                                        <p>Song genre</p>
                                        <p className='error'>*</p>
                                    </label>
                                    <select {...register('genre', { required: 'genre is required' })} >
                                        <option value="">choose genre</option>
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
                                </div> */}
                                <InputField 
                                    name={'explicit'}
                                    label={'Does your song have explicit lyrics?'}
                                    register={register}
                                    type={"checkbox"}
                                    errors={errors}
                                    className={styles['songDetails__item']} />
                                <div className={styles['songDetails__item']}>
                                    <label>
                                        <p>Add artist on feat</p>
                                        <p className='error'>*</p>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Artist Name"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const artistName = e.target.value.trim();
                                                if (artistName) {
                                                    addArtistWithRole(artistName, 'main vocal', setArtists);
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
                                <div className={styles['songDetails__item']}>
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
                            <button type="submit">Add song to album</button>
                        </div>
                    </div>
                    )}
                </form>
            </div>
        </div>
    );
}