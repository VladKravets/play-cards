import {apiBase} from "./apiBase";

export const cardsAPI = {
    getCards(data: SendCardsQueryParams) {
        return apiBase.get<CardsResponseType>(`cards/card`, {params: data})
    },
    addCard(newCard: NewCardDataType) {
        return apiBase.post<NewCardDataType>(`cards/card`, {card: newCard})
    },
    deleteCard(id: string) {
        return apiBase.delete(`cards/card`, {params: {id}})
            .then(response => response.data);
    },
    updateCard(cardModel: UpdateCardModelType) {
        return apiBase.put(`cards/card`, {card: cardModel})
            .then(response => response.data);
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
export type NewCardDataType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
};
export type UpdateCardModelType = {_id: string} & Partial<Omit<CardType, "_id">>;
export type SortType = '0updated' | '1updated'