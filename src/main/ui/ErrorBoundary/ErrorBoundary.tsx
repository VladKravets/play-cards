import React, { useEffect } from 'react'
import { appActions } from '../../bll/reducers/appReducer'
import { useAppDispatch } from '../../bll/store'

export const ErrorBoundary = React.memo( ({children}: {children: React.ReactNode}) => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		window.addEventListener('unhandledrejection', catchAllUnhandledPromiseRejections)

		return () => {
			window.removeEventListener('unhandledrejection', catchAllUnhandledPromiseRejections)
		}
	}, [])


	// catch all unhandled server request errors
	function catchAllUnhandledPromiseRejections(e: PromiseRejectionEvent) {
		dispatch( appActions.setAppErrorMessage(e.reason) )
	}

	return (
		<>
			{children}
		</>
	)
})