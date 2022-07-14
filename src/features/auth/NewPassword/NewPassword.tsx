import React, { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { newPasswordActions } from '../../../main/bll/reducers/newPasswordReducer'
import { useAppDispatch, useAppSelector } from '../../../main/bll/store'
import { PATH } from '../../../utils/path'
import { AuthBlock } from '../AuthBlock'
import { NewPasswordForm } from './NewPasswordForm'

export const NewPassword = () => {

	const dispatch = useAppDispatch()
	const [params] = useSearchParams()
	const isPasswordSuccessfullySet = useAppSelector(state => state.newPassword.isPasswordSuccessfullySet)
	const isLoading = useAppSelector(state => state.newPassword.isLoading)

	useEffect(() => {

		const token = params.get('token')
		if (token) {
			dispatch(newPasswordActions.setNewPasswordToken(token))
		}

		return () => {
			dispatch(newPasswordActions.setNewPasswordSuccess(false))
		}

	}, [])


	if (!params.get('token')) return <Navigate to={PATH.passwordRecovery} />
	if (isPasswordSuccessfullySet) return <Navigate to={PATH.login} />

	return (
		<AuthBlock
			pageTitle="Create new password"
			navBlockLabel="Did you remember your password?"
			navLinkPath={PATH.login}
			navLinkTitle="Try logging in"
			isLoading={isLoading} >

			<NewPasswordForm isLoading={isLoading} />
		</AuthBlock>
	)
}