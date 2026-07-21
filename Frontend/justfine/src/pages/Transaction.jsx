import {useState} from "react";
import { useOutletContext } from "react-router-dom";
import '../static/Transaction.css';
import FilterBox from '../components/FilterBox';

function Transaction(){
    const { transactions = [] } = useOutletContext() || {};
    const [active,setActive]=useState("All");

    const filters=["All", "Income", "Expense", "Transfer", "Debts"];

    const filteredTransactions=active === "All" ? transactions : 
                    transactions.filter((tx)=> tx.txn_type.toLowerCase() === active.toLowerCase());

    return (
        <div className="transaction-page">
            <h2>All Transactions</h2>
                <FilterBox filters={["All","Income","Expense","Transfer","Debts"]}
                            active={active} onChange={setActive}/>
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