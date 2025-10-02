import './Header.css';
import React, {useState, useEffect} from 'react';

function Header({ onPageChange }){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleNavClick = (page) => {
        if (onPageChange) {
            onPageChange(page);
        }
        // Close dropdown when navigating
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen]);

    return(
        <header className="header">
            <div className="header-left">
                <div className="logo" onClick={() => handleNavClick('home')}>
                    nivestra
                </div>
            </div>
            <div className="header-center">
                <input type="text" placeholder="Search stocks, markets..." className="Search-bar" />
            </div>
            <div className="header-right">
                <nav className="nav-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
                    {/* div for dropdown menu */}
                    <div 
                        className="dropdown" 
                        onMouseEnter={() => setIsDropdownOpen(true)} 
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                        <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle">
                            <span>Stocks</span> <span className={`arrow ${isDropdownOpen ? 'rotated' : ''}`}>▾</span>
                        </a>
                        {isDropdownOpen && (
                            <>
                                <div className="dropdown-overlay"></div>
                                <div className="dropdown-menu">
                                    <div className="dropdown-column">
                                        <div className="dropdown-section">
                                            <div className="dropdown-section-title">Indices</div>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('nifty50'); }}>NIFTY 50</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('niftybank'); }}>NIFTY Bank</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('niftyit'); }}>NIFTY IT</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('niftyfmcg'); }}>NIFTY FMCG</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('niftypharma'); }}>NIFTY Pharma</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('sensex'); }}>SENSEX</a>
                                        </div>
                                        
                                        <div className="dropdown-section">
                                            <div className="dropdown-section-title">Equity</div>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('equity'); }}>View All</a>
                                        </div>
                                    </div>
                                    
                                    <div className="dropdown-column">
                                        <div className="dropdown-section">
                                            <div className="dropdown-section-title">Markets</div>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('nse'); }}>NSE</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('bse'); }}>BSE</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('mcx'); }}>MCX</a>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('currency'); }}>Currency</a>
                                        </div>
                                        
                                        <div className="dropdown-section">
                                            <div className="dropdown-section-title">Futures & Options (Derivatives)</div>
                                            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('derivatives'); }}>View All</a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('news'); }}>News</a>
                </nav>
                <button className="login-button">Login</button>
            </div>
        </header>
    );
}

export default Header;