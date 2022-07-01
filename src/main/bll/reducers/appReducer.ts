import {InferActionsTypes} from "../store"
import {Dispatch} from "redux";
import {authAPI} from "../../api/authAPI";
import {loginActions} from "./loginReducer";

const initialState = {
    isInitialized: false
}

const appReducer = (state: AppStateType = initialState, action: AppActionsTypes): AppStateType => {
    switch (action.type) {
        case "app/SET-INITIALIZED":
        case "app/SET-IS-LOADING":
        case "app/SET-ERROR":
            return {...state, ...action.payload};

        default:
            return state
    }
}


export const appActions = {
    setAppIsInitializedAC: (value: boolean) => (
        {type: "app/SET-INITIALIZED", payload: {appIsInitialized: value}} as const
    ),
    setAppIsLoadingAC: (isInitialized: boolean) => (
        {type: "app/SET-IS-LOADING", isInitialized} as const
    ),
    setAppErrorAC: (error: null | string) => (
        {type: "app/SET-ERROR", payload: {error}} as const
    ),
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setAppIsLoadingAC(true))
    authAPI.me()
        .then(res => {
            // dispatch(loginActions.setIsLoggedInAC(false))
            dispatch(appActions.setAppIsLoadingAC(false))
        })
        .catch(err => {
            const errorMessage = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            console.log('Error: ', errorMessage);
        })
        .finally(() => {
            dispatch(appActions.setAppIsInitializedAC(true))
        })
}


export default appReducer

type AppStateType = typeof initialState
export type AppActionsTypes = InferActionsTypes<typeof appActions|InferActionsTypes<typeof loginActions>>