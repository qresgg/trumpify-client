import * as Yup from 'yup';

export const artistSchema = Yup.object().shape({
    artistName: Yup.string()
        .min(2, 'Too short')
        .max(30, 'Too long')
        .matches(/^[\w .@()-]{2,30}$/, 'Invalid artist name'),
    bio: Yup.string()
        .min(10, 'Too short')
        .max(1000, 'Too long')
        .matches(/^[^{}$<>\\]+$/u, 'Invalid bio'),
    avatar: Yup.mixed(),
    banner: Yup.mixed()
});
