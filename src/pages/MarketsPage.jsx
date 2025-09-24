import React, { useState, useEffect } from 'react';
import './MarketsPage.css';

const MarketsPage = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration - replace with actual API calls
  const mockMarketData = {
    indices: [
      { name: 'NIFTY 50', value: '22,419.95', change: '+156.30', changePercent: '+0.70%', trend: 'up' },
      { name: 'SENSEX', value: '73,852.94', change: '+486.50', changePercent: '+0.66%', trend: 'up' },
      { name: 'BANK NIFTY', value: '48,123.45', change: '+234.20', changePercent: '+0.49%', trend: 'up' },
      { name: 'NIFTY IT', value: '36,789.12', change: '-123.45', changePercent: '-0.33%', trend: 'down' }
    ],
    topGainers: [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: '2,456.78', change: '+45.67', changePercent: '+1.89%' },
      { symbol: 'TCS', name: 'Tata Consultancy', price: '3,789.45', change: '+67.89', changePercent: '+1.83%' },
      { symbol: 'HDFC', name: 'HDFC Bank', price: '1,567.34', change: '+23.45', changePercent: '+1.52%' },
      { symbol: 'INFY', name: 'Infosys', price: '1,234.56', change: '+18.90', changePercent: '+1.55%' }
    ],
    topLosers: [
      { symbol: 'WIPRO', name: 'Wipro', price: '456.78', change: '-12.34', changePercent: '-2.64%' },
      { symbol: 'TECHM', name: 'Tech Mahindra', price: '1,123.45', change: '-28.90', changePercent: '-2.51%' },
      { symbol: 'HCLTECH', name: 'HCL Technologies', price: '987.65', change: '-15.67', changePercent: '-1.56%' },
      { symbol: 'LT', name: 'Larsen & Toubro', price: '2,345.67', change: '-34.56', changePercent: '-1.45%' }
    ],
    sectors: [
      { name: 'Banking', performance: '+2.34%', trend: 'up' },
      { name: 'IT', performance: '-1.23%', trend: 'down' },
      { name: 'Pharma', performance: '+0.89%', trend: 'up' },
      { name: 'Auto', performance: '+1.56%', trend: 'up' },
      { name: 'FMCG', performance: '+0.67%', trend: 'up' },
      { name: 'Realty', performance: '-0.45%', trend: 'down' }
    ],
    volumeLeaders: [
      { symbol: 'RELIANCE', name: 'Reliance Industries', volume: '2.34M', price: '2,456.78', change: '+1.89%' },
      { symbol: 'TCS', name: 'Tata Consultancy', volume: '1.89M', price: '3,789.45', change: '+1.83%' },
      { symbol: 'INFY', name: 'Infosys', volume: '1.67M', price: '1,234.56', change: '+1.55%' },
      { symbol: 'HDFC', name: 'HDFC Bank', volume: '1.45M', price: '1,567.34', change: '+1.52%' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchMarketData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/markets');
        // const data = await response.json();
        
        setTimeout(() => {
          setMarketData(mockMarketData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const filteredData = (data) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="markets-loading">
        <div className="loading-spinner"></div>
        <p>Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="markets-page">
      {/* Header Section */}
      <div className="markets-header">
        <h1>Markets</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search stocks, indices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Market Indices Overview */}
      <div className="market-indices">
        <h2>Market Indices</h2>
        <div className="indices-grid">
          {marketData.indices.map((index, idx) => (
            <div key={idx} className={`index-card ${index.trend}`}>
              <div className="index-name">{index.name}</div>
              <div className="index-value">{index.value}</div>
              <div className="index-change">
                <span className="change-value">{index.change}</span>
                <span className="change-percent">{index.changePercent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="markets-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Market Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'gainers' ? 'active' : ''}`}
          onClick={() => setActiveTab('gainers')}
        >
          Top Gainers
        </button>
        <button 
          className={`tab-button ${activeTab === 'losers' ? 'active' : ''}`}
          onClick={() => setActiveTab('losers')}
        >
          Top Losers
        </button>
        <button 
          className={`tab-button ${activeTab === 'sectors' ? 'active' : ''}`}
          onClick={() => setActiveTab('sectors')}
        >
          Sector Performance
        </button>
        <button 
          className={`tab-button ${activeTab === 'volume' ? 'active' : ''}`}
          onClick={() => setActiveTab('volume')}
        >
          Volume Leaders
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="market-overview">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Market Breadth</h3>
                <div className="breadth-stats">
                  <div className="stat">
                    <span className="stat-label">Advances</span>
                    <span className="stat-value positive">1,234</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Declines</span>
                    <span className="stat-value negative">567</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Unchanged</span>
                    <span className="stat-value">89</span>
                  </div>
                </div>
              </div>
              
              <div className="overview-card">
                <h3>Market Sentiment</h3>
                <div className="sentiment-indicator">
                  <div className="sentiment-bar">
                    <div className="sentiment-fill positive" style={{width: '68%'}}></div>
                  </div>
                  <span className="sentiment-text">Bullish</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gainers' && (
          <div className="stocks-list">
            <h3>Top Gainers</h3>
            <div className="stocks-table">
              <div className="table-header">
                <span>Symbol</span>
                <span>Name</span>
                <span>Price</span>
                <span>Change</span>
                <span>% Change</span>
              </div>
              {filteredData(marketData.topGainers).map((stock, idx) => (
                <div key={idx} className="stock-row positive">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-name">{stock.name}</span>
                  <span className="stock-price">₹{stock.price}</span>
                  <span className="stock-change positive">+{stock.change}</span>
                  <span className="stock-change-percent positive">{stock.changePercent}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'losers' && (
          <div className="stocks-list">
            <h3>Top Losers</h3>
            <div className="stocks-table">
              <div className="table-header">
                <span>Symbol</span>
                <span>Name</span>
                <span>Price</span>
                <span>Change</span>
                <span>% Change</span>
              </div>
              {filteredData(marketData.topLosers).map((stock, idx) => (
                <div key={idx} className="stock-row negative">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-name">{stock.name}</span>
                  <span className="stock-price">₹{stock.price}</span>
                  <span className="stock-change negative">{stock.change}</span>
                  <span className="stock-change-percent negative">{stock.changePercent}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sectors' && (
          <div className="sectors-grid">
            <h3>Sector Performance</h3>
            <div className="sectors-list">
              {marketData.sectors.map((sector, idx) => (
                <div key={idx} className={`sector-card ${sector.trend}`}>
                  <div className="sector-name">{sector.name}</div>
                  <div className="sector-performance">
                    <span className={`performance-value ${sector.trend}`}>
                      {sector.performance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'volume' && (
          <div className="stocks-list">
            <h3>Volume Leaders</h3>
            <div className="stocks-table">
              <div className="table-header">
                <span>Symbol</span>
                <span>Name</span>
                <span>Volume</span>
                <span>Price</span>
                <span>% Change</span>
              </div>
              {filteredData(marketData.volumeLeaders).map((stock, idx) => (
                <div key={idx} className="stock-row">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-name">{stock.name}</span>
                  <span className="stock-volume">{stock.volume}</span>
                  <span className="stock-price">₹{stock.price}</span>
                  <span className="stock-change-percent positive">{stock.change}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketsPage; 