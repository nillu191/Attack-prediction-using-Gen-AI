import React, { useState, useRef } from 'react';

const Prediction = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setAnalyzing(false);
      setResults([
        { vector: "Brute Force -> SSH", probability: 89, timeframe: "Next 2 hours" },
        { vector: "SQL Injection -> DB", probability: 45, timeframe: "Next 24 hours" },
        { vector: "Credential Stuffing", probability: 72, timeframe: "Active" }
      ]);
    }, 3000);
  };

  return (
    <div className="prediction-container flex-col gap-6 animate-slide-up">
      <div className="grid grid-cols-2 gap-6">
        
        {/* Input Data Source */}
        <div className="glass-card p-6">
          <h3>Data Source Upload</h3>
          <p className="mb-4">Upload PCAP, Syslog, or connect live API endpoints for Generative AI prediction.</p>
          
          <div 
            className="upload-box" 
            style={{
              border: '2px dashed var(--border-light)',
              padding: '3rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-md)',
              background: file ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileSelect} 
              accept=".log,.csv,.pcap"
            />
            <span style={{ fontSize: '2rem' }}>{file ? '📄' : '📁'}</span>
            <p className="mt-2">{file ? `Selected: ${file.name}` : 'Drag & Drop Network Logs Here or Click to Browse'}</p>
            {!file && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supported: .log, .csv, .pcap</p>}
          </div>

          <button 
            className="btn btn-primary mt-4 w-full justify-center" 
            style={{ width: '100%', padding: '0.75rem', opacity: (!file || analyzing) ? 0.5 : 1, cursor: (!file || analyzing) ? 'not-allowed' : 'pointer' }}
            onClick={handleAnalyze}
            disabled={analyzing || !file}
          >
            {analyzing ? 'Generative AI Analyzing...' : 'Run Prediction Engine'}
          </button>
        </div>

        {/* Prediction Results */}
        <div className="glass-card p-6">
          <h3>Predicted Attack Vectors</h3>
          
          {!analyzing && !results && (
            <div className="flex items-center justify-center p-6 h-full text-muted">
              <p>Awaiting data upload to generate predictions.</p>
            </div>
          )}

          {analyzing && (
            <div className="flex-col items-center justify-center p-6 h-full text-center">
              <div className="status-dot status-warning animate-pulse mb-4" style={{ width: '24px', height: '24px' }}></div>
              <p>Processing multidimensional log data through neural network...</p>
            </div>
          )}

          {results && (
            <div className="flex-col gap-4 mt-4">
              {results.map((res, idx) => (
                <div key={idx} className="glass-panel p-4 flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{res.vector}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Timeframe: {res.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="badge" style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: 'var(--radius-sm)',
                      background: res.probability > 75 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: res.probability > 75 ? 'var(--danger)' : 'var(--warning)'
                    }}>
                      {res.probability}% Prob
                    </span>
                    <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>View Path</button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Prediction;
