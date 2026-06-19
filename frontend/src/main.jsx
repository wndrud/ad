import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MobileApp from './MobileApp.jsx'

const ResponsiveRoot = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileAgent || mobileWidth);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile ? <MobileApp /> : <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResponsiveRoot />
  </StrictMode>,
)
