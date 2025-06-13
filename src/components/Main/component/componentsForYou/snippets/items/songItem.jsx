import { redirectPlaylist } from "../../../../../../services/global/functions/redirection";
import styles from "../selection-snippet.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { Pause, Play } from "lucide-react";
import { usePlaybackControl } from '../../../../../../hooks/global/usePlaybackControl';
import { setSelectedSong } from "../../../../../../lib/redux/music/musicState";

export function SongItem({ item, index}) {
    const dispatch = useDispatch();
    const [ isSingle, setIsSingle ] = useState(true);
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(item, 'song', index, isSingle);

    return (
        <div key={index} className={styles.item}>
            <div className={styles.playButton} onClick={togglePlay}>
                {isPlaying ? <Pause color="black" /> : <Play color="black" />}
            </div>
            <div className={styles.item__container} onClick={() => dispatch(setSelectedSong(item))}>
                <div className={styles.cover} style={{ backgroundImage: `url(${item.song_cover})` }} />
                <div className={styles.title} title={item.title}>{item.title}</div>
                <div className={styles.author}>{item.features.map((feat) => feat.name).join(', ')}</div>
            </div>
        </div>
    );
}
