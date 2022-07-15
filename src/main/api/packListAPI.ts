import {apiBase} from "./apiBase";


export const packsAPI = {

    getPacks(data: DataGetPacksType) {
        return apiBase.get<CardPacksType>(`cards/pack`, {params: data})
            .then(res => {
                return res.data
            })

    },
    addNewPack(name: string) {
        return apiBase.post<NewPackType>(`cards/pack`, {cardsPack: {name}})
    },
    deletePack(packId: string) {

        apiBase.delete<DeletedPackType>(`cards/pack?id=${packId}`)
    },
    updatePack(packId: string, name: string) {
        return apiBase.put<UpdatePackType>(`cards/pack`, {cardsPack: {_id: packId, name}})
    }

}




// types
export type DataGetPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    _id?: string
}
export type CardPacksType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
type DataAddPackType = {
    cardsPack: {
        name: string
        deckCover: string
        private: boolean
    }
}
type NewPackType = {
    newCardsPack: PackType
    token: string
    tokenDeathTime: number
}
type DeletedPackType = {
    deletedCardsPack: PackType
    token: string
    tokenDeathTime: number
}
export type DataUpdatePackType = {
    cardsPack: {
        _id: string
        name: string
    }
}
type UpdatePackType = {
    updatedCardsPack: PackType
    token: string
    tokenDeathTime: number

}