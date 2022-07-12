import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../main/bll/store";
import {Navigate} from "react-router-dom";
import {updateUserInfoTC} from "../../main/bll/reducers/profileReducer";
import EditableTextLine from "../../main/ui/common/EditableTextLine/EditableTextLine";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import s from "../profile/Profile.module.css"
import Spinner from "../../main/ui/common/Spinner/Spinner";
import user from "../../assets/images/user.png"
import {appActions} from "../../main/bll/reducers/appReducer";
import {PATH} from "../../utils/path";


export const Profile = () => {

    const dispatch = useAppDispatch();

    const {name, avatar, email} = useAppSelector(state => state.profile.userData)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isLoading = useAppSelector(state => state.profile.isLoading)

    const [value, setValue] = useState(name)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [newFoto, setNewFoto] = useState<string | null>(avatar)

    useEffect(() => {

        ( (value === name) || isLoading ) ? setBtnDisabled(true) : setBtnDisabled(false)
        
    },[isLoading,value,name])

    const updateUserInfoHandler = () => {
        if (value === name) {
            dispatch(appActions.setAppErrorMessage('Same name.Please enter another'))
        }
        setNewFoto('')

        dispatch(updateUserInfoTC(value, newFoto))

    }


    if (!isLoggedIn) return <Navigate to={PATH.login}/>

    return (
        <>
            <div className={s.profileBlock}>
                <h3 className={s.pageTitle}>User information</h3>
                <div className={s.avatar}>

                    {avatar ? <img src={avatar} alt={''}/> : <img src={user} alt={''}/>}


                </div>


                <EditableTextLine text={value} setNewText={setValue}/>
                <div className={s.line}/>
                <span className={s.underText}>Nickname</span>
                <EditableTextLine withEditIcon={false} disabled={true} text={email} setNewText={() => {
                }} />
                <div className={s.line}/>
                <span className={s.underText}>Email</span>
                <SuperButton className={s.btn} onClick={updateUserInfoHandler} disabled={btnDisabled}>
                    Save
                </SuperButton>

                {isLoading && <Spinner/>}
            </div>

        </>

    )
}

