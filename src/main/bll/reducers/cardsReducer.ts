import {BaseThunkType, InferActionsTypes} from "../store"
import {cardsAPI, CardType, NewCardDataType, SendCardsQueryParams, UpdateCardModelType} from "../../api/cardsAPI";
import {appActions} from "./appReducer";
import axios, {AxiosError} from "axios";
import {requestPackNameTC} from "./packsReducer";

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
        default:
            return state
    }
}

//action
export const cardsActions = {
    setCards: (cards: Array<CardType>, cardsTotalCount: number) => (
        {type: "cards/CARD/SET-CARDS", cards, cardsTotalCount} as const
    ),
}

//thunk
export const getCardsTC = (data: SendCardsQueryParams): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        dispatch(cardsActions.setCards([], 0))
        const res = await cardsAPI.getCards(data)

        await dispatch(requestPackNameTC(res.data.packUserId, data.cardsPack_id))

        dispatch(cardsActions.setCards(res.data.cards, res.data.cardsTotalCount))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setAppErrorMessage(error))
        }
    } finally {
        dispatch(appActions.setAppStatus('succeeded'))
    }
}

export const addCardTC = (newCard: NewCardDataType): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        await cardsAPI.addCard(newCard)
        await dispatch(getCardsTC({cardsPack_id: newCard.cardsPack_id}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setAppErrorMessage(error))
        }
    } finally {
        dispatch(appActions.setAppStatus('succeeded'))
    }
}
export const removeCardTC = (cardsPack_ID: string, card_ID: string): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        await cardsAPI.deleteCard(card_ID)
        await dispatch(getCardsTC({cardsPack_id: cardsPack_ID}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setAppErrorMessage(error))
        }
    } finally {
        dispatch(appActions.setAppStatus('succeeded'))
    }
}
export const updateCardTC = (cardsPack_ID: string,cardModel:UpdateCardModelType): BaseThunkType<CardsActionsTypes> => async (dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        await cardsAPI.updateCard(cardModel)
        await dispatch(getCardsTC({cardsPack_id: cardsPack_ID}))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(appActions.setAppErrorMessage(error))
        }
    } finally {
        dispatch(appActions.setAppStatus('succeeded'))
    }
}


//types
type CardsStateType = typeof initialState
export type CardsActionsTypes = InferActionsTypes<typeof cardsActions> | InferActionsTypes<typeof appActions>