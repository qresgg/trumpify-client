import { fetchDataAPI } from "../../preset/fetchPreset";

const getAlbumData = async () => {
    try {
        const data = await fetchDataAPI("getAlbum");
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

export default getAlbumData;