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

    editMode: false,
    isLoading: false,
};


export const profileReducer = (
    state: ProfileStateType = initialState,
    action: ProfileActionsTypes
): ProfileStateType => {
    switch (action.type) {
        case "profile/SET-USER-DATA":
        case "profile/SET-LOADING":
        case "profile/SET-EDIT-MODE":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

//actions
export const profileActions = {
    setUserData: (userData: UserType) => (
        { type: "profile/SET-USER-DATA", payload: {userData} } as const),

    setLoading: (isLoading: boolean) => (
        { type: "profile/SET-LOADING", payload: {isLoading} } as const),

    setEditMode: (editMode: boolean) => (
        { type: "profile/SET-EDIT-MODE", payload: {editMode} } as const),
}

//thunks
export const updateUserInfoTC =
    (name: string, avatar: string | null): BaseThunkType<ProfileActionsTypes> => async (dispatch) => {
        dispatch(profileActions.setLoading(true))

        try {
            const res = await profileAPI.updateUserInfo(name, avatar)

            if (!res.error) {
                dispatch(profileActions.setUserData(res.updatedUser))
                dispatch(profileActions.setEditMode(false))
            }

        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data ? err.response.data.error : err.message
                dispatch(appActions.setAppErrorMessage(error))
            } else {
                dispatch(appActions.setAppErrorMessage(`Native error ${err.message}`))
            }
        } finally {
            dispatch(profileActions.setLoading(false))
        }
    }
;

export type ProfileStateType = typeof initialState
export type ProfileActionsTypes =
    | InferActionsTypes<typeof profileActions>
    | ReturnType<typeof loginActions.setIsLoggedInAC>
    | InferActionsTypes<typeof appActions>