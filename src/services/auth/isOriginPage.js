export const isOriginPage = ( user, currentUserPage ) => {
    return user.user_id === currentUserPage.user_id
}

export const isOriginArtistPage = ( artistId, selectedArtist ) => {
    return artistId === selectedArtist
}