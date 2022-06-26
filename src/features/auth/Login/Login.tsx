import React from 'react';
import s from './Login.module.css'
import {useSelector} from 'react-redux';
import {Navigate, NavLink} from 'react-router-dom';
import {AppRootStateType} from "../../../main/bll/store";
import {PATH} from "../../../main/ui/routes/RoutesList";
import LoginForm from "./LoginForm";


const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, string>(state => state.login._id)


    if (isLoggedIn) return <Navigate to={PATH.profile}/>

    return (
        <div className={s.loginBlock}>
            <h1 className={s.loginTitle}>Play cards</h1>
            <h2 className={s.loginSubTitle}>Login</h2>
            <LoginForm/>

        </div>
    )
}

export default Login