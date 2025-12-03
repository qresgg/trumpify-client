import styles from './slidingContainer.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { isValidEmail } from '../../../../lib/regexp';
import { useMessage } from '../../../../hooks/global/useMessage';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import { changeEmail } from '../../../../services/user.service';

export function ChangeEmail() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { message, setMessage } = useMessage();

    const change = async (data) => {
            if (!isValidEmail(data.email) || !isValidEmail(data.ewEmail)) {
                setMessage({ error: "Invalid email format"});
                return;
            }
            
            if (data.email == data.newEmail) {
                setMessage({ error: "The emails are the same"});
                return;
            }
    
            try {
                const res = await changeEmail(data.email, data.newEmail);
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
                <div className={styles['slidingContainer']}>
                    <form onSubmit={handleSubmit(change)}>
                        <div className={styles['slidingContainer__main']}>
                            <div className={styles['slidingContainer__input']}>
                                <div className={styles['slidingContainer__item']}>
                                    <label>Email</label>
                                    <input {...register('email')}/>
                                    {errors.email && <p className='error'>{errors.email}</p>}
                                </div>
                                <div className={styles['slidingContainer__item']}>
                                    <label>New email</label>
                                    <input {...register('newEmail')}/>
                                    {errors.newEmail && <p className='error'>{errors.newEmail}</p>}
                                </div>
                            </div>
                            <div className={styles['slidingContainer__buttonSubmit']}>
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