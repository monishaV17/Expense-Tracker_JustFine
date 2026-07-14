import { useState } from "react";
import '../static/sources.css';
import FilterBox from '../components/FilterBox';
import SourceModal from './SourceModal.jsx';
import PartitionsModal from "./PartitionsModal.jsx";


const INITIAL_SOURCES = [
    {
        id: 1, name: "HDFC Bank", description: "Primary salary account", amount: 2000000, is_savings: true, is_active: true, transaction_count: 14,
        partitions: [{ id: 1, name: "My Salary", amount: 1200000 }, { id: 2, name: "House Rent", amount: 800000 }]
    },
    {
        id: 2, name: "SBI Bank", description: "Secondary account", amount: 1775000, is_savings: false, is_active: true, transaction_count: 8,
        partitions: [{ id: 3, name: "Emergency Fund", amount: 1000000 }, { id: 4, name: "Travel Fund", amount: 775000 }]
    },
    { id: 3, name: "Petty Cash", description: "Daily expenses", amount: 250000, is_savings: false, is_active: true, transaction_count: 5, partitions: [] }
];

function Sources() {
    const [isSourceModalOpen, setIsSourceModalOpen]=useState(false);
    const [filter, setFilter]=useState("All");
    const [sources, setSources]=useState(INITIAL_SOURCES);
    const [isPartitionModalOpen, setIsPartitionModalOpen]=useState(false);
    const [activeSourceIndex, setActiveSourceIndex]=useState(null);


    const filteredSources = sources.filter(s => {
        if(filter === "Active") return s.is_active;
        if(filter === "Inactive") return !s.is_active;
        if(filter === "Savings") return s.is_savings;
        return true;
    });

    const handleAddSource=(newSource) => {
        const formattedSource = {
            ...newSource,
            id: Date.now(),
            amount: Number(newSource.amount) * 100,
            is_active: true,
            transaction_count: 0,
            partitions: []
        };
        setSources([...sources, formattedSource]);
    };

    const handleAddPartition=(newPartition) => {
        setSources(prevSources => 
            prevSources.map((source, index) => {
                if (index === activeSourceIndex) {
                    return{
                        ...source,
                        partitions: [
                            ...source.partitions,
                            {name: newPartition.name, amount: newPartition.amount} 
                        ]
                    };
                }
                return source;
            })
        );
    };

    return (
        <div className="source-page">
            <div className="sources-top">
                <h2>Money Sources</h2>
                <button className="sources-add-btn" onClick={() => setIsSourceModalOpen(true)}>+ Add Source</button>
            </div>

            <FilterBox filters={["All", "Active", "Savings", "Inactive"]} active={filter} onChange={setFilter} />
            
            {filteredSources.length === 0 ? (
                <p className="empty-state">No sources found</p>
            ) : (
                filteredSources.map(s => (
                    <div key={s.id} className="src-card">
                        <div className="src-name">{s.name}</div>
                        <div className="src-desc">{s.description}</div>
                        <div className="src-amt">₹{s.amount / 100}</div>
                        <div className="src-txn">{s.transaction_count} transactions</div>

                        <div className="src-badges">
                            {s.is_savings && <span className="badge badge-savings">Savings</span>}
                            <span className={`badge ${s.is_active ? "badge-active" : "badge-inactive"}`}>
                                {s.is_active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        {s.partitions.length > 0 && (
                            <div className="parts">
                                <div className="parts-title">Partitions</div>
                                {s.partitions.map(p => (
                                    <div key={p.id} className="part-row">
                                        <span>{p.name}</span>
                                        <span>₹{p.amount / 100}</span>
                                    </div>
                                ))}
                            </div>
                        )} 

                        <div className="src-actions">
                            <button className="action-btn">Edit</button>
                            <button className="action-btn" onClick={()=> setIsPartitionModalOpen(true)}>Partitions</button>
                            <button className="action-btn delete">Delete</button>
                        </div>
                    </div>
                ))
            )}

            <SourceModal isOpen={isSourceModalOpen} onClose={() => setIsSourceModalOpen(false)} onAdd={handleAddSource} />
            <PartitionsModal isOpen={isPartitionModalOpen} onClose={() => {
                setIsPartitionModalOpen(false); 
                setActiveSourceIndex(null);
                }} 
                onAdd={handleAddPartition} 
            />
        </div>
    );
}

export default Sources;