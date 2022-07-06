import { apiBase } from "./apiBase"
import { PATH } from '../../utils/path'

const passwordRecoveryEmail = `
<div style="background-color: lime; padding: 15px">
    Someone requested a password change of FLASHCARDS profile.
    If it wasn't you, please ignore this email.
    Password recovery link: 
    <a href='https://insane4l.github.io/flash-cards#${PATH.newPassword}?token=$token$'>
        Change your password using this link
    </a>
</div>`


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

    restorePasswordRequest(userEmail: string) {
        return apiBase.post<RestorePassResponseType>(`auth/forgot`,
            {email: userEmail, from: 'From MergatorsTeam KMB 51/1', message: passwordRecoveryEmail})
            .then(res => res.data)
    },

    createNewPassword(password: string, resetPasswordToken: string) {
        return apiBase.post<CreateNewPassResponseType>(`auth/set-new-password`,
            {password, resetPasswordToken})
            .then(res => res.data)
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



type RestorePassResponseType = RestorePassSuccessResponseType & RestorePassFailureResponseType
type RestorePassSuccessResponseType = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}
type RestorePassFailureResponseType = {
    error: string
    email: string
    emailRegExp: {}
    in: string
}



type CreateNewPassResponseType = CreateNewPassSuccessResponseType & CreateNewPassFailureResponseType
type CreateNewPassSuccessResponseType = {
    info: string
}
type CreateNewPassFailureResponseType = {
    error: string
}