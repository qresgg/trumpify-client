import styles from "./homePage.module.scss";
import { Selection } from "./snippets/selection-snippet";
import { useEffect, useState } from "react";
import { getAlbumData } from "../../../../services/artist/fetchData/fetchAlbumData";

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
      <Selection title="Latest albums" fetchFunction={getAlbumData}/>
    </div>
  );
}
