import { authAPI } from "../../api/authAPI"
import { BaseThunkType, InferActionsTypes } from "../store"

const initialState = {
    isRegistered: false,
    error: '',
}

const registrationReducer = (state: RegistrationStateType = initialState, action: RegistrationActionsTypes): RegistrationStateType => {
    switch(action.type) {
        case 'fc/registration/SUCCESSFULLY_REGISTERED':
        case 'fc/registration/SET_ERROR_MESSAGE':
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
    setErrorMessage: (error: string) => (
        {type: 'fc/registration/SET_ERROR_MESSAGE', payload: {error}} as const
    )
}


export const registerUserTC = (email: string, password: string): BaseThunkType<RegistrationActionsTypes> => async (dispatch) => {
    try {
        const res = await authAPI.register(email, password)

        if (!res.error) {
            dispatch(registrationActions.setRegisteredStatus(true))
        } else {
            dispatch(registrationActions.setErrorMessage(res.error))
            dispatch(registrationActions.setRegisteredStatus(false))
        }

    } catch(e: any) {
        dispatch(registrationActions.setErrorMessage(e.message))
        dispatch(registrationActions.setRegisteredStatus(false))
    }
}




export default registrationReducer

type RegistrationStateType = typeof initialState
export type RegistrationActionsTypes = InferActionsTypes<typeof registrationActions>