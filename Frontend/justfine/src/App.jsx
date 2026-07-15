import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import SideBar from './components/SideBar';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ToggleTheme from './components/ToggleTheme';
import Transaction from './pages/Transaction';
import Sources from './pages/sources';
import DebtsLoan from './pages/DebtsLoan';

function App(){
    return (
        <Routes>
                <Route path="/" element={<Auth />}/>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/transaction" element={<Transaction />}/>
                    <Route path="/sources" element={<Sources />} /> 
                    <Route path="/debts" element={<DebtsLoan />} />
                </Route>
        </Routes>
    );
}

export default App;