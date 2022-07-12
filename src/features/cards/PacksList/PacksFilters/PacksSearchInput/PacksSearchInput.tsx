import React, { useCallback } from 'react'
import { packsActions } from '../../../../../main/bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../../main/bll/store'
import { DeferredTextInput } from '../../../../../main/ui/common/DeferredTextInput/DeferredTextInput'

export const PacksSearchInput = () => {

	const dispatch = useAppDispatch()

	const onChangeHandler = useCallback( (value: string) => {

		dispatch(packsActions.setSearchPackName(value))
	}, [dispatch])

	return (
		<DeferredTextInput onChange={onChangeHandler} placeholder="Search" />
	)
}