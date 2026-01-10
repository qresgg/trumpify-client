import { basicRequest } from "./shared/request.pattern";

const route = 'search';

const searchPreset = async (
    method,
    endpoint,
    id = null,
    err = null,
    type = null) => {
    try{
        return await basicRequest({
            method,
            route,
            endpoint,
            id
        })
    } catch(error) {
        throw new Error(error?.message?.data?.message || err);
    }
}

export const searchData = (id) => searchPreset("get", "search", id);
export const searchAlbum = (id) => searchPreset("get", "album", id);
export const searchUser = (id) => searchPreset("get", "user", id);
export const searchArtist = (id) => searchPreset("get", "artist", id);
