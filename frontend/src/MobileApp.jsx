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
      {/* 1. Header (Only show KOR / Menu button when menu is closed) */}
      <header className={`mobile-header ${menuOpen ? 'header-hidden' : ''}`}>
        <div className="mobile-logo-placeholder"></div>
        <div className="mobile-header-right">
          <span className="mobile-lang-btn">KOR</span>
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Open Menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* 2. Main Content Screen */}
      <main className="mobile-main">
        {/* Background interlocking NV Logo */}
        <div className="mobile-bg-logo-container">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="mobile-bg-logo-svg">
            <defs>
              <linearGradient id="mobileGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
              <filter id="mobileGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Gray N */}
            <text 
              x="20" 
              y="155" 
              fill="#262626" 
              style={{
                fontFamily: "'Playfair Display', serif", 
                fontSize: '155px', 
                fontWeight: '900'
              }}
            >
              N
            </text>
            {/* Glowing Gold V */}
            <text 
              x="85" 
              y="155" 
              fill="url(#mobileGoldGradient)" 
              filter="url(#mobileGlow)"
              style={{
                fontFamily: "'Playfair Display', serif", 
                fontSize: '155px', 
                fontWeight: '900'
              }}
            >
              V
            </text>
          </svg>
        </div>

        {/* Foreground Content */}
        <div className="mobile-hero-content">
          <h1 className="mobile-hero-title">VERARVO</h1>
          <p className="mobile-hero-subtitle">Think new, Feel real</p>
          <button className="mobile-works-btn" onClick={() => handleMenuClick('WORK')}>
            see works
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
