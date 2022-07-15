import {CardType, UpdateCardModelType} from "../../../../main/api/cardsAPI";
import React, {FC, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../main/bll/store";
import {PATH} from "../../../../utils/path";
import {removeCardTC, updateCardTC} from "../../../../main/bll/reducers/cardsReducer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import s from "./CardsTable.module.css";
import edit from "../../../../assets/icons/edit.svg";
import trash from "../../../../assets/icons/delete.png";
import ModalWindow from "../../../../main/ui/common/ModalWindow/ModalWindow";
import EditableTextLine from "../../../../main/ui/common/EditableTextLine/EditableTextLine";
import SuperButton from "../../../../main/ui/common/SuperButton/SuperButton";

export const CardsTableRow: FC<CardsTableRowPropsType> = ({card, isOwner}) => {
    const answer = card.answer
    const question = card.question

    const dispatch = useAppDispatch()
    const [editModalMode, setEditModalMode] = useState(false)
    const [deleteModalMode, setDeleteModalMode] = useState(false)
    const [newQuestion, setNewQuestion] = useState(question)
    const [newAnswer, setNewAnswer] = useState(answer)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const openModal = () => setEditModalMode(true)
    const closeModal = () => setEditModalMode(false)

    const openDelModal = () => setDeleteModalMode(true)
    const closeDelModal = () => setDeleteModalMode(false)


    useEffect(() => {
        (question === newQuestion) ? setBtnDisabled(true) : setBtnDisabled(false)
    }, [question, newQuestion])
    useEffect(() => {
        (answer === newAnswer) ? setBtnDisabled(true) : setBtnDisabled(false)
    }, [answer, newAnswer])

    const deleteCardHandler = () => {
        dispatch(removeCardTC(card.cardsPack_id, card._id))
    }

    const editCardNameHandler = () => {
        const cardUpdateModel: UpdateCardModelType = {
            _id: card._id,
            question: newQuestion,
            answer: newAnswer,
        };
        dispatch(updateCardTC(card.cardsPack_id, cardUpdateModel))
    }

    return (
        <TableRow key={card._id}>
            <TableCell component="th" scope="row">
                {card.question}
            </TableCell>
            <TableCell style={{width: 150}} align="right">
                {card.answer}
            </TableCell>
            <TableCell style={{width: 150}} align="right">
                {card.updated.split('T')[0].replace(/-/gi, '.')}
            </TableCell>
            <TableCell style={{width: 150}} align="right">
                <Rating
                    name="simple-controlled"
                    value={3}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                />
            </TableCell>
            <TableCell style={{width: 150}} align="center">

                {isOwner
                    ? <>

                        <img className={s.active_icon} src={edit} onClick={openModal}/>

                        <img className={s.active_icon} src={trash} onClick={openDelModal} alt='delete button'/>
                    </>

                    : undefined}

                <ModalWindow open={editModalMode} onClose={closeModal} title={'Change сard question & answer'}>
                    <EditableTextLine text={newQuestion} setNewText={setNewQuestion}/>
                    <EditableTextLine text={newAnswer} setNewText={setNewAnswer}/>
                    <SuperButton btnStyle="outline_danger" onClick={closeModal}>Cancel</SuperButton>
                    <SuperButton
                        onClick={editCardNameHandler}
                        disabled={btnDisabled}>Save</SuperButton>
                </ModalWindow>

                <ModalWindow open={deleteModalMode} onClose={closeDelModal} title={'Do you really want to delete card'}>

                    <SuperButton btnStyle="outline_danger" onClick={closeDelModal}>Cancel</SuperButton>
                    <SuperButton onClick={deleteCardHandler}>Delete</SuperButton>
                </ModalWindow>
            </TableCell>
        </TableRow>
    )
}
export type CardsTablePropsType = {
    cards: CardType[]
    selectedPackId: string
    page: number
}
type CardsTableRowPropsType = {
    card: CardType
    isOwner: boolean
}