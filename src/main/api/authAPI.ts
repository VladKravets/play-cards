import axios from "axios";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email,password,rememberMe})
            .then(res => res.data)
    }
}


//types
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
