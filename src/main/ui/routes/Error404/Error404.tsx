import React, { useEffect } from 'react'
import s from './Error404.module.css'
import astronautImg from '../../../../assets/images/astronaut404.png'
import { useAppDispatch } from '../../../bll/store'
import { appActions } from '../../../bll/reducers/appReducer'

const Error404: React.FC<Error404PropsType> = ({customText, backLink}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(appActions.setAppErrorMessage('Page not found, please check url address'))
    }, [])

    return (
        <div className={s.main__wrapper}>
            <div className={s.images__wrapper}>
                <img className={s.astronaut_img} src={astronautImg} alt="astronaut_img" />
                <div className={s.callout__text_wrapper}>
                    {backLink && <div className={s.backLink}>{backLink}</div>}
                    <span className={s.custom_text}>{customText}</span>
                    <span className={s.error_text}>Error 404</span>
                </div>
            </div>
        </div>
    )
}

export default Error404

type Error404PropsType = {
    customText: string
    backLink?: React.ReactNode
}
