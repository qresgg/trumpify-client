import styles from './createForm.module.scss'
import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react';
import { createAlbum } from '../../../../../services/artist/artistService';
import { CreateSongAlbum } from './createSongAlbum';
import { X } from 'lucide-react'
import { previewFromFile } from '../../../../../utils/custom/previewFromFile';
import { useModal } from '../../../../../hooks/useModal';
import { useSelector } from 'react-redux';

export function AlbumCreatePage() {
    const { register, handleSubmit, formState: { errors }, setValue, reset} = useForm();
    const modal = useModal();
    const { modalStateSongCreate } = useSelector((state) => state.view.modal)
    const [previewImage, setPreviewImage] = useState('');
    const [songs, setSongs] = useState([]);
    const contentRef = useRef();
    const [message, setMessage] = useState({ success: '', error: '' })
    const [ isHover, setIsHover ] = useState(null);
    const [editingSongIndex, setEditingSongIndex] = useState(null);


    const onSubmit = async (data) => {
        try {
            await createAlbum(data, songs);
            setMessage({ success: "Album has been created successfully", error: ''})
            reset();
        } catch (error) {
            setMessage({ success: '', success: "Error during creation album!"})
            console.error(error.response ? error.response.data : error);
        }
    }

    const addSong = (newSong) => {
        setSongs((prevState) => {
            const existingIndex = prevState.findIndex(
            (song) =>
                song.title === newSong.title && song.fileName === newSong.fileName
            );

            if (existingIndex !== -1) {
            // Замінити існуючу пісню
            const updatedSongs = [...prevState];
            updatedSongs[existingIndex] = newSong;
            return updatedSongs;
            } else {
            // Додати нову пісню
            return [...prevState, newSong];
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
        <div className={styles.main}>
            { modalStateSongCreate && <div className={styles.blackScreen} onClick={() => modal.closeModal()}></div>}
            <div className={styles.main__container} ref={contentRef}>
                <div className={styles.main__container__header}>
                    <p className={styles.white}>Album  </p>
                    <p className={styles.green}>creation.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {message.error && <p className='error'>{message.error}</p>}
                    {message.success && <p className='success'>{message.success}</p>}
                    <div className={styles.albumDetails}>
                        <div className={styles.albumDetails__rightContainer}>
                            <div className={styles.albumDetails__leftContainer}>
                                <div className={styles.file}
                                        onMouseEnter={() => setIsHover(true)}
                                        onMouseLeave={() => setIsHover(false)}>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            {...register('cover')} 
                                            onChange={(e) => previewFromFile(e, setPreviewImage, setValue, 'cover')} 
                                            style={{ display: 'none'}}
                                            id="imageFile"/>
                                        <div className={styles.preview}>
                                            {previewImage && <div className={styles.preview__art} style={{ backgroundImage: previewImage }}></div>}
                                            {isHover && (
                                                <>
                                                    <div className={styles.preview__blackscreen}></div>
                                                    <div className={styles.preview__choose} onClick={() => document.getElementById('imageFile')?.click()}>Choose song cover</div>
                                                </>
                                            )}
                                        </div>
                                        {errors.cover && <p className='error'>{errors.cover.message}</p>}
                                </div>
                            </div>
                            <div className={styles.albumDetails__rightContainer__data}>
                                <label>
                                    <p>Album title</p>
                                    <p className={styles.red}>*</p>
                                </label>
                                <input {...register("albumTitle", { required: "Album name required" })} />
                                {errors.albumTitle && <p className='error'>{errors.albumTitle.message}</p>}
                            </div>
                            <div className={styles.albumDetails__rightContainer__data}>
                                <label>
                                    <p>Label name</p>
                                    <p className={styles.red}>*</p>
                                </label>
                                <input {...register("recordLabel", { required: "Record Label required" })} />
                                {errors.recordLabel && <p className='error'>{errors.recordLabel.message}</p>}
                            </div>
                            <div className={styles.albumDetails__rightContainer__data}>
                                <label>
                                    <p>Main language of album</p>
                                    <p className={styles.red}>*</p>
                                </label>
                                <select {...register('language', { required: 'language is required'})}>
                                    <option value="">choose language</option>
                                    <option value="UA">Ukrainian</option>
                                    <option value="ENG(US)">English (United States)</option>
                                    <option value="ENG(UK)">English (United Kingdom)</option>
                                    <option value="DEU">German</option>
                                    <option value="POL">Polish</option>
                                    <option value="NOR">Norway</option>
                                    <option value="SPA">Spanish</option>
                                </select>
                                {errors.language && <p className='error'>{errors.language.message}</p>}
                            </div>
                            <div className={styles.albumDetails__rightContainer__data}>
                                <label>
                                    <p>Main genre of album</p>
                                    <p className={styles.red}>*</p>
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
                            <div className={styles.albumDetails__rightContainer__data}>
                                <label>
                                    <p>Album type</p>
                                    <p className={styles.red}>*</p>
                                </label>
                                <select {...register('type', { required: 'Choose Type' })}>
                                    <option value="">choose album type</option>
                                    <option value="Album">Album</option>
                                    <option value="Short-Album">Short-Album</option>
                                </select>
                                {errors.type && <p className='error'>{errors.type.message}</p>}
                            </div>
                            <div className={styles.albumDetails__rightContainer__data}>
                                <label>
                                    <p>Songs list:</p>
                                    <p className={styles.red}>*</p>
                                </label>
                                <div className={styles.songs}>
                                    {songs.map((song, index) => (
                                        <div key={index} className={styles.song}>
                                            <div className={styles.song__removeButton} onClick={() => removeSong(index)}><X color="black" style={{cursor: 'pointer'}}/></div>
                                            <div className={styles.song__content} onClick={() => {
                                                setEditingSongIndex(index);
                                                modal.openModal('songCreate');
                                            }}>
                                                <div className={styles.song__content__title}>{song.title}</div>
                                                <div className={styles.song__content__genre}>{song.genre}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={styles.addSong} onClick={() => {
                                        modal.openModal('songCreate')
                                        clearEditingSongIndex()
                                    }}>
                                        <div className={styles.addSong__plus}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.albumDetails__rightContainer__button}>
                                <button type="submit">Create Album</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            { modalStateSongCreate && <CreateSongAlbum 
                sendSong={addSong} 
                songToEdit={songs[editingSongIndex]}
                index={editingSongIndex}
                clearEditingSongIndex={clearEditingSongIndex}
                /> }
        </div>
    )
}