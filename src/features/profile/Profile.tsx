import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../main/bll/store"
import { Navigate } from "react-router-dom"
import { profileActions } from "../../main/bll/reducers/profileReducer"
import s from "../profile/Profile.module.css"
import { PATH } from "../../utils/path"
import { EditProfile } from './EditProfile/EditProfile'
import { ProfileData } from './ProfileData/ProfileData'


export const Profile = () => {

    const dispatch = useAppDispatch()

    const userData = useAppSelector(state => state.profile.userData)
    const editMode = useAppSelector(state => state.profile.editMode)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)


    // cleanup
    useEffect(() => {

        return () => {
            deactivateEditMode()
        }
    }, [])

    
    function activateEditMode() {
        dispatch( profileActions.setEditMode(true) )
    }
    function deactivateEditMode() {
        dispatch( profileActions.setEditMode(false) )
    }


    if (!isLoggedIn) return <Navigate to={PATH.login}/>

    return (
        <div className={s.section}>
            <div className={s.profileBlock}>
                {
                    editMode
                        ? <EditProfile deactivateEditMode={deactivateEditMode} userData={userData} />
                        : <ProfileData activateEditMode={activateEditMode}/>
                }
            </div>
        </div>
    )
}

