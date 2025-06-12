import { useState, useRef, useEffect } from 'react';
import styles from './progressBar.module.scss';

export function ProgressBar({
    audioRef
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(null);

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

    const handleMouseMove = (event) => {
        if (isDragging && progressRef.current) {
            let rect = progressRef.current.getBoundingClientRect();
            let offsetX = event.clientX - rect.left;
            let newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

            setProgress(Math.round(newProgress));

            if (audioRef?.current) {
                const newTime = (audioRef.current.duration * newProgress) / 100;
                if (Number.isFinite(newTime)) {
                    audioRef.current.currentTime = newTime;
                }
            }
        }
    };
    const handleMouseDown = (event) => {
        setIsDragging(true);

        if (progressRef.current && audioRef?.current) {
            const rect = progressRef.current.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

            setProgress(Math.round(newProgress));

            const newTime = (audioRef.current.duration * newProgress) / 100;
            if (Number.isFinite(newTime)) {
                audioRef.current.currentTime = newTime;
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

    return (
        <>
            <div className={styles.progressContainer} ref={progressRef} onMouseDown={handleMouseDown}>
                <div className={styles.progressBar} style={{ width: `${progress}%`, backgroundColor: isDragging && "#1ED760" }}></div>
                <div className={styles.slider} style={{ left: `calc(${progress}% - 5px)`, display: isDragging && "block" }}></div>
            </div>
        </>
    );
}
