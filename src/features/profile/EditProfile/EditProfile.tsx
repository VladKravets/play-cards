import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../main/bll/store"
import { updateUserInfoTC } from "../../../main/bll/reducers/profileReducer"
import EditableTextLine from "../../../main/ui/common/EditableTextLine/EditableTextLine"
import SuperButton from "../../../main/ui/common/SuperButton/SuperButton"
import s from "./EditProfile.module.css"
import Spinner from "../../../main/ui/common/Spinner/Spinner"
import { appActions } from "../../../main/bll/reducers/appReducer"
import UserAvatar from '../UserAvatar/UserAvatar'
import { UserType } from '../../../main/api/authAPI'


export const EditProfile: FC<EditProfilePropsType> = ({userData, deactivateEditMode}) => {

    const dispatch = useAppDispatch()

    const {name, avatar, email} = userData
    const isLoading = useAppSelector(state => state.profile.isLoading)

    const [value, setValue] = useState(name)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [newFoto, setNewFoto] = useState<string | null>(avatar)

    useEffect(() => {

        ( (value === name) || isLoading ) ? setBtnDisabled(true) : setBtnDisabled(false)
        
    },[isLoading, value, name])

    const updateUserInfoHandler = () => {
        if (value === name) {
            dispatch(appActions.setAppErrorMessage('Same name.Please enter another'))
        }
        setNewFoto('')

        dispatch(updateUserInfoTC(value, newFoto))

    }


    return (
        <div className={s.wrapper}>
            <h3 className={s.pageTitle}>Edit User Data</h3>

            <div className={s.avatar}>
                {
                    isLoading 
                        ? <Spinner/>
                        : <UserAvatar sideLength={100} />
                }
            </div>
            
            <EditableTextLine text={value} setNewText={setValue}/>
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