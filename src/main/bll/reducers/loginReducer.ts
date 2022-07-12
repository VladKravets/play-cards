import {BaseThunkType, InferActionsTypes} from "../store"
import {authAPI} from "../../api/authAPI";
import {profileActions} from "./profileReducer";
import {appActions} from "./appReducer";

const initialState = {
    isLoggedIn: false,
    isLoading: false,
};
type LoginStateType = typeof initialState


const loginReducer = (state: LoginStateType = initialState, action: LoginActionsTypes): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
        case 'login/SET-LOADING-STATUS':
            return {...state, ...action.payload}
        default:
            return state
    }
}


export const loginActions = {
    setIsLoggedInAC: (isLoggedIn: boolean) => (
        ({type: 'login/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const)
    ),
    setLoadingStatus: (loadingStatus: boolean) => (
        {type: 'login/SET-LOADING-STATUS', payload: {loadingStatus}} as const
    ),
}


export const loginTC = (email: string, password: string, rememberMe: boolean = false): BaseThunkType<LoginActionsTypes> =>
async (dispatch) => {

    dispatch( loginActions.setLoadingStatus(true) )

    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res) {
                dispatch(profileActions.setUserData(res))
                dispatch(loginActions.setIsLoggedInAC(true))
            } else {
                alert('Упс...что-то не так с сервером')
            }
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            dispatch( appActions.setAppErrorMessage(error) )
        })
        .finally(() => {
            dispatch( loginActions.setLoadingStatus(false) )
        })

}


export default loginReducer

export type LoginActionsTypes =
    InferActionsTypes<typeof loginActions>
    | InferActionsTypes<typeof profileActions>
    | InferActionsTypes<typeof appActions>

