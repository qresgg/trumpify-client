export const REGEXP_COLLAB = /(•)/gm;
export const REGEXP_IMAGEURL = /[\s.,'•]+/g;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_@.-]{3,16}$/;

export const isValidEmail = (email) => EMAIL_REGEX.test(email);
export const isValidPassword = (password) => PASSWORD_REGEX.test(password);
export const isValidUserName = (username) => USERNAME_REGEX.test(username);