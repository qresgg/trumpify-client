import { fetchUserDataMy } from "../../../services/user.service";
import { createArtist } from "../../../services/artist/artistService";

export const artistHandler = (dispatch, setMessage, reset, setReduxData) => {
    const handlePasswordValidation = (data) => {
        if (data.password !== data.confirmPassword) {
            setMessage({ error: "Passwords do not match" });
            return false;
        }
        return true;
    };

    const submitArtist = async (data) => {
        const response = await createArtist(data);
        setMessage({ success: response.message });
        reset();
    };

    const refreshUserData = async () => {
        const userData = await fetchUserDataMy();
        dispatch(setReduxData(userData));
    };

    const onSubmit = async (data) => {
        try {
            if (!handlePasswordValidation(data)) return;
            await submitArtist(data);
            await refreshUserData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error during creation artist profile";
            setMessage({ error: errorMessage });
        }
    };

    return onSubmit;
}