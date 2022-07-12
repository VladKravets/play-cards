import React, { FC } from 'react'
import s from './MainLogo.module.css'
import logo_icon from '../../../../assets/icons/main_logo_icon.svg'

export const MainLogo: FC<MainLogoPropsType> = ({className, size = 18}) => {

	const logoCN = `${s.wrapper} ${className || ''}`
	const logoSizeStyle = {fontSize: `${size}px`}

	return (
		<div className={logoCN} style={logoSizeStyle}>
			<img className={s.icon} src={logo_icon} alt="" />
			<div className={s.text}>
				<span>Flash</span>
				<span>cards</span>
			</div>
		</div>
	)
}


type MainLogoPropsType = {
	className?: string
	size?: number
}