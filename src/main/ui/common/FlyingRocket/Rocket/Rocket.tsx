import React, { createRef, FC, useEffect, useState } from 'react'
import s from './Rocket.module.css'


export const Rocket: FC<RocketPropsType> = ({ className, withFlame }) => {

    const rocketRef = createRef<HTMLDivElement>()
    const [rocketWindowSize, setWindowSize] = useState(40)
    const [visibleFlameSize, setFlameSize] = useState(50)
    // If rocket small window border removed
    const [isSmallRocket, setIsSmallRocket] = useState(false)


    useEffect(() => {

        if (rocketRef.current) {
            setWindowSize((rocketRef.current.offsetWidth / 4 + rocketRef.current.offsetHeight / 3) / 2)
            setFlameSize(rocketRef.current.offsetHeight * 0.35)

            if(rocketRef.current.offsetWidth < 50) {
                setIsSmallRocket(true)
            }
        }

    }, [])


    const rocketWindowStyle = { width: rocketWindowSize + 'px', height: rocketWindowSize + 'px' }

    const rocketWrapperCN = `${s.wrapper} ${className || ''} ${isSmallRocket ? '' : s.largeRocket}`
    const leftFinCN = `${s.fin} ${s.fin_left}`
    const rightFinCN = `${s.fin} ${s.fin_right}`

    return (
        <div ref={rocketRef} className={rocketWrapperCN} style={{marginBottom: visibleFlameSize + 'px'}}>
            <div className={s.rocket_body}>
                <div className={s.body}></div>
                <div className={leftFinCN}></div>
                <div className={rightFinCN}></div>
                <div className={s.window} style={rocketWindowStyle}></div>
            </div>

            {withFlame && <div className={s.exhaust_flame}></div>}
        </div>
    )
}


type RocketPropsType = {
    /** You can set Rocket width & height in css
     * other parts of the rocket will have an auto-size
    */
    className?: string
    withFlame?: boolean
}