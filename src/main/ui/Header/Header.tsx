import React, {useCallback} from 'react'
import {NavLink} from 'react-router-dom';
import {ROUTES} from '../routes/RoutesList'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {logoutThunkTC} from "../../bll/reducers/loginReducer";
import exitIcon from "../../../assets/icons/exit.png"
import s from "./Header.module.css"

// todo: remove component (temporary component for app development)
const Header = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const logoutHandler = useCallback(() => {
        dispatch(logoutThunkTC());
    }, []);

    const headerStyle = {
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '70px', backgroundColor: '#eee',
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px',
    } as React.CSSProperties

    const mappedLinks = ROUTES.map(el => <NavLink
        key={el.path} style={({isActive}) => isActive ? {color: 'red'} : {}}
        to={el.path}>{el.label}</NavLink>)

    return (
        <div style={headerStyle}>
            {mappedLinks}
            {isLoggedIn && <div className={s.logOut} onClick={logoutHandler}>
                <img src={exitIcon} alt=""/>
            </div>}
        </div>
    )
}

export default Header