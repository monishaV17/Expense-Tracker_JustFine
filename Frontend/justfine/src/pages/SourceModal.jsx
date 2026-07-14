import React, {useState} from "react";
import '../static/ModalTransac.css';

function SourceModal({isOpen,onClose,onAdd}){

    const [formData,setFormData]=useState({
        name:"", description:"", amount:"", is_savings:false
    });

    const handleClose=(e)=>{
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }
        setFormData({ name:"", description: "", amount:"", is_savings:false});
        if(typeof onClose === "function"){
            onClose();
        }
    };

    if(!isOpen){
        return null;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        onAdd({ ...formData});
        setFormData({ name:"", description: "", amount:"", is_savings:false});
        if(typeof onClose === "function"){
            onClose();
        }
    }

    return (
        
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e)=> e.stopPropagation()}>
                    <button type="button" className="close-btn" onClick={handleClose}>✕</button>
                <form onSubmit={handleSubmit}>
                    <input className="form-imput" name="name" placeholder="Source name" value={formData.name} 
                    onChange={e=> setFormData({...formData,name: e.target.value})} required />

                    <input className="form-input" type="text" placeholder="Description" value={formData.description} name="description"
                    onChange={e=> setFormData({...formData,description: e.target.value})} required />

                    <input className="form-input" type="number" placeholder="Amount (₹)" value={formData.amount} 
                    onChange={e=> setFormData({...formData,amount: e.target.value})} />

                    <button type="submit">Add Source</button>
                </form>
                </div>
            </div>
    )
}

export default SourceModal;