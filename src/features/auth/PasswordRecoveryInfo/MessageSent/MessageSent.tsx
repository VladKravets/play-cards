import React, { FC } from 'react'
import s from './MessageSent.module.css'

export const MessageSent: FC<MessageSentPropsType> = ({className = ''}) => {

	const wrapperCN = `${s.animation} ${className}`

	return (
		<div className={wrapperCN}>
			<div className={s.i_mail}>
				<div className={s.mail_anim}/>
			</div>
			<div className={s.line}/>
			<div className={s.i_success}>
				<div className={s.success_anim}/>
			</div>
		</div>
	)
}


type MessageSentPropsType = {
	className?: string
}