import styles from './header.module.scss';

export function Header () {
    return (
        <div className={styles.header}>
            <div className={styles.navBar}>
                <div className={styles.navBar__logo}>1</div>
                <div className={styles.navBar__home}>12131232132123221321</div>
                <input className={styles.navBar__search} type="text" />
            </div>
            <div className={styles.userBar}>
                <div className={styles.userBar__subscription}>Дізнатись більше про Premium</div>
                <div className={styles.userBar__notification}></div>
                <div className={styles.userBar__profile}></div>
            </div>
        </div>
    )
}