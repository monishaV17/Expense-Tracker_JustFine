import React, { useState } from "react";
import DebtsModal from "./DebtsModal"; 
import "../static/DebtsLoan.css";

const dummyDebts = [
  {
    id: 1,
    name: "Rahul",
    type: "owe",
    amount: 500000,
    paid_amount: 150000,
    description: "Personal loan • Due Jun 15, 2026",
    progress: 30
  },
  {
    id: 2,
    name: "HDFC Bank",
    type: "owe",
    amount: 5000000,
    paid_amount: 250000,
    description: "Home loan • EMI • Day 5",
    extraInfo: "₹2,500/month",
    emiProgress: "3 of 240 EMIs",
    progress: 1.25
  },
  {
    id: 3,
    name: "Priya",
    type: "lent",
    amount: 500000,
    paid_amount: 0,
    description: "Borrowed for shopping",
    progress: 0
  }
];

function DebtsLoan({ debts = [], onAdd = () => {}, onEdit = () => {}, onDelete = () => {} }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displayDebts = debts.length > 0 ? debts : dummyDebts;

    return (
        <div className="debts-page">
            <div className="debts-top">
                <div>
                    <h2 className="debts-subtitle">Track who owes what</h2>
                </div>
                <button className="debts-add-btn" onClick={() => setIsModalOpen(true)}>
                    + Add Record
                </button>
            </div>

            <div className="debts-list">
                {displayDebts.map((d) => {
                    const isOwe = d.type === "owe";
                    const remaining = d.amount - d.paid_amount;
                    
                    const percentPaid = d.progress !== undefined 
                        ? d.progress 
                        : (d.paid_amount / d.amount) * 100;

                    return (
                        <div key={d.id} className="debt-card">
                            <div className="debt-header">
                                <div className="debt-avatar">
                                    {isOwe ? "🏢" : "👤"}
                                </div>
                                <div className="debt-title-area">
                                    <div className="debt-name-row">
                                        <span className="debt-name">{d.name}</span>
                                        <span className={`badge ${isOwe ? "badge-owe" : "badge-lent"}`}>
                                            {isOwe ? "I OWE" : "LENT TO"}
                                        </span>
                                    </div>
                                    <div className="debt-description">{d.description}</div>
                                </div>
                            </div>

                            <div className="debt-metrics-grid">
                                <div className="metric-box">
                                    <span className="metric-label">{isOwe ? "TOTAL" : "LENT"}</span>
                                    <span className="metric-val text-dark">₹{(d.amount / 100).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="metric-box">
                                    <span className="metric-label">{isOwe ? "PAID" : "RETURNED"}</span>
                                    <span className="metric-val text-green">₹{(d.paid_amount / 100).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="metric-box">
                                    <span className="metric-label">{isOwe ? "REMAINING" : "PENDING"}</span>
                                    <span className="metric-val text-red">₹{(remaining / 100).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            {(d.extraInfo || d.emiProgress) && (
                                <div className="debt-extra-info">
                                    <span>{d.extraInfo}</span>
                                    <span><strong>{d.emiProgress}</strong></span>
                                </div>
                            )}

                            <div className="debt-progress-bar-container">
                                <div 
                                    className="debt-progress-fill" 
                                    style={{ width: `${Math.min(percentPaid, 100)}%` }}
                                ></div>
                            </div>

                            <div className="debt-footer">
                                <div className="debt-footer-left">
                                    {d.extraInfo && <span>{d.extraInfo}</span>}
                                </div>
                                <div className="debt-actions-group">
                                    <button className="action-btn" onClick={() => onEdit(d)}>Edit</button>
                                    <button className="action-btn delete" onClick={() => onDelete(d.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <DebtsModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onAdd={(formData) => {
                    onAdd({
                        ...formData,
                        amount: Number(formData.amount) * 100,
                        paid_amount: Number(formData.paid_amount || 0) * 100,
                    });
                }} 
            />
        </div>
    );
}

export default DebtsLoan;