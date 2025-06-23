import { setSelectedArtistPage, setView, setSelectedPlaylistPage, setSelectedUserPage } from '../lib/redux/pages/viewSlice';
import { setSelectedPlaylist } from '../lib/redux/music/musicState';
import { findContent } from '../services/search/findService';

// const actionMap = {
//     'Artist': {
//         view: 'userArtistProfile',
//         action: setSelectedArtistPage,
//     },
//     'User': {
//         view: 'userProfile',
//         action: setSelectedUserPage,
//     },
//     'Album': {
//         view: 'playlist',
//         action: setSelectedPlaylist,
//     }
// }

const actionMap = (type, data, dispatch) => {
    if (type === "Album"){
        dispatch(setView({ view: "currentView", value: 'playlist'}))
    } else if (type === "User"){
        dispatch(setView({ view: "currentUserProfile", value: data}))
    } else if (type === "Artist"){
        dispatch(setView({ view: "currentArtistProfile", value: data}))
    }
}

const ShowPage = async (type, id, dispatch) => {
    if (!type || !id) {
        console.error('Invalid type or id:', { type, id });
        return;
    }

    let data;
    try {
        data = await findContent(type, id);
        if (!data) {
            console.error('Data not found for type or id:', { type, id });
            return;
        }
    } catch (error) {
        console.error('Error fetching content:', error);
        return;
    }

    let action;
    if (action) {
        try {
            action = actionMap(type, data, dispatch);
        } catch (error) {
            console.error('Error dispatching action:', error);
        }
    } else {
        console.error('Action not found for type:', type);
    }
};
export default ShowPage;