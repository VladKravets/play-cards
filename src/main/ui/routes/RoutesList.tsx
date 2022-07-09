import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../../features/auth/Login/Login'
import NewPassword from '../../../features/auth/NewPassword/NewPassword'
import { PasswordRecovery } from '../../../features/auth/PasswordRecovery/PasswordRecovery'
import { PasswordRecoveryInfo } from '../../../features/auth/PasswordRecoveryInfo/PasswordRecoveryInfo'
import Registration from '../../../features/auth/Registration/Registration'
import ComponentsDemo from '../../../features/demo/ComponentsDemo'
import { PATH } from '../../../utils/path'
import {Profile} from '../../../features/profile/Profile'
import Error404 from './Error404/Error404'
import { CardsList } from '../../../features/cards/CardsList/CardsList'
import { PacksList } from '../../../features/cards/PacksList/PacksList'
import { Training } from '../../../features/training/Training'

export const ROUTES = [
	{ label: 'Login', path: PATH.login, component: <Login /> },
	{ label: 'Registration', path: PATH.registration, component: <Registration /> },
	{ label: 'NewPass', path: PATH.newPassword, component: <NewPassword /> },
	{ label: 'PassRecovery', path: PATH.passwordRecovery, component: <PasswordRecovery /> },
	{ label: 'PassRecoveryInfo', path: PATH.passwordRecoveryInfo, component: <PasswordRecoveryInfo /> },
	{ label: 'Profile', path: PATH.profile, component: <Profile /> },
	{ label: 'PacksList', path: PATH.packsList, component: <PacksList /> },
	{ label: 'CardsList', path: PATH.cardsList, component: <CardsList /> },
	{ label: 'Training', path: PATH.training, component: <Training /> },
	{ label: 'ComponentsDemo', path: PATH.componentsDemo, component: <ComponentsDemo /> },
]


const RoutesList = () => {

	const mappedRoutes = ROUTES.map(el => <Route key={el.path} path={el.path} element={el.component} />)

	return (
		<Routes>
			<Route path="/" element={<Navigate to={PATH.profile} />} />

			{mappedRoutes}

			<Route path='*' element={
				<Error404 
					customText='Houston we have a problem! We are lost!'
					backLink={<Link to="/">{"< go back home"}</Link>} />
			} />
		</Routes>
	)
}

export default RoutesList