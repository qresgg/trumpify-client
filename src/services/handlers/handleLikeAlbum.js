import { fetchUserLibraryMy } from '../api.service';
import { likeAlbum, unLikeAlbum } from '../user.service';
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
                await unLikeAlbum(album._id);
            } else {
                await likeAlbum(album._id);
            }
            const response = await fetchUserLibraryMy();
            updateLibrary(dispatch, data.user, data.artist, response.libraryItems);
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }, 700);
};

export default OnLikeAlbum;