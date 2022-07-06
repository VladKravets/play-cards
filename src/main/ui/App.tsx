import React, {useEffect} from 'react'
import {appActions, initializeAppTC} from '../bll/reducers/appReducer';
import {useAppDispatch, useAppSelector} from '../bll/store';
import './App.css'
import Spinner from './common/Spinner/Spinner';
import Header from './Header/Header';
import RoutesList from './routes/RoutesList';

function App() {

    const appStyle = {paddingTop: '40px'} // todo: remove (temporary style for fixed header)

    const dispatch = useAppDispatch()
    const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    // todo: add some styles for Spinner
    return (
        <div style={appStyle} className="App">
            {!isAppInitialized
                ? <div className='loader'>
                    <Spinner/>
                </div>
                : <>
                    <Header/>
                    <RoutesList/>
                </>
            }

        </div>
    );
}

export default App
