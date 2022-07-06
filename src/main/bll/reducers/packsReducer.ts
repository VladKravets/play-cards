import {BaseThunkType, InferActionsTypes} from "../store";

import { DataGetPacksType, packsAPI, PackType} from "../../api/packListAPI";
import axios, {AxiosError} from "axios";

const initialState  = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
}


export const packsReducer = (
    state: PacksStateType = initialState,
    action: PacksActionsTypes
): PacksStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {
                ...state, ...action.data
            }

        default:
            return state;
    }
};

//actions
export const packsActions = {
setPacksList:(data:DataGetPacksType)=>({type:"packs/SET-PACKS", data} as const)



};

//thunks
export const setPacksListTC =
    (data:DataGetPacksType): BaseThunkType<PacksActionsTypes> => async (dispatch) => {
        //dispatch(appActions.appSetStatusAC("loading"))

        try {
            const res = await packsAPI.getPacks(data)


                dispatch(packsActions.setPacksList(res))
               // dispatch(appActions.appSetStatusAC("succeeded"))

//type from valera
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                //dispatch(profileActions.setErrorMessage(error))
            } else {
                //dispatch(profileActions.setErrorMessage(`Native error ${err.message}`))
            }
           // dispatch(profileActions.setErrorMessage(e.response.data.error || e.message))
        }
    }
;


export type PacksStateType = typeof initialState

type PacksActionsTypes=InferActionsTypes<typeof packsActions>