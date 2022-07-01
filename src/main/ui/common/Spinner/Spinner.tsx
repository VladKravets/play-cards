import React from 'react'
import s from './Spinner.module.css'

const Spinner = () => {
    return (
        <div className={s.loading}>
            <div className={s.arc}></div>
            <div className={s.arc}></div>
            <div className={s.arc}></div>
        </div>
    )
}

export default Spinner