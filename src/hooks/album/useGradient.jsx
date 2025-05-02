import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchColors from "../../utils/custom/colorPalette";

export const useGradient = () => {
  const [gradient, setGradient] = useState(null);
  const { selectedPlaylist } = useSelector((state) => state.music.playlist);

  useEffect(() => {
    const getColors = async () => {
      setGradient(await fetchColors(selectedPlaylist));
    };
    getColors();
  }, [selectedPlaylist]);

  return gradient;
};