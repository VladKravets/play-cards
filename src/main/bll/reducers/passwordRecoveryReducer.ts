import { authAPI } from "../../api/authAPI"
import { BaseThunkType, InferActionsTypes } from "../store"
import { appActions } from "./appReducer"

const initialState = {
    isEmailMessageSent: false,
    specifiedEmail: '',
    isLoading: false,
}

export const passwordRecoveryReducer = (state: PasswordRecoveryStateType = initialState, action: PasswordRecoveryActionsTypes): PasswordRecoveryStateType => {
    switch(action.type) {
        case 'fc/recovery/SET-PASSWORD-RECOVERY-MESSAGE-DATA':
            return {
                ...state,
                isEmailMessageSent: action.messageSentStatus,
                specifiedEmail: action.specifiedEmail,
            }
        case 'fc/recovery/SET-LOADING-STATUS':
            return {
                ...state,
                isLoading: action.loadingStatus,
            }

        default: return state
    }
}




export const passwordRecoveryActions = {
    setPasswordRecoveryMessageData: (messageSentStatus: boolean, specifiedEmail: string) => (
        {type: 'fc/recovery/SET-PASSWORD-RECOVERY-MESSAGE-DATA', messageSentStatus, specifiedEmail} as const
    ),
    setLoadingStatus: (loadingStatus: boolean) => (
        {type: 'fc/recovery/SET-LOADING-STATUS', loadingStatus} as const
    ),
}


export const requestPasswordRecoveryTC = (userEmail: string): BaseThunkType<PasswordRecoveryActionsTypes> => async (dispatch) => {
    
    try {
        dispatch( passwordRecoveryActions.setLoadingStatus(true) )

        const res = await authAPI.restorePasswordRequest(userEmail)

        if (!res.error) {
            dispatch( passwordRecoveryActions.setPasswordRecoveryMessageData(true, userEmail))
        }

    } catch(e: any) {
        dispatch(appActions.setAppErrorMessage( e.response.data.error || e.message ))

    } finally {
        dispatch( passwordRecoveryActions.setLoadingStatus(false) )
    }
}




type PasswordRecoveryStateType = typeof initialState
export type PasswordRecoveryActionsTypes = InferActionsTypes<typeof passwordRecoveryActions> 
| InferActionsTypes<typeof appActions>