import React from 'react'
import { DetailedHTMLProps, HTMLAttributes } from "react"
import { Rocket } from "./Rocket/Rocket"
import RocketFume from "./RocketFume/RocketFume"
import { Stars } from "./Stars/Stars"
import s from './FlyingRocket.module.css'




const FlyingRocket = () => {

    return (

        <div className={s.flyingRocketWrapper}>
            <Rocket withFlame/>
            <RocketFume />
            <Stars wrapperClassName={s.starsWrapper} />
        </div>

    )
}

export default FlyingRocket