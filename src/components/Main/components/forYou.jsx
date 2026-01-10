import SongPageCreate from '../../../pages/Create/SongCreatePage'
import SettingsPage from '../../../pages/Settings/Settings.layout';
import AlbumCreatePage from '../../../pages/Create/AlbumCreatePage';
import ArtistPageCreate from '../../../pages/Create/ArtistCreatePage';
import HomePage from '../../../pages/Dynamic/Home.page';
import UserProfilePage from '../../../pages/User/UserProfile.page';
import ArtistProfilePage from '../../../pages/User/ArtistProfile.page';

import GeneralSettings from '../../../pages/Settings/components/general.settings';
import ArtistSettings from '../../../pages/Settings/components/artist.settings';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaylistPage from "../../../pages/Dynamic/Playlist.page";

export default function ForYou() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} />

            <Route path="/settings" element={<SettingsPage/>} >
                <Route path="general" element={<GeneralSettings />}/>
                <Route path="artist" element={<ArtistSettings />}/>
            </Route>

            <Route path="/create">
                <Route path="song" element={<SongPageCreate />} />
                <Route path="album" element={<AlbumCreatePage />} />
                <Route path="artist" element={<ArtistPageCreate />} />
            </Route>

            <Route path="/page">
                <Route path="collection/liked/:id" element={<PlaylistPage type="liked" />} />
                <Route path="user/:id" element={<UserProfilePage />} />
                <Route path="album/:id" element={<PlaylistPage type="default" />} />
                <Route path="artist/:id" element={<ArtistProfilePage />} />
            </Route>
        </Routes>
        // TODO: зробити сторінку для соло пісні і інтегрувати її замість логіки INFO на телефоні
    );
}