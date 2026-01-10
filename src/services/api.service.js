import { basicRequest } from "./shared/request.pattern";

const route = 'api';

const apiPreset = async({
    method,
    endpoint,
    id = null,
    err = null,
    type = null,
    global
}) => {
    try{
        return await basicRequest({
            method,
            route,
            endpoint,
            id,
            global
        })
    } catch(error){
        throw new Error(err);
    }
}

export const fetchUserLibraryMy = async () => apiPreset({ method: "get", endpoint: "getLibrary" });
export const fetchLikedSongsMy = async () => apiPreset({ method: "get", endpoint: "getLikedSongs" });
export const fetchLikedCollectionById = async (id) => apiPreset({ method: "get",  endpoint: "getLikedCollection", id });

// GLOBAL
export const fetchAlbum = async () => apiPreset({ method: "get", endpoint: "getAlbum", global: true });
export const fetchSong = async () => apiPreset({ method: "get", endpoint: "getSong", global: true });
export const fetchRegions = async () => apiPreset({ method: "get", endpoint: "getRegions", global: true });
export const fetchGenres = async () => apiPreset({ method: "get", endpoint: "getGenres" , global: true });

export const fetchAlbumById = async (id) => apiPreset({ method: "get", endpoint: "getAlbum", id });
export const fetchPopSongs = async (id) => apiPreset({ method: "get", endpoint: "getPopularSongs", id });
export const fetchReleases = async (id) => apiPreset({ method: "get", endpoint: "getArtistReleases", id });
export const fetchSongs = async (id) => apiPreset({ method: "get", endpoint: "getSongs", id });
