import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../main/bll/store"
import { updateUserInfoTC } from "../../../main/bll/reducers/profileReducer"
import EditableTextLine from "../../../main/ui/common/EditableTextLine/EditableTextLine"
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton"
import s from "./EditProfile.module.css"
import Spinner from "../../../main/ui/common/Spinner/Spinner"
import { appActions } from "../../../main/bll/reducers/appReducer"
import { UserType } from '../../../main/api/authAPI'
import { EditableAvatar } from './EditableAvatar/EditableAvatar'


export const EditProfile: FC<EditProfilePropsType> = ({userData, deactivateEditMode}) => {

    const dispatch = useAppDispatch()

    const {name, avatar, email} = userData
    const isLoading = useAppSelector(state => state.profile.isLoading)

    const [nameInputValue, setNewName] = useState(name)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [avatarImage, setNewAvatarImg] = useState<string | null>(avatar)

    useEffect(() => {

        const nameNotChanged = (nameInputValue === name)
        let avatarNotChanged = true

        if (typeof avatarImage === 'string') {
            avatarNotChanged = (avatarImage === avatar)
        }
        
        (( nameNotChanged && avatarNotChanged) || isLoading ) 
            ? setBtnDisabled(true) 
            : setBtnDisabled(false)
        
    },[isLoading, nameInputValue, name, avatarImage, avatar])


    const updateUserInfoHandler = () => {

        dispatch(updateUserInfoTC(nameInputValue, avatarImage))
    }


    return (
        <div className={s.wrapper}>
            <h3 className={s.pageTitle}>Edit User Data</h3>

            <div className={s.avatar}>
                {
                    isLoading 
                        ? <Spinner/>
                        : <EditableAvatar image={avatarImage} setNewImage={setNewAvatarImg}/>
                }
            </div>
            
            <EditableTextLine text={nameInputValue} setNewText={setNewName}/>
            <div className={s.line}/>
            <span className={s.underText}>Nickname</span>

            <EditableTextLine withEditIcon={false} disabled={true} text={email} setNewText={() => {}} />
            <div className={s.line}/>
            <span className={s.underText}>Email</span>

            <div className={s.buttons}>
                <SuperButton btnStyle="outline_danger" onClick={deactivateEditMode}>
                    Cancel
                </SuperButton>

                <SuperButton btnStyle="outline_success" onClick={updateUserInfoHandler} disabled={btnDisabled}>
                    Save
                </SuperButton>
            </div>
        </div>
    )
}



type EditProfilePropsType = {
    deactivateEditMode: () => void
    userData: UserType
}