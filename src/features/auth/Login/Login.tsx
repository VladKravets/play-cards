import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppRootStateType} from "../../../main/bll/store";
import {PATH} from "../../../main/ui/routes/RoutesList";
import LoginForm from "./LoginForm";
import AuthBlock from '../AuthBlock';


const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, string>(state => state.login._id)


    if (isLoggedIn) return <Navigate to={PATH.profile}/>

    return (
        <AuthBlock 
			pageTitle="Sign In"
			navBlockLabel="Don’t have an account?"
			navLinkPath={PATH.registration}
			navLinkTitle="Sign Up">
            
            <LoginForm/>
        </AuthBlock>
    )
}

export default Login