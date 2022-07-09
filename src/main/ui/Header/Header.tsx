import React, {useCallback} from 'react'
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {logoutThunkTC} from "../../bll/reducers/appReducer";
import exitIcon from "../../../assets/icons/exit.png"
import s from "./Header.module.css"
import { PATH } from '../../../utils/path';
import { Profile } from '../../../features/profile/Profile';
import { PacksList } from '../../../features/cards/PacksList/PacksList';
import { FlatProgress } from '../common/FlatProgress/FlatProgress';
import { MainLogo } from '../common/MainLogo/MainLogo';


const NavLinksList = [
    { label: 'Profile', path: PATH.profile, component: <Profile /> },
	{ label: 'Packs list', path: PATH.packsList, component: <PacksList /> },
]

const Header = () => {

    const appStatus = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const logoutHandler = useCallback(() => {
        dispatch(logoutThunkTC());
    }, []);


    const mappedLinks = NavLinksList.map(el => <NavLink
        key={el.path} className={({isActive}) => isActive ? `${s.navLink} ${s.navLinkActive}` : s.navLink}
        to={el.path}>{el.label}</NavLink>)

    return (
        <>
        <div className={s.headerSpaceStub}></div>
        <div className={s.wrapper}>
            <div className={`container ${s.headerContainer}`}>

                <div className={s.header}>

                    <MainLogo size={20}/>

                    <div className={s.navLinks}>
                        {mappedLinks}
                    </div>
                    
                    {isLoggedIn && <div className={s.logOut} onClick={logoutHandler}>
                        <img src={exitIcon} alt=""/>
                    </div>
                    }
                </div>
            </div>

            <FlatProgress withColoredLine isLoading={appStatus === 'loading'} />
        </div>
        </>
    )
}

export default Header