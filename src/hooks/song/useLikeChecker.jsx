import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchLikedSong } from "../../services/user/fetchData/fetchLikedSong";

export function useLikeChecker({ song }){
    const data = useSelector((state) => state.data);
    const [ liked, setLiked ] = useState(false);

    const likeChecker = (selectedSong) => {
        if (!selectedSong || !selectedSong._id) {
            setLiked(false);
            return;
        }

        const isLikedInRedux = data.user.user_likedSongsList?.includes(String(selectedSong._id));
        if (isLikedInRedux) {
            setLiked(true);
            return;
        }
        setLiked(false);

        const fetchLikedSongData = async () => {
            try {
                const response = await fetchLikedSong(selectedSong._id);
                setLiked(response.isLiked);
            } catch (error) {
                console.error("Error fetching liked song:", error);
                setLiked(false); 
            }
        };
        fetchLikedSongData();
    };
    useEffect(() => {
        song && likeChecker(song)
    }, [data.user.user_likedSongsCount, song])

    return{
        liked, setLiked
    }
}