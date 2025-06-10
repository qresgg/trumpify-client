import { redirectPlaylist } from "../../../../../../services/global/functions/redirection";
import styles from "../selection-snippet.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { Pause, Play } from "lucide-react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { usePlaybackControl } from '../../../../../../hooks/global/usePlaybackControl';
import { useSingleSong } from '../../../../../../hooks/song/useSingleSong';

export function AlbumItem({ item, index}) {
    const dispatch = useDispatch();
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(item, 'playlist');

    return (
        <div key={index} className={styles.item}>
            <div className={styles.playButton} onClick={togglePlay}>
                {isPlaying ? <Pause color="black" /> : <Play color="black" />}
            </div>
            <div className={styles.item__container} onClick={() => redirectPlaylist(item, 'playlist', dispatch)}>
                <div className={styles.cover} style={{ backgroundImage: `url(${item.cover})` }} />
                <div className={styles.title} title={item.title}>{item.title}</div>
                <div className={styles.author}>{item.artist_name}</div>
            </div>
        </div>
    );
}