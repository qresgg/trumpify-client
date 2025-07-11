import LikedSongsPage from './componentsForYou/LikedSongsPage';
import SongPageCreate from '../../../pages/Create/SongCreatePage'
import SettingsPage from '../../../pages/Settings/SettingsPage';
import AlbumCreatePage from '../../../pages/Create/AlbumCreatePage';
import ArtistPageCreate from '../../../pages/Create/ArtistCreatePage';
import HomePage from './componentsForYou/HomePage';
import AboutPlaylistPage from './componentsForYou/AboutPlaylistPage';
import UserProfilePage from '../../../pages/User/UserProfilePage';
import ArtistProfilePage from '../../../pages/User/ArtistProfilePage';
import { AccountConfig } from '../../../pages/Settings/ConfigPanel/accountConfig';
import ArtistSettings from '../../../pages/Settings/Pages/ArtistSettings';

import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function ForYou() {
    const currentView = useSelector((state) => state.view.currentView)
    console.log(currentView);   
    
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />

            <Route path="/settings" element={<SettingsPage/>} >
                <Route path="account" element={<AccountConfig />}/>
                <Route path="artist" element={<ArtistSettings />}/>
            </Route>

            <Route path="/create">
                <Route path="song" element={<SongPageCreate />} />
                <Route path="album" element={<AlbumCreatePage />} />
                <Route path="artist" element={<ArtistPageCreate />} />
            </Route>

            
            <Route path="/page">
                <Route path="likedCollection/:id" element={<LikedSongsPage />} />
                <Route path="user/:id" element={<UserProfilePage />} />
                <Route path="album/:id" element={<AboutPlaylistPage />} />
                <Route path="artist/:id" element={<ArtistProfilePage />} />
            </Route>

        </Routes>
    );
}
