import styles from './signed.module.scss'

export function Signed({
    User,
    logout
}) {

    return (
        <>
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.info__logged}>YOU ARE LOGGED AS: {User.name}</div>
                <button onClick={() => logout()}>LOGOUT</button>
            </div>
        </div>
        </>
    )
}