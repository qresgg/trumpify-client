import { fetchDataUserPARAM } from "../../preset/fetchPreset";

const fetchLikedCollection = async (id) => {
    try {
        const data = await fetchDataUserPARAM("getLikedCollection", id);
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}
export { fetchLikedCollection}