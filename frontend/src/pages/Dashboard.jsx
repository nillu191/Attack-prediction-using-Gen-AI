import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [riskScore, setRiskScore] = useState(24);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: 'critical', message: 'Anomalous outbound traffic to 192.168.1.50', time: '2m ago' },
    { id: 2, type: 'warning', message: 'Failed login spikes on SSH portal', time: '15m ago' },
    { id: 3, type: 'warning', message: 'Unusual endpoint enumeration detected', time: '1h ago' }
  ]);

  // Simulate dynamic risk score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => Math.max(0, Math.min(100, prev + Math.floor(Math.random() * 5) - 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container flex-col gap-6 animate-slide-up">
      
      <div className="grid grid-cols-3 gap-6">
        {/* Risk Score Widget */}
        <div className="glass-card glass-card-glow p-6 flex-col items-center justify-center">
          <h3>Live Network Risk Score</h3>
          <div className="risk-dial" style={{ 
            fontSize: '4rem', 
            fontWeight: '700', 
            color: riskScore > 75 ? 'var(--danger)' : riskScore > 40 ? 'var(--warning)' : 'var(--accent)',
            textShadow: `0 0 20px ${riskScore > 75 ? 'var(--danger)' : riskScore > 40 ? 'var(--warning)' : 'var(--accent)'}`
          }}>
            {riskScore}
          </div>
          <p>Score based on real-time log analysis</p>
        </div>

        {/* Global Threat Map Placeholder */}
        <div className="glass-card glass-card-glow p-6 col-span-2">
          <h3>Global Threat Vector Map</h3>
          <div className="map-placeholder" style={{
            height: '240px',
            background: 'rgba(0,0,20,0.5)',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0, 240, 255, 0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0, 240, 255, 0.1) 20px)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            marginTop: '1rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.1)'
          }}>
            <div className="map-scan-line"></div>
            <p style={{ zIndex: 2, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '2px', color: 'rgba(0, 240, 255, 0.7)' }}>INTERACTIVE THREAT ENGINE ACTIVE...</p>
            {/* Simulated attack origin blips */}
            <div className="status-dot status-critical animate-pulse" style={{ position: 'absolute', top: '30%', left: '40%', boxShadow: '0 0 20px var(--danger)' }}></div>
            <div className="status-dot status-warning" style={{ position: 'absolute', top: '60%', right: '25%', opacity: 0.8 }}></div>
            <div className="status-dot status-critical animate-pulse" style={{ position: 'absolute', bottom: '20%', left: '70%', boxShadow: '0 0 20px var(--danger)' }}></div>
            <div className="status-dot status-safe" style={{ position: 'absolute', top: '20%', right: '15%', opacity: 0.5 }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Active Alerts */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3>Active Anomalies</h3>
            <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
              {activeAlerts.length} Alerts
            </span>
          </div>
          <div className="alerts-list flex-col gap-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className="alert-item flex items-center gap-4" style={{ 
                padding: '1rem', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: 'var(--radius-sm)',
                borderLeft: `3px solid ${alert.type === 'critical' ? 'var(--danger)' : 'var(--warning)'}`
              }}>
                <div className={`status-dot ${alert.type === 'critical' ? 'status-critical' : 'status-warning'}`}></div>
                <div className="flex-col flex-1">
                  <span style={{ fontWeight: 500 }}>{alert.message}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                </div>
                <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>Analyze</button>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="glass-card p-6">
          <h3>System Monitors</h3>
          <div className="mt-4 flex-col gap-4">
            <div className="monitor-item">
              <div className="flex justify-between mb-2">
                <span>Ingestion Rate</span>
                <span>4,251 logs/sec</span>
              </div>
              <div className="progress-bar" style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="flex justify-between mb-2">
                <span>AI Processing Load</span>
                <span>82%</span>
              </div>
              <div className="progress-bar" style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                <div style={{ width: '82%', height: '100%', background: 'var(--warning)', borderRadius: '3px' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="flex justify-between mb-2">
                <span>Database Capacity</span>
                <span>45%</span>
              </div>
              <div className="progress-bar" style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                <div style={{ width: '45%', height: '100%', background: 'var(--accent)', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
