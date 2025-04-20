import styles from './createForm.module.scss'
import { useForm } from 'react-hook-form'
import { useState, useRef, useEffect } from 'react';
import { createAlbum } from '../../../../../services/artist/artistService';
import { CreateSongAlbum } from './createSongAlbum';
import { X } from 'lucide-react'
import { previewFromFile } from '../../../../../utils/custom/previewFromFile';

export function AlbumCreatePage() {
    const { register, handleSubmit, formState: { errors }, setValue} = useForm();
    const [previewImage, setPreviewImage] = useState('');
    const [isOpened, setIsOpened] = useState(false)
    const [song, setSong] = useState([]);
    const contentRef = useRef();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (data) => {
        try {
            await createAlbum(data, song);
            setSuccess('Album created successfully');
            setError('')
        } catch (error) {
            setError('Error during creation album');
            setSuccess('')
            console.error(error.response ? error.response.data : error);
        }
    }

    const addSong = (song) => {
        setSong((prevState) => [...prevState, song]);
    }
    const removeSong = (songIndex) => {
        setSong((prevSongs) => prevSongs.filter((_, index) => index !== songIndex))
    } 

    const handleIsOpened = () => {
        setIsOpened(false);
    }
    return (
        <div className={styles.main}>
            { isOpened && <div className={styles.blackScreen}></div>}
            <div className={styles.main__container} ref={contentRef}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div className={styles.section}>Album creation</div>
                    <div>
                        <label>Choose album cover</label>
                        <div className={styles.file}>
                            <input type="file" accept="image/*"{...register('cover', { required: 'cover is required'})} onChange={(e) => previewFromFile(e, setPreviewImage, setValue)}/>
                            <div className={styles.preview} style={{ backgroundImage: previewImage}}></div>
                        </div>
                        {errors.cover && <p>{errors.cover.message}</p>}
                    </div>
                    <div>
                        <label>Create album name</label>
                        <input {...register("albumTitle", { required: "Album name required" })} />
                        {errors.albumTitle && <p>{errors.albumTitle.message}</p>}
                    </div>
                    <div>
                        <label>Enter Record Label</label>
                        <input {...register("recordLabel", { required: "Record Label required" })} />
                        {errors.recordLabel && <p>{errors.recordLabel.message}</p>}
                    </div>
                    <div>
                        <label>What's main language in your album</label>
                        <select {...register('language', { required: 'language is required'})}>
                            <option value="">choose language</option>
                            <option value="UA">Ukrainian</option>
                            <option value="ENG(US)">English (United States)</option>
                            <option value="ENG(UK)">English (United Kingdom)</option>
                            <option value="DEU">German</option>
                            <option value="POL">Polish</option>
                        </select>
                        {errors.language && <p>{errors.language.message}</p>}
                    </div>
                    <div>
                        <label>Choose main genre in album</label>
                        <select {...register('genre', { required: 'genre is required'})}>
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
                        {errors.genre && <p>{errors.genre.message}</p>}
                    </div>
                    <div>
                        <label>What's type of album </label>
                        <select {...register('type', { required: 'Choose Type' })}>
                            <option value="">choose album type</option>
                            <option value="Album">Album</option>
                            <option value="Short-Album">Short-Album</option>
                        </select>
                        {errors.type && <p>{errors.type.message}</p>}
                    </div>
                    <div>
                        <label>Songs</label>
                        <div className={styles.songs}>
                            {song.map((songie, index) => (
                                <div key={index} className={styles.song}>
                                    <div className={styles.removeButton} onClick={() => removeSong(index)}><X color="black" style={{cursor: 'pointer'}}/></div>
                                    <div className={styles.content}>
                                        <div className={styles.title}>{songie.title}</div>
                                        <div className={styles.duration}>{songie.duration}</div>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.addSong} onClick={() => setIsOpened(true)}>
                                <div className={styles.addSong__plus}></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit">Create Album</button>
                    </div>
                </form>
            </div>
            { isOpened &&  <CreateSongAlbum toggleModal={handleIsOpened} sendSong={addSong}/> }
        </div>
    )
}