import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Check, Send, Upload, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './MobileApp.css';

// All 41 original client images precisely categorized into MODELS, PRODUCTS, and LIFESTYLE
const allOriginalImages = [
  // MODELS (12 pure fashion/model/lookbook assets)
  { id: 1, src: '/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg', category: 'MODELS', title: 'Fashion Editorial Lookbook' },
  { id: 2, src: '/ABB17C8A-BF95-4E2B-91A3-A918FEF7939C.jpg', category: 'MODELS', title: 'Streetwear Model Campaign' },
  { id: 3, src: '/BAAACB6B-AEFE-4CF0-AC98-9135BA541349.jpg', category: 'MODELS', title: 'Haute Couture Studio Shoot' },
  { id: 4, src: '/DECD6E41-38D0-4BB6-A9D4-7847BA2F0705.jpg', category: 'MODELS', title: 'Monochrome High Fashion' },
  { id: 5, src: '/AD883D9D-13DD-400C-BB18-FEB80F173E07.jpg', category: 'MODELS', title: 'Virtual Brand Ambassador' },
  { id: 6, src: '/11FA9EAF-0D4F-4BEE-9670-4F2473094321.jpg', category: 'MODELS', title: 'Digital Runway Staging' },
  { id: 7, src: '/1BE99603-1471-4391-AA49-90CD31B1F4D6.jpg', category: 'MODELS', title: 'Cinematic Fashion Portrait' },
  { id: 8, src: '/4CBC8E25-E527-4295-A88A-372D67E7FAD0.jpg', category: 'MODELS', title: 'Seasonal Collection Preview' },
  { id: 9, src: '/55043724-C253-4C26-A5E7-8C55BCF46DC5.jpg', category: 'MODELS', title: 'Luxury Eyewear Campaign' },
  { id: 10, src: '/549789471_1784276133887554~2.jpeg', category: 'MODELS', title: 'Vibrant Portrait Model Shoot' },
  { id: 11, src: '/IMG_5315.jpeg', category: 'MODELS', title: 'Golden Hour Leather Outfit' },
  { id: 12, src: '/IMG_5329.jpeg', category: 'MODELS', title: 'Sunset Outdoor Fashion Shoot' },

  // PRODUCTS (18 cosmetics, serums, handbags, and packaging commercial assets)
  { id: 13, src: '/408471063_1784275816512842~2.jpeg', category: 'PRODUCTS', title: 'Luxury Leather Handbag Staging' },
  { id: 14, src: '/pale_blush_pink_seamless_202605201550_1_Original.JPG', category: 'PRODUCTS', title: 'Beauty Glow Cosmetics Staging' },
  { id: 15, src: '/openart-image_1779918779704_080a80c5_1779918781015_6d955aa5_Original.PNG', category: 'PRODUCTS', title: 'Skincare Dropper Splash' },
  { id: 16, src: '/file_00000000dd5082469b53d340a3770d19.png', category: 'PRODUCTS', title: 'Luxury Perfume Bottle' },
  { id: 17, src: '/file_00000000755c8243957ad3597b01b9a8.png', category: 'PRODUCTS', title: 'Minimalist Product Packaging' },
  { id: 18, src: '/file_000000002ad881f4b02295613fc8c996~2.png', category: 'PRODUCTS', title: 'Aura Serum Lighting' },
  { id: 19, src: '/092755CE-0A63-49ED-8180-A30EF8687056.jpg', category: 'PRODUCTS', title: 'Hydra Care Serum 3D' },
  { id: 20, src: '/3760999B-251C-41DC-B5F4-2EAD7E2AA190.jpg', category: 'PRODUCTS', title: 'Gold Essence Luxury Dropper' },
  { id: 21, src: '/56791D9A-9EEC-402C-85A5-B66F42DA5B85.jpg', category: 'PRODUCTS', title: 'Botanical Sun Shield' },
  { id: 22, src: '/578D39E0-5165-49E6-8C7F-DD5AE5D1F1EB.jpg', category: 'PRODUCTS', title: 'Cosmetic Macro Texture' },
  { id: 23, src: '/80811198-6082-461B-A227-DFC81D2EA772.jpg', category: 'PRODUCTS', title: 'Refreshing Beverage Staging' },
  { id: 24, src: '/820A046E-0FCF-4996-84F5-A01C5D7B1C46.jpg', category: 'PRODUCTS', title: 'Perfume Silhouette Lighting' },
  { id: 25, src: '/att.TJe27SYxmeMhozHrWA7RvmgV1Bq9CqKOxqnweYZc9Aw.jpg', category: 'PRODUCTS', title: 'Signature Product Reveal' },
  { id: 26, src: '/Portfolio/ecommerce.webp', category: 'PRODUCTS', title: 'E-Commerce Commercial Render' },
  { id: 27, src: '/IMG_9116.JPG', category: 'PRODUCTS', title: 'Lumiere Regenerating Facial Cream' },
  { id: 28, src: '/IMG_9117.JPG', category: 'PRODUCTS', title: 'Lumiere Skincare Commercial Reveal' },
  { id: 29, src: '/IMG_9296.PNG', category: 'PRODUCTS', title: 'Jo&Co Salt Body Scrub Staging' },
  { id: 30, src: '/IMG_9300.PNG', category: 'PRODUCTS', title: 'Lavender Mousse Face Cream Staging' },

  // LIFESTYLE (11 architecture, interior & spatial scenes)
  { id: 31, src: '/a (1).jpg', category: 'LIFESTYLE', title: 'Modern Architectural Space' },
  { id: 32, src: '/a (2).jpeg', category: 'LIFESTYLE', title: 'Interior Furniture Concept' },
  { id: 33, src: '/a (2).jpg', category: 'LIFESTYLE', title: 'Luxury Living Room Mood' },
  { id: 34, src: '/a (3).jpeg', category: 'LIFESTYLE', title: 'Minimalist Dining Aesthetic' },
  { id: 35, src: '/a (3).jpg', category: 'LIFESTYLE', title: 'Warm Tone Bedroom Atmosphere' },
  { id: 36, src: '/a (4).jpeg', category: 'LIFESTYLE', title: 'Architectural Spatial Rendering' },
  { id: 37, src: '/a (4).jpg', category: 'LIFESTYLE', title: 'Coffee Studio Lighting' },
  { id: 38, src: '/a (5).jpeg', category: 'LIFESTYLE', title: 'Sculptural Lighting Design' },
  { id: 39, src: '/a (5).jpg', category: 'LIFESTYLE', title: 'Concrete Loft Interior' },
  { id: 40, src: '/a (6).jpeg', category: 'LIFESTYLE', title: 'Ceramic Art Staging' },
  { id: 41, src: '/a (6).jpg', category: 'LIFESTYLE', title: 'Contemporary Lounge Mood' }
];

const differentiators = [
  {
    num: "01",
    title: (
      <>
        HUMAN DIRECTING + AI AGILITY <span className="text-yellow">|</span>
      </>
    ),
    desc: "AI creates the hyper-real assets, but our veteran human directors, editors, and colorists supervise every single frame for studio-grade polish."
  },
  {
    num: "02",
    title: (
      <>
        RAPID 3-DAY TURNAROUND <span className="text-yellow">|</span>
      </>
    ),
    desc: "From initial brief and generative asset creation to final color grading and sound design, delivered in an average of 3 business days."
  },
  {
    num: "03",
    title: (
      <>
        PERFORMANCE-DRIVEN MARKETING <span className="text-yellow">|</span>
      </>
    ),
    desc: "Engineered specifically for high-impact social media feeds, maximizing click-through rates (CTR) and return on ad spend (ROAS)."
  },
  {
    num: "04",
    title: (
      <>
        MULTI-FORMAT AD VARIANTS <span className="text-yellow">|</span>
      </>
    ),
    desc: "Receive horizontal (16:9) and vertical (9:16) multi-angle formats simultaneously for YouTube, Instagram Reels, and TikTok campaigns."
  },
  {
    num: "05",
    title: (
      <>
        -85% BUDGET OPTIMIZATION <span className="text-yellow">|</span>
      </>
    ),
    desc: "Save up to 85% on production costs by eliminating expensive physical set rentals, location fees, and bloated film crews."
  },
  {
    num: "06",
    title: (
      <>
        100% COMMERCIAL RIGHTS <span className="text-yellow">|</span>
      </>
    ),
    desc: "Complete commercial usage rights and intellectual property are 100% transferred to your brand upon delivery with zero royalty fees."
  }
];

const faqItems = [
  {
    q: "How long does production take?",
    a: "Our standard turnaround is an average of 3 days for initial drafts. Complete multi-format ad campaigns are typically finalized within 5 business days."
  },
  {
    q: "How is pricing determined?",
    a: "Pricing depends on video length, concept complexity, and the number of multi-angle variants required. Detailed custom quotes are provided after consultation."
  },
  {
    q: "How many revision rounds are included?",
    a: "Every project includes 1 to 3 dedicated revision rounds to guarantee perfect alignment with your brand's visual identity."
  },
  {
    q: "What materials do I need to prepare?",
    a: "Production is seamless with basic materials: product photos or videos, logo vector files, brand brief, and any benchmark ad references you love."
  },
  {
    q: "Are the visuals created purely by AI?",
    a: "We leverage cutting-edge generative AI models, but our human film directors, editors, and prompt engineers supervise and refine every frame."
  },
  {
    q: "Who owns the commercial copyright?",
    a: "Full commercial licensing and intellectual property rights are 100% transferred to the client upon final delivery with zero restrictions."
  }
];

const MobileApp = () => {
  const videoRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(10);

  // Lightbox Modal State
  const [activeModalIdx, setActiveModalIdx] = useState(null);

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

  // 1. Mobile Video Robust Autoplay Trigger
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');

      const attemptPlay = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            const unlockTouch = () => {
              video.play().catch(() => {});
              window.removeEventListener('touchstart', unlockTouch);
              window.removeEventListener('click', unlockTouch);
            };
            window.addEventListener('touchstart', unlockTouch, { once: true });
            window.addEventListener('click', unlockTouch, { once: true });
          });
        }
      };

      attemptPlay();
    }
  }, []);

  // 2. Smooth Scroll Tracker
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Compute Hero Video Shrink & Text Fade
  const heroTransitionDistance = 350;
  const scrollProgress = Math.min(Math.max(scrollY / heroTransitionDistance, 0), 1);

  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 1.8);
  const heroTextTranslateY = -scrollProgress * 40;
  const heroVideoScale = 1 - scrollProgress * 0.12;
  const heroVideoRadius = scrollProgress * 20;
  const heroVideoPadding = scrollProgress * 14;

  const filteredImages = selectedCategory === 'ALL' 
    ? allOriginalImages 
    : allOriginalImages.filter(img => img.category === selectedCategory);

  const displayedImages = filteredImages.slice(0, visibleCount);

  const handleOpenModal = (imgSrc) => {
    const idx = allOriginalImages.findIndex(item => item.src === imgSrc);
    if (idx !== -1) {
      setActiveModalIdx(idx);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setActiveModalIdx(null);
    document.body.style.overflow = '';
  };

  const handleNextModal = (e) => {
    e.stopPropagation();
    setActiveModalIdx((prev) => (prev + 1) % allOriginalImages.length);
  };

  const handlePrevModal = (e) => {
    e.stopPropagation();
    setActiveModalIdx((prev) => (prev - 1 + allOriginalImages.length) % allOriginalImages.length);
  };

  const handleFormCheck = (type) => {
    setFormData(prev => {
      const exists = prev.projectType.includes(type);
      return {
        ...prev,
        projectType: exists ? prev.projectType.filter(t => t !== type) : [...prev.projectType, type]
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormSubmitting(false);
    setFormSubmitted(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-app-root">
      {/* 1. Slim Fixed Header with Hollow Stroked Italic Serif Logo */}
      <header className="lathx-header">
        <div className="lathx-header-inner">
          <div className="header-logo-hollow" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            VERARVO
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Sticky Viewport with Scroll Shrink & Text Fadeout) */}
      <section className="hero-scroll-container">
        <div className="hero-sticky-viewport">
          <div 
            className="hero-video-sticky-wrapper"
            style={{
              padding: `${heroVideoPadding}px`
            }}
          >
            <div 
              className="hero-video-box"
              style={{
                borderRadius: `${heroVideoRadius}px`,
                transform: `scale(${heroVideoScale})`
              }}
            >
              <video
                ref={videoRef}
                src="/Lumiere_Project.mp4"
                autoPlay
                muted
                defaultMuted
                loop
                playsInline
                controls={false}
                disablePictureInPicture
                preload="auto"
                className="hero-bg-video"
              />
              <div className="hero-gradient-overlay" />
            </div>
          </div>

          {/* Hero Foreground Content */}
          <div 
            className="hero-foreground-content"
            style={{
              opacity: heroTextOpacity,
              transform: `translateY(${heroTextTranslateY}px)`,
              pointerEvents: heroTextOpacity < 0.1 ? 'none' : 'auto'
            }}
          >
            <div className="hero-tagline-row">
              <span className="yellow-dash" />
              <span className="hero-tagline-text">AI ADVERTISING &amp; CREATIVE AGENCY</span>
            </div>

            <h1 className="hero-main-title">
              <span className="hero-title-hollow">VERARVO</span>
              <span className="title-stroked-line">REIMAGINING</span>
              <span className="text-yellow-line">THE UNREAL</span>
            </h1>

            <p className="hero-desc-text">
              Combining generative AI intelligence with human artistic direction. We produce high-converting commercial videos, editorial imagery, and virtual brand ambassadors delivered in 3 days.
            </p>

            <div className="hero-btn-row">
              <button className="btn-chamfer-yellow" onClick={() => scrollToSection('inquiry-section')}>
                <span>REQUEST PROPOSAL</span>
                <ArrowRight size={16} />
              </button>
              <button className="btn-link-white" onClick={() => scrollToSection('portfolio-section')}>
                VIEW PORTFOLIO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Divider & Top Marquee Ticker */}
      <section className="ticker-black-bar">
        <div className="ticker-scroll-track">
          {[...Array(3)].map((_, i) => (
            <div className="ticker-group" key={i}>
              <span className="ticker-text">AI COMMERCIALS <span className="text-yellow">·</span></span>
              <span className="ticker-text">VIRTUAL AMBASSADORS <span className="text-yellow">·</span></span>
              <span className="ticker-text">SHORT-FORM ADS <span className="text-yellow">·</span></span>
              <span className="ticker-text">PRODUCT VISUALS <span className="text-yellow">·</span></span>
              <span className="ticker-text">BRAND CINEMATICS <span className="text-yellow">·</span></span>
              <span className="ticker-text">4K PRODUCTION <span className="text-yellow">·</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3 Stats Impact Section (Big Numbers Stacked) */}
      <section className="stats-impact-section">
        <div className="stat-row-item">
          <span className="stat-huge-number">3 DAYS</span>
          <p className="stat-desc-p">Average production turnaround from initial creative brief to final 4K delivery.</p>
        </div>
        <div className="stat-row-item">
          <span className="stat-huge-number">-85%</span>
          <p className="stat-desc-p">Average budget reduction compared to traditional physical studio shoots and set rentals.</p>
        </div>
        <div className="stat-row-item">
          <span className="stat-huge-number">100%</span>
          <p className="stat-desc-p">Guaranteed studio-grade visual conversion quality and full commercial rights transfer.</p>
        </div>
      </section>

      {/* 5. Complete 41 Original Images Categorized into ALL, MODELS, PRODUCTS, LIFESTYLE with Lightbox */}
      <section id="portfolio-section" className="portfolio-showcase-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">PORTFOLIO</span>
          </div>
          <h2 className="sec-title-display">
            REIMAGINE YOUR<br />
            BRAND VALUE <em className="text-yellow-italic">WITH AI</em>
          </h2>
          <p className="sec-subtitle-p">
            Explore our curated catalog of AI commercial photography, fashion models, and spatial design assets. Tap any image to enlarge in high resolution.
          </p>
        </div>

        {/* Filter Tabs: Exactly ALL, MODELS, PRODUCTS, LIFESTYLE */}
        <div className="portfolio-filter-row">
          {['ALL', 'MODELS', 'PRODUCTS', 'LIFESTYLE'].map((cat) => {
            const count = cat === 'ALL' 
              ? allOriginalImages.length 
              : allOriginalImages.filter(img => img.category === cat).length;
            return (
              <button
                key={cat}
                className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(10);
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (Click to enlarge) */}
        <div className="gallery-masonry-grid">
          {displayedImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`gallery-grid-item ${idx % 3 === 0 ? 'span-2' : ''}`}
              onClick={() => handleOpenModal(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="gallery-item-img"
                loading="lazy" 
              />
              <div className="gallery-item-hover">
                <span className="gallery-cat-badge">{img.category}</span>
                <h4 className="gallery-item-title">{img.title}</h4>
                <span className="tap-to-expand">TAP TO VIEW FULLSCREEN ↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="load-more-center">
            <button 
              className="btn-load-more"
              onClick={() => setVisibleCount(prev => prev + 10)}
            >
              <span>VIEW MORE WORKS ({filteredImages.length - visibleCount} REMAINING)</span>
            </button>
          </div>
        )}

        {/* Collaboration Notice Bar */}
        <div className="creator-collab-banner">
          <Sparkles size={16} className="text-yellow flex-shrink-0" />
          <p className="collab-banner-text">
            Visual works created by AI Creators in official partnership with VERARVO.
          </p>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal for all 41 images */}
      {activeModalIdx !== null && (
        <div className="lightbox-modal-backdrop" onClick={handleCloseModal}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Top Bar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-badge-row">
                <span className="modal-cat-tag">{allOriginalImages[activeModalIdx].category}</span>
                <span className="modal-counter">{activeModalIdx + 1} / {allOriginalImages.length}</span>
              </div>
              <button className="btn-modal-close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            {/* Enlarged Image Container with Prev/Next Controls */}
            <div className="lightbox-image-stage">
              <button className="lightbox-nav-btn prev-btn" onClick={handlePrevModal}>
                <ChevronLeft size={24} />
              </button>
              <img 
                src={allOriginalImages[activeModalIdx].src} 
                alt={allOriginalImages[activeModalIdx].title} 
                className="lightbox-full-img" 
              />
              <button className="lightbox-nav-btn next-btn" onClick={handleNextModal}>
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Modal Footer with Creator Collaboration Caption */}
            <div className="lightbox-footer-info">
              <h3 className="lightbox-img-title">{allOriginalImages[activeModalIdx].title}</h3>
              <div className="lightbox-creator-tag">
                <Sparkles size={14} className="text-yellow" />
                <p className="lightbox-creator-p">
                  Created by AI Creators in partnership with VERARVO.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Trusted Brands (Deep Rich Yellow Band Marquee) */}
      <section className="trusted-brands-section">
        <div className="sec-header-block padded">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">PROVEN TRACK RECORD</span>
          </div>
          <h2 className="sec-title-display">
            TRUSTED BY<br />
            VISIONARY <em className="text-yellow-italic">BRANDS</em>
          </h2>
        </div>

        <div className="yellow-marquee-banner">
          <div className="yellow-marquee-track">
            {[...Array(3)].map((_, i) => (
              <div className="yellow-marquee-group" key={i}>
                <span className="brand-item-text">DAYS OF CONFIDENCE <span className="black-dot">·</span></span>
                <span className="brand-item-text">240KMH <span className="black-dot">·</span></span>
                <span className="brand-item-text">FLOR DE MAYO <span className="black-dot">·</span></span>
                <span className="brand-item-text">PERCO COMPANY <span className="black-dot">·</span></span>
                <span className="brand-item-text">ARCADS <span className="black-dot">·</span></span>
                <span className="brand-item-text">MAGNIFIC <span className="black-dot">·</span></span>
                <span className="brand-item-text">INVIDEO.IO <span className="black-dot">·</span></span>
                <span className="brand-item-text">PROMPTWRK <span className="black-dot">·</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Differentiators (01 - 06 with Yellow Bar placed behind the last letter) */}
      <section className="differentiators-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">DIFFERENTIATORS</span>
          </div>
          <h2 className="sec-title-display">
            WHY <span className="why-verarvo-serif">VERARVO</span>
          </h2>
          <p className="sec-subtitle-p">Not just an agency. We are your unfair competitive advantage.</p>
        </div>

        <div className="diff-items-stack">
          {differentiators.map((item) => (
            <div key={item.num} className="diff-row-item">
              <span className="diff-big-num">{item.num}</span>
              <div className="diff-text-box">
                <h3 className="diff-title-h3">{item.title}</h3>
                <p className="diff-desc-p">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section with Left-Aligned Tag */}
      <section className="faq-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="sec-title-display">FAQ</h2>
        </div>

        <div className="faq-accordion-container">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-row-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-toggle-btn" 
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <span className="faq-question-text">{item.q}</span>
                  <span className="faq-icon-holder">
                    <Plus size={18} className={`plus-icon ${isOpen ? 'rotate-plus' : ''}`} />
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer-container">
                    <p className="faq-answer-p">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Call to Action & Inquiry Form */}
      <section id="inquiry-section" className="cta-inquiry-section">
        <div className="cta-header-center">
          <h2 className="cta-huge-title">
            READY TO CREATE<br />
            CONTENT THAT<br />
            <span className="text-yellow">CANNOT BE IGNORED?</span>
          </h2>
          <p className="cta-sub-p">First deliverables in 48-72 hours. No studio overhead. 100% commercial rights.</p>
        </div>

        <div className="inquiry-box-card">
          <h3 className="inquiry-card-head">PROJECT INQUIRY</h3>
          {formSubmitted ? (
            <div className="inquiry-success-box">
              <Check size={48} color="#FFCC00" />
              <h4>Your proposal request has been received!</h4>
              <p>Our dedicated account manager will review your project details and respond within 24 hours.</p>
              <button 
                className="btn-chamfer-yellow mt-4"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', projectType: [], message: '' });
                }}
              >
                <span>SUBMIT ANOTHER INQUIRY</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="inquiry-form-stack">
              <div className="input-group">
                <label className="input-label">NAME / COMPANY *</label>
                <input 
                  type="text" 
                  required 
                  className="theme-input" 
                  placeholder="Brand / Contact Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">EMAIL ADDRESS *</label>
                <input 
                  type="email" 
                  required 
                  className="theme-input" 
                  placeholder="contact@brand.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">PHONE / CONTACT *</label>
                <input 
                  type="tel" 
                  required 
                  className="theme-input" 
                  placeholder="+82 10-0000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">PROJECT TYPE (SELECT ALL THAT APPLY)</label>
                <div className="checkbox-pills-row">
                  {['Product Commercial', 'Event & Exhibition', 'Social Short-Form', 'Virtual Brand Ambassador', 'Custom Campaign'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      className={`pill-check-btn ${formData.projectType.includes(type) ? 'active' : ''}`}
                      onClick={() => handleFormCheck(type)}
                    >
                      {formData.projectType.includes(type) && <Check size={14} />}
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">PROJECT DETAILS &amp; REFERENCES</label>
                <textarea 
                  rows={4} 
                  className="theme-textarea" 
                  placeholder="Describe your visual concept, deliverables, reference ad links, and target deadline."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">ATTACH BRIEF OR ASSETS (OPTIONAL)</label>
                <label className="file-attach-box">
                  <Upload size={16} />
                  <span>{formFile ? formFile.name : 'Upload Brief / Reference File (PDF, ZIP, JPG)'}</span>
                  <input 
                    type="file" 
                    className="hidden-file-el" 
                    onChange={e => setFormFile(e.target.files[0] || null)}
                  />
                </label>
              </div>

              <button type="submit" className="btn-chamfer-yellow submit-full" disabled={formSubmitting}>
                {formSubmitting ? (
                  <span>SUBMITTING...</span>
                ) : (
                  <>
                    <span>REQUEST YOUR PROPOSAL</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 10. Minimal Footer with Hollow Yellow Logo */}
      <footer className="lathx-footer-simple">
        <div className="footer-content-stack">
          <div className="header-logo-hollow footer-logo-size">
            VERARVO
          </div>
          <p className="footer-slogan">
            Crafting hyper-real visual worlds for visionary brands.
          </p>

          <div className="footer-nav-columns">
            <div className="footer-nav-col">
              <h4 className="footer-col-head">SERVICES</h4>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Product Commercials</span>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Virtual Brand Ambassadors</span>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Editorial Video Production</span>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Social Performance Ads</span>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-head">CONTACT</h4>
              <a href="mailto:jobsverarvo@gmail.com" className="footer-email-link">jobsverarvo@gmail.com</a>
              <div className="footer-social-bubbles">
                <a href="https://pf.kakao.com/_xhxiBnX" target="_blank" rel="noopener noreferrer" className="bubble-btn">Kakao</a>
                <a href="https://x.com/VERARVO" target="_blank" rel="noopener noreferrer" className="bubble-btn">X</a>
                <a href="https://www.instagram.com/verarvo/" target="_blank" rel="noopener noreferrer" className="bubble-btn">Insta</a>
                <a href="https://www.facebook.com/profile.php?id=61590815180891" target="_blank" rel="noopener noreferrer" className="bubble-btn">FB</a>
              </div>
            </div>
          </div>

          <div className="footer-copyright-line">
            © VERARVO Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileApp;
