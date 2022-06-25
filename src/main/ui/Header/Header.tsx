import React from 'react'
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../routes/RoutesList'

// todo: remove component (temporary component for app development)
const Header = () => {

	const headerStyle = { 
		position: 'fixed', top: 0, left:0, right: 0, 
		height: '40px', backgroundColor: '#eee', 
		display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px',
	} as React.CSSProperties


	const mappedLinks = ROUTES.map(el => <NavLink key={el.path} style={({isActive}) => isActive ? {color: 'red'} : {}} to={el.path}>{el.label}</NavLink>)

	return (
		<div style={headerStyle}>
			{mappedLinks}
		</div>
	)
}

export default Header