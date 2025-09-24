import React, { useState } from 'react';
import Header from './components/Header.jsx';
import MarketBar from './components/MarketBar.jsx';
import HomePage from './pages/HomePage.jsx';
import MarketsPage from './pages/MarketsPage.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'markets':
        return <MarketsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Header onPageChange={setCurrentPage} />
      <MarketBar />
      <main className="main-content"> 
        {renderPage()}
      </main>
    </div>
  );
}

export default App; 