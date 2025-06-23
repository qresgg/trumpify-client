import { useState, useRef, useEffect } from "react";
import { getVolume } from "../../services/global/functions/functions";
import SaveAudioVolume from "../../services/global/functions/song/saveAudioVolume";

export function useProgressBar({ audioRef, mode }){
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(null);
    const delay = useRef(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [audioProgress, setAudioProgress] = useState(getVolume() || 50)

    useEffect(() => {
        if(audioRef.current && mode === "audioBar") {
            audioRef.current.volume = (audioProgress / 100) * getAudioProgressStage(audioProgress);
            SaveAudioVolume( audioProgress, delay )
        }
    }, [audioProgress])

    const getAudioProgressStage = (progress) => {
        return progress < 31 ? 0.4 : (progress < 70 ? 0.6 : 0.8);
    }

    const handleMouseMove = (event) => {
        if (isDragging && progressRef.current) {
            let rect = progressRef.current.getBoundingClientRect();
            let offsetX = event.clientX - rect.left;
            let newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

            if (audioRef?.current && mode === 'progressBar') {
                setProgress(Math.round(newProgress));
                const newTime = (audioRef.current.duration * newProgress) / 100;
                if (Number.isFinite(newTime)) {
                    audioRef.current.currentTime = newTime;
                }
            } else if (mode === 'audioBar'){
                setAudioProgress(Math.round(newProgress));
            }
        }
    };
    const handleMouseDown = (event) => {
        setIsDragging(true);

        if (progressRef.current && audioRef?.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

            if (mode === 'progressBar'){
                setProgress(Math.round(newProgress));
                const newTime = (audioRef.current.duration * newProgress) / 100;
                if (Number.isFinite(newTime)) {
                    audioRef.current.currentTime = newTime;
                }
            } else if (mode === 'audioBar'){
                setAudioProgress(Math.round(newProgress));
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef?.current) {
                setCurrentTime(audioRef?.current.currentTime);
            }
        }, 500); 

        return () => clearInterval(interval);
    }, [audioRef]);

    useEffect(() => {
        if (audioRef.current) {
            const updateProgress = () => {
                const currentTime = audioRef?.current?.currentTime;
                const duration = audioRef?.current?.duration;
                if (duration) {
                    setProgress((currentTime / duration) * 100);
                }
            };

            audioRef.current.addEventListener('timeupdate', updateProgress);
        }
    }, [audioRef]);

    useEffect(() => {
        const updateDuration = () => {
            if (audioRef?.current) {
                setDuration(audioRef.current.duration || 0);
            }
        };

        if (audioRef?.current) {
            audioRef.current.addEventListener('loadedmetadata', updateDuration);
        }

        return () => {
            if (audioRef?.current) {
                audioRef.current.removeEventListener('loadedmetadata', updateDuration);
            }
        };  
    }, [audioRef]);

    return {
        handleMouseDown,
        progressRef,
        duration,
        isDragging,
        currentTime,
        progress,
        audioProgress
    };
}