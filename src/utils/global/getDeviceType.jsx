export const isMobileDevice = (device) => {
    if (typeof device === 'string') {
        const d = device.toLowerCase();
        return d === 'mobile' || d === 'phone' || d === 'mob';
    }
    if (typeof window !== 'undefined') {
        return window.innerWidth <= 480;
    }
    return false;
}