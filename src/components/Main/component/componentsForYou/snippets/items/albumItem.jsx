
import styles from "../selection-snippet.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { Pause, Play } from "lucide-react";
import { usePlaybackControl } from '../../../../../../hooks/global/usePlaybackControl';
import { useSingleSong } from '../../../../../../hooks/song/useSingleSong';
import { setActivePlaylist, setSelectedPlaylist } from "../../../../../../lib/redux/music/musicState";
import { setView } from "../../../../../../lib/redux/pages/viewSlice";
import { Link } from "react-router-dom";

export function AlbumItem({ item, index}) {
    const dispatch = useDispatch();
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(item, 'playlist');

    return (
        <div key={index} className={styles.item}>
            <div className={styles.playButton} onClick={togglePlay}>
                {isPlaying ? <Pause color="black" /> : <Play color="black" />}
            </div>
            <Link to={`page/album/${item._id}`} className="link-reset">
                <div className={styles.item__container}>
                    <div className={styles.cover} style={{ backgroundImage: `url(${item.cover})` }} />
                    <div className={styles.title} title={item.title}>{item.title}</div>
                    <div className={styles.author}>{item.artist_name}</div>
                </div>
            </Link>
        </div>
    );
}