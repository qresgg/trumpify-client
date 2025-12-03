import { setSelectedPlaylist } from "../../lib/redux/music/musicState";
import { setView } from "../../lib/redux/pages/viewSlice";
import { showPageFeature } from "../../utils/custom/showPage";

export const redirectFromFeature = async (page, name, dispatch, navigate) => {
    if (typeof dispatch !== 'function') {
        throw new Error("dispatch is not a function. Ensure it is passed correctly.");
    }
    const data = await showPageFeature(page, name, dispatch);
    navigate(`/page/artist/${data?._id}`)
}