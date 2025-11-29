import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "./useModal";

export function usePreviewImage({ setValue }) {
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState({ avatar: null, banner: null, albumCover: null, songCover: null })
    const modal = useModal();
    const artist = useSelector((state) => state.data.artist)
    const user = useSelector((state) => state.data.user)

    useEffect(() => {
        if (user || artist) {
            setPreviewImage((prev) => ({
                ...prev,
                avatar: `url(${user.user_avatar_url})`,
                banner: `url(${artist.artist_banner})`,
                artistAvatar: `url(${artist.artist_avatar})`,
            }));
        }
    }, [user]);

    const handleSave = (file, mode, type = null) => {
        type && modal.closeModal(type)
        console.log(mode)

        const reader = new FileReader();
        reader.onloadend = () => {
            if (mode?.type === 'avatar') {
                setPreviewImage(prev => ({
                    ...prev,
                    avatar: `url(${reader.result})`
                }));
                setValue('avatar', file)
            } else if (mode?.type === 'banner'){
                setPreviewImage(prev => ({
                    ...prev,
                    banner: `url(${reader.result})`
                }));
                setValue('banner', file)
            } else if (mode?.type === 'albumCover'){
                setPreviewImage(prev => ({
                    ...prev,
                    albumCover: `url(${reader.result})`
                }));
                setValue('cover', file)
            } else if (mode?.type === 'songCover'){
                setPreviewImage(prev => ({
                    ...prev,
                    songCover: `url(${reader.result})`
                }));
                setValue('cover', file)
            } else if (mode?.type === 'artistAvatar') {
                setPreviewImage(prev => ({
                    ...prev,
                    artistAvatar: `url(${reader.result})`
                }));
                setValue('avatar', file)
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
