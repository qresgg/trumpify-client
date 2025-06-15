import { fetchDataArtistPARAM } from "../../../global/preset/fetchPreset";

const getArtistReleases = async (id) => {
    try {
        const data = await fetchDataArtistPARAM("getArtistReleases", id);
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

export default getArtistReleases;