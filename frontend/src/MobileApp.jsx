import React, { useState } from 'react';
import { Menu, X, Globe, ArrowLeft, Play } from 'lucide-react';
import './MobileApp.css';

const MobileApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('KO');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  // Navigation: 'home' or 'works'
  const [currentView, setCurrentView] = useState('home');
  
  // Video player modal states
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeVideoType, setActiveVideoType] = useState('16:9'); // '16:9' or '9:16'

  const langOptions = [
    { code: 'KO', name: '한국어', flag: '🇰🇷' },
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ZH', name: '中文', flag: '🇨🇳' },
    { code: 'JA', name: '日本語', flag: '🇯🇵' },
    { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];

  const servicesData = [
    {
      id: 1,
      num: "01",
      label: "PRODUCT AD",
      videos: [
        { type: "16:9", url: "/3763027-uhd_3840_2160_25fps.mp4", title: { KO: "가로 광고 시안", EN: "Horizontal Ad Preview" } },
        { type: "9:16", url: "/AQMMSbNYLwO1wOwPZfodWMlN_VVGuoTQzKrQenl4bgpdUDEWS-TGQPNcTLtgD_SZ4-p1s9RZ6HYggFlKNHS9Yi7rX_wLDaw0nqH0jI1TgQ.mp4", title: { KO: "세로 광고 시안", EN: "Vertical Ad Preview" } }
      ],
      title: {
        KO: "제품 광고",
        EN: "Product Ads",
        ZH: "产品广告",
        JA: "製品広告",
        VI: "Quảng cáo sản phẩm"
      },
      desc: {
        KO: "고객님의 기획서에서 시작하는 고품질 비디오 광고 제작을 AI기술자와 함께 합니다",
        EN: "High-quality video ads completed from a single text brief with AI creators.",
        ZH: "从客户创意简报开始，与AI技术人员一起制作高质量的视频广告",
        JA: "お客様の構成案から始まる高品質な動画広告制作をAI技術者と共に提供します",
        VI: "Sản xuất video quảng cáo chất lượng cao bắt đầu từ bản mô tả với kỹ sư AI"
      }
    },
    {
      id: 2,
      num: "02",
      label: "EVENT - FESTIVAL",
      videos: [
        { type: "16:9", url: "/5644237-uhd_4096_2160_25fps.mp4", title: { KO: "이벤트 홍보 시안", EN: "Event Promo Preview" } },
        { type: "9:16", url: "/12053133_1080_1920_30fps.mp4", title: { KO: "이벤트 숏폼 시안", EN: "Event Short-Form Preview" } }
      ],
      title: {
        KO: "이벤트 · 전시 홍보",
        EN: "Event & Exhibition",
        ZH: "活动与展览宣传",
        JA: "イベント・展示プロモーション",
        VI: "Quảng bá sự kiện & Triển lãm"
      },
      desc: {
        KO: "박람회, 축제, 브랜드 팝업스토어 및 전시회 등 다양한 오프라인·온라인 이벤트를 위한 최적의 홍보 영상을 제작합니다",
        EN: "We create optimal promotional videos for various offline and online events such as fairs, festivals, and pop-ups.",
        ZH: "为博览会、节日、品牌快闪店和展览等各种线下及线上活动制作最佳宣传视频",
        JA: "博覧会、フェスティバル、ポップアップストア、展示会など、多様なオフライン・オンラインイベント에最適な広報動画を制作します",
        VI: "Sản xuất video quảng bá tối ưu cho các sự kiện offline & online như hội chợ, lễ hội, cửa hàng pop-up"
      }
    },
    {
      id: 3,
      num: "03",
      label: "SHORT-FORM",
      videos: [
        { type: "16:9", url: "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4", title: { KO: "숏폼 가로 시안", EN: "Short-Form Horizontal Preview" } },
        { type: "9:16", url: "/ai video ugc ads creation.mp4", title: { KO: "숏폼 세로 시안", EN: "Short-Form Vertical Preview" } }
      ],
      title: {
        KO: "소셜 숏폼 콘텐츠",
        EN: "Social Short-Form",
        ZH: "社交短视频内容",
        JA: "ソーシャル縦型ショート",
        VI: "Nội dung ngắn mạng xã hội"
      },
      desc: {
        KO: "인스타그램 릴스, 틱톡, 유튜브 쇼츠 등 숏폼에 최적화된 트렌디한 세로형 비디오 광고를 제작합니다",
        EN: "We create trendy vertical video ads optimized for short-form platforms like Instagram Reels, TikTok, and YouTube Shorts.",
        ZH: "制作针对Instagram Reels、TikTok、YouTube Shorts等短视频平台优化的潮流竖屏视频广告",
        JA: "Instagramリール、TikTok、YouTubeショートなどのショートフォームに最適化された、トレンドの縦型動画広告を制作します",
        VI: "Sản xuất video quảng cáo dọc thời thượng được tối ưu hóa cho Reels, TikTok, Shorts"
      }
    },
    {
      id: 4,
      num: "04",
      label: "VIRTUAL INFLUENCER",
      videos: [
        { type: "16:9", url: "/257945.mp4", title: { KO: "가상 모델 영상", EN: "Virtual Model Preview" } },
        { type: "9:16", url: "/att.9Eg5FlwgDSrYU8ZwPNf4__bbq5hRFEivAkdwupNZzCE.mp4", title: { KO: "바이럴 모델 영상", EN: "Viral Model Preview" } }
      ],
      title: {
        KO: "가상 모델 & 인플루언서",
        EN: "Virtual Model & Influencer",
        ZH: "虚拟模特与网红",
        JA: "バーチャลモデル＆인플루언서",
        VI: "Người mẫu & Người ảnh hưởng ảo"
      },
      desc: {
        KO: "고객님의 요청에 따른 가상 인물을 만들어 냅니다",
        EN: "We create virtual characters based on customer requests.",
        ZH: "根据客户的要求创建虚拟角色",
        JA: "お客様のご要望に応じたバーチャルキャラクターを制作します",
        VI: "Chúng tôi tạo ra các nhân vật ảo theo yêu cầu của khách hàng"
      }
    },
    {
      id: 5,
      num: "05",
      label: "INTERIOR",
      videos: [
        { type: "16:9", url: "/6632880-hd_1920_1080_25fps.mp4", title: { KO: "인테리어 공간 영상", EN: "Interior Space Preview" } },
        { type: "9:16", url: "/12681248_2160_3840_60fps.mp4", title: { KO: "가구 비주얼 영상", EN: "Furniture Visual Preview" } }
      ],
      title: {
        KO: "인테리어 · 가구 프로젝트",
        EN: "Interior & Furniture",
        ZH: "室内与家具项目",
        JA: "インテリア・家具プロジェクト",
        VI: "Dự án nội thất & đồ gỗ"
      },
      desc: {
        KO: "공간의 가치를 극대화하는 하이엔드 인테리어 및 가구 비주얼 솔루션을 제공합니다",
        EN: "We provide high-end interior and furniture visual solutions that maximize space value.",
        ZH: "提供最大化空间价值的高端室内及家具视觉解决方案",
        JA: "空間の価値を極大化するハイエンドなインテリアおよび家具のビジュアルソリューションを提供します",
        VI: "Cung cấp giải pháp hình ảnh nội thất & đồ gỗ cao cấp nhằm tối đa hóa giá trị không gian"
      }
    }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (langDropdownOpen) setLangDropdownOpen(false);
  };

  const handleMenuClick = (item) => {
    setMenuOpen(false);
    if (item === 'WORK') {
      setCurrentView('works');
    } else {
      setCurrentView('home');
    }
  };

  const handleOpenVideo = (category) => {
    setActiveCategory(category);
    setActiveVideoType('16:9'); // reset aspect ratio toggle
  };

  const handleCloseVideo = () => {
    setActiveCategory(null);
  };

  const currentLangOpt = langOptions.find(opt => opt.code === language) || langOptions[0];
  const activeVideo = activeCategory ? activeCategory.videos.find(v => v.type === activeVideoType) : null;

  return (
    <div className="mobile-app-container">
      {/* 1. Header (Only show when menu is closed) */}
      <header className={`mobile-header ${menuOpen ? 'header-hidden' : ''}`}>
        <div className="mobile-header-left" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
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

      {/* 2. Page Views */}
      {currentView === 'home' ? (
        /* ================= HOME VIEW ================= */
        <main className="mobile-main">
          {/* Faint Background interlocking NV Logo */}
          <div className="mobile-bg-logo-container">
            <img src="/logo-nv-transparent-hq.png" alt="NV Logo" className="mobile-bg-logo-img" />
          </div>

          {/* Foreground Content */}
          <div className="mobile-hero-content">
            <h1 className="mobile-hero-title">VERARVO</h1>
            <p className="mobile-hero-subtitle">Think new, Feel real</p>
            <button className="mobile-works-btn" onClick={() => setCurrentView('works')}>
              <span className="mobile-works-btn-text">see works</span>
            </button>
          </div>
        </main>
      ) : (
        /* ================= WORKS VIEW (Mockup style) ================= */
        <main className="mobile-works-view">
          <div className="mobile-works-header">
            <button className="mobile-back-btn" onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <h2 className="mobile-works-title">OUR WORKS</h2>
          </div>

          {/* Categories List */}
          <div className="mobile-works-list">
            {servicesData.map((service) => (
              <div 
                key={service.id} 
                className="mobile-works-item"
                onClick={() => handleOpenVideo(service)}
              >
                <span className="works-item-num">{service.num}</span>
                <div className="works-item-content">
                  <h3 className="works-item-title">{service.title[language] || service.title['EN']}</h3>
                  <p className="works-item-desc">{service.desc[language] || service.desc['EN']}</p>
                </div>
                <div className="works-item-action">
                  <button className="works-item-pill-btn">
                    {service.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 3. Video Player Slide-Up Modal */}
      {activeCategory && (
        <>
          <div className="mobile-modal-backdrop" onClick={handleCloseVideo}></div>
          <div className="mobile-video-modal">
            <header className="mobile-modal-header">
              <h3 className="mobile-modal-title">
                {activeCategory.title[language] || activeCategory.title['EN']}
              </h3>
              <button className="mobile-modal-close" onClick={handleCloseVideo}>
                <X size={22} color="#EAB308" />
              </button>
            </header>

            {/* Aspect Ratio Switcher Tab */}
            <div className="mobile-ratio-tab-container">
              <button 
                className={`mobile-ratio-tab ${activeVideoType === '16:9' ? 'active' : ''}`}
                onClick={() => setActiveVideoType('16:9')}
              >
                Horizontal (16:9)
              </button>
              <button 
                className={`mobile-ratio-tab ${activeVideoType === '9:16' ? 'active' : ''}`}
                onClick={() => setActiveVideoType('9:16')}
              >
                Vertical (9:16)
              </button>
            </div>

            {/* Video Player Wrapper */}
            <div className={`mobile-video-player-container ${activeVideoType === '9:16' ? 'aspect-9-16' : 'aspect-16-9'}`}>
              {activeVideo && (
                <video 
                  key={`${activeCategory.id}-${activeVideoType}`}
                  className="mobile-modal-video"
                  src={activeVideo.url}
                  autoPlay
                  controls
                  playsInline
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* 4. Full Screen Menu Overlay */}
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
