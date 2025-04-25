export const handleAudioFileChange = (event, setValue, setSongFileChosen, setAudioFront = null) => {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('audio/')) {
            console.error("Chosen file isn't audio file");
            return;
        }

        const url = URL.createObjectURL(file);
        const audio = new Audio(url);

        const convertToMMSS = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.round(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        };

        const onMetadataLoaded = () => {
            const formattedDuration = convertToMMSS(audio.duration)
            setValue('duration', formattedDuration);
            setValue('audio', file);
            if (setAudioFront) {
                setAudioFront(file);
            }
            setSongFileChosen(true);

            URL.revokeObjectURL(url);
        };

        const onError = () => {
            console.error("Error during uploading audiofile metadatas");
            URL.revokeObjectURL(url);
        };

        audio.addEventListener('loadedmetadata', onMetadataLoaded);
        audio.addEventListener('error', onError);
    } else {
        console.error("File hasn't been chosen.");
    }
};