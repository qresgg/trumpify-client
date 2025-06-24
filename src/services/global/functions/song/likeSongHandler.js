import { unLikeSong, likeSong } from '../../../../services/user/Actions/userActionsService';
import { updateLikedSongsCount } from './updateLikedSongsCount';

const OnLikeSong = (() => {
  let timeoutId;

  return (song, likedSong, setLikedSong, dispatch, data) => {
    const newLikeState = !likedSong;
    setLikedSong(newLikeState);

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      try {
        const response = newLikeState
          ? await likeSong(song)
          : await unLikeSong(song);

        updateLikedSongsCount(dispatch, data.user, data.artist, response.likedSongs, song._id);
      } catch (error) {
        console.error(error.response ? error.response.data : error);
        setLikedSong(likedSong);
      }
    }, 100);
  };
})();

export default OnLikeSong;