import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../main/bll/store'
import SuperButton from '../../../../main/ui/common/SuperButton/SuperButton'
import {addCardTC} from "../../../../main/bll/reducers/cardsReducer";
import {NewCardDataType} from "../../../../main/api/cardsAPI";
import s from "./AddNewCard.module.css"
import ModalWindow from "../../../../main/ui/common/ModalWindow/ModalWindow";
import SuperInputText from "../../../../main/ui/common/SuperInputText/SuperInputText";

export const AddNewCard = () => {
    const [newCardQuestion, setNewCardQuestion] = useState('')
    const [newCardAnswer, setNewCardAnswer] = useState('')

    const [addСardModal, setAddСardModal] = useState(false)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const openAddModal = () => setAddСardModal(true)
    const closeAddModal = () => {
        setAddСardModal(false)
        setNewCardQuestion('')
        setNewCardAnswer('')
    }

    const id = useAppSelector(state => state.packs.selectedPackId)
    const dispatch = useAppDispatch()

    const addNewCardHandler = () => {
        const newCard: NewCardDataType = {
            cardsPack_id: id,
            question: newCardQuestion,
            answer: newCardAnswer
        }
        dispatch(addCardTC(newCard))
        closeAddModal()
    }
    useEffect(() => {
        (newCardQuestion === '') ? setBtnDisabled(true) : setBtnDisabled(false)
    }, [newCardQuestion])
    useEffect(() => {
        (newCardAnswer === '') ? setBtnDisabled(true) : setBtnDisabled(false)
    }, [newCardAnswer])
    return (
        <>
            <ModalWindow open={addСardModal} onClose={closeAddModal} title={' Add new pack'}>

                <SuperInputText value={newCardQuestion} onChangeText={setNewCardQuestion}
                                placeholder={'Enter card question'}/>
                <SuperInputText value={newCardAnswer} onChangeText={setNewCardAnswer}
                                placeholder={'Enter card answer'}/>
                <SuperButton btnStyle="outline_danger" onClick={closeAddModal}>Cancel</SuperButton>
                <SuperButton onClick={addNewCardHandler} disabled={btnDisabled}
                >Save</SuperButton>
            </ModalWindow>

            <SuperButton className={s.addCardBtn} onClick={openAddModal}>+</SuperButton>
        </>
    )
}