import React, { FC, useState } from 'react'
import moreInfo from '../../../../../assets/icons/more_info.svg'
import { useAppSelector } from '../../../../../main/bll/store'
import s from './SearchInfo.module.css'


export const SearchInfo = React.memo( () => {

	const authUserId = useAppSelector(state => state.profile.userData._id)
	const cardsTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
	const searchFilters = useAppSelector(state => state.packs.filters)
	const { packName, min, max, sortPacks, page, pageCount, user_id } = searchFilters

	const [displayInfo, setInfoDisplay] = useState(false)

	const onMouseOverHandler = () => {
		setInfoDisplay(true)
	}

	const onMouseLeaveHandler = () => {
		setInfoDisplay(false)
	}

	const infoMessage = `
		Showing ${(user_id === authUserId) ? 'my packs' : 'all users packs'}
		${packName ? ('search for ' + packName) : ''}
		Min cards value ${min}
		Max cards value ${max}
		Page number ${page} of ${Math.ceil(cardsTotalCount / pageCount)}
		Sorted by ${sortPacks ? ' todo: ' : ' todo: '}
	`

	return (
		<>
			<div className={s.infoIconWrapper} onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
				<img className={s.infoIcon} src={moreInfo} alt="info" />
			</div>

			<InfoPopover isOpen={displayInfo} message={infoMessage} />
		</>
	)
})


const InfoPopover: FC<InfoPopoverPropsType> = React.memo( ({isOpen, message}) => {

	const popoverCN = isOpen ? `${s.popover} ${s.popover_active}` : s.popover

	return (
		<div className={popoverCN}>
			{message}
		</div>
	)
})

type InfoPopoverPropsType = {
	isOpen: boolean
	message: string
}