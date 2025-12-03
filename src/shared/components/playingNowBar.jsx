import styles from "./styles/playingNowBar.module.scss"
import songControllerStyles from "../../components/Footer/footer.module.scss";

import {SongController} from "../controllers/song.controller";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import fetchColors from "../../utils/custom/colorPalette";
import {togglePlayback} from "../../lib/redux/music/musicState";

export function PlayingNowBar ({ audioRef }) {
    const music = useSelector((state) => state.music);
    const [ gradient, setGradient ] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getColors = async () => {
            const color = await fetchColors(music.song.activeSong, "custom")
            setGradient(color)
        }
        getColors();
    }, [music.song.activeSong]);

    console.log(gradient);

    const handlePause = () => {
        dispatch(togglePlayback())
    }
    const songCover = music.song?.activeSong ? {
        backgroundImage: `url('${music.song?.activeSong.song_cover}')`
    } : [];

  return (
      <>
          {music.song?.activeSong && (
              <div className={styles.bar} style={gradient}>
                  <div className={styles.song}>
                      <div className={styles.song__cover} style={songCover}></div>
                      <div className={styles.song__control}>
                          <div className={styles.song__title}>
                              <div className={styles.label}>{music.song?.activeSong?.title} </div>
                              <div>•</div>
                              <div className={styles.author}>{music.song?.activeSong?.features.map((item) => item.name)}</div>
                          </div>
                          <div className={styles.song__button} onClick={handlePause}>
                              {music.isMusicPlaying
                                  ? <div className={styles.pause} title='pause' ></div>
                                  : <div className={styles.play} title='play' ></div>
                              }
                          </div>
                      </div>
                  </div>
                  <div className={styles.progress}></div>
              </div>
          )}
      </>
  );
};