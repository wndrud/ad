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
        { type: "9:16", url: "/lv_0_20260502175511.mp4", title: { KO: "세로 광고 시안", EN: "Vertical Ad Preview" } }
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
        JA: "博覧会、フェスティバル、ポップアップストア、展示会など、多様なオフライン・オンラインイベントに最適なプロモーション動画を制作します",
        VI: "Sản xuất video quảng bá tối ưu cho các sự kiện offline & online như hội chợ, lễ hội, cửa hàng pop-up"
      }
    },
    {
      id: 3,
      num: "03",
      label: "SHORT-FORM",
      videos: [
        { type: "16:9", url: "/hf_20260422_001333_36103dd7-9f8a-414f-9b5f-23683f07f703.mp4", title: { KO: "숏폼 가로 시안", EN: "Short-Form Horizontal Preview" } },
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
        JA: "バーチャルモデル＆インフルエンサー",
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

  const servicesText = {
    KO: {
      aboutTag: "ABOUT VERARVO",
      aboutText1: "기존 광고 제작은 많은 시간과 비용이 필요했습니다. 촬영 장소를 섭외하고, 모델을 섭외하며, 촬영과 편집 과정을 거쳐야 했습니다. 하나의 광고를 완성하기 위해 수일에서 수주가 소요되고 높은 제작 비용이 발생하는 것이 일반적이었습니다.",
      aboutText2: "는 이러한 과정을 새롭게 바꿉니다. 우리는 생성형 AI 기술을 활용하여 제품 사진 한 장만으로 광고 이미지와 영상 콘텐츠를 제작합니다. 복잡한 촬영 과정 없이도 다양한 컨셉과 스타일을 빠르게 구현할 수 있으며, 브랜드가 원하는 크리에이티브를 짧은 시간 안에 제공합니다.",
      aboutText3: "광고는 단순히 보기 좋은 영상이 아닙니다. 고객의 시선을 사로잡고 행동을 이끌어내는 강력한 도구입니다.",
      aboutText4: "는 AI 크리에이터와 마케팅 전문가가 함께 협업하여 단순한 결과물이 아닌 성과를 위한 광고 콘텐츠를 제작합니다.",
      statTime: "평균 제작 시간",
      statCostSaving: "제작 비용 절감",
      statSatisfaction: "고객 만족도"
    },
    EN: {
      aboutTag: "ABOUT VERARVO",
      aboutText1: "Traditional ad production required a lot of time and money. It involved scouting shooting locations, casting models, and going through filming and editing processes. It was common for a single ad to take days to weeks to complete and incur high production costs.",
      aboutText2: " changes this process. We leverage generative AI technology to create ad images and video content from just a single product photo. Various concepts and styles can be implemented quickly without complex filming processes, delivering the brand's desired creative in a short period.",
      aboutText3: "Advertising is not just a nice-looking video. It is a powerful tool that captures customer attention and drives action.",
      aboutText4: "'s AI creators and marketing experts collaborate to produce ad content that drives performance, not just simple output.",
      statTime: "Average Production Time",
      statCostSaving: "Cost Reduction",
      statSatisfaction: "Client Satisfaction"
    },
    ZH: {
      aboutTag: "ABOUT VERARVO",
      aboutText1: "传统的广告制作需要耗费大量的时间和资金。它涉及物色拍摄场地、招募模特，以及经历拍摄和编辑过程。通常，一个广告需要几天到几周的时间才能完成，并且制作成本高昂。",
      aboutText2: " 改变了这一流程。我们利用生成式 AI 技术，仅凭一张产品照片即可制作广告图片和视频内容。无需复杂的拍摄流程即可快速实现各种概念和风格，在短时间内交付品牌所需的创意。",
      aboutText3: "广告不仅仅是好看的视频。它是吸引客户注意并促进行动的强大工具。",
      aboutText4: " 汇集了 AI 创作者和营销专家，共同协作，生产旨在实现业绩而非单纯产出的广告内容。",
      statTime: "平均制作时间",
      statCostSaving: "制作成本节省",
      statSatisfaction: "客户满意度"
    },
    JA: {
      aboutTag: "ABOUT VERARVO",
      aboutText1: "従来の広告制作は、多くの時間と費用が必要でした。撮影場所を手配し、モデルをキャスティングし、撮影と編集のプロセスを経る必要がありました。1つの広告を完成させるために数日から数週間がかかり、高い制作費が発生するのが一般的でした。",
      aboutText2: "はこのようなプロセスを新しく変えます。私たちは生成AI技術を活用し、製品写真1枚だけで広告画像や映像コンテンツを制作します。複雑な撮影プロセスなしで多様なコンセプトとスタイルを迅速に実現でき、ブランドが求めるクリエイティブを短時間で提供します。",
      aboutText3: "広告は単に見栄えの良い映像ではありません。顧客の視線を引きつけ、行動を促す強力なツールです。",
      aboutText4: "は、AIクリエイターとマーケティングの専門家が連携し、単なる成果物ではなく成果を出すための広告コンテンツを制作します。",
      statTime: "平均制作時間",
      statCostSaving: "制作コスト削減",
      statSatisfaction: "顧客満足度"
    },
    VI: {
      aboutTag: "ABOUT VERARVO",
      aboutText1: "Sản xuất quảng cáo truyền thống đòi hỏi rất nhiều thời gian và chi phí. Quy trình này bao gồm việc khảo sát địa điểm quay, tuyển chọn người mẫu, thực hiện ghi hình và biên tập. Việc hoàn thiện một quảng cáo thường mất từ vài ngày đến vài tuần và phát sinh chi phí sản xuất cao là điều phổ biến.",
      aboutText2: " thay đổi hoàn toàn quy trình này. Chúng tôi tận dụng công nghệ AI tạo sinh để sản xuất hình ảnh quảng cáo và nội dung video chỉ từ một bức ảnh sản phẩm duy nhất. Các ý tưởng và phong cách đa dạng có thể được thực hiện nhanh chóng mà không cần quy trình quay phim phức tạp, mang lại hiệu quả sáng tạo như thương hiệu mong muốn trong thời gian ngắn.",
      aboutText3: "Quảng cáo không chỉ là một video đẹp mắt. Đó là một công cụ mạnh mẽ thu hút sự chú ý của khách hàng và thúc đẩy hành động.",
      aboutText4: " là sự hợp tác giữa các nhà sáng tạo AI và chuyên gia tiếp thị để sản xuất nội dung quảng cáo mang lại hiệu suất thực tế chứ không chỉ là những sản phẩm đơn thuần.",
      statTime: "Thời gian sản xuất trung bình",
      statCostSaving: "Tiết kiệm chi phí sản xuất",
      statSatisfaction: "Sự hài lòng của khách hàng"
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (langDropdownOpen) setLangDropdownOpen(false);
  };

  const handleMenuClick = (item) => {
    setMenuOpen(false);
    if (item === 'WORK') {
      setCurrentView('works');
    } else if (item === 'SERVICES') {
      setCurrentView('services');
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
    <div className={`mobile-app-container lang-${language.toLowerCase()}`}>
      {/* 1. Header (Only show when menu is closed) */}
      <header className={`mobile-header ${menuOpen ? 'header-hidden' : ''}`}>
        <div className="mobile-header-left" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <div className="mobile-logo-text">
            VER
            <span style={{ 
              position: 'relative', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              WebkitTextStroke: '0.8px #ffcc00'
            }}>
              A
              <img 
                src="/logo-nv-transparent-hq.png" 
                alt="" 
                style={{
                  position: 'absolute',
                  left: '52%',
                  top: '52%',
                  transform: 'translate(-50%, -50%)',
                  width: '2.0em',
                  height: '2.0em',
                  opacity: 0.35,
                  zIndex: -1,
                  pointerEvents: 'none',
                  objectFit: 'contain'
                }} 
              />
            </span>
            RVO
          </div>
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
      {currentView === 'home' && (
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
      )}

      {currentView === 'works' && (
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

      {currentView === 'services' && (
        /* ================= SERVICES VIEW (About Verarvo) ================= */
        <main className="mobile-services-view">
          <div className="mobile-services-header">
            <button className="mobile-back-btn" onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <h2 className="mobile-services-title">ABOUT</h2>
          </div>

          <div className="services-section">
            <div className="services-tag-line">
              <span className="services-tag-line-bar"></span>
              <span className="services-tag-text">{servicesText[language]?.aboutTag || servicesText['EN'].aboutTag}</span>
            </div>

            {/* Interlocking NV Logo & outlined VERARVO text */}
            <div className="services-hero-visual">
              <div className="services-nv-logo-container">
                <img src="/logo-nv-transparent-hq.png" alt="NV Logo" className="services-nv-logo-img" />
                <div className="services-outlined-text">VERARVO</div>
              </div>
            </div>

            {/* Texts */}
            <div className="services-description-container">
              <p className="services-desc-p">{servicesText[language]?.aboutText1 || servicesText['EN'].aboutText1}</p>
              <p className="services-desc-p">
                <span className="highlight-gold">VERARVO</span>{servicesText[language]?.aboutText2 || servicesText['EN'].aboutText2}
              </p>
              <p className="services-desc-p">{servicesText[language]?.aboutText3 || servicesText['EN'].aboutText3}</p>
              <p className="services-desc-p">
                <span className="highlight-gold">VERARVO</span>{servicesText[language]?.aboutText4 || servicesText['EN'].aboutText4}
              </p>
            </div>

            {/* Metrics cards */}
            <div className="services-metrics-container">
              <div className="services-metric-card">
                <div className="metric-value">24h~72h</div>
                <div className="metric-label">{servicesText[language]?.statTime || servicesText['EN'].statTime}</div>
              </div>
              <div className="services-metric-card">
                <div className="metric-value">80%↓</div>
                <div className="metric-label">{servicesText[language]?.statCostSaving || servicesText['EN'].statCostSaving}</div>
              </div>
              <div className="services-metric-card">
                <div className="metric-value">98%</div>
                <div className="metric-label">{servicesText[language]?.statSatisfaction || servicesText['EN'].statSatisfaction}</div>
              </div>
            </div>
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
