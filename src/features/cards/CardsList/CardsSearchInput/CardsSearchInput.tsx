import React, { useCallback } from 'react'
import { cardsReducer } from '../../../../main/bll/reducers/cardsReducer'
import { useAppDispatch } from '../../../../main/bll/store'
import { DeferredTextInput } from '../../../../main/ui/common/DeferredTextInput/DeferredTextInput'

export const CardsSearchInput = () => {

	const dispatch = useAppDispatch()

	const onChangeHandler = useCallback( (value: string) => {
		
		// dispatch(cardsReducer. ...)
	}, [dispatch])

	return (
		<DeferredTextInput onChange={onChangeHandler} placeholder="Card search" />
	)
}