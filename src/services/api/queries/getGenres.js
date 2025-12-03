import { fetchReference } from "../fetchReference";

export const getGenres = async () => {
    try {
        const genres = await fetchReference("getGenres");
        return genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
};