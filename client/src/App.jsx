import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LiveMonitor from "./pages/LiveMonitor";
import SessionHistory from "./pages/SessionHistory";
import Validation from "./pages/Validation";

import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    monitor: <LiveMonitor />,
    history: <SessionHistory />,
    validation: <Validation />,
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        {pages[activePage] || pages.dashboard}
      </main>
    </div>
  );
}