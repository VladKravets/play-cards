import React, {useEffect} from 'react'
import {appActions, initializeAppTC} from '../bll/reducers/appReducer';
import {useAppDispatch, useAppSelector} from '../bll/store';
import './App.css'
import Spinner from './common/Spinner/Spinner';
import { DevNavigation } from './DevNavigation/DevNavigation';
import Header from './Header/Header';
import RoutesList from './routes/RoutesList';

function App() {

    const dispatch = useAppDispatch()
    const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
    const isUserAuthorized = useAppSelector(state => state.login.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
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
            
            
            {/* todo: remove component (temporary component for app development) */}
            <DevNavigation />
        </div>
    )
}

export default App
