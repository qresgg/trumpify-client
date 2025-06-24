import styles from './settingsPage.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../../../../lib/redux/pages/viewSlice';
import { AccountConfig } from './ConfigPanel/accountConfig';
import { ArtistConfig } from './ConfigPanel/artistConfig';
import { Route, Routes, Link } from 'react-router-dom';

const SideBarElement = ({name, id, isActive, onClick}) => {
    const transformName = name.toLowerCase().replace(' ', '');
    return (
        <div className={styles.sideBar__item} onClick={() => onClick(id, transformName)} style={{ borderLeft: isActive ? "2px solid white" : 'none', borderRight: isActive ? "2px solid white" : 'none'}}>{name}</div>
        // <div className={styles.sideBar__item} style={{ borderLeft: isActive ? "2px solid white" : 'none', borderRight: isActive ? "2px solid white" : 'none'}}>{name}</div>
    )
}

export default function SettingsPage() {
    const dispatch = useDispatch();
    const settingsView = useSelector((state) => state.view.settingsView);
    const [activeButton, setActiveButton] = useState(null);
    const data = useSelector((state) => state.data);
    
    const handleButtonClick = (id, name) => {
        setActiveButton(id);
        dispatch(setView({ view: 'settingsView', value: name}));
    }

    return (
        <div className={styles.settingsPage}>
            <div className={styles.sideBar}>
                <SideBarElement name="Account" id={1} isActive={activeButton === 1} onClick={handleButtonClick}/>
                <SideBarElement name="Artist Profile" id={2} isActive={activeButton === 2} onClick={handleButtonClick}/>
                
                {/* <Link to={`/settings/account`}>
                    <SideBarElement name="Account" id={1} isActive={activeButton === 1}/>
                </Link>
                <Link to={`/settings/artist`}>
                    <SideBarElement name="Artist Profile" id={2} isActive={activeButton === 2}/>
                </Link> */}
                
                {/* <SideBarElement name="Language" id={3} isActive={activeButton === 3} onClick={handleButtonClick}/>
                <SideBarElement name="About" id={4} isActive={activeButton === 4} onClick={handleButtonClick}/> */}
            </div>
            <div className={styles.fence}></div>
            <div className={styles.configPanel}>
                {settingsView === 'account' && <AccountConfig />}
                {settingsView === 'artistprofile' && <ArtistConfig />}
                {/* <Routes>
                    <Route path="/settings">
                        <Route path="account" element={<AccountConfig />}/>
                        <Route path="artist" element={<ArtistConfig />}/>
                    </Route>
                </Routes> */}
            </div>
        </div>
    )
}