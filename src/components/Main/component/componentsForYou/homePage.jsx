import styles from "./homePage.module.scss";
import { Selection } from "./snippets/selection-snippet";
import { useEffect, useState } from "react";
import getAlbumData from "../../../../services/artist/data/get/albumData";
import getSongData from "../../../../services/artist/data/get/songData";

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <div className={styles.header__filter}>
          <div>All</div>
          <div>Album</div>
          <div>Song</div>
          <div>Playlists</div>
        </div>
      </div>
      <div className={styles.homePage__container}>
        <Selection title="Latest albums" fetchFunction={getAlbumData}/>
        <Selection title="Latest songs" fetchFunction={getSongData}/>
      </div>
    </div>
  );
}