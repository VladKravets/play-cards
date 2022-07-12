import React from 'react'
import { packsActions } from '../../../../../main/bll/reducers/packsReducer'
import { useAppDispatch, useAppSelector } from '../../../../../main/bll/store'
import SuperButton from '../../../../../main/ui/common/SuperButton/SuperButton'
import s from './PacksOwnerFilter.module.css'

export const PacksOwnerFilter = () => {

	const dispatch = useAppDispatch()
	const authUserId = useAppSelector(state => state.profile.userData._id)
	const ownerFilter = useAppSelector(state => state.packs.filters.user_id)

	const onShowAuthUserPacks = () => {
		// todo: push authUserId to URL
		// and reed(set to state) this params on componentDidMount
        dispatch(packsActions.setPackOwnerId(authUserId))
    }
    const onShowAllUsersPacks = () => {
        dispatch(dispatch(packsActions.setPackOwnerId('')))
    }

	
	const authUserBtnStyle = (ownerFilter === authUserId) ? 'success' : 'outline_success'
	const allUsersBtnStyle = (ownerFilter === '') ? 'success' : 'outline_success'

	return (
		<div className={s.wrapper}>
			<SuperButton
				className={s.btn} 
				onClick={onShowAuthUserPacks} 
				upperCase 
				btnStyle={authUserBtnStyle}> 
					My
			</SuperButton>

			<SuperButton
				className={s.btn}
				onClick={onShowAllUsersPacks}
				upperCase
				btnStyle={allUsersBtnStyle}>
					All
			</SuperButton>
		</div>
	)
}
