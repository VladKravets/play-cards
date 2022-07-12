import React, {useCallback, useEffect} from 'react'
import {appActions, initializeAppTC} from '../bll/reducers/appReducer';
import {useAppDispatch, useAppSelector} from '../bll/store';
import './App.css'
import Spinner from './common/Spinner/Spinner';
import { SuperAlert } from './common/SuperAlert/SuperAlert';
import { DevNavigation } from './DevNavigation/DevNavigation';
import Header from './Header/Header';
import RoutesList from './routes/RoutesList';

function App() {

    const dispatch = useAppDispatch()
    const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
    const isUserAuthorized = useAppSelector(state => state.login.isLoggedIn)
    const appStatusMessage = useAppSelector(state => state.app.appStatusMessage)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const onAlertClose = useCallback( () => {
        dispatch( appActions.cleanUpAppStatusMessage() )
    }, [dispatch])


    return (
        <div className="app">
            {!isAppInitialized
                ? <div className='app__loader'>
                    <Spinner/>
                </div>

                : <div className='app__content'> 
                    {isUserAuthorized && <Header/>}
                    <div className='container'>
                        <RoutesList/>
                    </div>
                </div>
            }
            

            <SuperAlert 
                variant={appStatusMessage.messageType}
                displayMode={!!appStatusMessage.message}
                onUnmountHandler={onAlertClose}
                displayDuration={4000}>

                {appStatusMessage.message}
            </SuperAlert>
            
            {/* todo: remove component (temporary component for app development) */}
            <DevNavigation />
        </div>
    )
}

export default App
