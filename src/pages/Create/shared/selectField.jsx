import useRegions from "../../../hooks/global/useRegions";
import InputField from "./inputField";
import { customOptionCountry, customSingleValueCountry, customTheme } from './func/customRenderItem';
import { customSelectStyles } from "./func/customStyles";
import { Controller } from "react-hook-form";
import Select from 'react-select';

export default function SelectField({
	required = null,
	name,
    control
}){
    const { regions, loading: regionsLoading, error: regionsError } = useRegions();

    return (
        <>
            {regionsLoading ? (
                <div>Regions is loading...</div>
            ) : regionsError ? (
                <div className="error">{regionsError}</div>
            ) : (
                <Controller
                    control={control}
                    name={name}
                    rules={{ required: required }}
                    render={({ field }) => (
                        <Select
                            menuPlacement="auto"
                            classNamePrefix="customSelect"
                            className='customSelect'
                            value={field.value}
                            onChange={(selectedOption) => field.onChange(selectedOption)}
                            options={regions}
                            components={{
                                Option: customOptionCountry,
                                SingleValue: customSingleValueCountry,
                            }}
                            placeholder="Select your region"
                            isSearchable={false}
                            styles={customSelectStyles}
                        />
                    )}
                />
            )}
        </>
    )
}