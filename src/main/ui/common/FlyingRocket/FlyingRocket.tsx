import React from 'react'
import s from './FlyingRocket.module.css'

const FlyingRocket = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.rocket_body}>
                <div className={s.body}></div>
                <div className={`${s.fin} ${s.fin_left}`}></div>
                <div className={`${s.fin} ${s.fin_right}`}></div>
                <div className={s.window}></div>
            </div>

            <div className={s.exhaust_flame}></div>

            <ul className={s.exhaust_fumes}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}

export default FlyingRocket