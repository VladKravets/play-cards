import React, {useEffect} from 'react'
import './App.css'
import Header from './Header/Header';
import RoutesList from './routes/RoutesList';
import {AppRootStateType, useAppDispatch, useAppSelector} from "../bll/store";
import {logoutTC} from "../bll/reducers/loginReducer";
import {initializeAppTC} from "../bll/reducers/appReducer";
import Spinner from "./common/Spinner/Spinner";

function App() {

    const appStyle = {paddingTop: '40px'} // todo: remove (temporary style for fixed header)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Spinner/>
        </div>
    }
    return (
        <div style={appStyle} className="App">
            <Header/>
            <RoutesList/>
        </div>
    );
}

export default App
