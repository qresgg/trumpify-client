import styles from './slidingContainer.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateEmail} from '../../../../services/user/userDataChange';
import { isValidEmail } from '../../../../lib/regexp';
import { useMessage } from '../../../../hooks/global/useMessage';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

export function ChangeEmail() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { message, setMessage } = useMessage();

    const changeEmail = async (data) => {
            if (!isValidEmail(data.email) || !isValidEmail(data.ewEmail)) {
                setMessage({ error: "Invalid email format"});
                return;
            }
            
            if (data.email == data.newEmail) {
                setMessage({ error: "The emails are the same"});
                return;
            }
    
            try {
                const res = await updateEmail(data.email, data.newEmail);
                setMessage({ success: res?.message || 'Email has been successfully updated'});
            } catch (error) {
                setMessage({ error: "Error during changing email"});
                console.error(error.response ? error.response.data : error);
            }
        };
    
    return (
        <AnimatePresence>
            <motion.div key="email"
                initial={{ height: 0, opacity: 0, y: '-100px'}}
                animate={{ height: "auto", opacity: 1, y: 0}}
                exit={{ height: 0, opacity: 0, y: '-100px'}}
                transition={{ duration: 0.4 }}>
                <div className={styles['sliding-container']}>
                    <form onSubmit={handleSubmit(changeEmail)}>
                        <div className={styles['sliding-container__main']}>
                            <div className={styles['sliding-container__input']}>
                                <div className={styles['input-data']}>
                                    <label>Email</label>
                                    <input {...register('email')}/>
                                    {errors.email && <p className='error'>{errors.email}</p>}
                                </div>
                                <div className={styles['input-data']}>
                                    <label>New email</label>
                                    <input {...register('newEmail')}/>
                                    {errors.newEmail && <p className='error'>{errors.newEmail}</p>}
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