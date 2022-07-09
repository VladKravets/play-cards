import React from 'react'
import {NavLink} from 'react-router-dom'
import {ROUTES} from '../routes/RoutesList'

// todo: remove component (temporary component for app development)
export const DevNavigation = () => {

    const headerStyle = {
        position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: '10px',
        display: 'flex', justifyContent: 'center', gap: '30px',
    } as React.CSSProperties

    const mappedLinks = ROUTES.map(el => {
        const path = (el.label === 'CardsList' || el.label === 'Training') 
            ? el.path.replace(/:packId/, '') : el.path

        return (
            <NavLink
            key={path} style={({isActive}) => isActive ? {color: 'red'} : {}}
            to={path}>{el.label}</NavLink>
        )
    })

    return (
        <div style={headerStyle}>
            {mappedLinks}
        </div>
    )
}