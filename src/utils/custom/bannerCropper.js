import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function getCroppedImg(imageSrc, croppedAreaPixels) {
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.src = url;
        });

    return new Promise(async (resolve, reject) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 1280;
        canvas.height = 720;

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
            }
            blob.name = "banner.png";
            resolve(blob);
        }, "image/png");
    });
}

export default function BannerCropper({ onSave, mode, type }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
            const file = new File([blob], "banner.png", { type: "image/png" });
            onSave(file, mode, type);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ width: 640, margin: "0 auto", fontFamily: "sans-serif" }}>
            <div style={{ marginBottom: 10 }}>
                <input type='file' accept='image/*' onChange={onFileChange} />
            </div>

            {imageSrc && (
                <>
                    <div
                        style={{
                            position: "relative",
                            width: "640px",
                            height: "360px",
                            background: "#333",
                            marginBottom: 10,
                        }}
                    >
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={16 / 9}
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
                        style={{ width: "100%", marginBottom: 10 }}
                    />

                    <button
                        onClick={handleSave}
                        style={{ padding: "8px 16px", cursor: "pointer" }}
                    >
                        Confirm
                    </button>
                </>
            )}
        </div>
    );
}
