import styles from "./styles/playingNowBar.module.scss"
import songControllerStyles from "../../components/Footer/footer.module.scss";

import {SongController} from "../controllers/song.controller";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import fetchColors from "../../utils/custom/colorPalette";
import {useGradient} from "../../hooks/album/useGradient";
import {useMusicActions} from "../../hooks/global/useMusicActions";
import AutoMarquee from "../wrappers/AutoMarquee";

export function PlayingNowBar () {
    const music = useSelector((state) => state.music);
    const gradient = useGradient();
    const dispatch = useDispatch();
    const activeSong = useSelector((state) => state.music.song.activeSong);
    const musicPlayer = useMusicActions();

    const songCover = music.song?.activeSong ? {
        backgroundImage: `url('${music.song?.activeSong.song_cover}')`
    } : [];

    console.log(music.song.activeSong);

  return (
      <>
          {music.song?.activeSong && (
              <div className={styles.bar}>
                  {/*<div className={styles.bar} style={gradient}>*/}
                  <div className={styles.song}>
                      <div className={styles.song__cover} style={songCover}></div>
                      <div className={styles.song__control}>
                          <div className={styles.song__title} onClick={() => musicPlayer.selectSong(activeSong)}>
                              <div className={styles.label}>
                                  <AutoMarquee ctWidth={"400"}>
                                      {music.song?.activeSong?.title}
                                  </AutoMarquee>
                              </div>
                              <div className={styles.author}>{music.song?.activeSong?.features.map((item) => item?.name).join(', ')}</div>
                          </div>
                          <div className={styles.song__button} onClick={() => musicPlayer.togglePlayback()}>
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