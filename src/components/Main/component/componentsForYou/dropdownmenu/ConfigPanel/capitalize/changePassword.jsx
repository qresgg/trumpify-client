import styles from './slidingContainer.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updatePassword } from '../../../../../../../services/user/changeData/userDataChange';
import { isValidPassword } from '../../../../../../../lib/regexp';

export function ChangePassword() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [visibility, setVisibility] = useState({
        input1: false,
        input2: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isValidPassword(password) || !isValidPassword(passwordConfirm)) {
            setError("Invalid password format");
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await updatePassword(password);
            clearForm();
        } catch (error) {
            setError("Error during login");
            console.error(error.response ? error.response.data : error);
        }
    };

    const clearForm = () => {
        setPassword("");
        setPasswordConfirm("");
        setSuccess("Passowrd changed successfully");
        setError("");
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess("");
        }, 5000);
        return () => clearTimeout(timer);
    }, [success]);

    const toggleVisibility = (inputName) => {
        setVisibility((prev) => ({
            ...prev,
            [inputName]: !prev[inputName]
        }));
    }
    
    return (
        <>
            <div className={styles.slidingContainer}>
                <div className={styles.containerInput}>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type={visibility.input1 ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className={styles.showButton} 
                            onMouseDown={() => toggleVisibility('input1')}
                            onMouseUp={() => toggleVisibility('input1')}>{visibility.input1 ? 'Hide' : 'Show'}</div>
                    </div>
                    <div>
                        <label htmlFor="">Confirm Password</label>
                        <input type={visibility.input2 ? "text" : "password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <div className={styles.showButton} 
                            onMouseDown={() => toggleVisibility('input2')} 
                            onMouseUp={() => toggleVisibility('input2')}>{visibility.input2 ? 'Hide' : 'Show'}</div>
                    </div>
                </div>
                <div className={styles.button}>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                {success && <div className={styles.success}>{success}</div>}
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </>
    )   
}