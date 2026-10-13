import React, { useState } from 'react';
import './App.css';
import './index.css';

import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Remediation from './pages/Remediation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="brand">
          <div className="brand-icon status-safe"></div>
          <h2>SecureNexus</h2>
        </div>
        
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="icon">📊</span>
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'prediction' ? 'active' : ''}`}
            onClick={() => setActiveTab('prediction')}
          >
            <span className="icon">🎯</span>
            Threat Prediction
          </button>
          <button 
            className={`nav-item ${activeTab === 'remediation' ? 'active' : ''}`}
            onClick={() => setActiveTab('remediation')}
          >
            <span className="icon">🛡️</span>
            Remediation Hub
          </button>
          <button className="nav-item">
            <span className="icon">⚙️</span>
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header glass-card">
          <div className="search-bar">
            <span className="icon">🔍</span>
            <input type="text" placeholder="Search logs, IPs, or alerts..." />
          </div>
          <div className="user-profile">
            <div className="status-indicator">
              <span className="status-dot status-safe animate-pulse"></span>
              System Optimal
            </div>
            <div className="avatar">Admin</div>
          </div>
        </header>

        <section className="content-area">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'prediction' && <Prediction />}
          {activeTab === 'remediation' && <Remediation />}
        </section>
      </main>
    </div>
  );
}

export default App;
