import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { passwordRecoveryActions } from '../../../main/bll/reducers/passwordRecoveryReducer'
import { useAppDispatch, useAppSelector } from '../../../main/bll/store'
import { PATH } from '../../../utils/path'
import { AuthBlock } from '../AuthBlock'
import { MessageSent } from './MessageSent/MessageSent'
import s from './PasswordRecoveryInfo.module.css'

export const PasswordRecoveryInfo = () => {

	const dispatch = useAppDispatch()
	const userEmail = useAppSelector(state => state.passwordRecovery.specifiedEmail)

	useEffect(() => {

        return () => {
            dispatch( passwordRecoveryActions.setPasswordRecoveryMessageData(false, ''))
        }
    }, [])


	if (!userEmail) return <Navigate to={PATH.passwordRecovery} />

	return (
		<AuthBlock 
			pageTitle="Check Email"
			navLinkPath={PATH.passwordRecovery}
			navLinkTitle="Go back">

			<div className={s.wrapper}>
				<MessageSent className={s.messageAnimation}/>
				<div className={s.infoMessage}>
					We’ve sent an Email with instructions {`to ${userEmail}`}
				</div>
			</div>
			
		</AuthBlock>
	)
}