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


}

const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsTypes): ProfileStateType => {
    switch(action.type) {
       /*  case 'profile/GET-USER-INFO':
             return {
                 ...state, ...action.profile
                
            }*/
        case "profile/UPDATE-USER-INFO":
            return {
                ...state, ...action.profile
            }
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}
        default: return state
    }
}


//actions
export const profileActions = {
  /*  getUserInfo: (profile:ProfileStateType) => (
        {type: 'profile/GET-USER-INFO',profile} as const
    ),*/
    updateUserInfo: (profile:ProfileStateType) => (
        {type: 'profile/UPDATE-USER-INFO',profile} as const
    ),
}

//thunks
 export const updateUserInfoTC = (name:string, avatar:string): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {

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
 }
/*export const getUserInfoTC = (): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {

        profileAPI.me()
            .then(res=>{
                if(res){
                    dispatch(profileActions.getUserInfo(res.data))
                }
            })
}*/


export default profileReducer

export type ProfileStateType = typeof initialState
export type ProfileActionsTypes = InferActionsTypes<typeof profileActions> | InferActionsTypes<typeof loginActions>