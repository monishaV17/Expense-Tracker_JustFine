import React, {useState} from "react";
import TransactionModal from "./TransactionModal";
import '../static/Transaction.css';

function Transaction(){

    const [transactions, setTransactions] = useState([
    { id: 1, amount: 180, txn_type: "expense", category_id: "Food & Dining", source_id: "HDFC", description: "Lunch", date: "2026-07-05" },
    { id: 2, amount: 500, txn_type: "expense", category_id: "Transport", source_id: "Petty Cash", description: "Uber ride", date: "2026-07-04" },
    { id: 3, amount: 50000, txn_type: "income", category_id: "Salary", source_id: "HDFC", description: "Monthly salary", date: "2026-07-01" },
    { id: 4, amount: 2200, txn_type: "expense", category_id: "Bills & Utilities", source_id: "SBI", description: "Electricity bill", date: "2026-06-28" },
    { id: 5, amount: 1200, txn_type: "expense", category_id: "Shopping", source_id: "SBI", description: "Groceries", date: "2026-06-25" }])

    const [active,setActive]=useState("All");

    const filters=["All", "Income", "Expense", "Transfer", "Debts"];

    const filteredTransactions=active === "All" ? transactions : 
                    transactions.filter((tx)=> tx.txn_type.toLowerCase() === active.toLowerCase());

    return (
        <div className="transaction-page">
            <h2>All Transactions</h2>
            <div className="filter-row">
                {filters.map((filter)=>(
                <button key={filter} className={`filter-chip ${active === filter ? "active" : ""}`} 
                onClick={()=> setActive(filter)}>{filter}</button>
                ))
                }
            </div>
                {filteredTransactions.length === 0 ? (
                    <p className="empty-state">No transactions yet</p>
                ) : (
                    <ul>
                        {filteredTransactions.map(tx => (
                            <li key={tx.id} className={`txn-item ${tx.txn_type}`}>
                                <span className="txn-date">{tx.date}</span>
                                <span className="txn-desc">{tx.description}</span>
                                <span className={`txn-type-badge ${tx.txn_type}`}>{tx.txn_type}</span>
                                <span className="txn-category">{tx.category_id} </span>
                                <span className={`txn-amount ${tx.txn_type}`}>
                                    {tx.txn_type === "income" ? "+" : "−"}₹{tx.amount}
                                </span>
                            </li>
                        ))}
                    </ul>
                    )}
        </div>
    );
}

export default Transaction;