import { fetchDataAlbumPARAM } from "../../preset/fetchPreset";

const getAlbumById = async (id) => {
    try {
        const data = await fetchDataAlbumPARAM("getArtistById", id);
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

export default getAlbumById;