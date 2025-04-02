import { useState, useRef, useEffect } from 'react';
import styles from './progressBar.module.scss';

export function ProgressBar({
    type = "default",
    initialProgress = 0
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(initialProgress);
    const progressRef = useRef(null);

    const handleMouseMove = (event) => {
        if (isDragging && progressRef.current) {
            let rect = progressRef.current.getBoundingClientRect();
            let offsetX = event.clientX - rect.left;
            let newProgress = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

            setProgress(Math.round(newProgress));
        }
    };
    const handleMouseDown = () => {
        setIsDragging(true);
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
