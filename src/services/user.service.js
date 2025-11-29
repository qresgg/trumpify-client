import { basicRequest } from "./shared/request.pattern";
import { basicRequestImage } from "./shared/request.pattern";

const route = 'user';

const fetchLikedCollectionMy = async () => {
    try {
        const response = await basicRequest({
            method: 'get',
            route,
            endpoint: 'getLikedCollection'
        });
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user data');
    }
}
const fetchLikedCollectionById = async (id) => {
    try {
        const response = await basicRequest({
            method: 'get', 
            route, 
            endpoint: 'getLikedCollection', 
            id
        });
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user data');
    }
}
const fetchUserDataMy = async () => {
    try {
        const response = await basicRequest({
            method: 'get',
            route,
            endpoint: 'getUser'
        });
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user data');
    }
}
const fetchUserDataById = async (id) => {
    try {
        const response = await basicRequest({
            method: 'get',
            route,
            endpoint: 'getUser',
            id
        });
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch user data');
    }
}

const handleLikeSong = async (id) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'likeSong',
            id
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to like a song');
    }
}
const handleUnLikeSong = async (id) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'unLikeSong',
            id
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to like a song');
    }
}
const handleLikeAlbum = async (id) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'likeAlbum',
            id
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to like an album');
    }
}
const handleUnLikeAlbum = async (id) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'unLikeAlbum',
            id
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to unlike an album ');
    }
}

const changePassword = async (data) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'changePassword',
            data: {
                password: data
            }
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to change user data');
    }
}
const changeEmail = async (data) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'changeEmail',
            data: {
                email: data
            }
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to change user data');
    }
}
const changeUserName = async (data) => {
    try {
        const response = await basicRequest({
            method: 'put',
            route,
            endpoint: 'changeUserName',
            data: {
                userName: data
            }
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to change user data');
    }
}
const changeAvatar = async (file) => {
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

export { 
    fetchLikedCollectionById, 
    fetchLikedCollectionMy,
    fetchUserDataMy,
    fetchUserDataById,

    handleLikeSong,
    handleUnLikeSong,
    handleLikeAlbum,
    handleUnLikeAlbum,

    changePassword,
    changeEmail,
    changeUserName,
    changeAvatar,
};