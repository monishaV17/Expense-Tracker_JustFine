import {useState} from "react";
import '../static/sources.css';
import FilterBox from '../components/FilterBox';
import SourceModal from './SourceModal.jsx';

function Sources(){

    const [isModalOpen, setIsModalOpen]=useState(false);
    const [filter, setFilter]=useState("All");
    const [source,setSource]=useState([{id: 1,name: "HDFC Bank",
    description: "Primary salary account",amount: 2000000,      is_savings: true,is_active: true,transaction_count: 14,
    partitions: [{ id: 1, name: "My Salary",   amount: 1200000 },
      { id: 2, name: "House Rent",  amount: 800000  }]
  },{ id: 2,name: "SBI Bank",description: "Secondary account",amount: 1775000,is_savings: false, is_active: true,transaction_count: 8,
    partitions: [{ id: 3, name: "Emergency Fund", amount: 1000000 },
      { id: 4, name: "Travel Fund",    amount: 775000  }
    ]},{id: 3, name: "Petty Cash", description: "Daily expenses", 
    amount: 250000, is_savings: false, is_active: true, transaction_count: 5,
    partitions: []
    }]);

    const getFiltered= ()=>{
        switch(filter){
            case "Active": return source.filter(s => s.is_active === true);
            case "Inactive": return source.filter(s => s.is_active === false)
            case "Savings": return source.filter(s => s.is_savings === true);
            default: return source;
        }
    };

    return (
        <div className="source-page">
            <div className="sources-top">
                <h2>Money Sources</h2>
                <button className="sources-add-btn" onClick={()=> setIsModalOpen(true)}>+ Add Source</button>
            </div>

        <FilterBox filters={["All", "Active", "Savings", "Inactive"]}
            active={filter} onChange={setFilter}/>
            
        {getFiltered().length === 0 ? (
            <p className="empty-state">No sources found</p>
        ) : (getFiltered().map(s =>(
                <div key={s.id} className="src-card">
                    <div className="src-name">{s.name}</div>
                    <div className="src-desc">{s.description}</div>
                    <div className="src-amt">₹{s.amount/100}</div>
                    <div className="src-txn">{s.transaction_count} transactions</div>

                    <div className="src-badges">{s.is_savings && (<span className="badge badge-savings">Savings</span>)}
                        <span className={`badge ${s.is_active ? "badge-active" : "badge-inactive"}`}>
                            {s.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>

                    {/* partitions */}

                     {s.partitions.length > 0 && (
                        <div className="parts">
                            <div className="parts-title">Partitions</div>
                            {s.partitions.map(p =>(
                            <div key={p.id} className="part-row">
                            <span>{p.name}</span>
                            <span>₹{p.amount}</span>
                            </div>
                        ))}
                        </div>
                         )} 

                    {/* actions button */}

                    <div className="src-actions">
                        <button className="action-btn">Edit</button>
                        <button className="action-btn">Partitions</button>
                        <button className="action-btn delete">Delete</button>
                    </div>
                </div>
                )))}
        </div>
    );
}

export default Sources;