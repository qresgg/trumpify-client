import { setSelectedArtistPage, setView, setSelectedPlaylistPage, setSelectedUserPage } from '../../lib/redux/pages/viewSlice';
import { setSelectedPlaylist } from '../../lib/redux/music/musicState';
import { searchContent } from '../../services/search/findService';
import ShowPage from '../../hooks/showPage'

const actionMap = {
    'Artist': {
        view: 'userArtistProfile',
        action: setSelectedArtistPage,
    },
    'User': {
        view: 'userProfile',
        action: setSelectedUserPage,
    },
    'Album': {
        view: 'playlist',
        action: setSelectedPlaylist,
    }
}

const ShowPageFeature = async (type, name, dispatch) => {
    if (!type || !name) {
        console.error('Invalid type or name:', { type, name });
        return;
    }

    let data;
    try {
        data = await searchContent(type, name);
        if (!data) {
            console.error('Data not found for type or name:', { type, name });
            return;
        }
    } catch (error) {
        console.error('Error fetching content:', error);
        return;
    }

    const action = actionMap[type];
    if (action) {
        try {
            if (data) {
                dispatch(action.action(data));
                dispatch(setView(action.view));
            }
        } catch (error) {
            console.error('Error dispatching action:', error);
        }
    } else {
        console.error('Action not found for type:', type);
    }
};
export default ShowPageFeature;