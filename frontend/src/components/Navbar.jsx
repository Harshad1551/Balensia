import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <Wallet className="logo-icon text-gradient" size={28} />
                    <span className="logo-text">Balensia</span>
                </Link>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                <ul className={isOpen ? 'nav-menu active glass-panel' : 'nav-menu'}>
                    <li className="nav-item">
                        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="btn-primary nav-btn" onClick={() => setIsOpen(false)}>
                            Get Started
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
