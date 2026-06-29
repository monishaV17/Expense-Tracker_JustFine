import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import SideBar from './components/SideBar';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ToggleTheme from './components/ToggleTheme';

function App(){
    return (
        <Routes>
                <Route path="/" element={<Auth />}/>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                </Route>
        </Routes>
    );
}

export default App;