import LikedSongsPage from './componentsForYou/LikedSongsPage';
import SongPageCreate from './componentsForYou/createPages/SongCreatePage'
import SettingsPage from './componentsForYou/dropdownmenu/SettingsPage';
import AlbumCreatePage from './componentsForYou/createPages/AlbumCreatePage';
import ArtistPageCreate from './componentsForYou/createPages/ArtistCreatePage';
import HomePage from './componentsForYou/HomePage';
import AboutPlaylistPage from './componentsForYou/AboutPlaylistPage';
import UserProfilePage from './componentsForYou/userPages/UserProfilePage';
import UserArtistProfilePage from './componentsForYou/userPages/UserArtistProfilePage';

import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function ForYou() {
    const currentView = useSelector((state) => state.view.currentView)
    console.log(currentView);   
    
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/settings/*' element={<SettingsPage/>} />

            <Route path="/create">
                <Route path="song" element={<SongPageCreate />} />
                <Route path="album" element={<AlbumCreatePage />} />
                <Route path="artist" element={<ArtistPageCreate />} />
            </Route>

            
            <Route path="/page">
                <Route path="likedCollection/:id" element={<LikedSongsPage />} />
                <Route path="user/:id" element={<UserProfilePage />} />
                <Route path="album/:id" element={<AboutPlaylistPage />} />
                <Route path="artist/:id" element={<UserArtistProfilePage />} />
            </Route>

        </Routes>
    );
}
