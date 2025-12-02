import { useState, useRef, useEffect } from 'react';
import styles from './styles/progressBar.snippet.module.scss';
import { useProgressBar } from '../../hooks/global/useProgressBar';

export function ProgressBar({
    audioRef,
}) {
    const {
        handleMouseDown,
        progressRef,
        duration,
        isDragging,
        currentTime,
        progress
    } = useProgressBar({ audioRef, mode: 'progressBar' })

    return (
        <div className={styles.progress}>
            <div className={styles.currentTime}>
                {new Date(currentTime * 1000).toISOString().substr(14, 5)}
            </div>
            <div className={styles.progressContainer} ref={progressRef} onMouseDown={handleMouseDown}>
                <div className={styles.progressContainer__bar} style={{ width: `${progress}%`, backgroundColor: isDragging && "#1ED760" }}></div>
                <div className={styles.progressContainer__slider} style={{ left: `calc(${progress}% - 5px)`, display: isDragging && "block" }}></div>
            </div>
            <div className={styles.durationTime}>
                {duration ? new Date(duration * 1000).toISOString().substr(14, 5) : '00:00'}
            </div>
        </div>
    );
}
