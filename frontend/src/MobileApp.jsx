import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Check, Send, Upload, X, ChevronLeft, ChevronRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import './MobileApp.css';

// All 41 original client images precisely categorized with clean titles
const allOriginalImages = [
  // MODELS (31 pure fashion models, lookbooks, beauty portraits, and apparel wearers)
  { id: 1, src: '/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg', category: 'MODELS', title: 'White Lace Corset Editorial' },
  { id: 2, src: '/ABB17C8A-BF95-4E2B-91A3-A918FEF7939C.jpg', category: 'MODELS', title: 'Dessert & Lip Gloss Beauty' },
  { id: 3, src: '/BAAACB6B-AEFE-4CF0-AC98-9135BA541349.jpg', category: 'MODELS', title: 'Floral Blouse Studio Portrait' },
  { id: 4, src: '/DECD6E41-38D0-4BB6-A9D4-7847BA2F0705.jpg', category: 'MODELS', title: 'Platinum Gold Jewelry Editorial' },
  { id: 5, src: '/11FA9EAF-0D4F-4BEE-9670-4F2473094321.jpg', category: 'MODELS', title: 'Silk Lingerie Bedroom Shoot' },
  { id: 6, src: '/1BE99603-1471-4391-AA49-90CD31B1F4D6.jpg', category: 'MODELS', title: 'Night Rider Biker Campaign' },
  { id: 7, src: '/4CBC8E25-E527-4295-A88A-372D67E7FAD0.jpg', category: 'MODELS', title: 'Satin Lingerie Close-up' },
  { id: 8, src: '/55043724-C253-4C26-A5E7-8C55BCF46DC5.jpg', category: 'MODELS', title: 'Botanical Foliage High Fashion' },
  { id: 9, src: '/549789471_1784276133887554~2.jpeg', category: 'MODELS', title: 'Classic Black Sunglasses Shoot' },
  { id: 10, src: '/IMG_5315.jpeg', category: 'MODELS', title: 'Beige Suede Suit Lookbook' },
  { id: 11, src: '/IMG_5329.jpeg', category: 'MODELS', title: 'Couture Ruffle Collar Editorial' },
  { id: 12, src: '/openart-image_1779918779704_080a80c5_1779918781015_6d955aa5_Original.PNG', category: 'MODELS', title: 'Framova Luxury Perfume Model' },
  { id: 13, src: '/file_000000002ad881f4b02295613fc8c996~2.png', category: 'MODELS', title: 'Moisturizing Cream Beauty Shoot' },
  { id: 14, src: '/092755CE-0A63-49ED-8180-A30EF8687056.jpg', category: 'MODELS', title: 'Winking Lipstick Beauty Model' },
  { id: 15, src: '/3760999B-251C-41DC-B5F4-2EAD7E2AA190.jpg', category: 'MODELS', title: 'Calvin Klein Underwear Shoot' },
  { id: 16, src: '/56791D9A-9EEC-402C-85A5-B66F42DA5B85.jpg', category: 'MODELS', title: 'Glasses & Tie Lip Gloss Model' },
  { id: 17, src: '/578D39E0-5165-49E6-8C7F-DD5AE5D1F1EB.jpg', category: 'MODELS', title: 'Windblown Blonde Beauty Portrait' },
  { id: 18, src: '/80811198-6082-461B-A227-DFC81D2EA772.jpg', category: 'MODELS', title: 'Calvin Klein Athletic Model' },
  { id: 19, src: '/820A046E-0FCF-4996-84F5-A01C5D7B1C46.jpg', category: 'MODELS', title: 'Tropical Palm Leaf Beauty' },
  { id: 20, src: '/att.TJe27SYxmeMhozHrWA7RvmgV1Bq9CqKOxqnweYZc9Aw.jpg', category: 'MODELS', title: 'Rhode Skincare Commercial Model' },
  { id: 21, src: '/IMG_9116.JPG', category: 'MODELS', title: 'Lumiere Face Cream Model' },
  { id: 22, src: '/IMG_9117.JPG', category: 'MODELS', title: 'Water Splash Face Cleansing' },
  { id: 23, src: '/IMG_9296.PNG', category: 'MODELS', title: 'Jo&Co Body Scrub Model' },
  { id: 24, src: '/IMG_9300.PNG', category: 'MODELS', title: 'Lavender Mousse Skincare Model' },
  { id: 25, src: '/a (1).jpg', category: 'MODELS', title: 'Sayeah Lip Glaze Application' },
  { id: 26, src: '/a (2).jpg', category: 'MODELS', title: 'Stiletto Heels & Luxury Car' },
  { id: 27, src: '/a (3).jpg', category: 'MODELS', title: 'Grand Staircase Couture Gown' },
  { id: 28, src: '/a (4).jpg', category: 'MODELS', title: 'Diamond Jewelry Beauty Model' },
  { id: 29, src: '/a (5).jpeg', category: 'MODELS', title: 'Architectural White Gown Shoot' },
  { id: 30, src: '/a (5).jpg', category: 'MODELS', title: 'White Blazer Sports Car Shoot' },
  { id: 31, src: '/a (6).jpg', category: 'MODELS', title: 'Woven Clutch Bag Lookbook' },

  // PRODUCTS (10 pure cosmetic bottles, serums, watches, headphones, handbags, and packaging)
  { id: 32, src: '/AD883D9D-13DD-400C-BB18-FEB80F173E07.jpg', category: 'PRODUCTS', title: 'Sayeah Lip Gloss Tubes' },
  { id: 33, src: '/408471063_1784275816512842~2.jpeg', category: 'PRODUCTS', title: 'Quilted Leather Handbag' },
  { id: 34, src: '/pale_blush_pink_seamless_202605201550_1_Original.JPG', category: 'PRODUCTS', title: 'Dior Lip Gloss Staging' },
  { id: 35, src: '/file_00000000dd5082469b53d340a3770d19.png', category: 'PRODUCTS', title: 'Studio Over-Ear Headphones' },
  { id: 36, src: '/file_00000000755c8243957ad3597b01b9a8.png', category: 'PRODUCTS', title: 'Steel Chronograph Timepiece' },
  { id: 37, src: '/Ultraphotorealistic_commercial_product_2k_20.jpeg', category: 'PRODUCTS', title: 'Aurum Hydrating Serum 30ml' },
  { id: 38, src: '/a (2).jpeg', category: 'PRODUCTS', title: 'Aurum Frosted Dropper Bottle' },
  { id: 39, src: '/a (3).jpeg', category: 'PRODUCTS', title: 'VitaGreen Supergreens Canister' },
  { id: 40, src: '/a (4).jpeg', category: 'PRODUCTS', title: 'Sternhart Leather Strap Watch' },
  { id: 41, src: '/a (6).jpeg', category: 'PRODUCTS', title: 'Citrus Glow Cold-Press Juice' }
];

// 5 curated vertical video showcase items
const portfolioVideos = [
  {
    id: 1,
    src: '/sun_block.mp4',
    title: 'Sun Block Campaign',
    tag: 'BEAUTY & SKINCARE'
  },
  {
    id: 2,
    src: '/Orvelle_Project.mp4',
    title: 'Orvelle Project',
    tag: 'LUXURY EDITORIAL'
  },
  {
    id: 3,
    src: '/Motors_Test_Project.mp4',
    title: 'Motors Test Project',
    tag: 'AUTOMOTIVE CGI'
  },
  {
    id: 4,
    src: '/hf_20260702_185634_cbb4702d-c436-45dc-bcf9-6f441d464ca4.mp4',
    title: 'AI Fashion Film',
    tag: 'HAUTE COUTURE'
  },
  {
    id: 5,
    src: '/B.mp4',
    title: 'B Project Commercial',
    tag: 'BRAND PERFORMANCE'
  }
];

const differentiatorsData = [
  {
    num: "01",
    rawTitle: "HUMAN DIRECTING + AI AGILITY",
    isItem3: false,
    desc: "AI creates the hyper-real assets, but our veteran human directors, editors, and colorists supervise every single frame for studio-grade polish."
  },
  {
    num: "02",
    rawTitle: "RAPID 3-DAY TURNAROUND",
    isItem3: false,
    desc: "From initial brief and generative asset creation to final color grading and sound design, delivered in an average of 3 business days."
  },
  {
    num: "03",
    rawTitle: "PERFORMANCE-DRIVEN MARKETING",
    isItem3: true,
    desc: "Engineered specifically for high-impact social media feeds, maximizing click-through rates (CTR) and return on ad spend (ROAS)."
  },
  {
    num: "04",
    rawTitle: "MULTI-FORMAT AD VARIANTS",
    isItem3: false,
    desc: "Receive horizontal (16:9) and vertical (9:16) multi-angle formats simultaneously for YouTube, Instagram Reels, and TikTok campaigns."
  },
  {
    num: "05",
    rawTitle: "-85% BUDGET OPTIMIZATION",
    isItem3: false,
    desc: "Save up to 85% on production costs by eliminating expensive physical set rentals, location fees, and bloated film crews."
  },
  {
    num: "06",
    rawTitle: "100% COMMERCIAL RIGHTS",
    isItem3: false,
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

// 1. One-time Count-Up Animation Component on initial scroll down
const CountUpStat = ({ target, suffix = '', prefix = '', duration = 1200 }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;

          const startTime = performance.now();
          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easeOut * target);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '50px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={containerRef} className="stat-huge-number">
      {prefix}{count}{suffix}
    </span>
  );
};

// 2. Fast Sequential Typewriter Row Component for WHY VERARVO?
const FastTypewriterRow = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDesc, setTypedDesc] = useState('');
  const [isDone, setIsDone] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentTitleIdx = 0;
    const titleLen = item.rawTitle.length;
    const titleInterval = setInterval(() => {
      currentTitleIdx++;
      setTypedTitle(item.rawTitle.slice(0, currentTitleIdx));
      if (currentTitleIdx >= titleLen) {
        clearInterval(titleInterval);

        // Rapid description typing
        let currentDescIdx = 0;
        const descLen = item.desc.length;
        const descInterval = setInterval(() => {
          currentDescIdx += 3;
          if (currentDescIdx >= descLen) {
            setTypedDesc(item.desc);
            clearInterval(descInterval);
            setIsDone(true);
          } else {
            setTypedDesc(item.desc.slice(0, currentDescIdx));
          }
        }, 14);
      }
    }, 16);

    return () => {
      clearInterval(titleInterval);
    };
  }, [isVisible, item]);

  // Render Title with Yellow Bar
  const renderTitle = () => {
    if (!typedTitle) return null;

    if (item.isItem3) {
      const drivenCut = "PERFORMANCE-DRIVEN".length;
      if (typedTitle.length <= drivenCut) {
        return (
          <>
            {typedTitle}
            {!isDone && <span className="type-cursor">|</span>}
          </>
        );
      } else {
        const firstPart = typedTitle.slice(0, drivenCut);
        const secondPart = typedTitle.slice(drivenCut);
        return (
          <>
            {firstPart} <span className="text-yellow font-bold">|</span>{secondPart}
            {!isDone && <span className="type-cursor">|</span>}
          </>
        );
      }
    }

    return (
      <>
        {typedTitle}
        {isDone ? (
          <> <span className="text-yellow font-bold">|</span></>
        ) : (
          <span className="type-cursor">|</span>
        )}
      </>
    );
  };

  return (
    <div ref={rowRef} className="diff-row-item">
      <span className="diff-big-num">{item.num}</span>
      <div className="diff-text-box">
        <h3 className="diff-title-h3">{renderTitle()}</h3>
        <p className="diff-desc-p">
          {typedDesc}
          {typedTitle.length >= item.rawTitle.length && !isDone && (
            <span className="type-cursor">|</span>
          )}
        </p>
      </div>
    </div>
  );
};

const MobileApp = () => {
  const videoRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(10);

  // Lightbox Modal State
  const [activeModalIdx, setActiveModalIdx] = useState(null);

  // Vertical Video Reel State
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const videoRefs = useRef([]);
  const reelContainerRef = useRef(null);
  const reelTouchStartX = useRef(null);

  const handlePrevVideo = () => {
    setActiveVideoIdx((prev) => (prev - 1 + portfolioVideos.length) % portfolioVideos.length);
  };
  const handleNextVideo = () => {
    setActiveVideoIdx((prev) => (prev + 1) % portfolioVideos.length);
  };

  // Robust Vertical Video Autoplay & Intersection Engine (Instant smooth play on scroll & slide)
  useEffect(() => {
    // 1. Explicitly initialize all videos with required mobile attributes
    videoRefs.current.forEach((vid) => {
      if (!vid) return;
      vid.muted = true;
      vid.defaultMuted = true;
      vid.playsInline = true;
      vid.setAttribute('playsinline', 'true');
      vid.setAttribute('webkit-playsinline', 'true');
      vid.setAttribute('autoplay', 'true');
      vid.setAttribute('muted', 'true');
      vid.setAttribute('loop', 'true');
    });

    const playActive = () => {
      const activeVid = videoRefs.current[activeVideoIdx];
      if (activeVid) {
        activeVid.muted = true;
        if (activeVid.paused || activeVid.ended) {
          const p = activeVid.play();
          if (p !== undefined) p.catch(() => {});
        }
      }
      videoRefs.current.forEach((vid, idx) => {
        if (vid && idx !== activeVideoIdx) {
          vid.pause();
        }
      });
    };

    // Immediate attempt to play active video
    playActive();

    // 2. IntersectionObserver to play active video immediately when scrolled into view
    const container = reelContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playActive();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 3. User interaction kickstart (unlocks video autoplay policy on touch or scroll)
    const handleFirstInteraction = () => {
      playActive();
    };
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [activeVideoIdx]);

  // Form State (without phone field)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: [],
    message: ''
  });
  const [formFile, setFormFile] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || '';

  // Prevent accidental mobile viewport zooming (pinch-to-zoom & Safari gesture zoom)
  useEffect(() => {
    const handleGesture = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleMultiTouch = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Attach to document and window in capturing phase with { passive: false, capture: true }
    const evts = [
      ['gesturestart', handleGesture],
      ['gesturechange', handleGesture],
      ['gestureend', handleGesture],
      ['touchstart', handleMultiTouch],
      ['touchmove', handleMultiTouch],
      ['wheel', handleWheel]
    ];

    evts.forEach(([evt, handler]) => {
      document.addEventListener(evt, handler, { passive: false, capture: true });
      window.addEventListener(evt, handler, { passive: false, capture: true });
    });

    return () => {
      evts.forEach(([evt, handler]) => {
        document.removeEventListener(evt, handler, { capture: true });
        window.removeEventListener(evt, handler, { capture: true });
      });
    };
  }, []);

  // 1. Mobile Video Robust Autoplay & Unconditional Scroll-Up Replay Engine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const forcePlay = () => {
      if (!video) return;
      if (video.paused || video.ended) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

    // Initial play trigger
    forcePlay();

    // Heartbeat check every 250ms when in top viewport region
    const heartbeat = setInterval(() => {
      if (window.scrollY < 800) {
        forcePlay();
      }
    }, 250);

    // Active IntersectionObserver to immediately resume on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          forcePlay();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(video);

    // Replay on video ended
    const handleEnded = () => {
      video.currentTime = 0;
      forcePlay();
    };
    video.addEventListener('ended', handleEnded);

    // Visibility / Tab switch listener
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && window.scrollY < 800) {
        forcePlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Touch wake-up triggers
    window.addEventListener('touchstart', forcePlay, { passive: true });

    return () => {
      clearInterval(heartbeat);
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('touchstart', forcePlay);
    };
  }, []);

  // 2. Smooth Scroll Tracker & Scroll-Driven Video Playback Guard
  useEffect(() => {
    const handleScroll = () => {
      const curY = window.scrollY;
      setScrollY(curY);

      // Instantly play video if user scrolls back up into hero area
      if (curY < 700 && videoRef.current) {
        if (videoRef.current.paused || videoRef.current.ended) {
          videoRef.current.play().catch(() => {});
        }
      }
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

  // Form Submission handler sending data to jobsverarvo@gmail.com with zero-delay fallback
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    setFormSubmitting(true);

    const projectTypesStr = formData.projectType.length > 0 
      ? formData.projectType.join(', ') 
      : 'General Creative Inquiry';

    const detailedMessage = `
[VERARVO Mobile Proposal Inquiry]
- Client / Brand: ${formData.name}
- Email: ${formData.email}
- Project Types: ${projectTypesStr}
- Attached File: ${formFile ? formFile.name : 'None'}

[Creative Brief / Message Details]:
${formData.message || 'No additional notes provided.'}
`.trim();

    // 1. Direct Formsubmit email transmission to jobsverarvo@gmail.com using verified secure token
    const formSubmitPromise = fetch('https://formsubmit.co/ajax/8f20e3b95dde018d33d6e9eb3da45e0b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[VERARVO Proposal] ${formData.name} - ${projectTypesStr}`,
        _template: 'table',
        _captcha: 'false',
        'Brand / Contact Name': formData.name,
        'Sender Email': formData.email,
        'Project Types': projectTypesStr,
        'Attached File Name': formFile ? formFile.name : 'None',
        'Project Details & References': formData.message || 'No additional notes'
      })
    }).catch(err => {
      console.warn('FormSubmit notice:', err);
      return null;
    });

    // 2. Dual transmission via backend API endpoint if active
    const backendPromise = fetch(`${API_BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: detailedMessage
      })
    }).catch(err => {
      console.warn('Backend API notice:', err);
      return null;
    });

    // 3. Guaranteed timeout safeguard (max 1.8 seconds) so user NEVER gets stuck on SUBMITTING
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1800));

    try {
      await Promise.race([
        Promise.allSettled([formSubmitPromise, backendPromise]),
        timeoutPromise
      ]);
    } catch (_) {}

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
      {/* 1. Slim Fixed Header with Signature VERARVO Italic Serif + Background Monogram Emblem */}
      <header className="lathx-header">
        <div className="lathx-header-inner">
          <div className="header-logo-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="header-logo-text">
              VER
              <span className="header-logo-a-wrap">
                A
                <img 
                  src="/logo-nv-transparent-hq.png" 
                  alt="" 
                  className="header-logo-bg-emblem" 
                />
              </span>
              RVO
            </span>
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

      {/* 4. 3 Stats Impact Section with Count-Up 0 -> Target Animation */}
      <section className="stats-impact-section">
        <div className="stat-row-item">
          <CountUpStat target={3} suffix=" DAYS" duration={1000} />
          <p className="stat-desc-p">Average production turnaround from initial creative brief to final 4K delivery.</p>
        </div>
        <div className="stat-row-item">
          <CountUpStat target={85} prefix="-" suffix="%" duration={1200} />
          <p className="stat-desc-p">Average budget reduction compared to traditional physical studio shoots and set rentals.</p>
        </div>
        <div className="stat-row-item">
          <CountUpStat target={100} suffix="%" duration={1300} />
          <p className="stat-desc-p">Guaranteed studio-grade visual conversion quality and full commercial rights transfer.</p>
        </div>
      </section>

      {/* 5. Complete 41 Original Images Categorized into ALL, MODELS, PRODUCTS */}
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
            Explore our curated catalog of AI commercial photography, fashion models, and product staging visuals.
          </p>
        </div>

        {/* Filter Tabs without parentheses or numbers */}
        <div className="portfolio-filter-row">
          {['ALL', 'MODELS', 'PRODUCTS'].map((cat) => (
            <button
              key={cat}
              className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(10);
              }}
            >
              {cat}
            </button>
          ))}
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

        {/* Load More Button without parentheses or numbers */}
        {visibleCount < filteredImages.length && (
          <div className="load-more-center">
            <button 
              className="btn-load-more"
              onClick={() => setVisibleCount(prev => prev + 10)}
            >
              <span>VIEW MORE WORKS</span>
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

        {/* Vertical Video Showcase */}
        <div ref={reelContainerRef} className="vertical-video-showcase-wrap">
          <div className="video-showcase-header">
            <div className="sec-tag-row" style={{ justifyContent: 'center' }}>
              <span className="yellow-dash" />
              <span className="sec-tag-text">AI VIDEO SHOWCASE</span>
            </div>
            <h3 className="video-showcase-title">
              AI COMMERCIAL <em className="text-yellow-italic">VIDEOS</em>
            </h3>
          </div>

          <div 
            className="vertical-reel-carousel-container"
            onTouchStart={(e) => {
              if (e.touches && e.touches.length === 1) {
                reelTouchStartX.current = e.touches[0].clientX;
              }
            }}
            onTouchEnd={(e) => {
              if (reelTouchStartX.current !== null && e.changedTouches && e.changedTouches.length === 1) {
                const deltaX = e.changedTouches[0].clientX - reelTouchStartX.current;
                if (deltaX > 35) handlePrevVideo();
                else if (deltaX < -35) handleNextVideo();
              }
              reelTouchStartX.current = null;
            }}
          >
            {/* Far-Left Arrow Button */}
            <button 
              className="reel-arrow-btn prev-btn" 
              onClick={handlePrevVideo} 
              aria-label="Previous Video"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Video Viewport / Frame */}
            <div className="reel-video-viewport">
              <div 
                className="reel-slider-track"
                style={{ transform: `translateX(-${activeVideoIdx * 100}%)` }}
              >
                {portfolioVideos.map((vid, idx) => (
                  <div className="reel-slide-item" key={vid.id}>
                    <video
                      ref={(el) => (videoRefs.current[idx] = el)}
                      src={vid.src}
                      playsInline
                      autoPlay={idx === 0}
                      loop
                      muted
                      preload="auto"
                      className="reel-video-media"
                    />

                    {/* Bottom Title on Video */}
                    <div className="reel-card-bottom-bar">
                      <h4 className="reel-card-title">{vid.title}</h4>
                      <div className="reel-brand-row">
                        <Sparkles size={13} className="text-yellow" />
                        <span>AI COMMERCIAL PRODUCTION</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Far-Right Arrow Button */}
            <button 
              className="reel-arrow-btn next-btn" 
              onClick={handleNextVideo} 
              aria-label="Next Video"
            >
              <ChevronRight size={24} />
            </button>
          </div>
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

      {/* 6. Proven Track Record / Core Production Capabilities (Deep Rich Yellow Band Marquee) */}
      <section className="trusted-brands-section">
        <div className="sec-header-block padded">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">PROVEN TRACK RECORD</span>
          </div>
          <h2 className="sec-title-display">
            HIGH IMPACT<br />
            CREATIVE <em className="text-yellow-italic">CAPABILITIES</em>
          </h2>
        </div>

        <div className="yellow-marquee-banner">
          <div className="yellow-marquee-track">
            {[...Array(3)].map((_, i) => (
              <div className="yellow-marquee-group" key={i}>
                <span className="brand-item-text">AI COMMERCIAL PRODUCTION <span className="black-dot">·</span></span>
                <span className="brand-item-text">VIRTUAL BRAND AMBASSADORS <span className="black-dot">·</span></span>
                <span className="brand-item-text">3-DAY RAPID DELIVERY <span className="black-dot">·</span></span>
                <span className="brand-item-text">PERFORMANCE SHORT-FORM ADS <span className="black-dot">·</span></span>
                <span className="brand-item-text">4K CINEMATIC COLOR GRADING <span className="black-dot">·</span></span>
                <span className="brand-item-text">100% COMMERCIAL RIGHTS <span className="black-dot">·</span></span>
                <span className="brand-item-text">HYPER-REAL PRODUCT 3D <span className="black-dot">·</span></span>
                <span className="brand-item-text">STUDIO-GRADE HUMAN DIRECTING <span className="black-dot">·</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Differentiators (01 - 06) with Sharp WHY, VERARVO? and Fast Typing */}
      <section className="differentiators-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">DIFFERENTIATORS</span>
          </div>
          <h2 className="sec-title-display">
            <span className="why-sharp-text">WHY</span> <span className="why-verarvo-serif">VERARVO?</span>
          </h2>
          <p className="sec-subtitle-p">Not just an agency. We are your unfair competitive advantage.</p>
        </div>

        <div className="diff-items-stack">
          {differentiatorsData.map((item) => (
            <FastTypewriterRow key={item.num} item={item} />
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
              <Check size={48} color="#E6B800" />
              <h4>Your proposal request has been received!</h4>
              <p>Our dedicated account manager will review your project details and respond within 24 hours.</p>
              <button 
                className="btn-chamfer-yellow mt-4"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', projectType: [], message: '' });
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
          <div className="header-logo-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="header-logo-text footer-scale">
              VER
              <span className="header-logo-a-wrap">
                A
                <img 
                  src="/logo-nv-transparent-hq.png" 
                  alt="" 
                  className="header-logo-bg-emblem" 
                />
              </span>
              RVO
            </span>
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
              <div className="footer-social-icons-row">
                {/* 1. KakaoTalk Official Rounded Badge with Speech Bubble & TALK text */}
                <a 
                  href="https://pf.kakao.com/_xhxiBnX" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-icon-link"
                  aria-label="KakaoTalk Channel"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="5.5" fill="currentColor" />
                    <path d="M12 5.5c-3.866 0-7 2.462-7 5.5 0 1.954 1.296 3.67 3.274 4.628l-.83 3.05a.25.25 0 0 0 .362.277l3.58-2.368c.203.023.41.035.614.035 3.866 0 7-2.462 7-5.5s-3.134-5.5-7-5.5z" fill="#000000" />
                    <path d="M8.2 9.4h2.4v.7h-.85v2.2h-.7v-2.2H8.2v-.7zm3.1 0h.8l1.1 2.9h-.8l-.2-.5h-.9l-.2.5h-.75l1.05-2.9zm.35.7l-.3.8h.6l-.3-.8zm2.2-.7h.75v2.2h1.2v.7h-1.95v-2.9zm2.6 0h.75v1l1-1h1l-1.1 1.1 1.2 1.8h-.9l-.85-1.3-.25.25v1.05h-.75v-2.9z" fill="#000000" />
                  </svg>
                </a>

                {/* 2. Instagram Outlined Camera */}
                <a 
                  href="https://www.instagram.com/verarvo/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-icon-link"
                  aria-label="Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5.5" ry="5.5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </a>

                {/* 3. Facebook Stylized 'f' */}
                <a 
                  href="https://www.facebook.com/profile.php?id=61590815180891" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-icon-link"
                  aria-label="Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
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
