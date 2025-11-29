import styles from './ArtistCreatePage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller, set } from 'react-hook-form';
import { createArtist } from '../../services/artist/artistService';
import { useMessage } from '../../hooks/global/useMessage';
import { setData as setReduxData } from '../../lib/redux/data/dataSlice';
import Select from 'react-select';
import { customOptionCountry, customSingleValueCountry, customTheme } from './shared/func/customRenderItem';
import InputField from './shared/inputField';
import SelectField from './shared/selectField';

import useRegions from '../../hooks/global/useRegions';
import { artistHandler } from './utils/artistHandler';

export default function ArtistPageCreate () {
    const dispatch = useDispatch();
    const regionsRedux = useSelector((state) => state.loaded.nonClearableData.regions);
    const { register, handleSubmit, formState: { errors }, reset, control} = useForm();
    const { message, setMessage } = useMessage();
    const onSubmit = artistHandler(dispatch, setMessage, setReduxData, reset);

    return (
        <div className={styles['createArtist']}>
            <div className={styles['createArtist__container']}>
                <div className={styles['createArtist__header']}>
                    <p className={'white-label'}>Become  </p>
                    <p className={'green-label'}>a new artist.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {message.error && <p className='error'>{message.error}</p>}
                    {message.success && <p className='success'>{message.success}</p>}
                    <div className={styles['createArtist__main']}>
                        <div className={styles['createArtist__mainContainer']}>
                            <InputField 
                                label={'Choose an artist pseudonym'} 
                                name={'artistName'} 
                                required={'Artist name required'} 
                                register={register} 
                                errors={errors} />
                            <InputField 
                                label={'Biography'} 
                                name={'bio'} 
                                required={'Artist must have biography'} 
                                register={register} 
                                type='textarea'
                                errors={errors} />
                            <InputField 
                                label={'Enter your actual user password'} 
                                name={'password'} 
                                required={'Artist name required'} 
                                register={register}
                                type={'password'} 
                                errors={errors} />
                            <InputField 
                                label={'Confirm actual user password'} 
                                name={'confirmPassword'} 
                                required={'Password confirmation is required'} 
                                register={register} 
                                type={'password'}
                                errors={errors} />
                            <InputField 
                                label={'Region'} 
                                name={'region'} 
                                required={'Password confirmation is required'} 
                                register={register}
                                component={<SelectField 
                                    control={control}
                                    name={'region'}
                                />}
                                errors={errors} />
                            <InputField 
                                label={'Privacy of Region'} 
                                name={'privacy'} 
                                register={register}
                                type={'checkbox'}
                                errors={errors} />                            
                        </div>
                        <div className={styles['createArtist__submitButton']}>
                            <button type='submit'>Create Artist</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}