import './Header.css';

function Header({ onPageChange }){
    const handleNavClick = (page) => {
        if (onPageChange) {
            onPageChange(page);
        }
    };

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
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('markets'); }}>Markets</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('news'); }}>News</a>
                </nav>
                <button className="login-button">Login</button>
            </div>
        </header>
    );
}

export default Header;