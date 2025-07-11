import React from 'react';
import styles from '../ArtistCreatePage.module.scss';

const customOptionCountry = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className={styles['custom-select__option']}>
            <img src={`https://flagcdn.com/16x12/${data.code.toLowerCase()}.png`} alt={data.country} width={20} style={{ marginRight: 8 }} />
            <span>{data.country}</span>
        </div>
    )
}

const customSingleValueCountry = ({ data }) => {
    return (
        <div className={styles['custom-select__single-value']}>
        <img
            src={`https://flagcdn.com/16x12/${data.code.toLowerCase()}.png`}
            alt={data.country}
            width={20}
            style={{ marginRight: 8 }}
        />
        <span>{data.country}</span>
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

export { customOptionCountry, customSingleValueCountry, customTheme };