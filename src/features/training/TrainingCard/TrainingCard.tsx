import React, { FC, useEffect, useState } from 'react'
import { CardType } from '../../../main/api/cardsAPI'
import { updateCardGradeTC } from '../../../main/bll/reducers/cardsReducer'
import { useAppDispatch } from '../../../main/bll/store'
import SuperButton from '../../../main/ui/common/SuperButton/SuperButton'
import SuperRadio from '../../../main/ui/common/SuperRadio/SuperRadio'
import { getRandomCard } from '../../../utils/getRandomCard'
import { TrainingCardHeader } from './TrainingCardHeader/TrainingCardHeader'
import s from './TrainingCard.module.css'


export const TrainingCard: FC<TrainingCardPropsType> = ({cardsPack, packName}) => {

    const dispatch = useAppDispatch()

    const [displayAnswer, setAnswerDisplay] = useState(false)

    const [currentCard, setCurrentCard] = useState<CardType | null>(null)

    useEffect(() => {
        if(cardsPack.length > 0) {
            setCurrentCard( getRandomCard(cardsPack) )
        }
        
    }, [])

    const showAnswer = () => {
        setAnswerDisplay(true)
    }

    function showNextCard(cardId: string, selectedGrade: number) {
        setAnswerDisplay(false)

        if (cardsPack.length > 0) {
            dispatch( updateCardGradeTC(cardId, selectedGrade) )

            setCurrentCard( getRandomCard(cardsPack) )
        }

    }


    return (
        <div>
            {currentCard
                && <QuestionCard 
                    packName={packName}
                    card={currentCard}
                    displayAnswer={displayAnswer}
                    showNextCard={showNextCard}
                    showAnswer={showAnswer} />
            }

        </div>
    )
}



const cardGradeOptions = [
    {label: 'Did not know', value: '1'},
    {label: 'Forgot', value: '2'},
    {label: 'A lot of thought', value: '3'}, 
    {label: 'Confused', value: '4'},
    {label: 'Knew the answer', value: '5'},
]

const QuestionCard: FC<QuestionCardPropsType> = (
{
    packName, card, displayAnswer, showNextCard, showAnswer
}) => {

    const [grade, setGrade] = useState('3')

    const onGradeChange = (value: string) => {
        setGrade(value)
    }


    return (
        <div className={s.questionCard}>
            <TrainingCardHeader packName={packName} cardGrade={card.grade} cardShots={card.shots} />
            <div className={s.questionBlock}>
                <div>Question:</div>
                <div>{card.question}</div>
            </div>

            {displayAnswer 
                && <div className={s.answerBlock}>
                    <div>Question:</div>
                    <div>{card.answer}</div>
                    <div>Rate yourself:</div>
                    <div><SuperRadio options={cardGradeOptions} value={grade} onChangeOption={onGradeChange} /></div>
                </div>
            }


            <div className={s.btnsBlock}>
                {displayAnswer 
                    ? <SuperButton 
                        onClick={() => showNextCard(card._id, +grade)}>
                            Next card
                    </SuperButton>

                    : <SuperButton 
                        onClick={showAnswer}>
                            Show answer
                    </SuperButton>
                }
            </div>
        </div>
    )
}



type TrainingCardPropsType = {
    cardsPack: CardType[]
    packName: string
}

type QuestionCardPropsType = {
    packName: string
    card: CardType
    displayAnswer: boolean
    showNextCard: (cardId: string, selectedGrade: number) => void
    showAnswer: () => void
}