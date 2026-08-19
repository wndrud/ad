import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Check, Send, Upload, X, ChevronLeft, ChevronRight, Sparkles, Volume2, VolumeX, Globe, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from './i18n.js';
import './MobileApp.css';

// All 45 original client images (35 MODELS & 10 PRODUCTS interleaved for rich, dynamic catalog presentation)
const allOriginalImages = [
  { id: 1, src: '/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg', category: 'MODELS', title: 'White Lace Corset Editorial' },
  { id: 2, src: '/ABB17C8A-BF95-4E2B-91A3-A918FEF7939C.jpg', category: 'MODELS', title: 'Dessert & Lip Gloss Beauty' },
  { id: 3, src: '/AD883D9D-13DD-400C-BB18-FEB80F173E07.jpg', category: 'PRODUCTS', title: 'Sayeah Lip Gloss Tubes' },
  { id: 4, src: '/BAAACB6B-AEFE-4CF0-AC98-9135BA541349.jpg', category: 'MODELS', title: 'Floral Blouse Studio Portrait' },
  { id: 5, src: '/DECD6E41-38D0-4BB6-A9D4-7847BA2F0705.jpg', category: 'MODELS', title: 'Platinum Gold Jewelry Editorial' },
  { id: 6, src: '/408471063_1784275816512842~2.jpeg', category: 'PRODUCTS', title: 'Quilted Leather Handbag' },
  { id: 7, src: '/11FA9EAF-0D4F-4BEE-9670-4F2473094321.jpg', category: 'MODELS', title: 'Silk Lingerie Bedroom Shoot' },
  { id: 8, src: '/1BE99603-1471-4391-AA49-90CD31B1F4D6.jpg', category: 'MODELS', title: 'Night Rider Biker Campaign' },
  { id: 9, src: '/pale_blush_pink_seamless_202605201550_1_Original.JPG', category: 'PRODUCTS', title: 'Dior Lip Gloss Staging' },
  { id: 10, src: '/4CBC8E25-E527-4295-A88A-372D67E7FAD0.jpg', category: 'MODELS', title: 'Satin Lingerie Close-up' },
  { id: 11, src: '/55043724-C253-4C26-A5E7-8C55BCF46DC5.jpg', category: 'MODELS', title: 'Botanical Foliage High Fashion' },
  { id: 12, src: '/file_00000000dd5082469b53d340a3770d19.png', category: 'PRODUCTS', title: 'Studio Over-Ear Headphones' },
  { id: 13, src: '/549789471_1784276133887554~2.jpeg', category: 'MODELS', title: 'Classic Black Sunglasses Shoot' },
  { id: 14, src: '/IMG_5315.jpeg', category: 'MODELS', title: 'Beige Suede Suit Lookbook' },
  { id: 15, src: '/file_00000000755c8243957ad3597b01b9a8.png', category: 'PRODUCTS', title: 'Steel Chronograph Timepiece' },
  { id: 16, src: '/IMG_5329.jpeg', category: 'MODELS', title: 'Couture Ruffle Collar Editorial' },
  { id: 17, src: '/openart-image_1779918779704_080a80c5_1779918781015_6d955aa5_Original.PNG', category: 'MODELS', title: 'Framova Luxury Perfume Model' },
  { id: 18, src: '/Ultraphotorealistic_commercial_product_2k_20.jpeg', category: 'PRODUCTS', title: 'Aurum Hydrating Serum 30ml' },
  { id: 19, src: '/file_000000002ad881f4b02295613fc8c996~2.png', category: 'MODELS', title: 'Moisturizing Cream Beauty Shoot' },
  { id: 20, src: '/092755CE-0A63-49ED-8180-A30EF8687056.jpg', category: 'MODELS', title: 'Winking Lipstick Beauty Model' },
  { id: 21, src: '/a (2).jpeg', category: 'PRODUCTS', title: 'Aurum Frosted Dropper Bottle' },
  { id: 22, src: '/3760999B-251C-41DC-B5F4-2EAD7E2AA190.jpg', category: 'MODELS', title: 'Calvin Klein Underwear Shoot' },
  { id: 23, src: '/56791D9A-9EEC-402C-85A5-B66F42DA5B85.jpg', category: 'MODELS', title: 'Glasses & Tie Lip Gloss Model' },
  { id: 24, src: '/a (3).jpeg', category: 'PRODUCTS', title: 'VitaGreen Supergreens Canister' },
  { id: 25, src: '/578D39E0-5165-49E6-8C7F-DD5AE5D1F1EB.jpg', category: 'MODELS', title: 'Windblown Blonde Beauty Portrait' },
  { id: 26, src: '/80811198-6082-461B-A227-DFC81D2EA772.jpg', category: 'MODELS', title: 'Calvin Klein Athletic Model' },
  { id: 27, src: '/a (4).jpeg', category: 'PRODUCTS', title: 'Sternhart Leather Strap Watch' },
  { id: 28, src: '/820A046E-0FCF-4996-84F5-A01C5D7B1C46.jpg', category: 'MODELS', title: 'Tropical Palm Leaf Beauty' },
  { id: 29, src: '/att.TJe27SYxmeMhozHrWA7RvmgV1Bq9CqKOxqnweYZc9Aw.jpg', category: 'MODELS', title: 'Rhode Skincare Commercial Model' },
  { id: 30, src: '/a (6).jpeg', category: 'PRODUCTS', title: 'Citrus Glow Cold-Press Juice' },
  { id: 31, src: '/IMG_9116.JPG', category: 'MODELS', title: 'Lumiere Face Cream Model' },
  { id: 32, src: '/IMG_9117.JPG', category: 'MODELS', title: 'Water Splash Face Cleansing' },
  { id: 33, src: '/IMG_9296.PNG', category: 'MODELS', title: 'Jo&Co Body Scrub Model' },
  { id: 34, src: '/IMG_9300.PNG', category: 'MODELS', title: 'Lavender Mousse Skincare Model' },
  { id: 35, src: '/a (1).jpg', category: 'MODELS', title: 'Sayeah Lip Glaze Application' },
  { id: 36, src: '/a (2).jpg', category: 'MODELS', title: 'Stiletto Heels & Luxury Car' },
  { id: 37, src: '/a (3).jpg', category: 'MODELS', title: 'Grand Staircase Couture Gown' },
  { id: 38, src: '/a (4).jpg', category: 'MODELS', title: 'Diamond Jewelry Beauty Model' },
  { id: 39, src: '/a (5).jpeg', category: 'MODELS', title: 'Architectural White Gown Shoot' },
  { id: 40, src: '/a (5).jpg', category: 'MODELS', title: 'White Blazer Sports Car Shoot' },
  { id: 41, src: '/a (6).jpg', category: 'MODELS', title: 'Woven Clutch Bag Lookbook' },
  { id: 42, src: '/Q.png', category: 'MODELS', title: 'Ivory Tailored Suit Lookbook' },
  { id: 43, src: '/W.png', category: 'MODELS', title: 'Brutalist Architecture Fashion' },
  { id: 44, src: '/E.jpeg', category: 'MODELS', title: 'Monochrome Stiletto Editorial' },
  { id: 45, src: '/R.PNG', category: 'MODELS', title: 'La Bella Retinol Beauty Model' }
];

// 8 curated vertical video showcase items (with Orvelle Project as #1)
const portfolioVideos = [
  {
    id: 1,
    src: '/Orvelle_Project.mp4',
    title: 'Orvelle Project',
    tag: 'LUXURY EDITORIAL'
  },
  {
    id: 2,
    src: '/sun_block.mp4',
    title: 'Sun Block Campaign',
    tag: 'BEAUTY & SKINCARE'
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
  },
  {
    id: 6,
    src: '/12681248_optimized.mp4',
    title: 'Cinematic Motion Ad',
    tag: 'DYNAMIC PERFORMANCE'
  },
  {
    id: 7,
    src: '/D.mp4',
    title: 'D Editorial Project',
    tag: 'LUXURY COMMERCIAL'
  },
  {
    id: 8,
    src: '/hf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52.mp4',
    title: 'Haute Couture Visuals',
    tag: 'AVANT-GARDE FASHION'
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
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * target);
            setCount(currentCount);

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
  const [typedTitle, setTypedTitle] = useState(item.rawTitle);
  const [typedDesc, setTypedDesc] = useState(item.desc);
  const [isDone, setIsDone] = useState(true);
  const rowRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          setIsVisible(true);
          hasTriggeredRef.current = true;
        }
      },
      { threshold: 0.15 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setTypedTitle(item.rawTitle);
      setTypedDesc(item.desc);
      setIsDone(true);
      return;
    }

    setTypedTitle('');
    setTypedDesc('');
    setIsDone(false);

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
  }, [isVisible, item.rawTitle, item.desc]);

  // Render Title with Yellow Bar
  const renderTitle = () => {
    if (!typedTitle) return null;

    if (item.isItem3) {
      const splitCut = item.splitCut || "PERFORMANCE-DRIVEN".length;
      if (typedTitle.length <= splitCut) {
        return (
          <>
            {typedTitle}
            {!isDone && <span className="type-cursor">|</span>}
          </>
        );
      } else {
        const firstPart = typedTitle.slice(0, splitCut);
        const secondPart = typedTitle.slice(splitCut);
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
  const [lang, setLang] = useState('EN'); // Default: EN
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

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

  // Robust Vertical Video Autoplay & Intersection Engine (Plays ONLY when scrolled into view)
  useEffect(() => {
    // 1. Explicitly initialize all vertical reel videos with required mobile attributes
    videoRefs.current.forEach((vid) => {
      if (!vid) return;
      vid.muted = true;
      vid.defaultMuted = true;
      vid.volume = 0;
      vid.playsInline = true;
      vid.setAttribute('playsinline', '');
      vid.setAttribute('webkit-playsinline', '');
      vid.setAttribute('muted', '');
      vid.setAttribute('loop', '');
    });

    const playActive = () => {
      const activeVid = videoRefs.current[activeVideoIdx];
      if (activeVid) {
        activeVid.muted = true;
        activeVid.defaultMuted = true;
        activeVid.volume = 0;
        if (activeVid.paused || activeVid.ended) {
          const p = activeVid.play();
          if (p !== undefined) p.catch(() => {});
        }
      }
      videoRefs.current.forEach((vid, idx) => {
        if (vid && idx !== activeVideoIdx && !vid.paused) {
          vid.pause();
        }
      });
    };

    const pauseAll = () => {
      videoRefs.current.forEach((vid) => {
        if (vid && !vid.paused) {
          vid.pause();
        }
      });
    };

    // 2. IntersectionObserver to play active video ONLY when vertical reel section is scrolled into view
    const container = reelContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playActive();
        } else {
          pauseAll();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      pauseAll();
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

  // 1. Instant Callback Ref to guarantee 0-second immediate autoplay upon initial site entrance
  const handleHeroVideoMount = (el) => {
    videoRef.current = el;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    el.playsInline = true;
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
    el.setAttribute('muted', '');
    el.setAttribute('autoplay', '');
    el.setAttribute('loop', '');
    el.setAttribute('preload', 'auto');

    const tryInstantPlay = () => {
      if (!el) return;
      el.muted = true;
      el.defaultMuted = true;
      el.volume = 0;
      if (el.paused || el.ended) {
        const p = el.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    };

    tryInstantPlay();
    requestAnimationFrame(tryInstantPlay);
    setTimeout(tryInstantPlay, 20);
    setTimeout(tryInstantPlay, 80);
    setTimeout(tryInstantPlay, 200);
    setTimeout(tryInstantPlay, 500);
  };

  // 2. Mobile Video Instant Autoplay & Keep-Alive Lifecycle Engine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');

    const forcePlay = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      if (v.paused || v.ended) {
        const promise = v.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

    forcePlay();
    const t1 = setTimeout(forcePlay, 50);
    const t2 = setTimeout(forcePlay, 150);
    const t3 = setTimeout(forcePlay, 350);

    // Active IntersectionObserver to play when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          forcePlay();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(video);

    // Replay on video ended
    const handleEnded = () => {
      if (video) {
        video.currentTime = 0;
        forcePlay();
      }
    };
    video.addEventListener('ended', handleEnded);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && window.scrollY < 800) {
        forcePlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pageshow', forcePlay);
    window.addEventListener('load', forcePlay);

    // Immediate interaction wake-up triggers
    window.addEventListener('touchstart', forcePlay, { passive: true, capture: true });
    window.addEventListener('pointerdown', forcePlay, { passive: true, capture: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pageshow', forcePlay);
      window.removeEventListener('load', forcePlay);
      window.removeEventListener('touchstart', forcePlay, { capture: true });
      window.removeEventListener('pointerdown', forcePlay, { capture: true });
    };
  }, []);

  // 3. Smooth Scroll Tracker & Scroll-Driven Video Playback Guard
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
Language: ${lang}
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
        'Language': lang,
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
    <div className={`mobile-app-root ${lang === 'KO' ? 'lang-ko' : ''} ${lang === 'ZH' ? 'lang-zh' : ''}`}>
      {/* 1. Slim Fixed Header with Signature VERARVO Italic Serif + Top-Right Multi-Language Switcher */}
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

          {/* Top-Right Luxury Language Selector Dropdown with Flags (🇺🇸 EN, 🇰🇷 KO, 🇨🇳 ZH) */}
          <div className="header-lang-wrapper" ref={langMenuRef}>
            <button 
              className="header-lang-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setIsLangMenuOpen(prev => !prev);
              }}
              type="button"
              aria-label="Select Language"
            >
              <span className="lang-flag-icon">
                {lang === 'KO' ? '🇰🇷' : lang === 'ZH' ? '🇨🇳' : '🇺🇸'}
              </span>
              <span className="current-lang-code">{lang}</span>
              <ChevronDown size={12} className={`lang-arrow ${isLangMenuOpen ? 'open' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div 
                className="header-lang-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                {[
                  { code: 'EN', flag: '🇺🇸', label: 'English' },
                  { code: 'KO', flag: '🇰🇷', label: '한국어' },
                  { code: 'ZH', flag: '🇨🇳', label: '中文' }
                ].map(item => (
                  <button
                    key={item.code}
                    type="button"
                    className={`lang-option-btn ${lang === item.code ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLang(item.code);
                      setIsLangMenuOpen(false);
                    }}
                  >
                    <span className="lang-option-left">
                      <span className="lang-option-flag">{item.flag}</span>
                      <span className="lang-option-name">{item.label}</span>
                    </span>
                    {lang === item.code && <Check size={14} className="text-yellow" />}
                  </button>
                ))}
              </div>
            )}
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
                ref={handleHeroVideoMount}
                src="/Lumiere_Project.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                disablePictureInPicture
                preload="auto"
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  v.muted = true;
                  v.defaultMuted = true;
                  v.volume = 0;
                  v.play().catch(() => {});
                }}
                onCanPlay={(e) => {
                  const v = e.currentTarget;
                  v.muted = true;
                  v.defaultMuted = true;
                  v.volume = 0;
                  v.play().catch(() => {});
                }}
                onCanPlayThrough={(e) => {
                  const v = e.currentTarget;
                  v.muted = true;
                  v.defaultMuted = true;
                  v.volume = 0;
                  v.play().catch(() => {});
                }}
                onLoadedData={(e) => {
                  const v = e.currentTarget;
                  v.muted = true;
                  v.defaultMuted = true;
                  v.volume = 0;
                  v.play().catch(() => {});
                }}
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
              <span className="hero-tagline-text">{t.hero.tagline}</span>
            </div>

            <h1 className="hero-main-title">
              <span className="hero-title-hollow">{t.hero.titleMain}</span>
              <span className="title-stroked-line">{t.hero.titleLine2}</span>
              <span className="text-yellow-line">{t.hero.titleLine3}</span>
            </h1>

            <p className="hero-desc-text">
              {t.hero.desc}
            </p>

            <div className="hero-btn-row">
              <button className="btn-chamfer-yellow" onClick={() => scrollToSection('inquiry-section')}>
                <span>{t.hero.btnProposal}</span>
                <ArrowRight size={16} />
              </button>
              <button className="btn-link-white" onClick={() => scrollToSection('portfolio-section')}>
                {t.hero.btnPortfolio}
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
              {t.ticker.map((item, idx) => (
                <span className="ticker-text" key={idx}>
                  {item} <span className="text-yellow">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3 Stats Impact Section with Count-Up 0 -> Target Animation */}
      <section className="stats-impact-section">
        {t.stats.map((s, idx) => (
          <div className="stat-row-item" key={idx}>
            <CountUpStat 
              target={s.value} 
              prefix={s.prefix || ''} 
              suffix={s.suffix || ''} 
              duration={1000 + idx * 150} 
            />
            <p className="stat-desc-p">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* 5. Complete 45 Original Images Categorized into ALL, MODELS, PRODUCTS */}
      <section id="portfolio-section" className="portfolio-showcase-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">{t.portfolio.tag}</span>
          </div>
          <h2 className="sec-title-display">
            {t.portfolio.titlePre}<br />
            {t.portfolio.titleLine2} <em className="text-yellow-italic">{t.portfolio.titleItalic}</em>
          </h2>
          <p className="sec-subtitle-p">
            {t.portfolio.desc}
          </p>
        </div>

        {/* Filter Tabs without parentheses or numbers */}
        <div className="portfolio-filter-row">
          {['ALL', 'MODELS', 'PRODUCTS'].map((catKey) => (
            <button
              key={catKey}
              className={`filter-pill-btn ${selectedCategory === catKey ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(catKey);
                setVisibleCount(10);
              }}
            >
              {t.portfolio.categories[catKey] || catKey}
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
                <span className="gallery-cat-badge">{t.portfolio.categories[img.category] || img.category}</span>
                <h4 className="gallery-item-title">{img.title}</h4>
                <span className="tap-to-expand">{t.portfolio.tapToExpand}</span>
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
              <span>{t.portfolio.viewMore}</span>
            </button>
          </div>
        )}

        {/* Collaboration Notice Bar */}
        <div className="creator-collab-banner">
          <Sparkles size={16} className="text-yellow flex-shrink-0" />
          <p className="collab-banner-text">
            {t.portfolio.partnerBanner}
          </p>
        </div>

        {/* Vertical Video Showcase */}
        <div ref={reelContainerRef} className="vertical-video-showcase-wrap">
          <div className="video-showcase-header">
            <div className="sec-tag-row" style={{ justifyContent: 'center' }}>
              <span className="yellow-dash" />
              <span className="sec-tag-text">{t.videoShowcase.tag}</span>
            </div>
            <h3 className="video-showcase-title">
              {t.videoShowcase.titlePre} <em className="text-yellow-italic">{t.videoShowcase.titleItalic}</em>
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
                      controls={false}
                      disablePictureInPicture
                      loop
                      muted
                      preload="metadata"
                      className="reel-video-media"
                    />
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

      {/* Lightbox Fullscreen Modal for all 45 images */}
      {activeModalIdx !== null && (
        <div className="lightbox-modal-backdrop" onClick={handleCloseModal}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Top Bar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-badge-row">
                <span className="modal-cat-tag">{t.portfolio.categories[allOriginalImages[activeModalIdx].category] || allOriginalImages[activeModalIdx].category}</span>
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
                  {t.portfolio.modalCreatedBy}
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
            <span className="sec-tag-text">{t.capabilities.tag}</span>
          </div>
          <h2 className="sec-title-display">
            {t.capabilities.titlePre}<br />
            {t.capabilities.titleLine2} <em className="text-yellow-italic">{t.capabilities.titleItalic}</em>
          </h2>
        </div>

        <div className="yellow-marquee-banner">
          <div className="yellow-marquee-track">
            {[...Array(3)].map((_, i) => (
              <div className="yellow-marquee-group" key={i}>
                {t.capabilities.items.map((item, idx) => (
                  <span className="brand-item-text" key={idx}>
                    {item} <span className="black-dot">·</span>
                  </span>
                ))}
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
            <span className="sec-tag-text">{t.differentiators.tag}</span>
          </div>
          <h2 className="sec-title-display">
            <span className="why-sharp-text">{t.differentiators.titleSharp}</span> <span className="why-verarvo-serif">{t.differentiators.titleSerif}</span>
          </h2>
          <p className="sec-subtitle-p">{t.differentiators.subtitle}</p>
        </div>

        <div className="diff-items-stack">
          {t.differentiators.items.map((item) => (
            <FastTypewriterRow key={item.num} item={item} />
          ))}
        </div>
      </section>

      {/* 8. FAQ Section with Left-Aligned Tag */}
      <section className="faq-section">
        <div className="sec-header-block">
          <div className="sec-tag-row">
            <span className="yellow-dash" />
            <span className="sec-tag-text">{t.faq.tag}</span>
          </div>
          <h2 className="sec-title-display">{t.faq.title}</h2>
        </div>

        <div className="faq-accordion-container">
          {t.faq.items.map((item, index) => {
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
            {t.inquiry.ctaTitle1}<br />
            {t.inquiry.ctaTitle2}<br />
            <span className="text-yellow">{t.inquiry.ctaTitleYellow}</span>
          </h2>
          <p className="cta-sub-p">
            {t.inquiry.ctaSubLine1 || t.inquiry.ctaSub}
            {t.inquiry.ctaSubLine2 && (
              <>
                <br />
                <span>{t.inquiry.ctaSubLine2}</span>
              </>
            )}
          </p>
        </div>

        <div className="inquiry-box-card">
          <h3 className="inquiry-card-head">{t.inquiry.cardHead}</h3>
          {formSubmitted ? (
            <div className="inquiry-success-box">
              <Check size={48} color="#E6B800" />
              <h4>{t.inquiry.successTitle}</h4>
              <p>{t.inquiry.successDesc}</p>
              <button 
                className="btn-chamfer-yellow mt-4"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', projectType: [], message: '' });
                }}
              >
                <span>{t.inquiry.sendAnotherBtn}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="inquiry-form-stack">
              <div className="input-group">
                <label className="input-label">{t.inquiry.nameLabel}</label>
                <input 
                  type="text" 
                  required 
                  className="theme-input" 
                  placeholder={t.inquiry.namePlaceholder}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">{t.inquiry.emailLabel}</label>
                <input 
                  type="email" 
                  required 
                  className="theme-input" 
                  placeholder={t.inquiry.emailPlaceholder}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">{t.inquiry.projectTypeLabel}</label>
                <div className="checkbox-pills-row">
                  {t.inquiry.projectOptions.map((type) => (
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
                <label className="input-label">{t.inquiry.detailsLabel}</label>
                <textarea 
                  rows={4} 
                  className="theme-textarea" 
                  placeholder={t.inquiry.detailsPlaceholder}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">{t.inquiry.attachLabel}</label>
                <label className="file-attach-box">
                  <Upload size={16} />
                  <span>{formFile ? formFile.name : t.inquiry.attachPlaceholder}</span>
                  <input 
                    type="file" 
                    className="hidden-file-el" 
                    onChange={e => setFormFile(e.target.files[0] || null)}
                  />
                </label>
              </div>

              <button type="submit" className="btn-chamfer-yellow submit-full" disabled={formSubmitting}>
                {formSubmitting ? (
                  <span>{t.inquiry.submittingBtn}</span>
                ) : (
                  <>
                    <span>{t.inquiry.submitBtn}</span>
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
            {t.footer.slogan}
          </p>

          <div className="footer-nav-columns">
            <div className="footer-nav-col">
              <h4 className="footer-col-head">{t.footer.servicesHead}</h4>
              {t.footer.servicesItems.map((s, idx) => (
                <span className="footer-nav-link" key={idx} onClick={() => scrollToSection('portfolio-section')}>{s}</span>
              ))}
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-head">{t.footer.contactHead}</h4>
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
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileApp;
