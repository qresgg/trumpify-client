import styles from '../main.module.scss';

export function Info({ width, onResize }) {
    return (
        <>
            <div className={styles.resizer} onMouseDown={onResize}></div>
            <div className={styles.trackInfo} style={{ width: `${width}px` }}>
                21321
            </div>
        </>
    );
}