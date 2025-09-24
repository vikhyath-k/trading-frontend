import './MarketBar.css';

function MarketBar(){
    return (
    <div className="market-bar">
      <div className="market-item">
        <span className="market-name">NIFTY 50</span>
        <span className="market-value positive">+0.85%</span>
      </div>
      <div className="market-item">
        <span className="market-name">Sensex</span>
        <span className="market-value negative">-0.34%</span>
      </div>
      <div className="market-item">
        <span className="market-name">NIFTY Bank</span>
        <span className="market-value positive">+1.12%</span>
      </div>
      <div className="market-item">
        <span className="market-name">Bitcoin</span>
        <span className="market-value positive">+3.5%</span>
      </div>
    </div>
    );
}

export default MarketBar;