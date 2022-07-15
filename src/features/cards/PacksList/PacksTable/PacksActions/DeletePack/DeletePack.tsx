import React, { FC, useState } from 'react'
import { deletePackTC } from '../../../../../../main/bll/reducers/packsReducer'
import { useAppDispatch } from '../../../../../../main/bll/store'
import ModalWindow from '../../../../../../main/ui/common/ModalWindow/ModalWindow'
import SuperButton from '../../../../../../main/ui/common/SuperButton/SuperButton'
import trash from '../../../../../../assets/icons/delete.png'
import s from '../PacksActions.module.css'

export const DeletePack: FC<DeletePackPropsType> = ({packId, packName}) => {

    const dispatch = useAppDispatch()
    
    const [deleteModalMode, setDeleteModalMode] = useState(false)
    

    const openDelModal = () => setDeleteModalMode(true)
    const closeDelModal = () => setDeleteModalMode(false)
    
    const deletePackHandler = () => {
        dispatch(deletePackTC(packId))
    }

    return (
        <>
            <img className={`${s.action_icon} ${s.action_delete}`} src={trash} onClick={openDelModal} alt='delete' />

            <ModalWindow open={deleteModalMode} onClose={closeDelModal} title={`Do you really want to delete "${packName}"?`}>
                <div className={s.modalBtnsWrapper}>
                    <SuperButton btnStyle="primary" onClick={closeDelModal}>
                        Cancel
                    </SuperButton>

                    <SuperButton btnStyle="danger" onClick={deletePackHandler}>
                        Delete
                    </SuperButton>
                </div>

            </ModalWindow>
        </>
    )
}


type DeletePackPropsType = {
    packId: string
    packName: string
}