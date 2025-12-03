import React from 'react';
import styles from '../../ArtistCreatePage.module.scss';

const customOptionCountry = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className='p-2 text-xs cursor-pointer font-bold hover:bg-selectedColor flex'>
            <img src={`https://flagcdn.com/16x12/${data.code.toLowerCase()}.png`} alt={data.country} width={20} style={{ marginRight: 8 }} />
            <span>{data.country}</span>
        </div>
    )
}
const customSingleValueCountry = ({ data }) => {
    return (
        <div className='text-xs font-bold flex'>
            <img
                src={`https://flagcdn.com/16x12/${data.code.toLowerCase()}.png`}
                alt={data.country}
                width={20}
                style={{ marginRight: 8 }}
            />
            <span className='text-white'>{data.country}</span>
        </div>
    );
};
const customOptionGenre = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className='p-2 text-xs cursor-pointer font-bold hover:bg-selectedColor flex'>
            <span>{data.name}</span>
        </div>
    )
}
const customSingleValueGenre = ({ data }) => {
    return (
        <div className='text-xs font-bold flex'>
            <span>{data.name}</span>
        </div>
    );
};
const customTheme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'white',
        neutral0: 'black'
    },
});

export { 
    customOptionCountry, 
    customOptionGenre,

    customSingleValueCountry, 
    customSingleValueGenre,

    customTheme };