import { Activity, LayoutDashboard, Radio, History, FlaskConical } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "monitor", label: "Live Monitor", icon: Radio },
  { id: "history", label: "Session History", icon: History },
  { id: "validation", label: "Research & Validation", icon: FlaskConical },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon"><Activity size={24} /></div>
        <div>
          <h2>KneeRehab</h2>
          <p>SMART MONITORING</p>
        </div>
      </div>

      <div className="nav-label">WORKSPACE</div>

      <nav className="nav-menu">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? "active" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <span className="status-dot" />
        <div>
          <strong>Demo Mode</strong>
          <p>Simulated sensor data</p>
        </div>
      </div>
    </aside>
  );
}