export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const getVolume = () => {
    return localStorage.getItem('volume');
}

export const getUserNameRules = () => {
    return `min: 3, max: 16. prohibited: '<>";/\\`
}

