import styles from './settingsPage.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSettingsView } from '../../../../../lib/redux/pages/viewSlice';
import { AccountConfig } from './ConfigPanel/accountConfig';

const SideBarElement = ({name, id, isActive, onClick}) => {
    const transformName = name.toLowerCase().replace(' ', '');
    return (
        <div className={styles.sideBar__item} onClick={() => onClick(id, transformName)} style={{filter: isActive ? "brightness(1.9)" : 'none'}}>{name}</div>
    )
}

export function SettingsPage() {
    const dispatch = useDispatch();
    const settingsView = useSelector((state) => state.view.settingsView);
    const [activeButton, setActiveButton] = useState(null);
    
    const handleButtonClick = (id, name) => {
        setActiveButton(id);
        dispatch(setSettingsView(name));
    }

    return (
        <>
        <div className={styles.settingsPage}>
            <div className={styles.sideBar}>
                <SideBarElement name="Account" id={1} isActive={activeButton === 1} onClick={handleButtonClick}/>
                <SideBarElement name="Artist Profile" id={2} isActive={activeButton === 2} onClick={handleButtonClick}/>
                <SideBarElement name="Language" id={3} isActive={activeButton === 3} onClick={handleButtonClick}/>
                <SideBarElement name="About" id={4} isActive={activeButton === 4} onClick={handleButtonClick}/>
            </div>
            <div className={styles.fence}></div>
            <div className={styles.configPanel}>
                {settingsView === 'account' && <AccountConfig/>}
                
            </div>
        </div>
        </>
    )
}