import { fetchLikedSong } from '../../../user/fetchData/fetchLikedSong'

const likeChecker = (selectedSong, dataRedux, setLiked) => {
    if (!selectedSong || !selectedSong._id) {
        setLiked(false);
        return;
    }

    const isLikedInRedux = dataRedux.user.user_likedSongsList?.includes(String(selectedSong._id));
    if (isLikedInRedux) {
        setLiked(true);
        return; 
    }

    const fetchLikedSongData = async () => {
        try {
            const response = await fetchLikedSong(selectedSong._id);
            setLiked(response.isLiked);
        } catch (error) {
            console.error("Error fetching liked song:", error);
        }
    };
    fetchLikedSongData();
}
export default likeChecker;