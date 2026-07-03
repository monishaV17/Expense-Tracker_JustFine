import React, {useState} from "react";
import '../static/ModalTransac.css';

function TransactionModal({isOpen, onClose, onAdd}){

    const [formData,setFormData]=useState(
        {amount:"",txn_type:"expense",category_id:"",source_id:"",description:"",date:""});

        if(!isOpen){
            return null;
        }

        const handleClose =()=> {
            setFormData({ amount:"", txn_type: "expense", category_id:"", source_id:"", description:"", date:"" });
            onClose();
        };

        const handleSubmit=(e)=>{
            e.preventDefault();
            onAdd({...formData, id: Date.now()});
            setFormData({amount: "",txn_type:"expense",category_id: "",source_id: "",description: "",date: ""});
            onClose();
        }

    return (
        
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                <form onSubmit={handleSubmit}>
                    <input type="number" placeholder="₹ Amount" value={formData.amount} 
                    onChange={e=> setFormData({...formData,amount: e.target.value})} required />

                    <select value={formData.txn_type}
                    onChange={e=> setFormData({...formData,txn_type: e.target.value})} required >
                    <option className="income">Income</option>
                    <option className="expense">Expense</option>
                    <option className="transfer">Transfer</option>
                    </select>

                    <input placeholder="Category ID" value={formData.category_id} 
                    onChange={e=> setFormData({...formData,category_id: e.target.value})} required />

                    <input placeholder="Source ID" value={formData.source_id} 
                    onChange={e=> setFormData({...formData,source_id: e.target.value})} required />

                    <input type="date" value={formData.date} 
                    onChange={e=> setFormData({...formData,date: e.target.value})} required />

                    <input type="text" placeholder="Description" value={formData.description} 
                    onChange={e=> setFormData({...formData,description: e.target.value})} required />

                    <button type="submit">Add Transaction</button>
                </form>
                </div>
            </div>
    )
}

export default TransactionModal;