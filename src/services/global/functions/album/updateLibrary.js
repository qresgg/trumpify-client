import { setData } from "../../../../lib/redux/data/dataSlice";

export default function updateLibrary(dispatch, currentUser, currentArtist, newLibrary){
    dispatch(
        setData({
            user: {
                ...currentUser,
                user_library: newLibrary,
            },
            artist: {
                ...currentArtist
            }
        })
    )
}