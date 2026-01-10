import axios from "axios";
import { getAccessToken } from "../../utils/helpful/getGlobalItems";
import { SERVER_API_URL } from "../../lib/constants";

export const basicRequest = async ({ method, route, endpoint, id = null, data = {}, global = false }) => {
    const token = getAccessToken();
    if (!token) throw new Error('Access token is missing');

    const url = id
        ? `${SERVER_API_URL}/${route}/${endpoint}ById/${id}`
        : ( global
            ? `${SERVER_API_URL}/${route}/${endpoint}Global`
            : `${SERVER_API_URL}/${route}/${endpoint}My`
        );
    
    const config = {
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        withCredentials: true,
    };

    if (!['get', 'delete'].includes(method.toLowerCase()) && data) {
        config.data = data;
    }

    try {
        console.log(config)
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch');
    }
}

export const basicRequestUnsecured = async ({ method, route, endpoint, id = null, data = {} }) => {

    const url = `${SERVER_API_URL}/${route}/${endpoint}`

    const config = {
        method,
        url,
        withCredentials: true,
    };

    if (!['get', 'delete'].includes(method.toLowerCase()) && data) {
        config.data = data;
    }

    try {
        console.log(config)
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.error || 'Failed to fetch');
    }
}

export const basicRequestImage = async ({ method, route, endpoint, file, type }) => {
    const token = getAccessToken();
    if (!token) throw new Error('Access token is missing');

    console.log('perevirka', { method, route, endpoint, file, type })

    const formData = new FormData();
    formData.append('avatar', file instanceof File ? file : file[0]);
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    const url = `${SERVER_API_URL}/${route}/${endpoint}My`;

    const config = {
        method,
        url,
        data: formData,
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true,
    };

    try {
        console.log(config)
        const response = await axios.request(config);
    
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch');
    }
}

// need to rework
export const basicRequestRecord = async ({
    type,
    data,
    songs = []
}) => {
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
            `${SERVER_API_URL}/artist/${type}`,
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
        throw new Error(error?.response?.data?.message || 'Failed to fetch');
    }
}