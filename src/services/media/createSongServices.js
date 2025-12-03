// const addArtistWithRole = (artistName, role, setArtists,) => {
//     setArtists((prevArtists) => {
//         const existingArtist = prevArtists.find((artist) => artist.name === artistName);
//         if (existingArtist) {
//             const updatedArtists = prevArtists.map((artist) => {
//                 if (artist.name === artistName && !artist.roles.includes(role)) {
//                     return { ...artist, roles: [...artist.roles, role] };
//                 }
//                 return artist;
//             });
//             return updatedArtists;
//         }
//         return [...prevArtists, { name: artistName, roles: [role] }];
//     });
// };


// const removeArtist = (artistIndex, setArtists) => {
//     setArtists((prevArtists) => prevArtists.filter((_, index) => index !== artistIndex));
// };

// const removeRoleFromArtist = (artistName, role, setArtists) => {
//     setArtists((prevArtists) => {
//         return prevArtists.map((artist) => {
//             if (artist.name === artistName) {
//                 return { ...artist, roles: artist.roles.filter((r) => r !== role) };
//             }
//             return artist;
//         }).filter((artist) => artist.roles.length > 0);
//     });
// };

// export { addArtistWithRole, removeArtist, removeRoleFromArtist}