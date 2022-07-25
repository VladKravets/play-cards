import React, { FC } from 'react'
import { Rocket } from '../FlyingRocket/Rocket/Rocket'
import s from './Spinner.module.css'

const Spinner: FC<SpinnerPropsType> = ({className = ''}) => {

    return (
        <div className={s.wrapper + ' ' + className}>
            <div className={s.planet}>
                <div className={s.crater + ' ' + s.crater1}></div>
                <div className={s.crater + ' ' + s.crater2}></div>
                <div className={s.crater + ' ' + s.crater3}></div>
                <div className={s.crater + ' ' + s.crater4}></div>
                <div className={s.crater + ' ' + s.crater5}></div>

                <div className={s.planetShadow}></div>
            </div>

            <div className={s.orbit}>
                <Rocket withFlame className={s.rocket} />
            </div>
        </div>
    )
}

export default Spinner


type SpinnerPropsType = {
    /** You can set Spinner width & height in css
     * other parts of Spinner will have an auto-size
    */
   className?: string
}