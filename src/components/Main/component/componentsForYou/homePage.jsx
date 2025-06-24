import styles from "./homePage.module.scss";
import { Selection } from "./snippets/selection-snippet";
import { useEffect, useState } from "react";
import getAlbumData from "../../../../services/artist/data/get/albumData";
import getSongData from "../../../../services/artist/data/get/songData";

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