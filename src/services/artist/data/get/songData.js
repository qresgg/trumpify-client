import { fetchDataAPI } from "../../../global/preset/fetchPreset";

const getSongData = async () => {
    try {
        const data = await fetchDataAPI("getSong");
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

export default getSongData;