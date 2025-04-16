import ShowPage from "../../../hooks/showPage";
import { setSelectedPlaylist } from "../../../lib/redux/music/musicState";
import { setView } from "../../../lib/redux/pages/viewSlice";

export const redirectTo = (page, id, dispatch) => {
    if (typeof dispatch !== 'function') {
        throw new Error("dispatch is not a function. Ensure it is passed correctly.");
    }
    ShowPage(page, id, dispatch);
}
export const redirectPlaylist = (data, page, dispatch) => {
    if (typeof dispatch !== 'function') {
        throw new Error("dispatch is not a function. Ensure it is passed correctly.");
    }
    dispatch(setSelectedPlaylist(data));
    page && redirectPage(page, dispatch);
}
export const redirectPage = (page, dispatch) => {
    if (typeof dispatch !== 'function') {
        throw new Error("dispatch is not a function. Ensure it is passed correctly.");
    }
    dispatch(setView(page));
}