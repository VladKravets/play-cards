import { apiBase } from "./apiBase"


export const authAPI = {

    register(email: string, password: string) {
        return apiBase.post<RegisterResponseType>(
            'auth/register', {email, password}).then(res => res.data)
    },

    login(email: string, password: string, rememberMe: boolean = false) {
        return apiBase.post(`auth/login`, {email,password,rememberMe})
            .then(res => res.data)
    },
    logout() {
        return apiBase.delete('auth/me').then(res => res.data)
    },
    authMe() {
        return apiBase.post<AuthMeResponseType>(`auth/me`,{}).then(res => res.data)
    },
}



// types

type RegisterResponseType = RegisterSuccessResponseType & RegisterFailureResponseType
type RegisterSuccessResponseType = {addedUser: AddedUserType}
type RegisterFailureResponseType = {
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    emailRegExp: {}
    passwordRegExp: string
}
export type AddedUserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
}


export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
}


type AuthMeResponseType = AuthMeSuccessResponseType & AuthMeFailureResponseType
type AuthMeSuccessResponseType = UserType
type AuthMeFailureResponseType = {
    error: string
    in: string
    // EXAMPLE in: "getMe/findUserByToken/User.findOne 
}

export type UserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: null | string
}