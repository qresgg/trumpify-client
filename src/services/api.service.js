import { basicRequest } from "./shared/request.pattern";

const route = 'api';

const fetchUserLibrary = async () => {
    try {
        const response = await basicRequest({
            method: 'get',
            route,
            endpoint: 'getLibrary'
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user library');
    }
}
const fetchLikedSongs = async (id) => {
    try {
        const response = await basicRequest({
            method: 'get',
            route,
            endpoint: 'getLikedSongs',
            id
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to fetch liked songs');
    }
}

export {
    fetchUserLibrary,
    fetchLikedSongs
}