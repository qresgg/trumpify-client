import styles from './slidingContainer.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updatePassword } from '../../../../services/user/userDataChange';
import { isValidPassword } from '../../../../lib/regexp';
import { useForm } from 'react-hook-form';
import { useMessage } from '../../../../hooks/global/useMessage';
import { AnimatePresence, motion } from 'framer-motion';

export function ChangePassword() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { message, setMessage } = useMessage();

    const [visibility, setVisibility] = useState({
        input1: false,
        input2: false,
    });

    const changePassword = async (data) => {
        if (!isValidPassword(data.password) || !isValidPassword(data.passwordConfirm)) {
            setMessage({ message: "Invalid password format"});
            return;
        }

        if (data.password !== data.passwordConfirm) {
            setMessage({ message: "Passwords do not match."});
            return;
        }

        try {
            const res = await updatePassword(data.password);
            setMessage({ success: res?.message || 'Password has been successfully updated'});
        } catch (error) {
            setMessage({ error: "Error during login"});
            console.error(error.response ? error.response.data : error);
        }
    };

    const toggleVisibility = (inputName) => {
        setVisibility((prev) => ({
            ...prev,
            [inputName]: !prev[inputName]
        }));
    }
    
    return (
        <AnimatePresence>
            <motion.div key="password"
                initial={{ height: 0, opacity: 0, y: '-100px'}}
                animate={{ height: "auto", opacity: 1, y: 0}}
                exit={{ height: 0, opacity: 0, y: '-100px'}}
                transition={{ duration: 0.4 }}>
                <div className={styles['sliding-container']}>
                    <form onSubmit={handleSubmit(changePassword)}>
                        <div className={styles['sliding-container__main']}>
                            <div className={styles['sliding-container__input']}>
                                <div className={styles['input-data']}>
                                    <label>Password</label>
                                    <input type={visibility.input1 ? "text" : "password"} {...register('password')}/>
                                    <div className={styles['button__show']}  
                                        onMouseDown={() => toggleVisibility('input1')}
                                        onMouseUp={() => toggleVisibility('input1')}>{visibility.input1 ? 'Hide' : 'Show'}
                                    </div>
                                    {errors.password && <p className='error'>{errors.password}</p>}
                                </div>
                                <div className={styles['input-data']}>
                                    <label>Confirm Password</label>
                                    <input type={visibility.input2 ? "text" : "password"} {...register('passwordConfirm')} />
                                    <div className={styles['button__show']} 
                                        onMouseDown={() => toggleVisibility('input2')} 
                                        onMouseUp={() => toggleVisibility('input2')}>{visibility.input2 ? 'Hide' : 'Show'}
                                    </div>
                                    {errors.passwordConfirm && <p className='error'>{errors.passwordConfirm}</p>}
                                </div>
                            </div>
                            <div className={styles['button__submit']}>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                    {message.success && <div className={'success'}>{message.success}</div>}
                    {message.error && <div className={'error'}>{message.error}</div>}
                </div>
            </motion.div>
        </AnimatePresence>
    )   
}