import {apiBase} from "./apiBase";

export const cardsAPI = {
    getCards(data: SendCardsQueryParams) {
        return apiBase.get<CardsResponseType>(`cards/card`, {params: data})
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        return apiBase.post<SendCardsQueryParams>(`cards/card`, {data: {cardsPack_id, question, answer}})
    },
    deleteCard(cardId: string) {
        return apiBase.delete(`cards/card`, {data: {cardId}})
    },
    updateCard(_id: string, question: string) {
        return apiBase.put(`cards/card`, {data: {_id, question}})
    }
}


//types
export type CardType = {
    question: string
    answer: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type SendCardsQueryParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    max?: number
    min?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type SortType = '0updated' | '1updated'