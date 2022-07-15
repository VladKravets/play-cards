import React, { FC, useState } from 'react'
import moreInfo from '../../../../../assets/icons/more_info.svg'
import { useAppSelector } from '../../../../../main/bll/store'
import s from './SearchInfo.module.css'


export const SearchInfo = React.memo( () => {

	const authUserId = useAppSelector(state => state.profile.userData._id)
	const cardsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
	const searchFilters = useAppSelector(state => state.packs.filters)
	const { packName, min, max, page, pageCount, user_id } = searchFilters

	const [displayInfo, setInfoDisplay] = useState(false)

	const onMouseOverHandler = () => {
		setInfoDisplay(true)
	}

	const onMouseLeaveHandler = () => {
		setInfoDisplay(false)
	}

	const infoMessage = <div>
		{`- Showing ${(user_id === authUserId) ? 'my packs' : 'all users packs'}`}
		<br/>
		{`- Min cards value ${min}`}
		<br/>
		{`- Max cards value ${max}`}
		<br/>
		{`- Page number ${page} of ${Math.ceil(cardsTotalCount / pageCount)}`}
		<br/>
		{`${packName ? ('- Search for "' + packName + '"') : ''}`}
		</div>

	return (
		<>
			<div className={s.infoIconWrapper}
				onMouseEnter={onMouseOverHandler}
				onMouseLeave={onMouseLeaveHandler}>

				<img className={s.infoIcon} src={moreInfo} alt="info" />
			</div>

			<InfoPopover isOpen={displayInfo}>
				{infoMessage}
			</InfoPopover>
		</>
	)
})


const InfoPopover: FC<InfoPopoverPropsType> = React.memo( ({isOpen, children}) => {

	const popoverCN = isOpen ? `${s.popover} ${s.popover_active}` : s.popover

	return (
		<div className={popoverCN}>
			{children}
		</div>
	)
})

type InfoPopoverPropsType = {
	isOpen: boolean
	children: React.ReactNode
}