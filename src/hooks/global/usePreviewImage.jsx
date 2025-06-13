import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../useModal";

export function usePreviewImage({ setValue }) {
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState({ avatar: null, banner: null })
    const modal = useModal();
    const artist = useSelector((state) => state.data.artist)
    const user = useSelector((state) => state.data.user)

    useEffect(() => {
        if (artist) {
            setPreviewImage((prev) => ({
                ...prev,
                avatar: `url(${user.user_avatar_url})`
            }));
        }
    }, []);

    const handleSave = (file, mode) => {
        modal.closeModal('showCropperUserPage')

        const reader = new FileReader();
        reader.onloadend = () => {
            if (mode?.avatar) {
                setPreviewImage(prev => ({
                    ...prev,
                    avatar: `url(${reader.result})`
                }));
                setValue('avatar', file)
            } else {
                setPreviewImage(prev => ({
                    ...prev,
                    banner: `url(${reader.result})`
                }));
                setValue('banner', file)
            }
        };
        reader.readAsDataURL(file);
    };

    return {
        handleSave, 
        previewImage,
        setPreviewImage
    };
}
