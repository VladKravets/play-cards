import {BaseThunkType, InferActionsTypes} from "../store";
import {profileAPI} from "../../api/profileAPI";
import {loginActions} from "./loginReducer";
import {UserType} from "../../api/authAPI";

const initialState = {
    userData: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: "",
        updated: "",
        isAdmin: false,
        verified: false,
        rememberMe: false,
        __v: 0,
        token: "",
        tokenDeathTime: 0,
    } as UserType,
    loading: false,
    error: "",
    isLoggedIn: false
};

const profileReducer = (
    state: ProfileStateType = initialState,
    action: ProfileActionsTypes
): ProfileStateType => {
    switch (action.type) {
        case "profile/SET-USER-DATA":
            return {
                ...state,
                userData: {...action.user},
            };
        case "profile/SET-ERROR-MESSAGE":
            return {
                ...state,
                error: action.errorMessage
            };
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};

//actions
export const profileActions = {
    setUserData: (user: UserType) =>
        ({type: "profile/SET-USER-DATA", user} as const),
    setErrorMessage: (errorMessage: string) =>
        ({type: "profile/SET-ERROR-MESSAGE", errorMessage} as const),
};

//thunks
export const updateUserInfoTC =
    (name: string, avatar: any): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {

        try {
            const res = await profileAPI.updateUserInfo(name, avatar)

            if (!res.error) {
                dispatch(profileActions.setUserData(res.updatedUser))
            }

        } catch (e: any) {
            dispatch(profileActions.setErrorMessage(e.response.data.error || e.message))
        }
    };

export default profileReducer

export type ProfileStateType = typeof initialState
export type ProfileActionsTypes =
    | InferActionsTypes<typeof profileActions>
    | ReturnType<typeof loginActions.setIsLoggedInAC>
