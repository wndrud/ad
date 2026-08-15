import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ArrowLeft, ArrowRight, Play, Upload, Send, Plus, Check } from 'lucide-react';
import './MobileApp.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const targetVideos = [
  "/Lumiere_Project.mp4",
  "/Motors_Test_Project.mp4",
  "/Orvelle_Project.mp4",
  "/hf_20260422_004431_4f68bd77-ca2b-4483-8619-185621e4d2b6.mp4",
  "/hf_20260702_185634_cbb4702d-c436-45dc-bcf9-6f441d464ca4.mp4",
  "/sun_block.mp4",
  "/talking_avatar_ugc_video.mp4",
  "/UGC_video1.mp4",
  "/For_Hazlo.mp4",
  "/hf_20260412_001025_266abd8c-886a-47e6-9959-6371f3b5f840.mp4",
  "/hf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52.mp4"
];

const langOptions = [
  { code: 'KO', flag: '🇰🇷', name: '한국어' },
  { code: 'EN', flag: '🇺🇸', name: 'English' },
  { code: 'ZH', flag: '🇨🇳', name: '中文' },
  { code: 'JA', flag: '🇯🇵', name: '日本語' },
  { code: 'VI', flag: '🇻🇳', name: 'Tiếng Việt' }
];

const faqData = {
  KO: [
    { q: "Q1. 제작 기간은 얼마나 걸리나요?", a: "A. 일반적으로 저희 VERARVO AI 광고 영상은 평균 3일 내 제작 완료됩니다. 프로젝트 난이도와 수정 횟수에 따라 달라질 수 있습니다." },
    { q: "Q2. 가격은 어떻게 결정되나요?", a: "A. 영상 길이, 스타일, 기획 난이도, 수정 횟수에 따라 달라집니다. 상세 견적은 상담 후 안내드립니다." },
    { q: "Q3. 수정은 몇 번 가능한가요?", a: "A. 기본적으로 1~3회 수정이 포함됩니다. 1차 시안 생성후 고객님의 피드백 반영 후에 2차 시안을 제공해드립니다." },
    { q: "Q4. 어떤 자료를 제공해야 하나요?", a: "A. 아래 자료가 있으면 제작이 원활합니다: 제품 이미지 또는 영상, 로고, 브랜드 소개, 참고 광고 레퍼런스." },
    { q: "Q5. AI만으로 영상이 만들어지나요?", a: "A. AI 기술을 활용하여 제작하지만, 기획, 편집, 후반 작업은 사람이 직접 검수하여 완성도를 높입니다." },
    { q: "Q6. 저작권은 어떻게 되나요?", a: "A. 기본적으로 납품된 최종 결과물의 상업적 사용권은 고객에게 전적으로 제공됩니다." }
  ],
  EN: [
    { q: "Q1. How long does production take?", a: "A. VERARVO AI advertising videos are completed within an average of 3 days. It may vary depending on project complexity and revisions." },
    { q: "Q2. How is pricing determined?", a: "A. Pricing depends on video length, style, concept complexity, and revisions. Detailed quotes are provided upon consultation." },
    { q: "Q3. How many revisions are included?", a: "A. Standard packages include 1-3 rounds of revisions. After initial draft presentation, feedback is applied for final delivery." },
    { q: "Q4. What assets should I provide?", a: "A. Product images/videos, logo vector, brand introduction, and any reference ad links." },
    { q: "Q5. Are videos 100% AI generated?", a: "A. We leverage cutting-edge generative AI pipeline, but human directors curate, edit, and grade every frame for studio quality." },
    { q: "Q6. Commercial rights ownership?", a: "A. Full commercial rights for all final delivered assets are transferred to the client upon completion." }
  ],
  ZH: [
    { q: "Q1. 制作周期是多久？", a: "A. VERARVO AI 广告视频平均在 3 天内制作完成。根据难度和修改次数可能会有所调整。" },
    { q: "Q2. 价格是如何决定的？", a: "A. 取决于视频长度、风格、策划难度和修改次数。详细报价将在咨询后提供。" },
    { q: "Q3. 可以修改多少次？", a: "A. 包含 1 到 3 次修改。在生成初稿后，我们将根据您的反馈提供最终修改稿。" },
    { q: "Q4. 我需要提供哪些材料？", a: "A. 提供产品图片/视频、Logo、品牌介绍及参考案例将使制作更加顺利。" },
    { q: "Q5. 视频是完全由 AI 制作的吗？", a: "A. 结合 AI 技术与人类创意总监的后期剪辑与调色，确保高品质商业视觉。" },
    { q: "Q6. 版权如何归属？", a: "A. 交付的最终成果物的所有商业使用权完全归客户所有。" }
  ],
  JA: [
    { q: "Q1. 制作期間はどれくらいかかりますか？", a: "A. 当社の VERARVO AI 広告映像は平均3日以内に制作完了します。" },
    { q: "Q2. 料金はどのように決まりますか？", a: "A. 映像の長さ、スタイル、企画の難易度によって異なります。詳細な見積もりはご相談後にご案内いたします。" },
    { q: "Q3. 修正は何回可能ですか？", a: "A. 基本的に1〜3回の修正が含まれています。" },
    { q: "Q4. どのような資料を提供すればよいですか？", a: "A. 製品画像/映像、ロゴ、ブランド紹介、参考リファレンスをご用意ください。" },
    { q: "Q5. AIのみで映像が作られるのですか？", a: "A. AI技術を活用しつつ、企画や仕上げはプロのディ렉터が直接監修します。" },
    { q: "Q6. 著作権はどうなりますか？", a: "A. 納品された最終成果物の商用利用権は顧客に提供されます。" }
  ],
  VI: [
    { q: "Q1. Thời gian sản xuất mất bao lâu?", a: "A. Video quảng cáo VERARVO AI hoàn thành trung bình trong vòng 3 ngày." },
    { q: "Q2. Giá cả được quyết định như thế nào?", a: "A. Phụ thuộc vào độ dài video, phong cách và độ phức tạp của dự án." },
    { q: "Q3. Có thể chỉnh sửa bao nhiêu lần?", a: "A. Cơ bản bao gồm từ 1 đến 3 lần chỉnh sửa." },
    { q: "Q4. Tôi cần cung cấp những tài liệu nào?", a: "A. Hình ảnh/video sản phẩm, logo, giới thiệu thương hiệu và mẫu tham khảo." },
    { q: "Q5. Video có được tạo hoàn toàn bằng AI không?", a: "A. Được tạo bằng AI kết hợp với sự giám sát và biên tập trực tiếp từ chuyên gia con người." },
    { q: "Q6. Bản quyền thế nào?", a: "A. Quyền sử dụng thương mại của sản phẩm cuối cùng thuộc về khách hàng." }
  ]
};

const MobileApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('KO');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Background Video Dual-Slot State
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activeSlot, setActiveSlot] = useState('A');
  const [slotAVideoIndex, setSlotAVideoIndex] = useState(0);
  const [slotBVideoIndex, setSlotBVideoIndex] = useState(1);

  // Preloader State
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFadeOut, setIsFadeOut] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: [],
    message: ''
  });
  const [formFile, setFormFile] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Preloader animation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 2;
      progress = Math.min(progress + increment, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadeOut(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        }, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Dual-slot video engine
  const advanceToNextSlot = () => {
    if (activeSlot === 'A') {
      setActiveSlot('B');
      setTimeout(() => {
        setSlotAVideoIndex(prev => (slotBVideoIndex + 1) % targetVideos.length);
      }, 1000);
    } else {
      setActiveSlot('A');
      setTimeout(() => {
        setSlotBVideoIndex(prev => (slotAVideoIndex + 1) % targetVideos.length);
      }, 1000);
    }
  };

  useEffect(() => {
    if (currentView === 'home') {
      const vidA = videoARef.current;
      const vidB = videoBRef.current;

      [vidA, vidB].forEach(v => {
        if (v) {
          v.muted = true;
          v.defaultMuted = true;
          v.playsInline = true;
          if (v.paused) v.play().catch(() => {});
        }
      });

      const rotateTimer = setTimeout(() => {
        advanceToNextSlot();
      }, 4000);

      const handleTouchOrClick = () => {
        [videoARef.current, videoBRef.current].forEach(v => {
          if (v) {
            v.muted = true;
            v.defaultMuted = true;
            v.playsInline = true;
            if (v.paused) v.play().catch(() => {});
          }
        });
      };

      window.addEventListener('touchstart', handleTouchOrClick, { passive: true });
      window.addEventListener('click', handleTouchOrClick, { passive: true });

      return () => {
        clearTimeout(rotateTimer);
        window.removeEventListener('touchstart', handleTouchOrClick);
        window.removeEventListener('click', handleTouchOrClick);
      };
    }
  }, [currentView, activeSlot, slotAVideoIndex, slotBVideoIndex]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavClick = (viewName) => {
    setCurrentView(viewName);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormCheck = (type) => {
    setFormData(prev => {
      const exists = prev.projectType.includes(type);
      if (exists) {
        return { ...prev, projectType: prev.projectType.filter(t => t !== type) };
      } else {
        return { ...prev, projectType: [...prev.projectType, type] };
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1200));
      setFormSubmitting(false);
      setFormSubmitted(true);
    } catch (err) {
      setFormSubmitting(false);
      alert('제출에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="mobile-app-root">
      {/* 1. Original VERARVO SVG Preloader */}
      {isLoading && (
        <div className={`mobile-preloader-overlay ${isFadeOut ? 'fade-out' : ''}`}>
          <div className="mobile-preloader-content">
            <div className="mobile-preloader-logo">
              <div 
                className="preloader-svg-box"
                style={{
                  background: `linear-gradient(to top, rgba(255, 92, 0, 0.9) ${loadingProgress}%, rgba(255,255,255,0.08) ${loadingProgress}%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                <h1 className="preloader-title">VERARVO</h1>
              </div>
            </div>
            <div className="mobile-preloader-percentage">{loadingProgress}%</div>
          </div>
        </div>
      )}

      {/* 2. Full-screen Video Background */}
      {currentView === 'home' && (
        <div className="mobile-video-bg-container">
          <div className="mobile-video-bg-shield" />
          <video
            ref={videoARef}
            src={targetVideos[slotAVideoIndex]}
            autoPlay
            muted
            defaultMuted
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            preload="auto"
            onEnded={() => { if (activeSlot === 'A') advanceToNextSlot(); }}
            onError={() => { if (activeSlot === 'A') advanceToNextSlot(); }}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', pointerEvents: 'none',
              opacity: activeSlot === 'A' ? 1 : 0, transition: 'opacity 0.8s ease-in-out',
              zIndex: activeSlot === 'A' ? 2 : 1
            }}
          />
          <video
            ref={videoBRef}
            src={targetVideos[slotBVideoIndex]}
            autoPlay
            muted
            defaultMuted
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            preload="auto"
            onEnded={() => { if (activeSlot === 'B') advanceToNextSlot(); }}
            onError={() => { if (activeSlot === 'B') advanceToNextSlot(); }}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', pointerEvents: 'none',
              opacity: activeSlot === 'B' ? 1 : 0, transition: 'opacity 0.8s ease-in-out',
              zIndex: activeSlot === 'B' ? 2 : 1
            }}
          />
          <div className="mobile-video-bg-overlay" />
        </div>
      )}

      {/* 3. Navigation Header */}
      <header className="mobile-header">
        <div className="mobile-header-left" onClick={() => handleNavClick('home')}>
          <span className="mobile-logo-text">VERA<span className="text-orange">R</span>VO</span>
        </div>
        <div className="mobile-header-right">
          <button 
            className="mobile-lang-pill" 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <Globe size={14} color="#FF5C00" />
            <span className="mobile-lang-code">{language}</span>
          </button>

          <button className="mobile-menu-toggle-box" onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X size={20} color="#FFFFFF" /> : <Menu size={20} color="#FFFFFF" />}
          </button>
        </div>
      </header>

      {/* Language Selector Dropdown */}
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

      {/* Slide-over Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'menu-open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-logo-text">VERA<span className="text-orange">R</span>VO</span>
          <button className="mobile-menu-close" onClick={toggleMenu}>
            <X size={24} color="#FF5C00" />
          </button>
        </div>
        <div className="mobile-menu-nav-list">
          <button className="mobile-menu-link" onClick={() => handleNavClick('home')}>HOME</button>
          <button className="mobile-menu-link" onClick={() => handleNavClick('works')}>SERVICES & PORTFOLIO</button>
          <button className="mobile-menu-link" onClick={() => handleNavClick('process')}>PROCESS</button>
          <button className="mobile-menu-link" onClick={() => handleNavClick('careers')}>CAREER</button>
          <button className="mobile-menu-link" onClick={() => handleNavClick('faq')}>FAQ & CONTACT</button>
        </div>
        <div className="mobile-menu-footer">
          <p className="menu-footer-tagline">CREATE THE UNREAL WITH AI</p>
          <a href="mailto:jobsverarvo@gmail.com" className="menu-footer-email">jobsverarvo@gmail.com</a>
        </div>
      </div>

      {/* 4. MAIN PAGE CONTENT */}
      {currentView === 'home' && (
        <main className="mobile-main-content">
          {/* Section 1: Hero */}
          <section className="lathx-hero-section">
            <div className="lathx-hero-wrapper">
              <div className="lathx-badge-line">
                <span className="orange-line" />
                <span className="badge-text">AI ADVERTISING AGENCY · EST. 2024</span>
              </div>
              <h1 className="lathx-hero-title">
                VERARVO
                <span className="hero-outline-block">CREATE THE</span>
                <span className="text-orange-block">UNREAL</span>
              </h1>
              <p className="lathx-hero-subtitle">
                {language === 'KO' ? 'AI 기술과 인간의 독창적 감각을 결합하여 48-72시간 내 완성되는 고품질 AI 광고 비디오 솔루션을 제공합니다.' :
                 language === 'EN' ? 'Combining generative AI innovation with studio-quality creative direction for fashion, skincare, and e-commerce ads.' :
                 'AI 크리에이터와 마케팅 전문가가 선사하는 차세대 성과 중심 비디오 에셋.'}
              </p>
              <div className="lathx-hero-actions">
                <button 
                  className="lathx-btn-primary" 
                  onClick={() => {
                    const el = document.getElementById('inquiry-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setCurrentView('faq');
                  }}
                >
                  <span>PIDE TU PROPUESTA</span>
                  <ArrowRight size={16} />
                </button>
                <button className="lathx-btn-secondary" onClick={() => setCurrentView('works')}>
                  <span>VER PORTAFOLIO</span>
                </button>
              </div>

              {/* Spinning Badge */}
              <div className="lathx-spin-badge">
                <svg viewBox="0 0 110 110" className="spin-badge-svg">
                  <defs>
                    <path id="circle-text-path" d="M 55,55 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"></path>
                  </defs>
                  <text fontSize="9.5" letterSpacing="2.8" fill="#FF5C00" className="font-condensed">
                    <textPath href="#circle-text-path">IA GENERATIVA · CONTENIDO PREMIUM · BRANDING ·</textPath>
                  </text>
                </svg>
                <div className="spin-badge-center">✦</div>
              </div>
            </div>
          </section>

          {/* Section 2: Infinite Marquee Banner 1 */}
          <section className="lathx-marquee-bar">
            <div className="marquee-track">
              {[...Array(3)].map((_, i) => (
                <div className="marquee-group" key={i}>
                  <span className="marquee-item">CONTENIDO IA <span className="dot">·</span></span>
                  <span className="marquee-item">FOTOGRAFÍA VIRTUAL <span className="dot">·</span></span>
                  <span className="marquee-item">UGC AVATARES <span className="dot">·</span></span>
                  <span className="marquee-item">SESIONES EDITORIALES <span className="dot">·</span></span>
                  <span className="marquee-item">BRANDING VISUAL <span className="dot">·</span></span>
                  <span className="marquee-item">META ADS <span className="dot">·</span></span>
                  <span className="marquee-item">SHOPIFY ASSETS <span className="dot">·</span></span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Impact Stats Grid (3 Cards) */}
          <section className="lathx-stats-grid">
            <div className="stat-card">
              <span className="stat-number">x0</span>
              <p className="stat-desc">Más contenido en menos tiempo. Escalabilidad real. (평균 3일 이내 초스피드 납품)</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">-85%</span>
              <p className="stat-desc">Reducción media de costes frente a producción tradicional. (기존 대비 85% 제작비 절감)</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <p className="stat-desc">Assets que convierten. Calidad editorial garantizada. (고품질 4K 시각 성과 보장)</p>
            </div>
          </section>

          {/* Section 4: Services & Portfolio Grid (5 LATHX Style Cards) */}
          <section className="lathx-portfolio-section">
            <div className="section-header">
              <p className="section-tag">
                <span className="orange-line" /> PORTAFOLIO
              </p>
              <h2 className="section-title">
                LLEVA TU MARCA<br />
                AL <em className="text-orange-italic">SIGUIENTE</em><br />
                NIVEL CON IA
              </h2>
            </div>

            <div className="lathx-card-grid">
              {/* Card 1: PRODUCT AD */}
              <div className="lathx-portfolio-card card-tall">
                <img src="/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg" alt="Product Ad" className="card-bg-img" />
                <div className="card-overlay">
                  <span className="card-category">Fotografía IA · Branding</span>
                  <h3 className="card-title">PRODUCT AD (제품 광고)</h3>
                  <p className="card-desc">제품의 매력을 가상 모델 및 초현실주의 인공지능 그래픽으로 시각화하여 전환율을 극대화합니다.</p>
                </div>
              </div>

              {/* Card 2: EVENT & EXHIBITION */}
              <div className="lathx-portfolio-card card-normal">
                <img src="/Portfolio/ecommerce.webp" alt="Event & Exhibition" className="card-bg-img" />
                <div className="card-overlay">
                  <span className="card-category">Visualización · E-commerce</span>
                  <h3 className="card-title">EVENT & EXHIBITION (이벤트 · 전시)</h3>
                  <p className="card-desc">박람회, 브랜드 팝업스토어, 행사 홍보를 위한 웅장하고 몰입감 넘치는 시각 콘텐츠를 제공합니다.</p>
                </div>
              </div>

              {/* Card 3: SOCIAL SHORT-FORM */}
              <div className="lathx-portfolio-card card-square">
                <img src="/Portfolio/ugc.webp" alt="Social Short-Form" className="card-bg-img" />
                <div className="card-overlay">
                  <span className="card-category">Contenido IA · Social</span>
                  <h3 className="card-title">SOCIAL SHORT-FORM (숏폼)</h3>
                  <p className="card-desc">릴스, 숏츠, 틱톡 바이럴을 겨냥한 트렌디하고 스피디한 숏폼 퍼포먼스 광고 콘텐츠.</p>
                </div>
              </div>

              {/* Card 4: VIRTUAL MODEL */}
              <div className="lathx-portfolio-card card-square">
                <img src="/Portfolio/ads.webp" alt="Virtual Model" className="card-bg-img" />
                <div className="card-overlay">
                  <span className="card-category">Ads · Performance</span>
                  <h3 className="card-title">VIRTUAL MODEL (디지털 아바타)</h3>
                  <p className="card-desc">실제 사람과 구별할 수 없는 초고화질 디지털 아바타와 모델을 기반으로 365일 브랜딩을 전개합니다.</p>
                </div>
              </div>

              {/* Card 5: INTERIOR & ARCHITECTURE */}
              <div className="lathx-portfolio-card card-square">
                <img src="/Portfolio/automatizacion.png" alt="Interior & Space" className="card-bg-img" />
                <div className="card-overlay">
                  <span className="card-category">IA · N8N · Desarrollo</span>
                  <h3 className="card-title">INTERIOR & SPACE (공간 연출)</h3>
                  <p className="card-desc">공간, 가구, 인테리어 디자인의 감각적인 무드를 인공지능 공간 연출로 시각화합니다.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Horizontal Video Carousel (LATHX Portafolio Video Slider) */}
          <section className="lathx-video-carousel-section">
            <div className="carousel-header">
              <p className="section-tag"><span className="orange-line" /> SHOWCASE</p>
              <h2 className="section-title">VISUAL <span className="text-orange">EXPERIENCE</span></h2>
            </div>
            <div className="horizontal-scroll-container">
              <div className="video-scroll-card">
                <video src="/hf_20260422_004431_4f68bd77-ca2b-4483-8619-185621e4d2b6.mp4" autoPlay loop muted playsInline className="carousel-video" />
                <div className="video-card-label">MODE & BEAUTY</div>
              </div>
              <div className="video-scroll-card">
                <video src="/hf_20260702_185634_cbb4702d-c436-45dc-bcf9-6f441d464ca4.mp4" autoPlay loop muted playsInline className="carousel-video" />
                <div className="video-card-label">SKINCARE FASHION</div>
              </div>
              <div className="video-scroll-card">
                <video src="/Lumiere_Project.mp4" autoPlay loop muted playsInline className="carousel-video" />
                <div className="video-card-label">LUMIERE PROJECT</div>
              </div>
              <div className="video-scroll-card">
                <video src="/Motors_Test_Project.mp4" autoPlay loop muted playsInline className="carousel-video" />
                <div className="video-card-label">AUTOMOTIVE AD</div>
              </div>
            </div>
          </section>

          {/* Section 6: Trusted Brands Marquee (Orange Marquee) */}
          <section className="lathx-brands-marquee">
            <div className="marquee-track">
              {[...Array(3)].map((_, i) => (
                <div className="marquee-group-orange" key={i}>
                  <span className="brand-name">DAYS OF CONFIDENCE <span className="orange-dot">·</span></span>
                  <span className="brand-name">240KMH <span className="orange-dot">·</span></span>
                  <span className="brand-name">FLOR DE MAYO <span className="orange-dot">·</span></span>
                  <span className="brand-name">PERCO COMPANY <span className="orange-dot">·</span></span>
                  <span className="brand-name">ARCADS <span className="orange-dot">·</span></span>
                  <span className="brand-name">MAGNIFIC <span className="orange-dot">·</span></span>
                  <span className="brand-name">INVIDEO.IO <span className="orange-dot">·</span></span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Differentiators (01 - 07 Grid) */}
          <section className="lathx-differentiators-section">
            <div className="section-header">
              <p className="section-tag"><span className="orange-line" /> DIFERENCIADORES</p>
              <h2 className="section-title">POR QUÉ <em className="text-orange-italic">VERARVO</em></h2>
              <p className="section-subtitle">No somos una agencia tradicional. Somos tu ventaja competitiva.</p>
            </div>

            <div className="diff-list-container">
              <div className="diff-item">
                <span className="diff-num">01</span>
                <div className="diff-content">
                  <h3 className="diff-title">전문 기획 &amp; 디렉팅 노하우</h3>
                  <p className="diff-desc">생성형 AI 기술 도입 이전부터 축적된 마케팅 기획과 영상 연출 감각으로 브랜드 스토리를 전달합니다.</p>
                </div>
              </div>

              <div className="diff-item">
                <span className="diff-num">02</span>
                <div className="diff-content">
                  <h3 className="diff-title">디자인, 촬영, <span className="text-orange">CINE EN EL ADN</span></h3>
                  <p className="diff-desc">영화적 구도, 조명, 색감 조율 프롬프팅 기술로 스튜디오 촬영 이상의 압도적 미학을 완성합니다.</p>
                </div>
              </div>

              <div className="diff-item">
                <span className="diff-num">03</span>
                <div className="diff-content">
                  <h3 className="diff-title">MARKETING <span className="text-orange">QUE VENDE</span></h3>
                  <p className="diff-desc">단순히 보기 좋은 영상을 넘어 타겟 고객의 클릭(CTR)과 매출(ROAS)을 끌어올리는 성과형 광고 연출.</p>
                </div>
              </div>

              <div className="diff-item">
                <span className="diff-num">04</span>
                <div className="diff-content">
                  <h3 className="diff-title"><span className="text-orange">SISTEMAS</span>, NO PIEZAS</h3>
                  <p className="diff-desc">디지털 아바타, 숏폼 자동화, 다국어 릴리스 등 브랜드의 전체 비주얼 생태계를 지속 확장합니다.</p>
                </div>
              </div>

              <div className="diff-item">
                <span className="diff-num">05</span>
                <div className="diff-content">
                  <h3 className="diff-title"><span className="text-orange">–85%</span> EN COSTES DE PRODUCCIÓN</h3>
                  <p className="diff-desc">고가의 스튜디오, 장비, 대규모 촬영 인력 없이도 동일 이상의 스튜디오 퀄리티 에셋을 제공합니다.</p>
                </div>
              </div>

              <div className="diff-item">
                <span className="diff-num">06</span>
                <div className="diff-content">
                  <h3 className="diff-title">DE SEMANAS A <span className="text-orange">DÍAS</span> (평균 3일)</h3>
                  <p className="diff-desc">수주일 이상 소요되던 전통적 광고 제작 공정을 48-72시간 내 초스피드로 납품 완료합니다.</p>
                </div>
              </div>

              <div className="diff-item">
                <span className="diff-num">07</span>
                <div className="diff-content">
                  <h3 className="diff-title"><span className="text-orange">10 VARIANTES</span> MULTI-DRAFT</h3>
                  <p className="diff-desc">실시간 A/B 테스트가 가능한 다각도 멀티 시안과 포맷(16:9, 9:16)을 동시 제공합니다.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Process Timeline (4 Steps) */}
          <section className="lathx-process-section">
            <div className="section-header">
              <p className="section-tag"><span className="orange-line" /> PROCESS</p>
              <h2 className="section-title">CREATIVE <span className="text-orange">PIPELINE</span></h2>
            </div>
            <div className="process-step-grid">
              <div className="process-card">
                <span className="step-badge">STEP 01</span>
                <h3 className="step-title">BRIEF &amp; STRATEGY (의뢰 및 기획)</h3>
                <p className="step-desc">브랜드 요구사항 분석, 타겟 고객층 설정 및 광고 기획안과 톤앤매너를 수립합니다.</p>
              </div>
              <div className="process-card">
                <span className="step-badge">STEP 02</span>
                <h3 className="step-title">AI GENERATION (에셋 생성)</h3>
                <p className="step-desc">초고화질 AI 이미지, 비디오, 디지털 아바타 에셋을 생성하고 미학적 검수를 거칩니다.</p>
              </div>
              <div className="process-card">
                <span className="step-badge">STEP 03</span>
                <h3 className="step-title">DIRECTING &amp; EDIT (편집 및 2차 시안)</h3>
                <p className="step-desc">모션 그래픽, 사운드 디자인, 컬러 그레이딩 및 피드백을 반영한 2차 시안을 교정합니다.</p>
              </div>
              <div className="process-card">
                <span className="step-badge">STEP 04</span>
                <h3 className="step-title">FINAL DELIVERY (최종 납품)</h3>
                <p className="step-desc">유튜브, 릴스, 틱톡, 웹사이트용 다각도 4K 마스터 에셋과 상업적 사용권을 최종 제공합니다.</p>
              </div>
            </div>
          </section>

          {/* Section 9: Team Section ("DETRÁS DE VERARVO") */}
          <section className="lathx-team-section">
            <div className="section-header">
              <p className="section-tag"><span className="orange-line" /> EL EQUIPO</p>
              <h2 className="section-title">DETRÁS DE <em className="text-orange-italic">VERARVO</em></h2>
              <p className="section-subtitle font-light">전략, 기획, AI 그래픽, 개발 분야 최고의 크리에이터들이 함께합니다.</p>
            </div>

            <div className="team-grid">
              <div className="team-card">
                <div className="team-img-wrapper">
                  <img src="/Team/Lamin.jpeg" alt="LAMIN" className="team-img" />
                </div>
                <div className="team-info">
                  <div className="team-orange-line" />
                  <h3 className="team-name">LAMIN</h3>
                  <p className="team-role">Estrategia &amp; Crecimiento (Growth Lead)</p>
                  <p className="team-desc">AI 퍼포먼스 마케팅 시스템 구축 및 브랜드 스케일업 총괄.</p>
                </div>
              </div>

              <div className="team-card">
                <div className="team-img-wrapper">
                  <img src="/Team/Alex.jpeg" alt="ALEX" className="team-img" />
                </div>
                <div className="team-info">
                  <div className="team-orange-line" />
                  <h3 className="team-name">ALEX</h3>
                  <p className="team-role">IA Creativa (Creative AI Director)</p>
                  <p className="team-desc">Midjourney, Flux, Seedance 기반 초현실주의 시각 예술 디렉팅.</p>
                </div>
              </div>

              <div className="team-card">
                <div className="team-img-wrapper">
                  <img src="/Team/Dario.jpeg" alt="DARIO" className="team-img" />
                </div>
                <div className="team-info">
                  <div className="team-orange-line" />
                  <h3 className="team-name">DARIO</h3>
                  <p className="team-role">Software Engineer &amp; Automation</p>
                  <p className="team-desc">Claude &amp; N8N 기반 비주얼 자동화 파이프라인 개발 및 플랫폼 엔지니어링.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: FAQ Section */}
          <section className="lathx-faq-section">
            <div className="section-header text-center">
              <p className="section-tag center-tag"><span className="orange-line" /> PREGUNTAS FRECUENTES</p>
              <h2 className="section-title">FAQ</h2>
            </div>

            <div className="faq-accordion-list">
              {(faqData[language] || faqData['KO']).map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button 
                      className="faq-question-btn"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-icon-box">
                        <Plus size={18} className={`faq-plus-icon ${isOpen ? 'rotate-45' : ''}`} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-box">
                        <p className="faq-a-text">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 11: Call to Action & Inquiry Form */}
          <section id="inquiry-section" className="lathx-cta-section">
            <div className="cta-header">
              <h2 className="cta-title">
                ¿LISTO PARA CREAR<br />
                CONTENIDO QUE<br />
                <span className="text-orange">NADIE PUEDE IGNORAR?</span>
              </h2>
              <p className="cta-desc">
                {language === 'KO' ? '평균 3일 이내 첫 결과물 제공. 전통적 제작 비용 없이 맞춤형 AI 시안을 받아보세요.' :
                 'First results delivered in 48-72h. High conversion AI ads without studio overhead.'}
              </p>
            </div>

            {/* Inquiry Form */}
            <div className="inquiry-form-card">
              <h3 className="form-card-title">PROJECT INQUIRY / 시안 의뢰</h3>
              {formSubmitted ? (
                <div className="form-success-message">
                  <Check size={48} color="#FF5C00" />
                  <h4>의뢰가 성공적으로 접수되었습니다!</h4>
                  <p>담당 매니저가 내용을 검토한 후 24시간 이내에 입력하신 이메일/연락처로 안내 드리겠습니다.</p>
                  <button 
                    className="lathx-btn-primary" 
                    onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', phone: '', projectType: [], message: '' }); }}
                  >
                    <span>새 문의 작성하기</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="lathx-form">
                  <div className="form-group">
                    <label className="form-label">NAME / 성함 또는 기업명 *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="홍길동 / VERARVO"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">EMAIL / 이메일 주소 *</label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="contact@verarvo.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">PHONE / 연락처 *</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">PROJECT TYPE / 의뢰 분야 (중복 선택 가능)</label>
                    <div className="checkbox-grid">
                      {['제품 광고 (Product Ad)', '이벤트 · 전시 (Event)', '소셜 숏폼 (Short-Form)', '가상 모델 (Virtual Model)', '기타 (Custom)'].map((type) => (
                        <button
                          type="button"
                          key={type}
                          className={`check-pill ${formData.projectType.includes(type) ? 'active' : ''}`}
                          onClick={() => handleFormCheck(type)}
                        >
                          {formData.projectType.includes(type) && <Check size={14} />}
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">DETAILS / 상세 요청사항 및 레퍼런스</label>
                    <textarea 
                      rows={4} 
                      className="form-textarea" 
                      placeholder="희망하시는 영상 콘셉트, 참고 레퍼런스 링크, 예산 규모 등을 자유롭게 적어주세요."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">ATTACHMENT / 파일 첨부 (선택)</label>
                    <label className="file-upload-btn">
                      <Upload size={16} />
                      <span>{formFile ? formFile.name : '기획안 또는 참고 파일 업로드 (PDF, ZIP, JPG)'}</span>
                      <input 
                        type="file" 
                        className="hidden-file-input" 
                        onChange={e => setFormFile(e.target.files[0] || null)}
                      />
                    </label>
                  </div>

                  <button type="submit" className="lathx-btn-submit" disabled={formSubmitting}>
                    {formSubmitting ? (
                      <span>제출 중...</span>
                    ) : (
                      <>
                        <span>PIDE TU PROPUESTA / 의뢰 제출하기</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Section 12: Footer */}
          <footer className="lathx-footer">
            <div className="footer-top">
              <div className="footer-brand">
                <span className="footer-logo">VERA<span className="text-orange">R</span>VO</span>
                <p className="footer-tagline">Creamos 시각적 성과와 브랜딩의 미래를 만듭니다.<br />AI Advertising &amp; Production Agency.</p>
              </div>
              <div className="footer-links">
                <h4 className="footer-head">SERVICES</h4>
                <a onClick={() => handleNavClick('works')} className="footer-link">Product Advertising</a>
                <a onClick={() => handleNavClick('works')} className="footer-link">Social Short-Form</a>
                <a onClick={() => handleNavClick('works')} className="footer-link">Virtual Avatars</a>
                <a onClick={() => handleNavClick('works')} className="footer-link">Spatial &amp; Interior</a>
              </div>
              <div className="footer-contact">
                <h4 className="footer-head">CONTACT</h4>
                <p className="footer-text">담당 매니저 이메일 문의:</p>
                <a href="mailto:jobsverarvo@gmail.com" className="footer-email">jobsverarvo@gmail.com</a>
                <div className="footer-social-row">
                  <a href="https://pf.kakao.com/_xhxiBnX" target="_blank" rel="noopener noreferrer" className="social-circle-btn">Kakao</a>
                  <a href="https://x.com/VERARVO" target="_blank" rel="noopener noreferrer" className="social-circle-btn">X</a>
                  <a href="https://www.instagram.com/verarvo/" target="_blank" rel="noopener noreferrer" className="social-circle-btn">Insta</a>
                  <a href="https://www.facebook.com/profile.php?id=61590815180891" target="_blank" rel="noopener noreferrer" className="social-circle-btn">FB</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 VERARVO Agency. Todos los derechos reservados.</p>
            </div>
          </footer>
        </main>
      )}

      {/* OTHER VIEWS (SERVICES, PROCESS, CAREERS, FAQ) */}
      {currentView === 'works' && (
        <main className="mobile-subview-content">
          <div className="subview-header">
            <button className="subview-back-btn" onClick={() => handleNavClick('home')}>
              <ArrowLeft size={18} color="#FF5C00" />
              <span>Back to Home</span>
            </button>
            <h1 className="subview-title">SERVICES &amp; PORTFOLIO</h1>
          </div>
          <div className="subview-body">
            <div className="lathx-card-grid">
              <div className="lathx-portfolio-card card-tall">
                <img src="/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg" alt="Product Ad" className="card-bg-img" />
                <div className="card-overlay opacity-100">
                  <span className="card-category">Fotografía IA · Branding</span>
                  <h3 className="card-title">PRODUCT AD (제품 광고)</h3>
                  <p className="card-desc">제품의 매력을 가상 모델 및 초현실주의 인공지능 그래픽으로 시각화하여 전환율을 극대화합니다.</p>
                </div>
              </div>
              <div className="lathx-portfolio-card card-normal">
                <img src="/Portfolio/ecommerce.webp" alt="Event & Exhibition" className="card-bg-img" />
                <div className="card-overlay opacity-100">
                  <span className="card-category">Visualización · E-commerce</span>
                  <h3 className="card-title">EVENT &amp; EXHIBITION (이벤트 · 전시)</h3>
                  <p className="card-desc">박람회, 브랜드 팝업스토어, 행사 홍보를 위한 웅장하고 몰입감 넘치는 시각 콘텐츠를 제공합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentView === 'process' && (
        <main className="mobile-subview-content">
          <div className="subview-header">
            <button className="subview-back-btn" onClick={() => handleNavClick('home')}>
              <ArrowLeft size={18} color="#FF5C00" />
              <span>Back to Home</span>
            </button>
            <h1 className="subview-title">CREATIVE PROCESS</h1>
          </div>
          <div className="subview-body">
            <div className="process-step-grid">
              <div className="process-card">
                <span className="step-badge">STEP 01</span>
                <h3 className="step-title">BRIEF &amp; STRATEGY</h3>
                <p className="step-desc">브랜드 요구사항 분석, 타겟 고객층 설정 및 광고 기획안 수립.</p>
              </div>
              <div className="process-card">
                <span className="step-badge">STEP 02</span>
                <h3 className="step-title">AI GENERATION</h3>
                <p className="step-desc">초고화질 AI 이미지, 비디오, 디지털 아바타 에셋 생성.</p>
              </div>
              <div className="process-card">
                <span className="step-badge">STEP 03</span>
                <h3 className="step-title">DIRECTING &amp; EDIT</h3>
                <p className="step-desc">모션 그래픽, 사운드 디자인, 컬러 그레이딩 및 피드백 반영.</p>
              </div>
              <div className="process-card">
                <span className="step-badge">STEP 04</span>
                <h3 className="step-title">FINAL DELIVERY</h3>
                <p className="step-desc">4K 마스터 에셋과 상업적 사용권 최종 제공.</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentView === 'careers' && (
        <main className="mobile-subview-content">
          <div className="subview-header">
            <button className="subview-back-btn" onClick={() => handleNavClick('home')}>
              <ArrowLeft size={18} color="#FF5C00" />
              <span>Back to Home</span>
            </button>
            <h1 className="subview-title">CAREER &amp; RECRUIT</h1>
          </div>
          <div className="subview-body">
            <div className="inquiry-form-card">
              <h3 className="form-card-title">JOIN THE VERARVO CREATIVE TEAM</h3>
              <p className="form-subtitle">AI 기술과 크리에이티브의 경계를 허물 미래의 동료를 기다립니다.</p>
              <form onSubmit={handleFormSubmit} className="lathx-form">
                <div className="form-group">
                  <label className="form-label">NAME / 성함 *</label>
                  <input type="text" required className="form-input" placeholder="홍길동" />
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL / 이메일 *</label>
                  <input type="email" required className="form-input" placeholder="candidate@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">POSITION / 지원 직무</label>
                  <input type="text" className="form-input" placeholder="AI 비디오 디렉터 / 프롬프트 엔지니어 / 모션 디자이너" />
                </div>
                <div className="form-group">
                  <label className="form-label">PORTFOLIO / 포트폴리오 링크 또는 이력서 첨부</label>
                  <input type="url" className="form-input mb-2" placeholder="https://notion.so/portfolio" />
                  <label className="file-upload-btn">
                    <Upload size={16} />
                    <span>{formFile ? formFile.name : '이력서 파일 업로드 (PDF)'}</span>
                    <input type="file" className="hidden-file-input" onChange={e => setFormFile(e.target.files[0] || null)} />
                  </label>
                </div>
                <button type="submit" className="lathx-btn-submit">
                  <span>지원서 제출하기</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {currentView === 'faq' && (
        <main className="mobile-subview-content">
          <div className="subview-header">
            <button className="subview-back-btn" onClick={() => handleNavClick('home')}>
              <ArrowLeft size={18} color="#FF5C00" />
              <span>Back to Home</span>
            </button>
            <h1 className="subview-title">FAQ &amp; CONTACT</h1>
          </div>
          <div className="subview-body">
            <div className="faq-accordion-list mb-12">
              {(faqData[language] || faqData['KO']).map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button className="faq-question-btn" onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-icon-box">
                        <Plus size={18} className={`faq-plus-icon ${isOpen ? 'rotate-45' : ''}`} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer-box">
                        <p className="faq-a-text">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default MobileApp;
