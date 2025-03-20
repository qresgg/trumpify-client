import { AboutPlaylistPage } from './componentsForYou/aboutPlaylistPage';
import { ArtistPageCreate } from './componentsForYou/artistCreatePage'
import { SongPageCreate } from './componentsForYou/songCreatePage'
import { HomePage } from './componentsForYou/homePage';
import { UserProfilePage } from './componentsForYou/userPages/userProfilePage';
import { SettingsPage } from './componentsForYou/dropdownmenu/settingsPage';
import { UserArtistProfilePage } from './componentsForYou/userPages/userArtistProfilePage';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { AlbumCreatePage } from './componentsForYou/albumCreatePage';

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
            {currentView === "userArtistProfile" && <UserArtistProfilePage />}
            {currentView === "userProfile" && <UserProfilePage />}
            
            {/* CREATE */}
            {currentView === "artistCreate" && <ArtistPageCreate/>}
            {currentView === "songCreate" && <SongPageCreate/>}
            {currentView === "albumCreate" && <AlbumCreatePage />}
        </Fragment>
    );
}
