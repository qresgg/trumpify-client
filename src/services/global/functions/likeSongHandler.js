import { unLikeSong, likeSong } from '../../../services/user/Actions/userActionsService';
import { updateLikedSongsCount } from '../../../services/global/functions/updateLikedSongsCount';

const OnLikeSong = async (song, likedSong, setLikedSong, dispatch, data, timerRef) => {
    clearTimeout(timerRef.current);

    const prevLikeRef = likedSong;
    const newLikeState = !likedSong;
    setLikedSong(newLikeState);

    timerRef.current = setTimeout(async () => {
        try {
            const response = prevLikeRef
                ? await unLikeSong(song)
                : await likeSong(song);
            updateLikedSongsCount(dispatch, data.user, data.artist, response.likedSongs);
        } catch (error) {
            console.error(error.response ? error.response.data : error);
        }
    }, 700);
};

export default OnLikeSong;