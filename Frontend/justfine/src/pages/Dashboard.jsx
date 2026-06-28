import {React, useState} from "react";
import '../static/Dashboard.css';

function Dashboard(){

    return(
        <div className="dashboard-card">
            <div className="dashboard-balance-card">
                <span className="dashboard-balance-label">TOTAL BALANCE</span>
                <h3 className="dashboard-balance-amount">₹1</h3>
                <div className="dashboard-balance-available">Available ₹0</div>
                <div className="transaction-type">
                    <button className="btn">
                        <i className="ti ti-arrow-down-left"></i>Income
                    </button>
                    <button className="btn">
                        <i className="ti ti-arrow-up-right"></i>Expense
                    </button>
                    <button className="btn">
                        <i className="ti ti-arrows-exchange"></i>Transfer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;