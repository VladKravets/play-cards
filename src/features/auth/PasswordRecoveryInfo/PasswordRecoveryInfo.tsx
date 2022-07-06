import React, { useEffect } from 'react'
import { passwordRecoveryActions } from '../../../main/bll/reducers/passwordRecoveryReducer'
import { useAppDispatch, useAppSelector } from '../../../main/bll/store'
import { PATH } from '../../../utils/path'
import AuthBlock from '../AuthBlock'
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


	return (
		<AuthBlock 
			pageTitle="Check Email"
			navLinkPath={PATH.passwordRecovery}
			navLinkTitle="Go back">

			<div className={s.wrapper}>
				<MessageSent className={s.messageAnimation}/>
				<div className={s.infoMessage}>
					We’ve sent an Email with instructions {userEmail ? `to ${userEmail}` : ''}
				</div>
			</div>
			
		</AuthBlock>
	)
}