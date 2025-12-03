import { useProgressBar } from "../../hooks/global/useProgressBar";
import styles from './styles/floatingProgressBar.snippet.module.scss';

export function FloatingProgressBar({
    audioRef
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
      <div className={styles.floatingBar}>
          <div className={styles.floatingBar__container} ref={progressRef} onMouseDown={handleMouseDown}>
              <div className={styles.bar} style={{ width: `${progress}%`, backgroundColor: isDragging && "#1ED760" }}></div>
              <div className={styles.slider} style={{ left: `calc(${progress}% - 5px)`, display: isDragging && "block" }}></div>
          </div>
      </div>
  );
};