import styles from "./styles/item.module.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { Pause, Play } from "lucide-react";
import { usePlaybackControl } from '../../hooks/global/usePlaybackControl';
import { setSelectedSong } from "../../lib/redux/music/musicState";
import {useMusicActions} from "../../hooks/global/useMusicActions";

export function SongSelectionItem({ item, index}) {
    const dispatch = useDispatch();
    const [ isSingle, setIsSingle ] = useState(true);
    const { isPlaying, togglePlay, isSelected } = usePlaybackControl(item, 'song', index, isSingle);
    const musicPlayer = useMusicActions();

    return (
        <div key={index} className={styles['item']}>
            <div className={styles['item__playButton']} onClick={togglePlay}>
                {isPlaying ? <Pause color="black" /> : <Play color="black" />}
            </div>
            <div className={styles['item__container']} onClick={() => musicPlayer.selectSong(item)}>
                <div className={styles['item__cover']} style={{ backgroundImage: `url(${item.song_cover})` }} />
                <div className={styles['item__title']} title={item.title}>{item.title}</div>
                <div className={styles['item__author']}>
                    {item.features
                    .filter(feat => feat.roles.some(role => role.role === 'main vocal'))
                    .map((feat) => feat.name).join(', ')}
                </div>
            </div>
        </div>
    );
}
