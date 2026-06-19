import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import './MobileApp.css';

const MobileApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('KO');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langOptions = [
    { code: 'KO', name: '한국어', flag: '🇰🇷' },
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ZH', name: '中文', flag: '🇨🇳' },
    { code: 'JA', name: '日本語', flag: '🇯🇵' },
    { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (langDropdownOpen) setLangDropdownOpen(false);
  };

  const handleMenuClick = (item) => {
    console.log(`Menu clicked: ${item}`);
    setMenuOpen(false);
  };

  const currentLangOpt = langOptions.find(opt => opt.code === language) || langOptions[0];

  return (
    <div className="mobile-app-container">
      {/* 1. Header (Only show when menu is closed) */}
      <header className={`mobile-header ${menuOpen ? 'header-hidden' : ''}`}>
        <div className="mobile-header-left">
          <span className="mobile-logo-text">VERARVO</span>
        </div>
        <div className="mobile-header-right">
          {/* Transparent Language Switcher Button */}
          <button 
            className="mobile-lang-pill" 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            aria-label="Change Language"
          >
            <Globe size={14} color="#ffffff" className="mobile-globe-icon" />
            <span className="mobile-lang-flag">{currentLangOpt.flag}</span>
            <span className="mobile-lang-code">{currentLangOpt.code}</span>
          </button>

          {/* Menu Toggle button */}
          <button className="mobile-menu-toggle-box" onClick={toggleMenu} aria-label="Open Menu">
            <Menu size={20} color="#000000" />
          </button>
        </div>
      </header>

      {/* Language Switcher Floating Dropdown Menu */}
      {langDropdownOpen && (
        <>
          <div className="mobile-dropdown-backdrop" onClick={() => setLangDropdownOpen(false)}></div>
          <div className="mobile-lang-dropdown">
            {langOptions.map((opt) => (
              <button
                key={opt.code}
                className={`mobile-lang-dropdown-item ${language === opt.code ? 'active' : ''}`}
                onClick={() => {
                  setLanguage(opt.code);
                  setLangDropdownOpen(false);
                }}
              >
                <span className="dropdown-item-flag">{opt.flag}</span>
                <span className="dropdown-item-name">{opt.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* 2. Main Content Screen */}
      <main className="mobile-main">
        {/* Faint Background interlocking NV Logo */}
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
