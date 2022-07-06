import React from 'react';
import {Navigate} from 'react-router-dom';
import { PATH } from '../../../utils/path';
import {useAppSelector} from "../../../main/bll/store";
import LoginForm from "./LoginForm";
import AuthBlock from '../AuthBlock';
import Spinner from "../../../main/ui/common/Spinner/Spinner";

const Login = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    if (isLoggedIn) return <Navigate to={PATH.profile}/>

    return (
        <>
            <AuthBlock
                pageTitle="Sign In"
                navBlockLabel="Don’t have an account?"
                navLinkPath={PATH.registration}
                navLinkTitle="Sign Up">
                <LoginForm/>
                {status === 'loading' && <Spinner/>}
            </AuthBlock>
        </>
    )
}

export default Login