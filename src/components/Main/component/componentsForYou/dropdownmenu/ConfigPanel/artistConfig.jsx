import styles from './config.module.scss';

export const ArtistConfig = () => {

    return (
        <div className={styles.config}>
            <div className={styles.config__container}>
                <div className={styles.config__container__item}>
                    <div className={styles.header}>
                        <p>Banner</p>
                        <p className={styles.red}>*</p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.content__preview}></div>
                        <div className={styles.content__change}></div>
                    </div>
                </div>
            </div>
            <div className={styles.config__container}>
                <div className={styles.config__container__item}>
                    <div className={styles.header}>
                        <p>Avatar</p>
                        <p className={styles.red}>*</p>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.content__preview}>
                            <div className={styles.avatar}>12312</div>
                        </div>
                        <div className={styles.content__change}>123123</div>
                    </div>
                </div>
            </div>
            <div className={styles.config__container}>
                <div className={styles.config__container__item}>
                    <div className={styles.header}>
                        <p>Artist name</p>
                        <p className={styles.red}>*</p>
                    </div>
                    <div className={styles.content}>
                        <input type="text" />
                    </div>
                </div>
            </div>
            <div className={styles.config__container}>
                <div className={styles.config__container__item}>
                    <div className={styles.header}>
                        <p>Biography</p>
                        <p className={styles.red}>*</p>
                    </div>
                    <div className={styles.content}>
                        <textarea className={styles.tarea} rows='15' cols='50'></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}