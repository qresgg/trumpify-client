import styles from './main.module.scss';
import {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Library from './components/library/Library';
import Info from './components/info/Info';
import ForYou from './components/foryou/ForYou';
import { useResizable } from '../../hooks/useResizable';
import {useAuth} from "../../hooks/useAuth";
import {DropdownMenu} from "../Header/snippet/dropdownmenu-snippet";
import {setNextSong, setSelectedSong, stopMusic} from "../../lib/redux/music/musicState";


export function Main({ audioRef }) {

    const library = useResizable(370);
    const info = useResizable(370);
    const isResizing = useSelector((state) => state.isResizing);
    const { modalStateDropDownMenu } = useSelector((state) => state.view.modal);
    const { handleLogout } = useAuth();

    return (
        <div className={styles.main} style={{ userSelect: isResizing ? 'none' : 'auto' }}>
            {modalStateDropDownMenu && <DropdownMenu onLogout={handleLogout}/>}

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

