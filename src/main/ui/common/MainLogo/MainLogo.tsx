import React, { FC } from 'react'
import s from './MainLogo.module.css'

export const MainLogo: FC<MainLogoPropsType> = ({className, size = 25}) => {

	const logoCN = `${s.mainLogo} ${className || ''}`
	const logoStyle = {fontSize: `${size}px`}

	return (
		<div className={logoCN} style={logoStyle}>Flash cards</div>
	)
}


type MainLogoPropsType = {
	className?: string
	size?: number
}