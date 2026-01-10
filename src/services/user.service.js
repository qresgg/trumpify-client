import { basicRequest } from "./shared/request.pattern";
import { basicRequestImage } from "./shared/request.pattern";

const route = 'user';

const userPreset = async ({
      method,
      endpoint,
      id = null,
      err = null,
      type = null,
    data = null
  }) => {
    try{
        return await basicRequest({
            method,
            route,
            endpoint,
            id,
            data
        })
    } catch(error) {
        throw new Error(error?.message?.data?.message || err);
    }
}

// GET
// export const fetchLikedCollectionMy = async () => userPreset("get", "getLibraryCollection");
export const fetchUserDataMy = async () => userPreset({ method: "get", endpoint: "getUser" });
export const fetchUserDataById = async (id) => userPreset({ method: 'get', endpoint: "getUser", id: id });

// PUT
export const likeSong = async (id) => userPreset({ method: 'put', endpoint: "likeSong", id: id });
export const unLikeSong = async (id) => userPreset({ method: 'put', endpoint: "unLikeSong", id: id });
export const likeAlbum = async (id) => userPreset({ method: 'put', endpoint: "likeAlbum", id: id });
export const unLikeAlbum = async (id) => userPreset({ method: 'put', endpoint: "unLikeAlbum", id: id });

// ACTIONS
export const changePassword = async (data) => userPreset({ method: 'put', endpoint: "changePassword", data });
export const changeEmail = async (data) => userPreset({ method: 'put', endpoint: 'changeEmail', data });
export const changeUserName = async (data) => userPreset({ method: 'put', endpoint: 'changeUserName', data });

export const changeAvatar = async (file) => {
    try {
        const response = await basicRequestImage({
            method: 'put',
            route,
            endpoint: 'changeAvatar',
            file,
            type: 'avatar'
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to change user data');
    }
}