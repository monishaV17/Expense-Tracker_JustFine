import {useState} from "react";
import '../static/budget.css';
import BudgetModal from "./BudgetModal";

const budgetsData = [
  {
    id: 1,
    source_id: "HDFC BANK",
    category_id: "Food & Dining",
    amount: 4000,
    description: "Monthly groceries budget",
    budget_date: "2026-07-31"
  },
  {
    id: 2,
    source_id: "SBI BANK",
    category_id: "Shopping",
    amount: 1800,
    description: "Birthday gift for mom",
    budget_date: "2026-07-21"
  }
];

function Budgets(){
    const [budgets,setBudgets]=useState(budgetsData);
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [editingBudget, setEditingBudget]=useState(null);

    const openAddModal = () => {
        setEditingBudget(null);
        setIsModalOpen(true);
    };

    const openEditModal = (budget) => {
        setEditingBudget(budget);
        setIsModalOpen(true);
    };

    const handleSaveBudget = (budget) => {
        if (budget.id && budgets.some((item) => item.id === budget.id)) {
            setBudgets((prev) => prev.map((item) => item.id === budget.id ? budget : item));
        } else {
            setBudgets((prev) => [{ ...budget, id: Date.now() }, ...prev]);
        }
    };

    const handleDelete = (id) => {
        setBudgets((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="budget-page">
            <div className="budget-top">
                <h2>Plan money ahead of time</h2>
                <button className="budget-add-btn" onClick={openAddModal}>+ Add Budget</button>
            </div>
            <ul>
                {budgets.map((bd) => (
                    <li key={bd.id} className="budget-item">
                        <span className="bd-date">{bd.budget_date}</span>
                        <span className="bd-desc">{bd.description}</span><br />
                        <span className="bd-source">{bd.source_id}</span>
                        <span className="bd-category">{bd.category_id}</span>
                        <span className="bd-amount">₹{bd.amount}</span>
                        <div className="bd-actions-group"><br/>
                            <button className="bd-action-btn" onClick={() => openEditModal(bd)}>Edit</button>
                            <button className="bd-action-btn delete" onClick={() => handleDelete(bd.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <BudgetModal
                isOpen={isModalOpen}
                editingBudget={editingBudget}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleSaveBudget}
            />
        </div>
    );
}

export default Budgets;