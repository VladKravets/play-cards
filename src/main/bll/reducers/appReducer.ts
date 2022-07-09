import {authAPI} from "../../api/authAPI"
import {BaseThunkType, InferActionsTypes} from "../store"
import {profileActions} from "./profileReducer"
import {loginActions} from "./loginReducer";

const initialState = {
    isAppInitialized: false,
    error: '',
    status: 'idle' as RequestStatusType,
}

const appReducer = (state: AppStateType = initialState, action: AppActionsTypes): AppStateType => {
    switch (action.type) {
        case 'fc/appRed/INITIALIZED_SUCCESSFULLY':
            return {
                ...state,
                isAppInitialized: true
            }
        case 'fc/appRed/APP_STATUS':
            return {...state, status: action.status,};
        case 'fc/appRed/SET_ERROR_MESSAGE':
            return {
                ...state,
                error: action.errorMessage
            }

        default:
            return state
    }
}


export const appActions = {
    initializedSuccessfully: () => (
        {type: 'fc/appRed/INITIALIZED_SUCCESSFULLY'} as const
    ),
    setErrorMessage: (errorMessage: string) => (
        {type: 'fc/appRed/SET_ERROR_MESSAGE', errorMessage} as const
    ),
    appSetStatusAC: (status: RequestStatusType) => (
        {type: 'fc/appRed/APP_STATUS', status} as const
    )


}


export const initializeAppTC = (): BaseThunkType<AppActionsTypes> => async (dispatch) => {
    dispatch(appActions.appSetStatusAC('loading'))
    try {
        const res = await authAPI.authMe()

        if (!res.error) {
            dispatch(profileActions.setUserData(res))
            dispatch(loginActions.setIsLoggedInAC(true))
            dispatch(appActions.appSetStatusAC('succeeded'))
        }

    } catch (e: any) {
        dispatch(appActions.setErrorMessage(e.response.data.error || e.message))
        dispatch(appActions.appSetStatusAC('failed'))

    } finally {
        dispatch(appActions.initializedSuccessfully())
    }
}


export const logoutThunkTC = (): BaseThunkType<AppActionsTypes> => async (dispatch) => {

    dispatch(appActions.appSetStatusAC('loading'))

    authAPI.logout()
        .then(() => {
            dispatch(loginActions.setIsLoggedInAC(false))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            dispatch(appActions.setErrorMessage(error));
        })
        .finally(() => {
            dispatch(appActions.appSetStatusAC('idle'))
        });
};


export default appReducer
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type AppStateType = typeof initialState
export type AppActionsTypes = InferActionsTypes<typeof appActions> |InferActionsTypes<typeof loginActions>| InferActionsTypes<typeof profileActions>