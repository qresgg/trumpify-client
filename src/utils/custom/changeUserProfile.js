import { setData } from "../../lib/redux/data/dataSlice";
import { uploadAvatar, updateUserName } from "../../services/user/userDataChange";
import { isValidUserName } from "../../lib/regexp";

const changeAvaUserName = async (data, dataRedux, dispatch, setMessage) => {
    let user = dataRedux.user;
    let artist = dataRedux.artist;
    try {
        if (data) {
            const updates = {};
            if (data.avatar) {
                const res = await uploadAvatar(data.avatar);
                updates.user_avatar_url = res.avatarUrl;
                setMessage({ success: res.message, error: '' });
            }
            if (data.username) {
                !isValidUserName(data.user_name) && setMessage({ success: '', error: 'Invalid artist name' });

                const res = await updateUserName(data.username);
                updates.user_name = data.username;
                setMessage({ success: res.message, error: '' });
            }
            dispatch(setData({ user: { ...user, ...updates }, artist }));
        }
    } catch (error) {
        setMessage({ success: '', error: error.message });
        console.error("Server Error");
    }
}

export { changeAvaUserName }