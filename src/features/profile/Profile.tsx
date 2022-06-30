import React, {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../main/bll/store";
import user from "../../assets/images/user.png"
import {Navigate} from "react-router-dom";
import {PATH} from "../../main/ui/routes/RoutesList";
import SuperInputText from "../../main/ui/common/SuperInputText/SuperInputText";
import style from '../profile/Profile.module.css'
import {updateUserInfoTC} from "../../main/bll/reducers/profileReducer";
import EditableTextLine from "../../main/ui/common/EditableTextLine/EditableTextLine";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";


const Profile = () => {

    const dispatch = useAppDispatch();

    let name = useAppSelector(state => state.profile.name)
    const avatar = useAppSelector(state => state.profile.avatar)
    const email = useAppSelector(state => state.profile.email)
    const isLoggedIn = useAppSelector(state => state.login._id)


const[value,setValue]=useState(name)
const[newFoto,setNewFoto]=useState(avatar)


    const updateUserInfoHandler=()=>{

        dispatch(updateUserInfoTC(value,newFoto))}

    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    return (
        <div className={style.container}>
            User information
            <div className={style.avatar}>
                {!avatar
                    ? <img src={user}/>
                    : <img src={avatar} style={{width: '50px', height: '50px', borderRadius: '50%'}}/>}
            </div>


            <EditableTextLine text={value} setNewText={setValue}/>
            <span >Nickname</span>
            <SuperInputText value={email}/>
            <SuperButton onClick={updateUserInfoHandler}>Save</SuperButton>

        </div>
    )
}

export default Profile