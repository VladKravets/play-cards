import React, { FC } from 'react';
import s from './Stars.module.css'

export const Stars: FC<StarsPropsType> = ({wrapperClassName = ''}) => {

    const wrapperCN = `${s.wrapper} ${wrapperClassName}`

    return (
        <div className={wrapperCN}>
            <div className={s.container}>
                <div className={s.starsBig}></div>
                <div className={s.starsBigDouble}></div>

                <div className={s.starsMedium}></div>
                <div className={s.starsMediumDouble}></div>

                <div className={s.starsSmall}></div>
                <div className={s.starsSmallDouble}></div>
            </div>
        </div>
    );
}


type StarsPropsType = {
    /**
     * You can set for example: 
     * position absolute for usage as background,
     * background color,
     * width and height (maximum 900x660)
     */
    wrapperClassName?: string
}