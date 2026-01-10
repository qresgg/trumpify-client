import { setData } from "../../../lib/redux/data/dataSlice";
import { changeAvatar, changeUserName } from "../../../services/user.service";
import { isValidUserName } from "../../../lib/regexp";

const changeAvaUserName = async (data, dataRedux, dispatch, setMessage) => {
    let user = dataRedux.user;
    let artist = dataRedux.artist;
    try {
        console.log('change', data)
        if (data) {
            const updates = {};
            if (data.avatar) {
                const res = await changeAvatar(data.avatar);
                updates.user_avatar_url = res.avatarUrl;
                setMessage({ success: res.message, error: '' });
            } 
            if (data.userName){
                !isValidUserName(data.user_name) && setMessage({ success: '', error: 'Invalid artist name' });

                const res = await changeUserName({ user_name: data.userName});
                updates.user_name = data.userName;
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