import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Test from "../a-2 featuries/b0-test/TEST";


function App() {
    return (
        <div className="App">
            <HashRouter>
                {/*<Header/>*/}
                {/*  <Main/>*/}
                <Test/>
            </HashRouter>

        </div>
    );
}

export default App;
