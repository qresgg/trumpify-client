const previewFromFile = (e, setPreviewImage, setValue, type) => {
    const file = e.target.files[0];
    type && setValue(type, file)
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(`url(${event.target.result})`);
        };
        reader.readAsDataURL(file); 
    }
}

export { previewFromFile }