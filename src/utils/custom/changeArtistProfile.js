import { setData } from "../../lib/redux/data/dataSlice";
import { updateArtistName, updateBio, uploadAvatar, uploadBanner } from "../../services/artist/artistAction";
import { isValidArtistName, isValidBio } from "../../lib/regexp";
import { setGlobalMessage } from "../../lib/redux/pages/viewSlice";

const changeArtistInfo = async (data, dataRedux, dispatch, setMessage) => {
    let artist = dataRedux.artist;
    let user = dataRedux.user;
    try {
        if (data) {
            const updates = {};
            if (data.avatar && data.avatar.length > 0) {
                const res = await uploadAvatar(data.avatar);
                updates.artist_avatar = res.avatarUrl;
                dispatch(setGlobalMessage({ type: "success" , message: res.message }))
            }
            if (data.bio && data.bio !== artist.artist_bio) {
                !isValidBio(data.bio) && setMessage({ success: '', error: 'Invalid biography' });

                const res = await updateBio(data.bio);
                dispatch(setGlobalMessage({ type: "success" , message: res.message }))
            }
            if (data.banner && data.banner.length > 0) {
                const res = await uploadBanner(data.banner);
                updates.artist_banner = res.bannerUrl;
                dispatch(setGlobalMessage({ type: "success" , message: res.message }))

            }
            if (data.artistName && data.artistName !== artist.artist_name) {
                !isValidArtistName(data.artistName) && setMessage({ success: '', error: 'Invalid artist name' });
                
                const res = await updateArtistName(data.artistName);
                updates.artist_name = data.artistName;
                dispatch(setGlobalMessage({ type: "success" , message: res.message }))
            }
            dispatch(setData({ user, artist: { ...artist, ...updates } }));
        }
    } catch (error) {
        dispatch(setGlobalMessage({ type: "error" , message: error.message }))

        console.error(error);
    }
}

export { changeArtistInfo }