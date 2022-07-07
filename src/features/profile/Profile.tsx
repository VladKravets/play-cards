import React, {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../main/bll/store";
import {Navigate} from "react-router-dom";

import {updateUserInfoTC} from "../../main/bll/reducers/profileReducer";
import EditableTextLine from "../../main/ui/common/EditableTextLine/EditableTextLine";
import SuperButton from "../../main/ui/common/SuperButton/SuperButton";
import s from "../profile/Profile.module.css"
import Spinner from "../../main/ui/common/Spinner/Spinner";
import user from "../../assets/images/user.png"
import {appActions} from "../../main/bll/reducers/appReducer";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {PATH} from "../../utils/path";
import {Card} from "@mui/material";
import {Cards} from "../cards/Cards";


export const Profile = () => {

    const dispatch = useAppDispatch();

    const {name, avatar, email} = useAppSelector(state => state.profile.userData)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isLoading = useAppSelector(state => state.app.status)
    const isError = useAppSelector(state => state.app.error)

    const [value, setValue] = useState(name)
    const [newFoto, setNewFoto] = useState<string | null>(avatar)


    const updateUserInfoHandler = () => {
        if (value === name) {
            dispatch(appActions.setErrorMessage('Same name.Please enter another'))

        }
        setNewFoto('')

        dispatch(updateUserInfoTC(value, newFoto))

    }

    if (!isLoggedIn) return <Navigate to={PATH.login}/>
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(appActions.setErrorMessage(''))
    };

    return (
        <>
            <div className={s.profileBlock}>
                <h3 className={s.pageTitle}>User information</h3>
                <div className={s.avatar}>

                    {avatar ? <img src={avatar} alt={''}/> : <img src={user} alt={''}/>}


                </div>


                <EditableTextLine text={value} setNewText={setValue}/>
                <div className={s.line}/>
                <span className={s.underText}>Nickname</span>
                <EditableTextLine withEditIcon={false} disabled={true} text={email} setNewText={() => {
                }}/>
                <div className={s.line}/>
                <span className={s.underText}>Email</span>
                <SuperButton className={s.btn} onClick={updateUserInfoHandler}
                             disabled={isLoading === 'loading'}>Save</SuperButton>

                <Snackbar open={isError !== ''} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {isError}
                    </Alert>
                </Snackbar>
                {isLoading === 'loading' && <Spinner/>}

            </div>

                <Cards/>
        </>

    )
}

