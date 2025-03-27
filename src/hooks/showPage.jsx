import { setSelectedArtistPage, setView, setSelectedPlaylistPage, setSelectedUserPage } from '../lib/viewSlice';
import { findContent } from '../services/findService';
import { useDispatch } from 'react-redux';

const actionMap = {
    'artist-profile': {
        view: 'userArtistProfile',
        action: setSelectedArtistPage,
    },
    'user-profile': {
        view: 'userProfile',
        action: setSelectedUserPage,
    },
    'playlist-page': {
        view: 'playlist',
        action: setSelectedPlaylistPage,
    },
    'album-page': {
        view: 'album',
        action: setSelectedPlaylistPage
    }
}

const ShowPage = async (type, id, dispatch) =>{
    const data = await findContent(null, id);
    if (!type || !id) {
        console.error('Invalid type or data:', { type, id });
        return;
    }
    const action = actionMap[type];
    if (action) {
        dispatch(setView(action.view))
        dispatch(action.action(data))
    } else {
        console.error('error', type)
    }
}

export default ShowPage;