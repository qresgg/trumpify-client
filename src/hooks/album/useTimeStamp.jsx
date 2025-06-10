
export const useTimeStamp = (timestamp) => {

    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth();
    const year = new Date(timestamp).getFullYear();

    const months = [ 
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const fullDate = `${day} ${months[month]} ${year}`;
    
    return { day, month, year, fullDate };
}