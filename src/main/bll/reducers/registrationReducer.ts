import { authAPI } from "../../api/authAPI"
import { BaseThunkType, InferActionsTypes } from "../store"
import { appActions } from "./appReducer"

const initialState = {
    isRegistered: false,
    isLoading: false,
}

export const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsTypes): RegistrationStateType => {
    switch(action.type) {
        case 'fc/registration/SUCCESSFULLY_REGISTERED':
        case 'fc/registration/SET-LOADING-STATUS':
            return {
                ...state,
                ...action.payload
            }

        default: return state
    }
}




export const registrationActions = {
    setRegisteredStatus: (isRegistered: boolean) => (
        {type: 'fc/registration/SUCCESSFULLY_REGISTERED', payload: {isRegistered}} as const
    ),
    setLoadingStatus: (isLoading: boolean) => (
        {type: 'fc/registration/SET-LOADING-STATUS', payload: {isLoading}} as const
    ),
}


export const registerUserTC = (email: string, password: string): BaseThunkType<RegistrationActionsTypes> => async (dispatch) => {
    try {
        dispatch( registrationActions.setLoadingStatus(true) )
        const res = await authAPI.register(email, password)

        if (!res.error) {
            dispatch(registrationActions.setRegisteredStatus(true))
        }

    } catch(e: any) {
        dispatch(appActions.setAppErrorMessage( e.response.data.error || e.message ))
        dispatch(registrationActions.setRegisteredStatus(false))

    } finally {
        dispatch( registrationActions.setLoadingStatus(false) )
    }
}






type RegistrationStateType = typeof initialState
export type RegistrationActionsTypes = InferActionsTypes<typeof registrationActions>
| InferActionsTypes<typeof appActions>