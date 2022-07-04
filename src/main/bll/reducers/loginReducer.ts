import {BaseThunkType, InferActionsTypes} from "../store"
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {profileActions} from "./profileReducer";
import {Dispatch} from "redux";
import {appActions} from "./appReducer";

const initialState = {
    isLoggedIn: false,
    isLoading: false

};
type LoginStateType = typeof initialState


const loginReducer = (state: LoginStateType = initialState, action: LoginActionsTypes): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "login/IS-LOADING":
            return {...state, isLoading: action.value}
        default:
            return state
    }
}


export const loginActions = {
    setIsLoggedInAC: (value: boolean) => (
        ({type: 'login/SET-IS-LOGGED-IN', value} as const)
    ),
    isLoading: (value: boolean) => ({
            type: 'login/IS-LOADING', value
        } as const
    ),
}


// export const someThunk = (): BaseThunkType<LoginActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }

export const loginTC = (email: string, password: string, rememberMe: boolean = false): BaseThunkType<LoginActionsTypes> =>
    async (dispatch) => {
        dispatch(loginActions.isLoading(true))
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res) {
                    dispatch(loginActions.setIsLoggedInAC(res))
                    dispatch(loginActions.setIsLoggedInAC(true))
                } else {
                    alert('Упс...что-то не так с сервером')
                }
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');

                dispatch(error)
            })
            .finally(() => {
                dispatch(loginActions.isLoading(false))
            })

    }
export const logoutThunkTC = () => (dispatch:Dispatch) => {
    dispatch(loginActions.isLoading(true))
    authAPI.logout()
        .then((res) => {
            dispatch(appActions.setErrorMessage(res.info))
            dispatch(profileActions.setUserData(res))
           dispatch(loginActions.setIsLoggedInAC(false))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            dispatch(appActions.setErrorMessage(error));
        })
        .finally(() => {
            dispatch(loginActions.isLoading(false));
        });
};

export default loginReducer

export type LoginActionsTypes = InferActionsTypes<typeof loginActions>

