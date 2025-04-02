import styles from './slidingContainer.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateEmail} from '../../../../../../../services/user/changeData/userDataChange';
import { isValidEmail } from '../../../../../../../lib/regexp';

export function ChangeEmail() {
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
            e.preventDefault();

            if (!isValidEmail(email) || !isValidEmail(newEmail)) {
                setError("Invalid email format");
                return;
            }
            
            if (email == newEmail) {
                setError("The emails are the same");
                return;
            }
    
            try {
                await updateEmail(email, newEmail);
                clearForm();
            } catch (error) {
                setError("Error during login");
                console.error(error.response ? error.response.data : error);
            }
        };

    const clearForm = () => {
        setEmail("");
        setNewEmail("");
        setSuccess("Email changed successfully");
        setError("");
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess("");
        }, 5000);
        return () => clearTimeout(timer);
    }, [success]);
    
    return (
        <>
            <div className={styles.slidingContainer}>
                <div className={styles.containerInput}>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">New email</label>
                        <input type="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
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