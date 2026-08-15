import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Check, Send, Upload, Sparkles, Filter } from 'lucide-react';
import './MobileApp.css';

// All 41 original client images categorized cleanly
const allOriginalImages = [
  // Fashion & Virtual Models
  { src: '/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg', category: 'MODELS', title: 'Fashion Editorial Series I' },
  { src: '/pale_blush_pink_seamless_202605201550_1_Original.JPG', category: 'EDITORIAL', title: 'Beauty Glow Cosmetics' },
  { src: '/openart-image_1779918779704_080a80c5_1779918781015_6d955aa5_Original.PNG', category: 'EDITORIAL', title: 'Skincare Product Splash' },
  { src: '/file_00000000dd5082469b53d340a3770d19.png', category: 'PRODUCTS', title: 'Luxury Bottle Staging' },
  { src: '/file_00000000755c8243957ad3597b01b9a8.png', category: 'PRODUCTS', title: 'Minimalist Packaging Concept' },
  { src: '/file_000000002ad881f4b02295613fc8c996~2.png', category: 'PRODUCTS', title: 'Aura Serum Lighting' },
  { src: '/ABB17C8A-BF95-4E2B-91A3-A918FEF7939C.jpg', category: 'MODELS', title: 'Street Fashion Portrait' },
  { src: '/BAAACB6B-AEFE-4CF0-AC98-9135BA541349.jpg', category: 'MODELS', title: 'Haute Couture Studio Shoot' },
  { src: '/DECD6E41-38D0-4BB6-A9D4-7847BA2F0705.jpg', category: 'MODELS', title: 'Monochrome High Fashion' },
  { src: '/AD883D9D-13DD-400C-BB18-FEB80F173E07.jpg', category: 'MODELS', title: 'Editorial Model Lookbook' },
  { src: '/11FA9EAF-0D4F-4BEE-9670-4F2473094321.jpg', category: 'MODELS', title: 'Virtual Brand Ambassador' },
  { src: '/1BE99603-1471-4391-AA49-90CD31B1F4D6.jpg', category: 'MODELS', title: 'Digital Runway Staging' },
  { src: '/4CBC8E25-E527-4295-A88A-372D67E7FAD0.jpg', category: 'MODELS', title: 'Summer Collection Preview' },
  { src: '/55043724-C253-4C26-A5E7-8C55BCF46DC5.jpg', category: 'MODELS', title: 'Luxury Sunglasses Campaign' },
  { src: '/092755CE-0A63-49ED-8180-A30EF8687056.jpg', category: 'PRODUCTS', title: 'Hydra Care Serum 3D' },
  { src: '/3760999B-251C-41DC-B5F4-2EAD7E2AA190.jpg', category: 'PRODUCTS', title: 'Gold Essence Luxury Dropper' },
  { src: '/56791D9A-9EEC-402C-85A5-B66F42DA5B85.jpg', category: 'PRODUCTS', title: 'Sun Shield Botanical Bottle' },
  { src: '/578D39E0-5165-49E6-8C7F-DD5AE5D1F1EB.jpg', category: 'PRODUCTS', title: 'Cosmetic Texture Macro' },
  { src: '/80811198-6082-461B-A227-DFC81D2EA772.jpg', category: 'PRODUCTS', title: 'Beverage Refresh Staging' },
  { src: '/820A046E-0FCF-4996-84F5-A01C5D7B1C46.jpg', category: 'PRODUCTS', title: 'Perfume Silhouette Lighting' },
  { src: '/att.TJe27SYxmeMhozHrWA7RvmgV1Bq9CqKOxqnweYZc9Aw.jpg', category: 'PRODUCTS', title: 'Signature Product Reveal' },
  { src: '/a (1).jpg', category: 'LIFESTYLE', title: 'Urban Architecture Mood' },
  { src: '/a (2).jpeg', category: 'LIFESTYLE', title: 'Interior Furniture Aesthetic' },
  { src: '/a (2).jpg', category: 'LIFESTYLE', title: 'Luxury Living Space' },
  { src: '/a (3).jpeg', category: 'LIFESTYLE', title: 'Minimalist Dining Set' },
  { src: '/a (3).jpg', category: 'LIFESTYLE', title: 'Warm Tone Bedroom Mood' },
  { src: '/a (4).jpeg', category: 'LIFESTYLE', title: 'Modern Spatial Rendering' },
  { src: '/a (4).jpg', category: 'LIFESTYLE', title: 'Coffee Studio Lighting' },
  { src: '/a (5).jpeg', category: 'LIFESTYLE', title: 'Minimalist Lamp Design' },
  { src: '/a (5).jpg', category: 'LIFESTYLE', title: 'Concrete Loft Staging' },
  { src: '/a (6).jpeg', category: 'LIFESTYLE', title: 'Ceramic Art Staging' },
  { src: '/a (6).jpg', category: 'LIFESTYLE', title: 'Lounge Chair Composition' },
  { src: '/IMG_5315.jpeg', category: 'EDITORIAL', title: 'Sunset Outdoor Editorial' },
  { src: '/IMG_5329.jpeg', category: 'EDITORIAL', title: 'Golden Hour Beauty Shoot' },
  { src: '/IMG_9116.JPG', category: 'EDITORIAL', title: 'Candid Studio Snapshot' },
  { src: '/IMG_9117.JPG', category: 'EDITORIAL', title: 'Film Grain Portrait' },
  { src: '/IMG_9296.PNG', category: 'EDITORIAL', title: 'Night Mood Streetwear' },
  { src: '/IMG_9300.PNG', category: 'EDITORIAL', title: 'Neon Ambient Look' },
  { src: '/408471063_1784275816512842~2.jpeg', category: 'EDITORIAL', title: 'Creative Brand Visual' },
  { src: '/549789471_1784276133887554~2.jpeg', category: 'EDITORIAL', title: 'Vibrant Palette Campaign' },
  { src: '/Portfolio/ecommerce.webp', category: 'PRODUCTS', title: 'E-Commerce Hero Render' }
];

const differentiators = [
  {
    num: "01",
    title: "YEARS OF PRODUCTION DNA",
    desc: "Producing commercial campaigns for top-tier brands long before the AI wave. Aesthetic mastery cannot be improvised."
  },
  {
    num: "02",
    title: "CINEMA-GRADE AESTHETICS",
    desc: "Directed by veterans in fashion film and high-end advertising. The human directorial eye is honed through years of craft."
  },
  {
    num: "03",
    title: "MARKETING THAT SELLS, NOT JUST PRETTY",
    desc: "Every visual asset is engineered to maximize conversion rates and ROAS, not just to collect vanity likes."
  },
  {
    num: "04",
    title: "SYSTEMS, NOT JUST ONE-OFF CLIPS",
    desc: "Digital avatars, automated pipelines, and multi-platform content ecosystems built directly into your operations."
  },
  {
    num: "05",
    title: "-85% IN PRODUCTION COSTS",
    desc: "Zero bloated film crews, zero expensive physical set rentals, zero overhead. Same premium luxury finish."
  },
  {
    num: "06",
    title: "FROM WEEKS TO DAYS (48-72H)",
    desc: "What legacy production houses deliver in 3 to 4 weeks, our pipeline ships in 48 to 72 hours."
  },
  {
    num: "07",
    title: "10 VARIATIONS FOR RAPID A/B TESTING",
    desc: "Generate 10 distinct hooks, angles, and aspect ratios to find your winning ad creative on day one."
  }
];

const faqItems = [
  {
    q: "How long does production take?",
    a: "Our standard turnaround is 48 to 72 hours for initial creative drafts. Full multi-format campaigns are typically finalized within 5 business days."
  },
  {
    q: "How is pricing determined?",
    a: "Pricing depends on project scope, video length, stylistic complexity, and the number of multi-angle variants required. Detailed custom quotes are provided after consultation."
  },
  {
    q: "How many revisions are included?",
    a: "Every project includes 2 to 3 dedicated revision rounds to guarantee perfect alignment with your brand's visual identity."
  },
  {
    q: "What materials do I need to provide?",
    a: "Production is seamless with basic assets: high-resolution product photos/videos, brand logo vectors, and any benchmark ad references you admire."
  },
  {
    q: "Are the visuals 100% AI generated?",
    a: "All visual generation uses cutting-edge generative AI models, but our human film directors, colorists, and prompt engineers supervise every frame for studio-grade polish."
  },
  {
    q: "Who owns the commercial rights?",
    a: "Full commercial licensing and intellectual property rights are 100% transferred to the client upon final delivery. No royalty fees or hidden usage restrictions."
  }
];

// Interactive Typewriter Item Component
const TypewriterRow = ({ item, isVisible }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDesc, setTypedDesc] = useState('');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let tIdx = 0;
      const titleTimer = setInterval(() => {
        if (tIdx < item.title.length) {
          tIdx += 1;
          setTypedTitle(item.title.slice(0, tIdx));
        } else {
          clearInterval(titleTimer);
          let dIdx = 0;
          const descTimer = setInterval(() => {
            if (dIdx < item.desc.length) {
              dIdx += 2;
              setTypedDesc(item.desc.slice(0, dIdx));
            } else {
              clearInterval(descTimer);
            }
          }, 14);
        }
      }, 22);

      return () => clearInterval(titleTimer);
    }
  }, [isVisible, item.title, item.desc]);

  return (
    <div className={`diff-row-item diff-item-trigger ${isVisible ? 'active' : ''}`} data-id={item.num}>
      <span className="diff-big-num">{item.num}</span>
      <div className="diff-text-box">
        <h3 className="diff-title-h3">
          {hasAnimated.current ? (typedTitle || item.title.slice(0, 1)) : item.title}
          <span className="type-cursor">|</span>
        </h3>
        <p className="diff-desc-p">
          {hasAnimated.current ? (typedDesc || '') : item.desc}
        </p>
      </div>
    </div>
  );
};

const MobileApp = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(12);

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

  // Typewriter state tracking
  const [visibleDiffs, setVisibleDiffs] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      setScrollY(curY);

      // Check visibility for differentiators
      const diffEls = document.querySelectorAll('.diff-item-trigger');
      diffEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const id = el.getAttribute('data-id');
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          setVisibleDiffs(prev => ({ ...prev, [id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute Hero Video Shrink & Text Fade
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const scrollProgress = Math.min(Math.max(scrollY / (heroHeight * 0.65), 0), 1);

  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const heroTextTranslateY = -scrollProgress * 40;
  const heroVideoScale = 1 - scrollProgress * 0.12; // 1.0 -> 0.88
  const heroVideoRadius = scrollProgress * 22; // 0px -> 22px
  const heroVideoPadding = scrollProgress * 16; // 0px -> 16px

  const filteredImages = selectedCategory === 'ALL' 
    ? allOriginalImages 
    : allOriginalImages.filter(img => img.category === selectedCategory);

  const displayedImages = filteredImages.slice(0, visibleCount);

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
      {/* 1. Slim Fixed Header */}
      <header className="lathx-header">
        <div className="lathx-header-inner">
          <div className="lathx-brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            VERA<span className="text-yellow">R</span>VO
          </div>
          <div className="header-tag-pill">
            AI STUDIO
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Scroll Shrink & Text Fadeout */}
      <section className="hero-scroll-container">
        {/* Sticky background video wrapper */}
        <div 
          className="hero-video-sticky"
          style={{
            padding: `${heroVideoPadding}px`,
            transition: 'padding 0.05s ease-out'
          }}
        >
          <div 
            className="hero-video-box"
            style={{
              borderRadius: `${heroVideoRadius}px`,
              transform: `scale(${heroVideoScale})`,
              transition: 'transform 0.05s ease-out, border-radius 0.05s ease-out'
            }}
          >
            <video
              src="/Lumiere_Project.mp4"
              autoPlay
              muted
              defaultMuted
              loop
              playsInline
              controls={false}
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
            <span className="hero-tagline-text">AI CONTENT &amp; ADVERTISING AGENCY · EST. 2024</span>
          </div>

          <h1 className="hero-main-title">
            VERARVO
            <span className="title-stroked-line">CREATE THE</span>
            <span className="text-yellow-line">UNREAL</span>
          </h1>

          <p className="hero-desc-text">
            Next-generation AI imagery and cinema-grade advertising video production for global brands. Studio-quality commercials and virtual avatars delivered in 48-72 hours.
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

          <div className="hero-scroll-pill">
            <div className="scroll-pill-dot" />
          </div>
        </div>
      </section>

      {/* 3. Section Divider & Top Marquee Ticker */}
      <section className="ticker-black-bar">
        <div className="ticker-scroll-track">
          {[...Array(3)].map((_, i) => (
            <div className="ticker-group" key={i}>
              <span className="ticker-text">AI VIDEO ADS <span className="text-yellow">·</span></span>
              <span className="ticker-text">VIRTUAL CINEMA <span className="text-yellow">·</span></span>
              <span className="ticker-text">UGC AVATARS <span className="text-yellow">·</span></span>
              <span className="ticker-text">EDITORIAL SHOOTS <span className="text-yellow">·</span></span>
              <span className="ticker-text">VISUAL BRANDING <span className="text-yellow">·</span></span>
              <span className="ticker-text">META &amp; TIKTOK ADS <span className="text-yellow">·</span></span>
              <span className="ticker-text">E-COMMERCE ASSETS <span className="text-yellow">·</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3 Stats Impact Section (Big Numbers Stacked) */}
      <section className="stats-impact-section">
        <div className="stat-row-item">
          <span className="stat-huge-number">X10</span>
          <p className="stat-desc-p">More creative output in less time. Real scalable production.</p>
        </div>
        <div className="stat-row-item">
          <span className="stat-huge-number">-85%</span>
          <p className="stat-desc-p">Average cost reduction compared to traditional physical film sets.</p>
        </div>
        <div className="stat-row-item">
          <span className="stat-huge-number">100%</span>
          <p className="stat-desc-p">High-converting visual assets with guaranteed 4K studio quality.</p>
        </div>
      </section>

      {/* 5. Complete 41 Original Images Portfolio Gallery */}
      <section id="portfolio-section" className="portfolio-showcase-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">PORTFOLIO · ALL {allOriginalImages.length} ASSETS</span>
          </div>
          <h2 className="sec-title-display">
            TAKE YOUR BRAND<br />
            TO THE <em className="text-yellow-italic">NEXT</em><br />
            LEVEL WITH AI
          </h2>
          <p className="sec-subtitle-p">
            Explore our curated catalog of AI photography, fashion campaigns, and product commercial visuals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio-filter-row">
          {['ALL', 'MODELS', 'PRODUCTS', 'EDITORIAL', 'LIFESTYLE'].map((cat) => (
            <button
              key={cat}
              className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(12);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="gallery-masonry-grid">
          {displayedImages.map((img, idx) => (
            <div key={idx} className={`gallery-grid-item ${idx % 5 === 0 ? 'span-2' : ''}`}>
              <img 
                src={img.src} 
                alt={img.title} 
                className="gallery-item-img"
                loading="lazy" 
              />
              <div className="gallery-item-hover">
                <span className="gallery-cat-badge">{img.category}</span>
                <h4 className="gallery-item-title">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="load-more-center">
            <button 
              className="btn-load-more"
              onClick={() => setVisibleCount(prev => prev + 12)}
            >
              <span>VIEW MORE WORKS ({filteredImages.length - visibleCount} REMAINING)</span>
            </button>
          </div>
        )}
      </section>

      {/* 6. Trusted Brands (Yellow Band Marquee) */}
      <section className="trusted-brands-section">
        <div className="sec-header-block padded">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">PROVEN TRUST</span>
          </div>
          <h2 className="sec-title-display">
            TRUSTED BY<br />
            LEADING <em className="text-yellow-italic">BRANDS</em>
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

      {/* 7. Differentiators (01 - 07 with Real Character-by-Character Typewriter Animation) */}
      <section className="differentiators-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">DIFFERENTIATORS</span>
          </div>
          <h2 className="sec-title-display">
            WHY <em className="text-yellow-italic">VERARVO</em>
          </h2>
          <p className="sec-subtitle-p">Not just an agency. We are your unfair competitive advantage.</p>
        </div>

        <div className="diff-items-stack">
          {differentiators.map((item) => (
            <TypewriterRow 
              key={item.num} 
              item={item} 
              isVisible={visibleDiffs[item.num]} 
            />
          ))}
        </div>
      </section>

      {/* 8. Team Profiles Section */}
      <section className="team-profiles-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">THE TEAM</span>
          </div>
          <h2 className="sec-title-display">
            BEHIND <em className="text-yellow-italic">VERARVO</em>
          </h2>
          <p className="sec-subtitle-p">Three disciplines united: Strategy, Creative AI, and Software Engineering.</p>
        </div>

        <div className="team-card-stack">
          <div className="team-member-card">
            <div className="team-photo-wrap">
              <img src="/Team/Lamin.jpeg" alt="LAMIN" className="team-photo" />
            </div>
            <div className="team-details">
              <div className="yellow-mini-dash" />
              <h3 className="member-name">LAMIN</h3>
              <p className="member-role">Strategy &amp; Growth Lead</p>
              <p className="member-stat">+6-FIGURE BRAND SCALING SYSTEMS</p>
              <p className="member-bio">Scaling brand operations and digital performance with automated AI growth frameworks.</p>
            </div>
          </div>

          <div className="team-member-card">
            <div className="team-photo-wrap">
              <img src="/Team/Alex.jpeg" alt="ALEX" className="team-photo" />
            </div>
            <div className="team-details">
              <div className="yellow-mini-dash" />
              <h3 className="member-name">ALEX</h3>
              <p className="member-role">Creative AI Director</p>
              <p className="member-stat">+5M ORGANIC VIEWS ON VISUAL CAMPAIGNS</p>
              <p className="member-bio">Curating photoreal visual direction across Midjourney, Flux, Seedance, and custom fine-tuned models.</p>
            </div>
          </div>

          <div className="team-member-card">
            <div className="team-photo-wrap">
              <img src="/Team/Dario.jpeg" alt="DARIO" className="team-photo" />
            </div>
            <div className="team-details">
              <div className="yellow-mini-dash" />
              <h3 className="member-name">DARIO</h3>
              <p className="member-role">Software Engineer &amp; Systems</p>
              <p className="member-stat">CLAUDE &amp; N8N AUTOMATION PIPELINES</p>
              <p className="member-bio">Architecting custom visual automation pipelines and frictionless cloud infrastructures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="faq-section">
        <div className="sec-header-block text-center">
          <div className="sec-tag-row justify-center">
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

      {/* 10. Call to Action & Inquiry Form */}
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
              <Check size={48} color="#FFE600" />
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

      {/* 11. Minimal Footer */}
      <footer className="lathx-footer-simple">
        <div className="footer-content-stack">
          <div className="footer-brand-title">
            VERA<span className="text-yellow">R</span>VO
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
            © 2026 VERARVO Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileApp;
