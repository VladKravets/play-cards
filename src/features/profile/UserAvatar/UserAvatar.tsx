import React, { createRef, useEffect, useState } from 'react'
import s from './UserAvatar.module.css'
import defaultPhoto from '../../../assets/images/user.png'


const UserAvatar: React.FC<UserAvatarPropsType> = React.memo( ({userImage, sideLength}) => {

    const avatarRef = createRef<HTMLDivElement>()
    const [sideAutoLength, setSideAutoLength] = useState<number>()

    useEffect(() => {
        setSideAutoLength(avatarRef.current!.offsetWidth)

    }, [])



    const sizeStyle = sideLength 
        ? {width: `${sideLength}px`, height: `${sideLength}px`}
        : {height: `${sideAutoLength}px`}

    return (
            <div ref={avatarRef} className={s.wrapper} style={sizeStyle}>
                <img className={s.image} src={userImage || defaultPhoto} alt="user_image" />
            </div>
    )
})

export default UserAvatar



type UserAvatarPropsType = {
    userImage?: string | undefined | null
    /** Side length in pixels 
    * If you don't specify the length of the side: 
    * width will be 100% of parent height will be equal to width
    */
    sideLength?: number
}