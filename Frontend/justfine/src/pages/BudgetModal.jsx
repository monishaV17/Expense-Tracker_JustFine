import React, {useState, useEffect} from "react";
import '../static/ModalTransac.css';

const categories = [
    { id: "food", name: "Food & Dining" },
    { id: "transport", name: "Transport" },
    { id: "shopping", name: "Shopping" },
    { id: "bills", name: "Bills & Utilities" },
    { id: "entertainment", name: "Entertainment" },
    { id: "healthcare", name: "Healthcare" },
    { id: "salary", name: "Salary" },
    { id: "others", name: "Others" }
];

const sources = [
    { id: "cash", name: "Cash" },
    { id: "bank", name: "Bank" },
    { id: "card", name: "Credit Card" },
    { id: "savings", name: "Savings" }
];

function BudgetModal({isOpen, onClose, onAdd, editingBudget}){

    const [formData,setFormData]=useState({
        amount: "",
        category_id: "",
        source_id: "",
        description: "",
        budget_date: ""
    });

    useEffect(() => {
        if (editingBudget) {
            setFormData({
                amount: editingBudget.amount,
                category_id: editingBudget.category_id || "",
                source_id: editingBudget.source_id || "",
                description: editingBudget.description || "",
                budget_date: editingBudget.budget_date || ""
            });
        } else {
            setFormData({
                amount: "",
                category_id: "",
                source_id: "",
                description: "",
                budget_date: ""
            });
        }
    }, [editingBudget]);

    const handleClose=(e)=>{
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }
        setFormData({ amount:"", category_id:"", source_id:"", description:"", budget_date:"" });
        if(typeof onClose === "function"){
            onClose();
        }
    };

    if(!isOpen){
        return null;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (typeof onAdd === "function") {
            onAdd({ ...formData, id: editingBudget?.id || Date.now() });
        }
        setFormData({amount: "",category_id: "",source_id: "",description: "",budget_date: ""});
        if(typeof onClose === "function"){
            onClose();
        }
    }

    return (
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
                    <button type="button" className="close-btn" onClick={handleClose}>✕</button>
                <form onSubmit={handleSubmit}>
                    <input type="number" placeholder="₹ Amount" value={formData.amount} 
                    onChange={e=> setFormData({...formData,amount: e.target.value})} required />

                    <select value={formData.category_id}
                    onChange={e=> setFormData({...formData,category_id: e.target.value})} required >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                    </select>

                    <select value={formData.source_id}
                    onChange={e=> setFormData({...formData,source_id: e.target.value})} required >
                    <option value="">Select Source</option>
                    {sources.map((source) => (
                        <option key={source.id} value={source.id}>{source.name}</option>
                    ))}
                    </select>

                    <input type="text" placeholder="Description" value={formData.description} 
                    onChange={e=> setFormData({...formData,description: e.target.value})} required />

                    <input type="date" value={formData.budget_date} 
                    onChange={e=> setFormData({...formData,budget_date: e.target.value})} required />

                    <button type="submit">{editingBudget ? "Save Budget" : "Add Budget"}</button>
                </form>
                </div>
            </div>
    )
}

export default BudgetModal;