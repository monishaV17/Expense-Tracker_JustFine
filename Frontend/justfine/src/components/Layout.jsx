import { useState } from "react";
import '../static/Layout.css';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { Outlet } from "react-router-dom";

function Layout(){
  const [headerLabel,setHeaderLabel]=useState("Dashboard");

  return (
    <div className="layout">
      <SideBar />
      <div className="layout-right">
        <TopBar headerLabel={headerLabel} />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;