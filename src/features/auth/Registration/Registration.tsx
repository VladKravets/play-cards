import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { registrationActions } from '../../../main/bll/reducers/registrationReducer'
import { useAppDispatch, useAppSelector } from '../../../main/bll/store'
import { PATH } from '../../../utils/path'
import AuthBlock from '../AuthBlock'
import RegistrationFrom from './RegistrationFrom'

const Registration = () => {

	const isRegisteredSuccessfully = useAppSelector(state => state.registration.isRegistered)
	const dispatch = useAppDispatch()

	useEffect(() => {

		return () => {
			dispatch(registrationActions.setRegisteredStatus(false))
		}
	}, [])


	
	if (isRegisteredSuccessfully) return <Navigate to={PATH.login}/>

	return (
		<AuthBlock 
			pageTitle="Sign Up"
			navBlockLabel="Already registered?"
			navLinkPath={PATH.login}
			navLinkTitle="Sign In">
				
			<RegistrationFrom/>
		</AuthBlock>
	)
}

export default Registration