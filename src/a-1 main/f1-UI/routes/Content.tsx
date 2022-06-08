import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../../../a-2 featuries/b1-auth/e1-login/Login";
import Profile from "../components/Profile/Profile";
import {
    CREATE_NEW_PASSWORD,
    LOGIN_PAGE,
    PAGE_NOT_FOUND,
    PASSWORD_RECOVERY,
    PROFILE_PAGE,
    REGISTRATION_PAGE
} from "./Routes";
import Error404 from "../components/Error/Error404";
import Registration from "../components/Registration/Registration";
import PasswordRecovery from "../components/Password-recovery/PasswordRecovery";

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path={LOGIN_PAGE} element={<Login/>}/>
                <Route path={REGISTRATION_PAGE} element={<Registration/>}/>
                <Route path={PROFILE_PAGE} element={<Profile/>}/>
                <Route path={PAGE_NOT_FOUND} element={<Error404/>}/>
                <Route path={PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={CREATE_NEW_PASSWORD} element={<Profile/>}/>
            </Routes>
        </div>
    );
};

export default Content;
