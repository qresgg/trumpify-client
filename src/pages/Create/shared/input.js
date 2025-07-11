import React from 'react';
import styles from '../ArtistCreatePage.module.scss';

export const InputField = ({ label, required, register = '', name, type = 'text', errors }) => (
  <div className={styles['create-artist__main-item']}>
    <label>
      <p>{label}</p>
      {required && <p className={styles.red}>*</p>}
    </label>
    <input type={type} {...register(name, { required })} />
    {errors[name] && <p>{errors[name].message}</p>}
  </div>
);
