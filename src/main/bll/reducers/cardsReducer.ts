import {BaseThunkType, InferActionsTypes} from "../store"
import {cardsAPI, CardType, SendCardsQueryParams} from "../../api/cardsAPI";
import {appActions} from "./appReducer";
import axios, {AxiosError} from "axios";

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    page: 1,
    pageCount: 8,
    packUserId: '',
    sortCards: '',
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0,
}

export const cardsReducer = (state: CardsStateType = initialState, action: CardsActionsTypes): CardsStateType => {
    switch (action.type) {
        case "cards/CARD/SET-CARDS":
            return {...state, cards: [...action.cards], cardsTotalCount: action.cardsTotalCount}
        //
        // case "cards/CARD/DELETE-CARD":
        //     return {
        //         ...state, cards: state.cards
        //             .filter(card => card._id !== action.cardId)
        //     }
        //
        // case "cards/CARD/UPDATE-CARD":
        //     return {
        //         ...state,
        //         cards: state.cards
        //             .map(card => card._id === action.cardId
        //                 ? {...card, question: action.question}
        //                 : card)
        //     }
        default:
            return state
    }
}

//action
export const cardsActions = {
    setCards: (cards: Array<CardType>, cardsTotalCount: number) => (
        {type: "cards/CARD/SET-CARDS", cards, cardsTotalCount} as const
    ),
    // updateCard: (cardId: string, question: string) => (
    //     {type: "cards/CARD/UPDATE-CARD", cardId, question} as const
    // ),
    // deleteCard: (cardId: string) => (
    //     {type: "cards/CARD/DELETE-CARD", cardId} as const
    // )
}

//thunk
export const getCardsTC = (data: SendCardsQueryParams): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.appSetStatusAC('loading'))
        dispatch(cardsActions.setCards([], 0))
        const res = await cardsAPI.getCards(data)
        dispatch(cardsActions.setCards(res.data.cards, res.data.cardsTotalCount))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setErrorMessage(error))
        }
    } finally {
        dispatch(appActions.appSetStatusAC('succeeded'))
    }
}

export const addCardTC = (cardsPack_id: string, question: string, answer: string): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.appSetStatusAC('loading'))
        await cardsAPI.addCard(cardsPack_id, question, answer)
        await dispatch(getCardsTC({cardsPack_id}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setErrorMessage(error))
        }
    } finally {
        dispatch(appActions.appSetStatusAC('succeeded'))
    }
}
export const removeCardTC = (cardId: string): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.appSetStatusAC('loading'))
        await cardsAPI.deleteCard(cardId)
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setErrorMessage(error))
        }
    } finally {
        dispatch(appActions.appSetStatusAC('succeeded'))
    }
}
export const updateCardTC = (cardId: string, question: string): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.appSetStatusAC('loading'))
        await cardsAPI.updateCard(cardId, question)
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setErrorMessage(error))
        }
    } finally {
        dispatch(appActions.appSetStatusAC('succeeded'))
    }
}


//types
type CardsStateType = typeof initialState
export type CardsActionsTypes = InferActionsTypes<typeof cardsActions> | InferActionsTypes<typeof appActions>