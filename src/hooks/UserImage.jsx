import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function UserImage({
    width,
    height,
    avatar
}) {
    const [urlAvatar, setAvatar] = useState(null);
    const user = useSelector((state) => state.data.user);

    // const refreshAvatar = () => {
    //     const timestamp = new Date().getTime();
    //     setAvatar(`${user.user_avatar_url}?t=${timestamp}`);
    //     console.log('changed avatar')
    //   };

      
    useEffect(() => {
        setAvatar(avatar ? avatar : user?.user_avatar_url);
    }, [user, avatar])
    const imageParameters = {
        background: `url(${urlAvatar}) center/contain no-repeat`,
        height: height || '100%',
        width: width || '100%',
        minWidth: width,
        borderRadius: '50%',
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    }

    return (
        <>
            <div>
                <div src={urlAvatar} style={imageParameters} alt="your avatar" key={`${new Date().getTime()}`}></div>
            </div>
        </>
    )
}