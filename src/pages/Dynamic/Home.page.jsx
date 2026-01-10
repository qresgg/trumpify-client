import styles from "./styles/homePage.module.scss";
import { Selection } from "../../shared/wrappers/SelectionSlider";
import { useEffect, useState } from "react";
import {fetchAlbum, fetchSong} from "../../services/api.service";

export default function HomePage() {
  return (
    <div className={styles['home']}>
      <div className={styles['home__container']}>
        <Selection title="Latest albums" fetchFunction={fetchAlbum}/>
        <Selection title="Latest songs" fetchFunction={fetchSong}/>
      </div>
    </div>
  );
}