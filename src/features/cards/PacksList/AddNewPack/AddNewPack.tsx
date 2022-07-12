import React from 'react'
import { addNewPackTC } from '../../../../main/bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../main/bll/store'
import SuperButton from '../../../../main/ui/common/SuperButton/SuperButton'
import s from './AddNewPack.module.css'

export const AddNewPack = () => {

	const dispatch = useAppDispatch()

    const addNewPackHandler=()=>{
        dispatch(addNewPackTC('name'))
    }

	return (
		<div>

			<SuperButton btnStyle="primary" onClick={addNewPackHandler}> Add pack</SuperButton>
		</div>
	)
}