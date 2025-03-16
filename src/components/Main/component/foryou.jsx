import { AboutPlaylistPage } from './componentsForYou/aboutPlaylistPage';
import { ArtistPageCreate } from './componentsForYou/artistCreatePage'
import { SongPageCreate } from './componentsForYou/songCreatePage'
import { HomePage } from './componentsForYou/homePage';
import { UserProfilePage } from './componentsForYou/userPages/userProfilePage';
import { SettingsPage } from './componentsForYou/dropdownmenu/settingsPage';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export function ForYou({ selectedPlaylist, onSelectSong, id}) {
    const currentView = useSelector((state) => state.view.currentView)
    console.log(currentView);
    
    return (
        <Fragment>
            {currentView === "home" && <HomePage />}
            {currentView === "settings" && <SettingsPage/>}
            {currentView === "playlist" && <AboutPlaylistPage 
                selectedPlaylist={selectedPlaylist}
                onSelectSong={onSelectSong}
                id={id}/>}

            {/* PROFILES */}
            {currentView === "userProfile" && <UserProfilePage />}
            
            {/* CREATE */}
            {currentView === "artistCreate" && <ArtistPageCreate/>}
            {currentView === "songCreate" && <SongPageCreate/>}
        </Fragment>
    );
}
