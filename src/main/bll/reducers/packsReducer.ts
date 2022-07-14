import {BaseThunkType, InferActionsTypes} from "../store";

import { packsAPI, PackType } from "../../api/packListAPI";
import axios, {AxiosError} from "axios";
import {appActions} from "./appReducer";

const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    selectedPackId:'',
    // token: '',
    // tokenDeathTime: 0,
    filters: {
        packName: '',
        min: 0,
        max: 110,
        sortPacks: '0updated',
        page: 1,
        pageCount: 10,
        user_id: '',
    }
}


export const packsReducer = (state: PacksStateType = initialState,
action: PacksActionsTypes): PacksStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {
                ...state, cardPacks: action.cardPacks
            };
        // case "packs/EDIT-PACK-ID":
        //     return {
        //         ...state, editPackId: action.packId
        //     };
        // case "packs/SET-LEARN-PACK-DATA":
        //     return {
        //         ...state,
        //     };
        case "packs/SET-SELECTED-PACK-ID":
            return {
                ...state, selectedPackId: action.packId
            }
        case "packs/SET-PACKS-TOTAL-COUNT":
            return {
                ...state, cardPacksTotalCount: action.totalCount
            }

        case "packs/filters/SET-SEARCH-PACK-NAME":
        case "packs/filters/SET-CARDS-COUNT-RANGE":
        case "packs/filters/SET-PACKS-SORT":
        case "packs/filters/SET-CURRENT-PAGE":
        case "packs/filters/SET-PAGE-SIZE":
        case "packs/filters/SET-PACK-OWNER-ID":
            return {
                ...state, filters: {...state.filters, ...action.payload}
            }
        default:
            return state;
    }
};

//actions
export const packsActions = {
    setPacksList: (cardPacks: PackType[]) => ({type: "packs/SET-PACKS", cardPacks} as const),
    // editPackId: (packId: string) => ({type: "packs/EDIT-PACK-ID", packId} as const),
    // setLearnPack : (packId:string) => ({type: "packs/SET-LEARN-PACK-DATA", packId} as const),
    setSelectedPackId:(packId:string)=>({type:"packs/SET-SELECTED-PACK-ID", packId}as const),
    setPacksTotalCount:(totalCount:number)=>({type:"packs/SET-PACKS-TOTAL-COUNT", totalCount}as const),



    // actions of changing filter options 
    setSearchPackName:(packName:string)=>({type:"packs/filters/SET-SEARCH-PACK-NAME", payload: {packName}}as const),
    setCardsCountRange:(min: number, max: number = 110)=>({type:"packs/filters/SET-CARDS-COUNT-RANGE", payload: {min, max}}as const),
    setPacksSort:(sortPacks: '0updated' | '...')=>({type:"packs/filters/SET-PACKS-SORT", payload: {sortPacks}}as const),
    setCurrentPage:(page:number)=>({type:"packs/filters/SET-CURRENT-PAGE", payload: {page}}as const),
    setPageSize:(pageCount:number)=>({type:"packs/filters/SET-PAGE-SIZE", payload: {pageCount}}as const),
    setPackOwnerId:(user_id:string)=>({type:"packs/filters/SET-PACK-OWNER-ID", payload: {user_id}}as const),
};




//thunks
export const requestPacksListTC = (): BaseThunkType<PacksActionsTypes> => async (dispatch, getState) => {

    try {
        dispatch(appActions.setAppStatus("loading"))

        const filterParams = getState().packs.filters
        const res = await packsAPI.getPacks(filterParams)

        dispatch(packsActions.setPacksList(res.cardPacks))
        dispatch( packsActions.setPacksTotalCount(res.cardPacksTotalCount) )
        dispatch(appActions.setAppStatus("succeeded"))

    } catch (e: any) {
        dispatch( appActions.setAppErrorMessage( e.response?.data?.error || e.message ) )
        dispatch( appActions.setAppStatus("failed") )
    }
}



export const deletePackTC =
        (packId: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
            dispatch(appActions.setAppStatus("loading"))

            try {
                await packsAPI.deletePack(packId)
                dispatch(requestPacksListTC())


            } catch (e: any) {
                dispatch( appActions.setAppErrorMessage( e.response?.data?.error || e.message ) )
                dispatch( appActions.setAppStatus("failed") )
            }
        }
;
export const editPackTC =
        (packId: string, name: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
            dispatch(appActions.setAppStatus("loading"))

            try {
                await packsAPI.updatePack(packId, name)
                dispatch(requestPacksListTC())

            } catch (e: any) {
                dispatch( appActions.setAppErrorMessage( e.response?.data?.error || e.message ) )
                dispatch( appActions.setAppStatus("failed") )
            }
        }
;
export const learnPackTC =
        (packId: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
            dispatch(appActions.setAppStatus("loading"))

            try {
                // await packsActions.setLearnPack(packId)

                dispatch(appActions.setAppStatus("succeeded"))


            } catch (e: any) {
                dispatch( appActions.setAppErrorMessage( e.response?.data?.error || e.message ) )
                dispatch( appActions.setAppStatus("failed") )
            }
        }
;
export const addNewPackTC =
        ( name: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
            dispatch(appActions.setAppStatus("loading"))
            await packsAPI.addNewPack( name)
            try {

                // dispatch(setMyPacksListTC())
                dispatch(appActions.setAppStatus("succeeded"))

            } catch (e: any) {
                dispatch( appActions.setAppErrorMessage( e.response?.data?.error || e.message ) )
                dispatch( appActions.setAppStatus("failed") )
            }
        }
;

export type PacksStateType = typeof initialState

export type PacksActionsTypes = InferActionsTypes<typeof packsActions> | InferActionsTypes<typeof appActions>