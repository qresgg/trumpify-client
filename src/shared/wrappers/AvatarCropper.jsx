import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg4X3 } from "../../utils/helpful/getCroppedImg";
import {setModalView} from "../../lib/redux/pages/viewSlice";
import {useDispatch, useSelector} from "react-redux";
import { useModal } from "../../hooks/global/useModal"
import styles from "./styles/avatarCropper.module.scss";

export default function AvatarCropper({ onSave, mod, type = null, modalWindow = null}) {
    const dispatch = useDispatch();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const modal = useModal();

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result);
            });
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            const blob = await getCroppedImg4X3(imageSrc, croppedAreaPixels);
            const file = new File([blob], "avatar.png", { type: "image/png" });
            onSave(file, mod);
            modal.closeModal(modalWindow);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles['cropper']}>
            <div className={styles['cropper__container']}>
                <input type='file' accept='image/*' onChange={onFileChange} />
            </div>

            {imageSrc && (
                <div className={styles['main']}>
                    <div className={styles['main__container']}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 4}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <input
                        type='range'
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                    />
                    <button onClick={handleSave}>
                        Confirm
                    </button>
                </div>
            )}
        </div>
    );
}
