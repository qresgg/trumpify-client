const previewFromFile = (e, setPreviewImage, setValue) => {
    const file = e.target.files[0];
    setValue('avatar', file)
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(`url(${event.target.result})`);
        };
        reader.readAsDataURL(file); 
    }
}

export { previewFromFile }