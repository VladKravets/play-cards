import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../main/bll/store'
import { PATH } from '../../utils/path'
import s from './Training.module.css'

export const Training = () => {

	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)


	if (!isLoggedIn) return <Navigate to={PATH.login}/>

	return (
		<div>Training</div>
	)
}