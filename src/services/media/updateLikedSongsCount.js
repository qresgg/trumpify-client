import { setData } from '../../lib/redux/data/dataSlice';

export const updateLikedSongsCount = (dispatch, currentUser, currentArtist, newCount, songId) => {
    const currentList = currentUser.user_likedSongsList || [];
    const songIdStr = String(songId);

    const alreadyLiked = currentList.includes(songIdStr);

    const updatedList = alreadyLiked
        ? currentList.filter(id => id !== songIdStr)
        : [...currentList, songIdStr];

    dispatch(
        setData({
            user: {
                ...currentUser,
                user_likedSongsCount: newCount,
                user_likedSongsList: updatedList,
            },
            artist: {
                ...currentArtist,
            },
        })
    );
};