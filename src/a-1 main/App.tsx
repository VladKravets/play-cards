import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Test from "../a-2 featuries/b0-test/TEST";
import {Header} from "./f1-UI/header/Header";
import Content from "./f1-UI/routes/Content";


function App() {
    return (
        <div className="App">
            <HashRouter>
                <Content/>
                <Header/>
                {/*  <Main/>*/}
                <Test/>
            </HashRouter>

        </div>
    );
}

export default App;
