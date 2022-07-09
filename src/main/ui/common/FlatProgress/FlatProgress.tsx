import React, { createRef, FC, useEffect, useState } from 'react'
import { Rocket } from '../FlyingRocket/Rocket/Rocket'
import s from './FlatProgress.module.css'

export const FlatProgress: FC<FlatProgressPropsType> = ({withColoredLine, withColoredLineOnLoading, isLoading}) => {

    const wrapperRef = createRef<HTMLDivElement>()
    const [animationDuration, setAnimationDuration] = useState('2000ms')

    useEffect(() => {
        const width = wrapperRef.current?.clientWidth

        if (width) {
            setAnimationDuration(`${width * 2}ms`)
        }

    }, [])

    const animDurationStyle = {
        animationDuration,
        WebkitAnimationDuration: animationDuration,
        MozAnimationDuration: animationDuration,
        OAnimationDuration: animationDuration,
    }
    
    const showColoredLine = (withColoredLineOnLoading && isLoading) || withColoredLine

    return (
        <div ref={wrapperRef} className={s.wrapper}>

            {showColoredLine 
                && <div className={s.progressLine}></div>
            }

            {isLoading
                && <div className={s.rocketWrapper} style={animDurationStyle}>
                    <Rocket withFlame className={s.rocket} />
                </div>
            }
        </div>
    )
}


type FlatProgressPropsType = {
    /**
     * Show colored background line
     */
    withColoredLine?: boolean
    /**
     * Show colored background line only when loading status
     */
    withColoredLineOnLoading?: boolean
    isLoading: boolean
}