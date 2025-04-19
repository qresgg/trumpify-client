import { setData } from "../../lib/redux/data/dataSlice";
import { uploadAvatar } from "../../services/user/changeData/userDataChange";
import { updateUserName } from "../../services/user/changeData/userDataChange";
import { isValidUserName } from "../../lib/regexp";

const changeAvaUserName = async (data, dataRedux, dispatch, onOpened) => {
    let user = dataRedux.user;
    let artist = dataRedux.artist;
    if (!isValidUserName(data?.username)) {
        return;
    }
    try {
        if (data) {
            const updates = {};
            if (data.avatar) {
                await uploadAvatar(data.avatar);
                updates.user_avatar_url = data.avatar;
            }
            if (data.username) {
                await updateUserName(data.username);
                updates.user_name = data.username;
            }
            dispatch(setData({ user: { ...user, ...updates }, artist }));
            onOpened(data);
        }
    } catch (error) {
        console.error(error.response ? error.response.data : error);
    }
}

export { changeAvaUserName }