
export const useTimeStamp = (timestamp) => {

    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth();
    const year = new Date(timestamp).getFullYear();

    const months = [ 
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const fullDate = `${months[month]} ${day}, ${year}`;
    
    return { day, month, year, fullDate };
}