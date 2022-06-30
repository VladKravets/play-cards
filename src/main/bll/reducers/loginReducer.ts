import {BaseThunkType, InferActionsTypes} from "../store"
import {authAPI, LoginParamsType} from "../../api/authAPI";

 const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: 0,
    updated: 0,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
};
type LoginStateType = typeof initialState


const loginReducer = (state: LoginStateType = initialState, action: LoginActionsTypes): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}


        default:
            return state
    }
}


export const loginActions = {
    setIsLoggedInAC: (payload: LoginStateType) => (
        ({type: 'login/SET-IS-LOGGED-IN', payload} as const)
    ),
}


// export const someThunk = (): BaseThunkType<LoginActionsTypes> => async (dispatch) => {
//     await dispatch(...)
//     dispatch(...)
// }

export const loginTC = (email: string, password: string, rememberMe: boolean = false): BaseThunkType<LoginActionsTypes> =>
    async (dispatch) => {
        // dispatch('Крутилка')
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res) {
                    dispatch(loginActions.setIsLoggedInAC(res))
                    //    куртилка выключилась
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

    }

export default loginReducer

export type LoginActionsTypes = InferActionsTypes<typeof loginActions>

