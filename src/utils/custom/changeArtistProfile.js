import { setData } from "../../lib/redux/data/dataSlice";
import { updateArtistName, updateBio, uploadAvatar, uploadBanner } from "../../services/artist/artistAction";
import { isValidArtistName, isValidBio } from "../../lib/regexp";

const changeArtistInfo = async (data, dataRedux, dispatch, setMessage) => {
    let artist = dataRedux.artist;
    let user = dataRedux.user;
    try {
        if (data) {
            const updates = {};
            if (data.avatar) {
                const res = await uploadAvatar(data.avatar);
                updates.artist_avatar = res.avatarUrl;
                setMessage({ success: res.message, error: '' });
            }
            if (data.bio) {
                !isValidBio(data.bio) && setMessage({ success: '', error: 'Invalid biography' });

                const res = await updateBio(data.bio);
                setMessage({ success: res.message, error: '' });
            }
            if (data.banner) {
                const res = await uploadBanner(data.banner);
                updates.artist_banner = res.bannerUrl;
                setMessage({ success: res.message, error: '' });
            }
            if (data.artistName) {
                !isValidArtistName(data.artistName) && setMessage({ success: '', error: 'Invalid artist name' });
                
                const res = await updateArtistName(data.artistName);
                updates.artist_name = data.artistName;
                setMessage({ success: res.message, error: '' });
            }
            dispatch(setData({ user, artist: { ...artist, ...updates } }));
        }
    } catch (error) {
        setMessage({ success: '', error: error.message });
        console.error(error);
    }
}

export { changeArtistInfo }