import styles from './login.module.scss'
import { SignIn } from './capitalize/signin';
import { Signed } from './capitalize/signed';


export function Login ({
    onLogout,
    user,
    success,
    error,
    handleData
}) {
    return (
        <>
        <div className={styles.login}>
            <div className={styles.login__container}>
                {success 
                ? <Signed 
                    User={user}
                    logout={onLogout}
                /> 
                : <SignIn 
                    onClickData={handleData} 
                    success={success}
                    error={error}/>
                }
            </div>
        </div>
        </>
    )
}
