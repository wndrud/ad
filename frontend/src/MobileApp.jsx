import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './MobileApp.css';

const MobileApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (item) => {
    console.log(`Menu clicked: ${item}`);
    setMenuOpen(false);
    // Future implementation: scroll to section or route
  };

  return (
    <div className="mobile-app-container">
      {/* 1. Header (Only show when menu is closed) */}
      <header className={`mobile-header ${menuOpen ? 'header-hidden' : ''}`}>
        <div className="mobile-header-left">
          <img src="/logo-emblem.png" alt="VERARVO Logo" className="mobile-logo-img" />
          <span className="mobile-logo-text">VERARVO</span>
        </div>
        <div className="mobile-header-right">
          <span className="mobile-lang-btn">KOR</span>
          <button className="mobile-menu-toggle-box" onClick={toggleMenu} aria-label="Open Menu">
            <Menu size={20} color="#000000" />
          </button>
        </div>
      </header>

      {/* 2. Main Content Screen */}
      <main className="mobile-main">
        {/* Faint Background interlocking NV Logo (matching mockup 2) */}
        <div className="mobile-bg-logo-container">
          <img src="/logo-nv-transparent-hq.png" alt="NV Logo" className="mobile-bg-logo-img" />
        </div>

        {/* Foreground Content */}
        <div className="mobile-hero-content">
          <h1 className="mobile-hero-title">VERARVO</h1>
          <p className="mobile-hero-subtitle">Think new, Feel real</p>
          <button className="mobile-works-btn" onClick={() => handleMenuClick('WORK')}>
            <span className="mobile-works-btn-text">see works</span>
          </button>
        </div>
      </main>

      {/* 3. Full Screen Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'menu-open' : ''}`}>
        <header className="mobile-menu-header">
          <span className="mobile-menu-logo">VERARVO</span>
          <button className="mobile-menu-close" onClick={toggleMenu} aria-label="Close Menu">
            <X size={24} />
          </button>
        </header>

        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list">
            <li>
              <button onClick={() => handleMenuClick('WORK')}>WORK</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('SERVICES')}>SERVICES</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('PROCESS')}>PROCESS</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('CAREERS')}>CAREERS</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('CONTACT')}>CONTACT</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileApp;
