import { useState, useRef, useEffect } from 'react';
import styles from './audioBar.module.scss';
import SaveAudioVolume from '../../../services/global/functions/song/saveAudioVolume';
import { getVolume } from '../../../services/global/functions/functions';
import { useProgressBar } from '../../../hooks/global/useProgressBar';

export function AudioBar({ audioRef }) {
    const {
            handleMouseDown,
            progressRef,
            duration,
            isDragging,
            currentTime,
            progress,
            audioProgress
        } = useProgressBar({ audioRef, mode: 'audioBar' })

    return (
        <div className={styles.progressContainer} ref={progressRef} onMouseDown={handleMouseDown}>
            <div className={styles.progressBar} style={{ width: `${audioProgress}%`, backgroundColor: isDragging && "#1ED760" }}></div>
            <div className={styles.slider} style={{ left: `calc(${audioProgress}% - 5px)`, display: isDragging && "block" }}></div>
        </div>
    );
}
