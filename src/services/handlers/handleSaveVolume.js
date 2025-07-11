const SaveAudioVolume = async ( volume, timerRef ) => {
    timerRef.current = setTimeout( async () => {
        try{
            localStorage.setItem('volume', volume)
        } catch (error) {
            console.error('Failed to save volume to localStorage:', error);
        }
    }, 500)
};

export default SaveAudioVolume;