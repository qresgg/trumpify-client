import { setSelectedArtistPage, setView, setSelectedPlaylistPage, setSelectedUserPage } from '../../lib/redux/pages/viewSlice';
import { setSelectedPlaylist } from '../../lib/redux/music/musicState';
import { searchContent } from '../../services/search/searchService';

export const showPageFeature = async (type, name, dispatch) => {
    if (!type || !name) {
        console.error('Invalid type or name:', { type, name });
        return;
    }

    try {
        const data = await searchContent(type, name);
        if (!data) {
            console.error('Data not found for type or name:', { type, name });
            return;
        }
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        return;
    }
};