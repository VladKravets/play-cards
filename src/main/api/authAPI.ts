import { apiBase } from "./apiBase"


export const authAPI = {
    register(email: string, password: string) {
        return apiBase.post<RegisterSuccessResponseType & RegisterFailureResponseType>(
            'auth/register', {email, password}).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return apiBase.post(`auth/login`, {email,password,rememberMe})
            .then(res => res.data)
    }
}



type RegisterSuccessResponseType = {addedUser: UserType}

//types
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,}
type RegisterFailureResponseType = {
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    emailRegExp: {}
    passwordRegExp: string
}

type UserType = {
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