import React, {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../main/bll/store";
import user from "../../assets/images/user.png"
import {Navigate} from "react-router-dom";
import {PATH} from "../../main/ui/routes/RoutesList";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";

import {updateUserInfoTC} from "../../main/bll/reducers/profileReducer";
import EditableTextLine from "../../main/ui/common/EditableTextLine/EditableTextLine";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import s from "../profile/Profile.module.css"
import Spinner from "../../main/ui/common/Spinner/Spinner";


const Profile = () => {

    const dispatch = useAppDispatch();

    let name = useAppSelector(state => state.profile.userData.name)
    const avatar = useAppSelector(state => state.profile.userData.avatar)
    const email = useAppSelector(state => state.profile.userData.email)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isLoading = useAppSelector(state => state.profile.loading)


    const [value, setValue] = useState<string>(name)
    const [newFoto, setNewFoto] = useState<any>(avatar)
    const [error, setError] = useState<string | null>(null)


    const updateUserInfoHandler = () => {
        if (value === name) {
            return setError('Enter another name')
        }
        setNewFoto('https://thumbs.dreamstime.com/b/funny-hand-drawn-head-protruding-hair-emoticon-laugh-isolated-transparent-background-line-emoticons-icon-smile-joy-emoji-120292109.jpg')

        dispatch(updateUserInfoTC(value,newFoto))}

    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    return (
        <div className={s.profileBlock}>
            <h3 className={s.pageTitle}>User information</h3>
            <div className={s.avatar}>

                <img src={newFoto}/>

            </div>


            <EditableTextLine text={value} setNewText={setValue}/>
            <div className={s.line}></div>
            <span className={s.underText}>Nickname</span>
            <EditableTextLine withEditIcon={false} disabled={true} text={email} setNewText={() => {
            }}/>
            <div className={s.line}></div>
            <span className={s.underText}>Email</span>
            <SuperButton className={s.btn} onClick={updateUserInfoHandler} disabled={isLoading}>Save</SuperButton>
            {isLoading && <Spinner/>}

        </div>
    )
}

export default Profile