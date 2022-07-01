import { BaseThunkType, InferActionsTypes } from "../store"
import {profileAPI} from "../../api/profileAPI";
import {loginActions} from "./loginReducer";


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
    loading:false


}

const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsTypes): ProfileStateType => {
    switch(action.type) {

        case "profile/UPDATE-USER-INFO":
            return {
                ...state, ...action.profile
            }
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}
        case "profile/IS-LOADING":
            return {...state, loading: action.value}
        default: return state
    }
}


//actions
export const profileActions = {

    updateUserInfo: (profile:ProfileStateType) => (
        {type: 'profile/UPDATE-USER-INFO',profile} as const
    ),
    isLoading:(value:boolean)=>({
        type:'profile/IS-LOADING',value}as const
    )
}

//thunks
 export const updateUserInfoTC = (name:string, avatar:string): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {
dispatch(profileActions.isLoading(true))
     profileAPI.updateUserInfo(name, avatar)
         .then(res => {
             if (res) {
                 dispatch(profileActions.updateUserInfo(res.updatedUser))

             } else {
                 console.log('Some error')
             }
         })
         .catch(e => {
             const error = e.response
                 ? e.response.data.error
                 : (e.message + ', more details in the console');

             dispatch(error)
         })
         .finally(()=>{
             dispatch(profileActions.isLoading(false))
         })
 }

export default profileReducer

export type ProfileStateType = typeof initialState
export type ProfileActionsTypes = InferActionsTypes<typeof profileActions> | InferActionsTypes<typeof loginActions>