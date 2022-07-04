import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from "../../../main/bll/store";
import {PATH} from "../../../main/ui/routes/RoutesList";
import LoginForm from "./LoginForm";
import AuthBlock from '../AuthBlock';
import Spinner from "../../../main/ui/common/Spinner/Spinner";


const Login = () => {
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
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