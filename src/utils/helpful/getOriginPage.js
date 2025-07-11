export const isOriginPage = ( user, currentUserPage ) => {
    return user.user_id === currentUserPage.user_id
}

export const isOriginArtistPage = ( artist, selectedArtist ) => {
    return artist.artist_id === selectedArtist.artist_id
}