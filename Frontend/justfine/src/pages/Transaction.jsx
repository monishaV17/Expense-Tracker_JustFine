import React, {useState} from "react";
import TransactionModal from "./TransactionModal";
import '../static/Transaction.css';

function Transaction(){

    const [transactions, setTransactions]=useState([]);

    return (
        <div className="transaction-page">
            <h2>Transactions</h2>

            <ul>
                {transactions.map(tx=>(
                    <li key={tx.id}>{tx.date} - {tx.txn_type} - ₹{tx.amount} ({tx.category_id})</li>
                ))}
            </ul>
        </div>

    );
}

export default Transaction;