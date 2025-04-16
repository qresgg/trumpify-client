import { setData } from '../../../../lib/redux/data/dataSlice';

export const updateLikedSongsCount = (dispatch, currentUser, currentArtist, newCount) => {
    dispatch(
        setData({
            user: {
                ...currentUser,
                user_likedSongsCount: newCount,
            },
            artist: {
                ...currentArtist
            }
        })
    )
}