import { fetchDataArtistPARAM } from "../../preset/fetchPreset";

const getPopularSongsArtistPage = async (id) => {
    try {
        const data = await fetchDataArtistPARAM("getPopularSongs", id);
        // console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching album data:", error);
    }
}

export default getPopularSongsArtistPage;