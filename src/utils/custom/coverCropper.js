import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg4X3 } from "../helpful/getCroppedImg";
import styles from '../../style/addictions/cropper.module.scss';

export default function CoverCropper({ onSave, mode, type }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [format, setFormat] = useState("jpeg"); 

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
            const file = await getCroppedImg4X3(imageSrc, croppedAreaPixels, format);
            onSave(file, mode, type);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container__filePicker}>
                <input type='file' accept='image/*' onChange={onFileChange} />
            </div>

            {imageSrc && (
                <>
                    <div className={styles.container__cropper}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1} 
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
                        className={styles.container__range}
                    />

                    <button onClick={handleSave} className={styles.container__button}>
                        Confirm
                    </button>
                </>
            )}
        </div>
    );
}
