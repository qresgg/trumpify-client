import styles from "../../Footer/footer.module.scss";
import {ActiveSong} from "../../Footer/components/activeSong";
import {SongController} from "../../../shared/controllers/song.controller";
import {useSelector} from "react-redux";
import {useMusicActions} from "../../../hooks/global/useMusicActions";

export function AudioPanelFooter({ audioRef }) {
    const { activeSong, nextSong } = useSelector((state) => state.music.song)
    const musicPlayer = useMusicActions();

    return (
        <>
            <div className={styles.activeSong} onClick={() => musicPlayer.selectSong(activeSong)}>
                <ActiveSong />
            </div>
            <div className={styles.songController}>
                <SongController audioRef={audioRef} styles={styles} config={
                    {
                        type: "pc",
                        extraButtons: true,
                        floatingBar: true
                    }
                }/>
            </div>
        </>
    )
}