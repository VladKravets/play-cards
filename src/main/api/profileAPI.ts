import axios from "axios";
import {ProfileStateType} from "../bll/reducers/profileReducer";
import { apiBase } from "./apiBase";
import { UserType } from "./authAPI";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const profileAPI = {


    updateUserInfo(name:string, avatar:string){
        return instance.put<UpdateUserType>(`auth/me`,{name,avatar})
            .then(res=>res.data)
    }
}



// types
type UpdateUserType={
    updatedUser: UserType
    error: string
}
