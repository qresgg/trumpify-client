import { fetchUserLibrary } from '../api.service';
import { handleLikeAlbum, handleUnLikeAlbum } from '../user.service';
import { setUserLibrary } from '../../lib/redux/data/dataSlice';
import updateLibrary from '../shared/updateLibrary';

const OnLikeAlbum = async ({
    album, 
    likedAlbum, 
    setLikedAlbum, 
    dispatch, 
    data, 
    timerRef
}) => {
    clearTimeout(timerRef.current);

    const prevLikeRef = likedAlbum;
    const newLikeState = !likedAlbum;
    setLikedAlbum(newLikeState);

    timerRef.current = setTimeout(async () => {
        try {
            if (prevLikeRef) {
                await handleUnLikeAlbum(album._id);
            } else {
                await handleLikeAlbum(album._id);
            }
            const response = await fetchUserLibrary();
            updateLibrary(dispatch, data.user, data.artist, response.libraryItems);
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }, 700);
};

export default OnLikeAlbum;