import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import learn from '../../../../../../assets/icons/package.png'
import { learnPackTC } from '../../../../../../main/bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../../../main/bll/store'
import { PATH } from '../../../../../../utils/path'
import s from '../PacksActions.module.css'

export const LearnPack: FC<LearnPackPropsType> = ({packId}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const learnPackHandler = (packId: string) => {
        dispatch(learnPackTC(packId));
        navigate(PATH.training + "/" + packId);
    }

    return (
        <img className={s.action_icon} src={learn} onClick={() => learnPackHandler(packId)} alt="learn" />
    )
}


type LearnPackPropsType = {
    packId: string
}