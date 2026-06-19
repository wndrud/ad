import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MobileApp from './MobileApp.jsx'

const checkIsMobile = () => {
  if (typeof window === 'undefined') return false;
  const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const mobileWidth = window.innerWidth < 768;
  return mobileAgent || mobileWidth;
};

const ResponsiveRoot = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileApp /> : <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResponsiveRoot />
  </StrictMode>,
)
