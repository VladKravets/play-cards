import {BaseThunkType, InferActionsTypes} from "../store"
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {profileActions} from "./profileReducer";

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
    isLoading: false

};
type LoginStateType = typeof initialState


const loginReducer = (state: LoginStateType = initialState, action: LoginActionsTypes): LoginStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}
        case "login/IS-LOADING":
            return {...state, isLoading: action.value}

        default:
            return state
    }
}


export const loginActions = {
    setIsLoggedInAC: (payload: LoginStateType) => (
        ({type: 'login/SET-IS-LOGGED-IN', payload} as const)
    ),
    isLoading:(value:boolean)=>({
            type:'login/IS-LOADING',value}as const
    )
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
            .finally(()=>{
                dispatch(loginActions.isLoading(false))
            })

    }

export default loginReducer

export type LoginActionsTypes = InferActionsTypes<typeof loginActions>

