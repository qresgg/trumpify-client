import {basicRequest, basicRequestImage} from "./shared/request.pattern";
import {getAccessToken} from "../utils/helpful/getGlobalItems";
import axios from "axios";
import {SERVER_API_URL} from "../lib/constants";

const route = 'artist';

const artistPreset = async ({
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

// CREATE
export const createSong = async (data) => {
    const token = getAccessToken();
    try {
        console.log('CS', data);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if ((key === 'cover' || key === 'audio') && value instanceof FileList) {
                formData.append(key, value[0]);
            } else if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        const response = await axios.post(
            `${SERVER_API_URL}/artist/create/Song`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const createArtist = async (data) => {
    const token = getAccessToken();
    try {
        const response = await axios.post(`${SERVER_API_URL}/artist/create-artist`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('failed to create artist profile', error);
        throw error;
    }
};
export const createAlbum = async (data, songs = []) => {
    const token = getAccessToken();
    try {
        const formData = new FormData();
        console.log('data nad songs', data, songs)

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'cover' && value instanceof FileList) {
                formData.append('cover', value[0]);
            } else if (key === 'audio' && value instanceof File) {
                formData.append('audio', value);
            } else if (key === 'audio' && value instanceof FileList) {
                formData.append('audio', value[0]);
            } else {
                formData.append(key, value);
            }
        });

        console.log('FormData entries:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        songs.forEach((song, index) => {
            const { audio, ...textData } = song;
            formData.append(`songs[${index}]`, JSON.stringify(textData));

            if (audio && audio instanceof File) {
                formData.append(`songs[${index}][audio]`, audio);
            }
        });

        const response = await axios.post(
            `${SERVER_API_URL}/artist/create/Album`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// GET
export const fetchArtistById = async (id) => artistPreset({ method: "get", endpoint: "getArtist", id });

// PUT
export const changeArtistName = async (data) => artistPreset({ method: 'get', endpoint: 'changeArtistName', data });
export const changeBio = async (data) => artistPreset({ method: 'get', endpoint: 'changeBio', data });
export const changeArtistAvatar = async (file) => {
    try {
        const response = await basicRequestImage({
            method: 'put',
            route,
            endpoint: 'changeArtistAvatar',
            file,
            type: 'avatar'
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to change artist data');
    }
};
export const changeArtistBanner = async (file) => {
    try {
        const response = await basicRequestImage({
            method: 'put',
            route,
            endpoint: 'changeArtistBanner',
            file,
            type: 'avatar'
        })
        return response;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to change artist data');
    }
};