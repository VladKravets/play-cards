import axios from "axios";
import {ProfileStateType} from "../bll/reducers/profileReducer";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})
type UpdateUserType={
    updatedUser:ProfileStateType
    token:string
    tokenDeathTime:number

}
export const profileAPI = {

    me() {

        return instance.post(`auth/me`,{})
            .then(res => res.data)
    },
    updateUserInfo(name:string, avatar:string){
        return instance.put<UpdateUserType>(`auth/me`,{name,avatar})
            .then(res=>res.data)
    }
}


