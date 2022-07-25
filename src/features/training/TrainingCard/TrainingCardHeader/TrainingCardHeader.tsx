import React, { FC } from 'react'
import s from './TrainingCardHeader.module.css'

export const TrainingCardHeader: FC<TrainingCardHeaderPropsType> = ({packName, cardGrade, cardShots}) => {

    return (
        <div className={s.trainingCardHeader}>
            <div>Pack name: {packName}</div>
            <div>{`Card has been studied ${cardShots} times`}</div>
            <div>{`Card grade is ${cardGrade}/5`}</div>
        </div>
    )
}


type TrainingCardHeaderPropsType = {
    packName: string
    cardGrade: number
    cardShots: number
}