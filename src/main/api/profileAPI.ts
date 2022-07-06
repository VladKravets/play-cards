import { apiBase } from "./apiBase";
import { UserType } from "./authAPI";

export const profileAPI = {


    updateUserInfo(name:string, avatar:string|null){
        return apiBase.put<UpdateUserType>(`auth/me`,{name,avatar})
            .then(res=>res.data)
    }
}

// types
type UpdateUserType={
    updatedUser: UserType
    error: string
}
