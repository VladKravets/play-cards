import React from 'react';
import {NavLink} from "react-router-dom";
import {
    CREATE_NEW_PASSWORD,
    LOGIN_PAGE,
    PAGE_NOT_FOUND,
    PASSWORD_RECOVERY,
    PROFILE_PAGE,
    REGISTRATION_PAGE
} from "../../routes/Routes";
import s from './NavBar.module.css'
export const Navigation = () => {
    return (
        <div className={s.navbar}>
            <NavLink to={LOGIN_PAGE} className={({isActive}) => (isActive ? s.active : s.item)}>Login</NavLink>
            <NavLink to={REGISTRATION_PAGE} className={({isActive}) => (isActive ? s.active : s.item)}>Registration</NavLink>
            <NavLink to={PROFILE_PAGE} className={({isActive}) => (isActive ? s.active : s.item)}>Profile</NavLink>
            <NavLink to={PAGE_NOT_FOUND} className={({isActive}) => (isActive ? s.active : s.item)}>404</NavLink>
            <NavLink to={PASSWORD_RECOVERY} className={({isActive}) => (isActive ? s.active : s.item)}>Password recovery</NavLink>
            <NavLink to={CREATE_NEW_PASSWORD} className={({isActive}) => (isActive ? s.active : s.item)}>Create a new password</NavLink>
        </div>
    );
};

