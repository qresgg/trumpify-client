import { useSelector } from 'react-redux';

export function UserImage({
    width,
    height,
    url
}) {
    const user = useSelector((state) => state.data.user);

    const urlImage = url || user?.user_avatar_url;
    const imageParameters = {
        background: `url(${urlImage}) center/contain no-repeat`,
        height: height || '100%',
        width: width || '100%',
        minWidth: width,
        borderRadius: '50%',
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }

    return (
        <>
            <div>
                <div src={urlImage} style={imageParameters} alt="your avatar" ></div>
            </div>
        </>
    )
}