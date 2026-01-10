// LEGACY CODE
// import { handleLikeSong, handleUnLikeSong } from '../user.service';
// import { updateLikedSongsCount } from '../media/updateLikedSongsCount';
//
// const OnLikeSong = (() => {
//     let timeoutId;
//
//     return (song, likedSong, setLikedSong, dispatch, data) => {
//         const newLikeState = !likedSong;
//         setLikedSong(newLikeState);
//
//         if (timeoutId) clearTimeout(timeoutId);
//
//         timeoutId = setTimeout(async () => {
//             try {
//                 const response = newLikeState
//                     ? await handleLikeSong(song._id)
//                     : await handleUnLikeSong(song._id);
//
//                 updateLikedSongsCount(dispatch, data.user, data.artist, response.likedSongs, song._id);
//             } catch (error) {
//                 console.error(error.response ? error.response.data : error);
//                 setLikedSong(likedSong);
//             }
//         }, 100);
//     };
// })();
//
// export default OnLikeSong;