import React from 'react'
import './App.css'
import Header from './Header/Header';
import RoutesList from './routes/RoutesList';


function App() {

    const appStyle = {paddingTop: '40px'} // todo: remove (temporary style for fixed header)
    return (
        <div style={appStyle} className="App">
            <Header />
            <RoutesList />
        </div>
    );
}

export default App
