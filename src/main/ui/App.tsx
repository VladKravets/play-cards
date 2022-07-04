import React, {useCallback, useEffect} from 'react'
import { initializeAppTC } from '../bll/reducers/appReducer';
import {useAppDispatch, useAppSelector} from '../bll/store';
import './App.css'
import Spinner from './common/Spinner/Spinner';
import Header from './Header/Header';
import RoutesList from './routes/RoutesList';
import {logoutThunkTC} from "../bll/reducers/loginReducer";

function App() {

	const appStyle = {paddingTop: '40px'} // todo: remove (temporary style for fixed header)

	const dispatch = useAppDispatch()
	const isAppInitialized = useAppSelector(state => state.app.isAppInitialized)
	useEffect(() => {
		dispatch( initializeAppTC() )
	}, [])

	// todo: add some styles for Spinner 
	return (
		<div style={appStyle} className="App">
			{!isAppInitialized
				? <Spinner />
				: <>
					<Header />
					<RoutesList />
				  </>
			}

		</div>
	);
}

export default App
