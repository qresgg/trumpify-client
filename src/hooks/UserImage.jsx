import { useSelector } from 'react-redux';

export function UserImage({
    width,
    height,
}) {
    const user = useSelector((state) => state.user.user);

    const urlImage = user.urlAvatar;
    const imageParameters = {
        height: height || '100%',
        width: width || '100%',
        minWidth: width,
        borderRadius: '50%',
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }

    return (
        <>
            <div>
                <img src={urlImage} style={imageParameters} alt="your avatar" />
            </div>
        </>
    )
}