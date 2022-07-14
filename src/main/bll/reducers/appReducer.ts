import {authAPI} from "../../api/authAPI"
import {BaseThunkType, InferActionsTypes} from "../store"
import {profileActions} from "./profileReducer"
import {loginActions} from "./loginReducer";
import { SuperAlertVariantType } from "../../ui/common/SuperAlert/SuperAlert";

const initialState = {
    isAppInitialized: false,
    status: 'idle' as RequestStatusType,
    appStatusMessage: {messageType: undefined, message: ''} as AppStatusMessageType,
}

const appReducer = (state: AppStateType = initialState, action: AppActionsTypes): AppStateType => {
    switch (action.type) {
        case 'fc/appRed/INITIALIZED_SUCCESSFULLY':
            return { ...state, isAppInitialized: true }

        case 'fc/appRed/SET_APP_STATUS':
            return { ...state, status: action.status };

        case 'fc/appRed/SET_APP_INFO_MESSAGE':
        case 'fc/appRed/SET_APP_SUCCESS_MESSAGE':
        case 'fc/appRed/SET_APP_ERROR_MESSAGE':
        case 'fc/appRed/APP_STATUS_MESSAGE_CLEARED':
            return {
                ...state,
                appStatusMessage: action.statusMessage,
            }

        default:
            return state
    }
}


export const appActions = {
    initializedSuccessfully: () => (
        {type: 'fc/appRed/INITIALIZED_SUCCESSFULLY'} as const
    ),
    setAppStatus: (status: RequestStatusType) => (
        {type: 'fc/appRed/SET_APP_STATUS', status} as const
    ),

    setAppInfoMessage: (message: string) => (
        {type: 'fc/appRed/SET_APP_INFO_MESSAGE', 
        statusMessage: {messageType: 'info', message}} as const
    ),
    setAppSuccessMessage: (message: string) => (
        {type: 'fc/appRed/SET_APP_SUCCESS_MESSAGE', 
        statusMessage: {messageType: 'success', message}} as const
    ),
    setAppErrorMessage: (message: string) => (
        {type: 'fc/appRed/SET_APP_ERROR_MESSAGE', 
        statusMessage: {messageType: 'error', message}} as const
    ),
    cleanUpAppStatusMessage: () => (
        {type: 'fc/appRed/APP_STATUS_MESSAGE_CLEARED', 
        statusMessage: {messageType: undefined, message: ''}} as const
    ),
}


export const initializeAppTC = (): BaseThunkType<AppActionsTypes> => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authAPI.authMe()

        if (!res.error) {
            dispatch(profileActions.setUserData(res))
            dispatch(loginActions.setIsLoggedInAC(true))
            dispatch(appActions.setAppStatus('succeeded'))
        }

    } catch (e: any) {

        if (e.response?.data?.error === "you are not authorized /ᐠ-ꞈ-ᐟ\\") {
            let message = "Welcome, Guest. Please login or register to use our service!"
            dispatch(appActions.setAppInfoMessage(message))
            dispatch(appActions.setAppStatus('idle'))
        } else {
            dispatch(appActions.setAppErrorMessage(e.response.data.error || e.message))
            dispatch(appActions.setAppStatus('failed'))
        }

    } finally {
        dispatch(appActions.initializedSuccessfully())
    }
}


export const logoutThunkTC = (): BaseThunkType<AppActionsTypes> => async (dispatch) => {

    dispatch(appActions.setAppStatus('loading'))

    authAPI.logout()
        .then(() => {
            dispatch(loginActions.setIsLoggedInAC(false))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            dispatch(appActions.setAppErrorMessage(error));
        })
        .finally(() => {
            dispatch(appActions.setAppStatus('idle'))
        });
};


export default appReducer
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type AppStateType = typeof initialState
export type AppActionsTypes = InferActionsTypes<typeof appActions> |InferActionsTypes<typeof loginActions>| InferActionsTypes<typeof profileActions>
type AppStatusMessageType = {messageType: SuperAlertVariantType, message: string}