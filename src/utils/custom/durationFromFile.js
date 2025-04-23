export const handleAudioFileChange = (event, setValue) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            setValue('duration', audio.duration)
        });
    } else {
        console.error("File hasn't been chosen.");
    }
};