import styles from './ArtistCreatePage.module.scss'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createArtist } from '../../services/artist/artistService';
import { useMessage } from '../../hooks/global/useMessage';
import { fetchUserData } from '../../services/user/queries/fetchUserData';
import { setData as setReduxData } from '../../lib/redux/data/dataSlice';
import { useEffect, useState } from 'react';
import { getRegions } from '../../services/api/fetchReference';
import Select from 'react-select';
import { Controller} from 'react-hook-form';
import { InputField } from './shared/input';
import { customOptionCountry, customSingleValueCountry, customTheme } from './shared/CustomRenderItem';

export default function ArtistPageCreate () {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, control} = useForm();
    const { message, setMessage } = useMessage();
    const [ fetchedRegions, setFetchedRegions ] = useState([]);

    const onSubmit = async (data) => {
        try {
            const response = await createArtist(data);
            setMessage({ success: response.message });
            reset();

            const userData = await fetchUserData();
            dispatch(setReduxData(userData));
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error during creation artist profile";
            setMessage({ error: errorMessage });
        }
    }

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                setFetchedRegions(await getRegions());
            } catch (error) {
                console.error('Error fetching genres:', error);
                setMessage({ error: 'Failed to fetch genres' });
            }
        }
        fetchRegions();
    }, []);

    return (
        <div className={styles['create-artist']}>
            <div className={styles['create-artist__container']}>
                <div className={styles['create-artist__header']}>
                    <p className={styles.white}>Become  </p>
                    <p className={styles.green}>a new artist.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {message.error && <p className='error'>{message.error}</p>}
                    {message.success && <p className='success'>{message.success}</p>}
                    <div className={styles['create-artist__main']}>
                        <div className={styles['create-artist__main-container']}>
                            <InputField 
                                label={'Choose unique artist name'} 
                                name={'artistName'} 
                                required={'Artist name required'} 
                                register={register} 
                                errors={errors}>
                            </InputField>
                            <InputField 
                                label={'Biography'} 
                                name={'bio'} 
                                required={'Artist must have biography'} 
                                register={register} 
                                errors={errors}>  
                            </InputField>
                            <InputField 
                                label={'Enter your actual user password'} 
                                name={'password'} 
                                required={'Artist name required'} 
                                register={register}
                                type={'password'} 
                                errors={errors}>    
                            </InputField>
                            <InputField 
                                label={'Confirm actual user password'} 
                                name={'confirmPassword'} 
                                required={'Password confirmation is required'} 
                                register={register} 
                                type={'password'}
                                errors={errors}>    
                            </InputField>
                            <div className={styles['create-artist__main-item']}>
                                <label>
                                    <p>Region</p>
                                    <p className={styles.red}>*</p>
                                </label>
                                
                                <Controller
                                    control={control}
                                    name="region"
                                    rules={{ required: 'Region is required' }}
                                    render={({ field }) => (
                                        <Select
                                            theme={customTheme}
                                            value={field.value}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            options={Array.isArray(fetchedRegions) ? fetchedRegions : []}
                                            components={{
                                                Option: customOptionCountry,
                                                SingleValue: customSingleValueCountry,
                                            }}
                                            placeholder="Select your region"
                                            isSearchable={false}
                                        />
                                    )}
                                    />
                                {errors.region && <p>{errors.region.message}</p>}
                            </div>
                            <InputField 
                                label={'Privacy of Region'} 
                                name={'privacy'} 
                                register={register}
                                type={'checkbox'}
                                errors={errors}>    
                            </InputField>
                        </div>
                        <div className={styles['create-artist__submit-button']}>
                            <button type='submit'>Create Artist</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}