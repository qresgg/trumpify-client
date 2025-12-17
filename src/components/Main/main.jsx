import styles from './main.module.scss';
import {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Library from './components/library/library';
import Info from './components/info/info';
import ForYou from './components/foryou/forYou';
import { useResizable } from '../../hooks/useResizable';
import {useAuth} from "../../hooks/useAuth";
import {DropdownMenu} from "../Header/snippet/dropdownmenu.snippet";
import {setNextSong, setSelectedSong, stopMusic} from "../../lib/redux/music/musicState";


export function Main({ audioRef }) {
    const library = useResizable(370);
    const info = useResizable(370);
    const isResizing = useSelector((state) => state.isResizing);

    return (
        <div className={styles.main} style={{ userSelect: isResizing ? 'none' : 'auto' }}>
            <Library 
                width={library.width} 
                onResize={library.handleMouseDown}/>
            <ForYou />  
            <Info 
                width={info.width} 
                onResize={info.handleMouseDown}
                audioRef={audioRef}
            />
        </div>
    );
}

