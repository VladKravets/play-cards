import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppRootStateType, useAppSelector} from "../../../main/bll/store";
import {PATH} from "../../../main/ui/routes/RoutesList";
import LoginForm from "./LoginForm";
import AuthBlock from '../AuthBlock';
import Spinner from "../../../main/ui/common/Spinner/Spinner";


const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, string>(state => state.login._id)
    const isLoading = useAppSelector(state => state.login.isLoading)

    if (isLoggedIn) return <Navigate to={PATH.profile}/>

    return (
        <AuthBlock 
			pageTitle="Sign In"
			navBlockLabel="Don’t have an account?"
			navLinkPath={PATH.registration}
			navLinkTitle="Sign Up">
            {isLoading && <Spinner/>}
            <LoginForm/>
        </AuthBlock>
    )
}

export default Login