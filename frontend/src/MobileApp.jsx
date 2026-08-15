import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Check, Send, Upload, ArrowLeft } from 'lucide-react';
import './MobileApp.css';

const faqItems = [
  {
    q: "How long does production take?",
    a: "Our standard turnaround is 48 to 72 hours for initial creative drafts. Full campaigns are typically finalized and delivered within 5 business days."
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
    a: "Production is seamless with basic assets: high-resolution product photos/videos, brand logo files, and any benchmark ad references you love."
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

const differentiators = [
  {
    num: "01",
    title: "YEARS OF PRODUCTION DNA",
    desc: "Producing visual campaigns for global brands long before the AI hype. Aesthetic mastery cannot be improvised."
  },
  {
    num: "02",
    title: "CINEMA-GRADE AESTHETICS",
    desc: "Directed by veterans in fashion films and branding. The human directorial eye is trained over years of craft."
  },
  {
    num: "03",
    title: "MARKETING THAT SELLS, NOT JUST PRETTY",
    desc: "Every visual asset is engineered to convert and maximize ROAS, not just to collect vanity likes."
  },
  {
    num: "04",
    title: "SYSTEMS, NOT JUST ONE-OFF CLIPS",
    desc: "Digital avatars, automated workflows, and multi-platform asset pipelines integrated seamlessly into your brand."
  },
  {
    num: "05",
    title: "-85% IN PRODUCTION COSTS",
    desc: "Zero bloated film crews, zero expensive physical set rentals, zero overhead. Same premium luxury finish."
  },
  {
    num: "06",
    title: "FROM WEEKS TO DAYS (48-72H)",
    desc: "What legacy production agencies take 3 to 4 weeks to shoot, we deliver in 48 to 72 hours."
  },
  {
    num: "07",
    title: "10 VARIATIONS FOR RAPID A/B TESTING",
    desc: "Generate 10 distinct hooks and multi-format angles for real-time performance optimization."
  }
];

const MobileApp = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);

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

  // Typewriter state for Differentiators
  const [visibleDiffs, setVisibleDiffs] = useState({});

  // Scroll listener for hero video scale & typewriter trigger
  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      setScrollY(curY);

      // Trigger typewriter for diff items based on viewport
      const diffElements = document.querySelectorAll('.diff-item-trigger');
      diffElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const id = el.getAttribute('data-id');
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
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
  const scrollProgress = Math.min(Math.max(scrollY / (heroHeight * 0.7), 0), 1);

  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const heroTextTranslateY = -scrollProgress * 40;
  const heroVideoScale = 1 - scrollProgress * 0.12; // 1 -> 0.88
  const heroVideoRadius = scrollProgress * 22; // 0px -> 22px
  const heroVideoPadding = scrollProgress * 16; // 0px -> 16px

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
            Next-generation AI imagery and high-converting video production for global brands. Studio-quality ads and digital avatars delivered in 48-72 hours.
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

          {/* Pulsing Scroll Indicator */}
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
              <span className="ticker-text">AI CONTENT <span className="text-yellow">·</span></span>
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
          <p className="stat-desc-p">Average cost reduction compared to traditional film sets.</p>
        </div>
        <div className="stat-row-item">
          <span className="stat-huge-number">100%</span>
          <p className="stat-desc-p">High-converting visual assets with guaranteed 4K quality.</p>
        </div>
      </section>

      {/* 5. Portfolio Showcase Section */}
      <section id="portfolio-section" className="portfolio-showcase-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">PORTFOLIO</span>
          </div>
          <h2 className="sec-title-display">
            TAKE YOUR BRAND<br />
            TO THE <em className="text-yellow-italic">NEXT</em><br />
            LEVEL WITH AI
          </h2>
        </div>

        <div className="portfolio-card-stack">
          {/* Card 1: Product Ad */}
          <div className="port-card card-tall">
            <img src="/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg" alt="Product Advertising" className="port-card-img" />
            <div className="port-card-info">
              <span className="port-cat-badge">AI PHOTOGRAPHY · BRANDING</span>
              <h3 className="port-card-title">PRODUCT ADVERTISING</h3>
              <p className="port-card-desc">Cinematic visual production crafted with hyper-real AI aesthetics to maximize conversion rates and brand desire.</p>
            </div>
          </div>

          {/* Card 2: Event & Exhibition */}
          <div className="port-card card-medium">
            <img src="/Portfolio/ecommerce.webp" alt="Event & Exhibition" className="port-card-img" />
            <div className="port-card-info">
              <span className="port-cat-badge">VISUALIZATION · E-COMMERCE</span>
              <h3 className="port-card-title">EVENT &amp; EXHIBITION</h3>
              <p className="port-card-desc">Immersive promotional visuals and digital activations designed to dominate trade shows and launches.</p>
            </div>
          </div>

          {/* Card 3: Social Short-Form */}
          <div className="port-card card-square">
            <img src="/Portfolio/ugc.webp" alt="Social Short-Form" className="port-card-img" />
            <div className="port-card-info">
              <span className="port-cat-badge">AI CONTENT · SOCIAL ADS</span>
              <h3 className="port-card-title">SOCIAL SHORT-FORM</h3>
              <p className="port-card-desc">Fast-paced, viral-ready short-form video creatives engineered for high engagement on Reels, Shorts, and TikTok.</p>
            </div>
          </div>

          {/* Card 4: Virtual Model */}
          <div className="port-card card-square">
            <img src="/Portfolio/ads.webp" alt="Virtual Model" className="port-card-img" />
            <div className="port-card-info">
              <span className="port-cat-badge">ADS · PERFORMANCE AVATARS</span>
              <h3 className="port-card-title">VIRTUAL AMBASSADORS</h3>
              <p className="port-card-desc">Consistent hyper-realistic AI ambassadors and fashion models without casting, location, or schedule constraints.</p>
            </div>
          </div>

          {/* Card 5: Interior & Spatial */}
          <div className="port-card card-square">
            <img src="/Portfolio/automatizacion.png" alt="Interior & Architecture" className="port-card-img" />
            <div className="port-card-info">
              <span className="port-cat-badge">AI · SPATIAL DESIGN</span>
              <h3 className="port-card-title">INTERIOR &amp; SPATIAL</h3>
              <p className="port-card-desc">Atmospheric luxury architecture, furniture staging, and spatial moods brought to life with photoreal precision.</p>
            </div>
          </div>
        </div>
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

      {/* 7. Differentiators (01 - 07 with Live Typewriter Cursor) */}
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
          {differentiators.map((item) => {
            const isVisible = visibleDiffs[item.num];
            return (
              <div 
                key={item.num} 
                className={`diff-row-item diff-item-trigger ${isVisible ? 'active' : ''}`}
                data-id={item.num}
              >
                <span className="diff-big-num">{item.num}</span>
                <div className="diff-text-box">
                  <h3 className="diff-title-h3">
                    {item.title}
                    <span className="type-cursor">|</span>
                  </h3>
                  <p className="diff-desc-p">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Team Section */}
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
              <p className="member-bio">Curating photoreal visual direction across Midjourney, Flux, Seedance, and custom fine-tuned pipelines.</p>
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
          <p className="cta-sub-p">First results in 48-72h. No legacy production overhead. Complete commercial rights.</p>
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
                  placeholder="John Doe / Brand Co."
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
                  {['Product Ad', 'Event & Exhibition', 'Social Short-Form', 'Virtual Model', 'Custom / Other'].map((type) => (
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
                  placeholder="Describe your visual concept, target deliverables, reference links, and estimated budget."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">ATTACH FILE (OPTIONAL)</label>
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
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Product Photography</span>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>UGC &amp; Digital Avatars</span>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Editorial Video</span>
              <span className="footer-nav-link" onClick={() => scrollToSection('portfolio-section')}>Social Media Ads</span>
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
