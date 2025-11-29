export const customSelectStyles = {
    control: (base, state) => ({
    ...base,
        backgroundColor: 'black',
        border: 'none',
        borderBottom: '2px solid',
        borderBottomColor: state.isFocused ? 'white' : '#1ED760',
        boxShadow: 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    }),
    menu: base => ({
    ...base,
        backgroundColor: 'black',
        color: 'white'
    }),
    option: (base, state) => ({
    ...base,
        backgroundColor: state.isFocused ? 'lightblue' : 'white',
        color: state.isSelected ? 'white' : 'green',
        display: 'flex',
    }),
    multiValue: (base) => ({
    ...base,
        backgroundColor: '#1ED760',
        borderRadius: '10px',
        padding: '4px 10px',
        color: 'black',
    }),
    multiValueLabel: (base) => ({
    ...base,
        fontWeight: 'bold',
        color: 'black',
    }),
    multiValueRemove: (base) => ({
    ...base,
        color: 'red',
        ':hover': {
            backgroundColor: 'darkred',
            color: 'white',
        },
    }),
}