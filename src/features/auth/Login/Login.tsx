import React from 'react';
import { PATH } from '../../../utils/path';
import { useAppSelector } from "../../../main/bll/store";
import { LoginForm } from "./LoginForm";
import { AuthBlock } from '../AuthBlock';

export const Login = () => {

    const isLoading = useAppSelector(state => state.login.isLoading)

    return (
        <AuthBlock
            pageTitle="Sign In"
            navBlockLabel="Don’t have an account?"
            navLinkPath={PATH.registration}
            navLinkTitle="Sign Up"
            withRocket="right"
            isLoading={isLoading} >

            <LoginForm isLoading={isLoading} />
        </AuthBlock>
    )
}