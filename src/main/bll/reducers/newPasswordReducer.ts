import { authAPI } from "../../api/authAPI"
import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {
    newPasswordToken: '',
    isPasswordSuccessfullySet: false,
    error: '',
    isLoading: false,
}

export const newPasswordReducer = (state: NewPasswordStateType = initialState, action: NewPasswordActionsTypes): NewPasswordStateType => {
    switch(action.type) {
        case 'fc/newPassword/SET-NEW-PASSWORD-TOKEN':
            return {
                ...state,
                newPasswordToken: action.token
            }
        case 'fc/newPassword/NEW-PASSWORD-SUCCESSFULLY-SET':
            return {
                ...state,
                isPasswordSuccessfullySet: action.status
            }
        case 'fc/newPassword/SET_ERROR_MESSAGE':
            return {
                ...state,
                error: action.error,
            }
        case 'fc/newPassword/SET-LOADING-STATUS':
            return {
                ...state,
                isLoading: action.loadingStatus,
            }


        default: return state
    }
}




export const newPasswordActions = {
    setNewPasswordToken: (token: string) => (
        {type: 'fc/newPassword/SET-NEW-PASSWORD-TOKEN', token} as const
    ),
    setNewPasswordSuccess: (status: boolean) => (
        {type: 'fc/newPassword/NEW-PASSWORD-SUCCESSFULLY-SET', status} as const
    ),
    setErrorMessage: (error: string) => (
        {type: 'fc/newPassword/SET_ERROR_MESSAGE', error} as const
    ),
    setLoadingStatus: (loadingStatus: boolean) => (
        {type: 'fc/newPassword/SET-LOADING-STATUS', loadingStatus} as const
    ),
}


export const createNewPasswordTC = (newPassword: string, token: string): BaseThunkType<NewPasswordActionsTypes> => async (dispatch) => {
    
    try {
        dispatch( newPasswordActions.setLoadingStatus(true) )
        const res = await authAPI.createNewPassword(newPassword, token)

        if (!res.error) {
            dispatch( newPasswordActions.setNewPasswordSuccess(true) )
        }

    } catch(e: any) {
        dispatch( newPasswordActions.setErrorMessage( e.response.data.error || e.message ) )

    } finally {
        dispatch( newPasswordActions.setLoadingStatus(false) )
    }
}





type NewPasswordStateType = typeof initialState
export type NewPasswordActionsTypes = InferActionsTypes<typeof newPasswordActions>