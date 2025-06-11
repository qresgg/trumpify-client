import { setData } from "../../lib/redux/data/dataSlice";
import { updateArtistName, updateBio, uploadAvatar, uploadBanner } from "../../services/artist/data/put/changeArtist";
import { isValidUserName } from "../../lib/regexp";

const changeArtistName = async (data, dataRedux, dispatch) => {
    let artist = dataRedux.artist;
    if (!isValidUserName(data?.username)) {
        return;
    }
    try {
        if (data) {
            const updates = {};
            if (data.avatar) {
                await uploadAvatar(data.avatar);
                //updates.art_avatar_url = data.avatar;
            }
            if (data.bio) {
                await updateBio(data.bio);
                //updates.user_name = data.username;
            }
            if (data.banner) {
                await uploadBanner(data.banner);
                //updates.user_name = data.username;
            }
            if (data.artistName) {
                await updateArtistName(data.artistName);
                //updates.user_name = data.username;
            }
            //dispatch(setData({ user, artist: { ...artist, ...updates } }));
        }
    } catch (error) {
        console.error(error.response ? error.response.data : error);
    }
}

export { changeArtistName }