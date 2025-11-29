import styles from "./homePage.module.scss";
import { Selection } from "../../shared/SelectionSlider";
import { useEffect, useState } from "react";
import getAlbumData from "../../services/artist/queries/getAlbumData";
import getSongData from "../../services/artist/queries/getSongData";

export default function HomePage() {
  return (
    <div className={styles['home-page']}>
      <div className={styles['home-page__container']}>
        <Selection title="Latest albums" fetchFunction={getAlbumData}/>
        <Selection title="Latest songs" fetchFunction={getSongData}/>
      </div>
    </div>
  );
}