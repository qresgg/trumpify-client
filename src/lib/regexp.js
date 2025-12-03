export const REGEXP_COLLAB = /(•)/gm;
export const REGEXP_IMAGEURL = /[\s.,'•]+/g;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const USERNAME_REGEX = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9_.@\- ]{3,32}$/u;
const ARTISTNAME_REGEX = /^[\w .@()-]{2,30}$/;
export const ARTISTBIO_REGEX = /^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ0-9.,!?():;\s'-]{1,1000}$/;

const AVATAR_REGEX = /\.jpe?g$|\.png$/i;

export const isValidEmail = (email) => EMAIL_REGEX.test(email);
export const isValidPassword = (password) => PASSWORD_REGEX.test(password);
export const isValidUserName = (username) => USERNAME_REGEX.test(username);
export const isValidArtistName = (artistName) => ARTISTNAME_REGEX.test(artistName);
export const isValidBio = (bio) => ARTISTBIO_REGEX.test(bio);
export const isValidURL = (url) => AVATAR_REGEX.test(url);