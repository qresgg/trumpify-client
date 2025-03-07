import styles from '../login.module.scss'
import { useState, useEffect } from 'react'

export function SignIn({
    onClickData,
    success,
    error
}) {
    const [ userName, setUserName ] = useState('')
    const [ password, setPassword] = useState('')
    return (
        <>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className={styles.logo}>LOGIN</div>
        <div className={styles.userName}>
            <label htmlFor="usernameInput">User Name</label>
            <input 
                type="text" 
                name="usernameInput"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div className={styles.password}>
            <label htmlFor="passwordInput">Password</label>
            <input 
                type="password" 
                name="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" onClick={() => onClickData(userName, password)}>SIGN IN</button>
        <div className={styles.another_type_register}></div>
        <div className={styles.footer}></div>
        </>
    )
}