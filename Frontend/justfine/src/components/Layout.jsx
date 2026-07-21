import { useState } from "react";
import '../static/Layout.css';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { Outlet, useLocation } from "react-router-dom";

const pageTitles = {"/dashboard": "Dashboard","/transaction": "Transactions",
                      "/sources": "Sources","/debts": "Debts & Loans",
                      "/coupons": "Coupons","/budgets": "Budgets",
                      "/categories": "Categories","/notifications": "Notifications",
                     };

const initialTransactions = [
  { id: 1, amount: 180, txn_type: "expense", category_id: "Food & Dining", source_id: "HDFC", description: "Lunch", date: "2026-07-05" },
  { id: 2, amount: 500, txn_type: "expense", category_id: "Transport", source_id: "Petty Cash", description: "Uber ride", date: "2026-07-04" },
  { id: 3, amount: 50000, txn_type: "income", category_id: "Salary", source_id: "HDFC", description: "Monthly salary", date: "2026-07-01" },
  { id: 4, amount: 2200, txn_type: "expense", category_id: "Bills & Utilities", source_id: "SBI", description: "Electricity bill", date: "2026-06-28" },
  { id: 5, amount: 1200, txn_type: "expense", category_id: "Shopping", source_id: "SBI", description: "Groceries", date: "2026-06-25" }
];

function Layout(){
  const [headerLabel,setHeaderLabel]=useState("Dashboard");
  const [transactions, setTransactions] = useState(initialTransactions);
  const location = useLocation();
  const currentLabel = pageTitles[location.pathname] || "Dashboard";

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="layout">
      <SideBar />
      <div className="layout-right">
        <TopBar headerLabel={currentLabel} onAddTransaction={handleAddTransaction} />
        <main className="layout-content">
          <Outlet context={{ transactions, onAddTransaction: handleAddTransaction }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;