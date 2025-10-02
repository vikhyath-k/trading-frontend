import React, { useState, useEffect } from 'react';
import './MarketsPage.css';

const MarketsPage = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('gainers');
  const CLIENT_ID = import.meta.env.VITE_SMARTAPI_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_SMARTAPI_API_KEY;

  
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Example endpoint for indices or market feeds
        const response = await fetch('https://trading-backend-mdb5.onrender.com/api/market/feeds', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,  // or token from OAuth flow
            "Content-Type": "application/json",
            apikey: CLIENT_ID
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Transform data to match your UI structure
        const formattedData = {
          indices: data.indices || [],       // map as needed
          topGainers: data.topGainers || [],
          topLosers: data.topLosers || [],
          sectors: data.sectors || [],
          volumeLeaders: data.volumeLeaders || [],
        };

        setMarketData(formattedData);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
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

      {/* Navigation Tabs */}
      <div className="markets-tabs">
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
              {filteredData(marketData?.topGainers || []).map((stock, idx) => (
                <div key={idx} className="stock-row positive">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-name">{stock.name}</span>
                  <span className="stock-price">₹{stock.price}</span>
                  <span className="stock-change positive">{stock.change}</span>
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
              {filteredData(marketData?.topLosers || []).map((stock, idx) => (
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
              {(marketData?.sectors || []).map((sector, idx) => (
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
              {filteredData(marketData?.volumeLeaders || []).map((stock, idx) => (
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