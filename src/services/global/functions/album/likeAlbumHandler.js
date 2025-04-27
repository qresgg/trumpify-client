import { getUserLibrary } from '../../../user/userService';
import { likeAlbum, unLikeAlbum } from '../../../artist/data/put/albumAction';
import { setUserLibrary } from '../../../../lib/redux/data/dataSlice';
import updateLibrary from './updateLibrary';

const OnLikeAlbum = async (album, likedAlbum, setLikedAlbum, dispatch, data, timerRef) => {
    clearTimeout(timerRef.current);

    const prevLikeRef = likedAlbum;
    const newLikeState = !likedAlbum;
    setLikedAlbum(newLikeState);

    timerRef.current = setTimeout(async () => {
        try {
            if (prevLikeRef) {
                await unLikeAlbum(album);
            } else {
                await likeAlbum(album);
            }
            const response = await getUserLibrary();
            updateLibrary(dispatch, data.user, data.artist, response.libraryItems);
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }, 700);
};

export default OnLikeAlbum;