import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../main/bll/store'
import { PATH } from '../../../utils/path'
import { AuthBlock } from '../AuthBlock'
import { PasswordRecoveryFrom } from './PasswordRecoveryFrom'

export const PasswordRecovery = () => {

	const isEmailMessageSent = useAppSelector(state => state.passwordRecovery.isEmailMessageSent)
	const isLoading = useAppSelector(state => state.passwordRecovery.isLoading)

	if (isEmailMessageSent) return <Navigate to={PATH.passwordRecoveryInfo} />

	return (
		<AuthBlock
			pageTitle="Forgot your password?"
			navBlockLabel="Did you remember your password?"
			navLinkPath={PATH.login}
			navLinkTitle="Try logging in"
			isLoading={isLoading} >

			<PasswordRecoveryFrom isLoading={isLoading} />
		</AuthBlock>
	)
}