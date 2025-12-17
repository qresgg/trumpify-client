import {useState} from "react";
import {useSelector} from "react-redux";
import fetchColors from "../../utils/custom/colorPalette";

export const useColorGrade = () => {
    const [colorGrade, setColorGrade] = useState(null);
    const { selectedPlaylist } = useSelector((state) => state.music.playlist);

    const getLightColor = async () => {
        const extractor = new fetchColors(selectedPlaylist);
        const color = await extractor.getDark();

        setColorGrade({
            background: color
        });
    }
    return { colorGrade, getLightColor};
}