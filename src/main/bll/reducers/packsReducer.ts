import {BaseThunkType, InferActionsTypes} from "../store";

import {packsAPI, PackType} from "../../api/packListAPI";
import axios, {AxiosError} from "axios";
import {appActions} from "./appReducer";

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    selectedPackId:'',
    editPackId:'',
    error:''
}


export const packsReducer = (
    state: PacksStateType = initialState,
    action: PacksActionsTypes
): PacksStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {
                ...state, ...action.payload
            };
        case "packs/DEL-PACK":
            return {
                ...state,
            };
        case "packs/EDIT-PACK-ID":
            return {
                ...state, editPackId: action.packId
            };
        case "packs/SET-LEARN-PACK-DATA":
            return {
                ...state,
            };
        case "packs/SET-SELECTED-PACK-ID":
            return {
                ...state, selectedPackId: action.packId
            }
        case "packs/SET-ERROR-MESSAGE":
            return {
                ...state,
                error: action.errorMessage
            };
        default:
            return state;
    }
};

//actions
export const packsActions = {
    setPacksList: (cardPacks: PackType[]) => ({type: "packs/SET-PACKS", payload: {cardPacks}} as const),
    deletePack: (packId: string) => ({type: "packs/DEL-PACK", packId} as const),
    editPackId: (packId: string) => ({type: "packs/EDIT-PACK-ID", packId} as const),
    setLearnPack : (packId:string) => ({type: "packs/SET-LEARN-PACK-DATA", packId} as const),
    setSelectedPackId:(packId:string)=>({type:"packs/SET-SELECTED-PACK-ID", packId}as const),
    setErrorMessage: (errorMessage: string) =>
        ({type: "packs/SET-ERROR-MESSAGE", errorMessage} as const),

};

//thunks
export const setMyPacksListTC = (): BaseThunkType<PacksActionsTypes> => async (dispatch, getState) => {
        const _id = getState().profile.userData._id
        const {pageCount, page} = getState().packs
        dispatch(appActions.appSetStatusAC("loading"))

        try {
            const res = await packsAPI.getPacks({
                pageCount, page, user_id: _id
            })

            dispatch(packsActions.setPacksList(res.cardPacks))
            dispatch(appActions.appSetStatusAC("succeeded"))


        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(packsActions.setErrorMessage(error))
            } else {
                dispatch(dispatch(packsActions.setErrorMessage(`Native error ${err.message}`)))
            }
        }
    }
;
export const setPacksListTC = (): BaseThunkType<PacksActionsTypes> => async (dispatch, getState) => {

        const {pageCount, page} = getState().packs
        dispatch(appActions.appSetStatusAC("loading"))

        try {
            const res = await packsAPI.getPacks({
                pageCount, page, user_id: ''
            })
            dispatch(packsActions.setPacksList(res.cardPacks))
            dispatch(appActions.appSetStatusAC("succeeded"))

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(packsActions.setErrorMessage(error))
            } else {
                dispatch(packsActions.setErrorMessage(`Native error ${err.message}`))
            }

        }
    }
;
export const deletePackTC =
    (packId: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
        dispatch(appActions.appSetStatusAC("loading"))

        try {
            await packsAPI.deletePack(packId)
            dispatch(setMyPacksListTC())
            dispatch(appActions.appSetStatusAC("succeeded"))

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(packsActions.setErrorMessage(error))
            } else {
                dispatch(packsActions.setErrorMessage(`Native error ${err.message}`))
            }
        }
    }
;
export const editPackTC =
    (packId: string, name: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
        dispatch(appActions.appSetStatusAC("loading"))

        try {
            await packsAPI.updatePack(packId, name)
            dispatch(setMyPacksListTC())
            dispatch(appActions.appSetStatusAC("succeeded"))

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(packsActions.setErrorMessage(error))
            } else {
                dispatch(packsActions.setErrorMessage(`Native error ${err.message}`))
            }
        }
    }
;
export const learnPackTC =
    (packId: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
        dispatch(appActions.appSetStatusAC("loading"))

        try {
            await packsActions.setLearnPack(packId)
            dispatch(appActions.appSetStatusAC("succeeded"))

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(packsActions.setErrorMessage(error))
            } else {
            }

        }
    }
;
export const addNewPackTC =
    (name: string): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
        dispatch(appActions.appSetStatusAC("loading"))
        await packsAPI.addNewPack(name)
        try {

            dispatch(setMyPacksListTC())
            dispatch(appActions.appSetStatusAC("succeeded"))

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(packsActions.setErrorMessage(error))
            } else {
                dispatch(packsActions.setErrorMessage(`Native error ${err.message}`))
            }
        }
    }
;

export type PacksStateType = typeof initialState
export type PacksActionsTypes = InferActionsTypes<typeof packsActions> | InferActionsTypes<typeof appActions>