import {BaseThunkType, InferActionsTypes} from "../store";
import {profileAPI} from "../../api/profileAPI";
import {loginActions} from "./loginReducer";
import {UserType} from "../../api/authAPI";
import {appActions} from "./appReducer";
import axios, {AxiosError} from "axios";

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

    error: "",
    isLoading: false
};

export const profileReducer = (
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
        case "profile/SET-LOADING":
            return {
                ...state,
                isLoading: action.value
            };
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
    setLoading: (value: boolean) => (
        {type: "profile/SET-LOADING", value} as const)
}

//thunks
export const updateUserInfoTC =
    (name: string, avatar: string | null): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {
        dispatch(appActions.appSetStatusAC('loading'))

        try {
            const res = await profileAPI.updateUserInfo(name, avatar)
            if (!res.error) {
                dispatch(profileActions.setUserData(res.updatedUser))

            }

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(profileActions.setErrorMessage(error))
            } else {
                dispatch(profileActions.setErrorMessage(`Native error ${err.message}`))
            }
        }
        finally {
            dispatch(appActions.appSetStatusAC('succeeded'))


        }
    }
;

export type ProfileStateType = typeof initialState
export type ProfileActionsTypes =
    | InferActionsTypes<typeof profileActions>
    | ReturnType<typeof loginActions.setIsLoggedInAC>
    | InferActionsTypes<typeof appActions>
