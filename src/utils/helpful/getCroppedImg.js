export function getCroppedImg4X3(imageSrc, croppedAreaPixels, format = "jpeg") {
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.src = url;
            image.crossOrigin = "anonymous";
        });

    return new Promise(async (resolve, reject) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 500;
        canvas.height = 500;

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

        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const fileExtension = format === "jpg" ? "jpg" : format;

        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
            }
            const file = new File([blob], `cover.${fileExtension}`, { type: mimeType });
            resolve(file);
        }, mimeType, 0.9);
    });
}