import React, { useState } from "react";
import '../static/ModalTransac.css';

const INITIAL_FORM_STATE = { 
    name: "", 
    description: "", 
    amount: "", 
    paid_amount: "", 
    type: "owe" 
};

function DebtsModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData(INITIAL_FORM_STATE);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="close-btn" onClick={onClose}>✕</button>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        className="form-input" 
                        name="name" 
                        placeholder="Name (e.g., Rahul, HDFC)" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />

                    <select 
                        className="form-input" 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange}
                    >
                        <option value="owe">I OWE</option>
                        <option value="lent">LENT TO</option>
                    </select>

                    <input 
                        className="form-input" 
                        name="amount" 
                        type="number" 
                        placeholder="Total Amount (₹)" 
                        value={formData.amount} 
                        onChange={handleChange} 
                        required 
                    />

                    <input 
                        className="form-input" 
                        name="paid_amount" 
                        type="number" 
                        placeholder="Already Paid / Returned (₹)" 
                        value={formData.paid_amount} 
                        onChange={handleChange} 
                    />

                    <input 
                        className="form-input" 
                        name="description" 
                        type="text" 
                        placeholder="Description (e.g., Personal Loan)" 
                        value={formData.description} 
                        onChange={handleChange} 
                    />

                    <button type="submit">Add Record</button>
                </form>
            </div>
        </div>
    );
}

export default DebtsModal;