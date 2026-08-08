import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ArrowLeft, Play, Upload, Send } from 'lucide-react';
import './MobileApp.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const targetVideos = [
  "/111.mov",
  "/222.mov",
  "/333.mov",
  "/UGC_video1.mov",
  "/For_Hazlo.mov",
  "/video-output-A4BEB786-5168-4899-9C24-35EE2EB1110E-2.mov",
  "/hf_20260412_001025_266abd8c-886a-47e6-9959-6371f3b5f840.mov",
  "/hf_20260410_200105_6b9142b4-9ac9-4c42-9206-84b70c939e52.mov",
  "/Lumiere_Project.mp4",
  "/Motors_Test_Project.mp4",
  "/Orvelle_Project.mp4",
  "/hf_20260422_004431_4f68bd77-ca2b-4483-8619-185621e4d2b6.mp4",
  "/hf_20260702_185634_cbb4702d-c436-45dc-bcf9-6f441d464ca4.mp4",
  "/sun_block.mp4",
  "/talking_avatar_ugc_video.mp4"
];

const faqData = {
  KO: [
    { q: "Q1. 제작 기간은 얼마나 걸리나요?", a: "A. 일반적으로 저희 VERARVO AI 광고 영상은 평균 3일 내 제작 완료됩니다. 프로젝트 난이도와 수정 횟수에 따라 달라질 수 있습니다." },
    { q: "Q2. 가격은 어떻게 결정되나요?", a: "A. 영상 길이, 스타일, 기획 난이도, 수정 횟수에 따라 달라집니다. 상세 견적은 상담 후 안내드립니다." },
    { q: "Q3. 수정은 몇 번 가능한가요?", a: "A. 기본적으로 1~3회 수정이 포함됩니다. 1차 시안 생성후 고객님의 피드백 반영 후에 2차 시안을 제공해드립니다." },
    { q: "Q4. 어떤 자료를 제공해야 하나요?", a: "A. 아래 자료가 있으면 제작이 원활합니다 제품 이미지 또는 영상, 로고, 브랜드 소개, 참고 광고 레퍼런스" },
    { q: "Q5. AI만으로 영상이 만들어지나요?", a: "A. AI 기술을 활용하여 제작하지만, 기획, 편집, 후반 작업은 사람이 직접 검수하여 완성도를 높입니다." },
    { q: "Q6. 저작권은 어떻게 되나요?", a: "A. 기본적으로 납품된 최종 결과물의 사용권은 고객에게 제공됩니다." }
  ],
  EN: [
    { q: "Q1. How long does the production take?", a: "A. In general, our VERARVO AI advertising videos are completed within an average of 3 days. It may vary depending on project difficulty and the number of revisions." },
    { q: "Q2. How is the price determined?", a: "A. It depends on video length, style, planning difficulty, and the number of revisions. Detailed quotes are provided after consultation." },
    { q: "Q3. How many revisions are allowed?", a: "A. Basically, 1 to 3 revisions are included. After generating the 1st draft, we will provide the 2nd draft reflecting your feedback." },
    { q: "Q4. What materials do I need to provide?", a: "A. Production goes smoothly with the following materials: Product images or videos, logo, brand introduction, and reference ads." },
    { q: "Q5. Are videos made entirely by AI?", a: "A. Although produced using AI technology, planning, editing, and post-production are directly reviewed and refined by humans to ensure high quality." },
    { q: "Q6. How about the copyright?", a: "A. Basically, the usage rights of the delivered final product are granted to the customer." }
  ],
  ZH: [
    { q: "Q1. 制作周期是多久？", a: "A. 通常情况下，我们的 VERARVO AI 广告视频平均在 3 天内制作完成。这可能会根据项目难度和修改次数而有所不同。" },
    { q: "Q2. 价格是如何决定的？", a: "A. 取决于视频长度、风格、策划难度和修改次数。详细报价将在咨询后提供。" },
    { q: "Q3. 可以修改多少次？", a: "A. 基本上包含 1 到 3 次修改。在生成第一版初稿后，我们将根据您的反馈提供第二版修改稿。" },
    { q: "Q4. 我需要提供哪些材料？", a: "A. 提供以下材料将使制作更加顺利：产品图片或视频、徽标、品牌介绍、参考广告案例。" },
    { q: "Q5. 视频是完全由 AI 制作的吗？", a: "A. 虽然使用 AI 技术进行制作，但策划、剪辑和后期制作均由人工直接把关，以提高完成度。" },
    { q: "Q6. 版权如何归属？", a: "A. 基本上，交付的最终成果物的使用权归客户所有。" }
  ],
  JA: [
    { q: "Q1. 制作期間はどれくらいかかりますか？", a: "A. 一般的に、当社の VERARVO AI 広告映像は平均3日以内に制作完了します。プロジェクトの難易度や修正回数によって異なる場合があります。" },
    { q: "Q2. 料金はどのように決まりますか？", a: "A. 映像の長さ、スタイル、企画の難易度、修正回数によって異なります。詳細な見積もりはご相談後にご案内いたします。" },
    { q: "Q3. 修正は何回可能ですか？", a: "A. 基本的に1〜3回の修正が含まれています。第1次案の制作後、お客様のフィードバックを反映した第2次案をご提供いたします。" },
    { q: "Q4. どのような資料を提供すればよいですか？", a: "A. 以下の資料をご用意いただくと制作がスムーズになります：製品画像または映像、ロゴ、ブランド紹介、参考広告のリファレンス。" },
    { q: "Q5. AIのみで映像が作られるのですか？", a: "A. AI技術を活用して制作しますが、企画、編集、ポストプロダクションは人間が直接検品し、完成度を高めます。" },
    { q: "Q6. 著作権はどうなりますか？", a: "A. 基本的に、納品された最終成果物の使用権は顧客に提供されます。" }
  ],
  VI: [
    { q: "Q1. Thời gian sản xuất mất bao lâu?", a: "A. Thông thường, video quảng cáo VERARVO AI của chúng tôi được hoàn thiện trung bình trong vòng 3 ngày. Thời gian có thể thay đổi tùy thuộc vào độ khó của dự án và số lần chỉnh sửa." },
    { q: "Q2. Giá cả được quyết định như thế nào?", a: "A. Giá cả phụ thuộc vào độ dài video, phong cách, độ khó lập kế hoạch và số lần chỉnh sửa. Báo giá chi tiết sẽ được cung cấp sau khi tư vấn." },
    { q: "Q3. Có thể chỉnh sửa tối đa bao nhiêu lần?", a: "A. Cơ bản bao gồm từ 1 đến 3 lần chỉnh sửa. Sau khi tạo bản nháp đầu tiên, chúng tôi sẽ cung cấp bản nháp thứ hai dựa trên phản hồi của bạn." },
    { q: "Q4. Tôi cần cung cấp những tài liệu nào?", a: "A. Quá trình sản xuất sẽ thuận lợi hơn nếu có các tài liệu sau: Hình ảnh hoặc video sản phẩm, logo, giới thiệu thương hiệu, quảng cáo tham chiếu." },
    { q: "Q5. Video có được tạo hoàn toàn bằng AI không?", a: "A. Mặc dù được sản xuất bằng công nghệ AI, các khâu lập kế hoạch, biên tập và hậu kỳ đều được con người trực tiếp kiểm duyệt để nâng cao độ hoàn thiện." },
    { q: "Q6. Bản quyền thì thế nào?", a: "A. Về cơ bản, quyền sử dụng sản phẩm cuối cùng được bàn giao sẽ được cung cấp cho khách hàng." }
  ]
};

const MobileApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState('KO');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  // Navigation: 'home' or 'works'
  const [currentView, setCurrentView] = useState('home');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Video player modal states
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeVideoType, setActiveVideoType] = useState('16:9'); // '16:9' or '9:16'

  // Process timeline states & scroll handling
  const [activeStep, setActiveStep] = useState(0);

  // Background video state & ended handler for mobile
  const [currentBgVideoIndex, setCurrentBgVideoIndex] = useState(0);
  const bgVideoRefs = useRef([]);

  // Mobile Preloader states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFadeOut, setIsFadeOut] = useState(false);

  // Pathname routing integration
  const isFirstMount = useRef(true);

  useEffect(() => {
    const path = window.location.pathname;
    let initialView = 'home';
    
    if (path === '/careers') {
      initialView = 'careers';
    } else if (path === '/services') {
      initialView = 'works';
    } else if (path === '/about') {
      initialView = 'services';
    } else if (path === '/process') {
      initialView = 'process';
    } else if (path === '/faq' || path === '/inquiry') {
      initialView = 'faq';
    }
    
    setCurrentView(initialView);
    window.history.replaceState({ view: initialView }, '', path);
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;
      console.log('[Mobile History] popstate event fired. State:', state);
      if (state && state.view) {
        setCurrentView(state.view);
      } else {
        const path = window.location.pathname;
        let view = 'home';
        if (path === '/careers') {
          view = 'careers';
        } else if (path === '/services') {
          view = 'works';
        } else if (path === '/about') {
          view = 'services';
        } else if (path === '/process') {
          view = 'process';
        } else if (path === '/faq' || path === '/inquiry') {
          view = 'faq';
        }
        setCurrentView(view);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const pathMap = {
      home: '/',
      works: '/services',
      services: '/about',
      process: '/process',
      careers: '/careers',
      faq: '/inquiry'
    };
    const path = pathMap[currentView] || '/';
    if (window.location.pathname !== path) {
      console.log('[Mobile History] Pushing view state:', currentView, path);
      window.history.pushState({ view: currentView }, '', path);
    }
  }, [currentView]);

  // Dynamic SEO metadata updates based on current view/route on mobile
  useEffect(() => {
    let title = "VERARVO | AI 크리에이터와 마케팅 전문가가 함께하는 광고 대행사";
    let description = "AI 기술과 인간의 감각을 결합하여, 단순한 영상 제작을 넘어 성과를 창출하는 트렌디한 광고 비디오 콘텐츠를 제공합니다.";
    const path = window.location.pathname;

    if (path === '/about' || currentView === 'services') {
      title = "VERARVO | 회사 소개";
    } else if (currentView === 'careers' || path === '/careers') {
      title = "VERARVO | 직원 채용";
      description = "AI 비디오 크리에이터, 영상 편집 및 모션 디자이너, 프롬프트 엔지니어 등 미래의 마케팅 크리에이티브를 선도할 인재를 기다립니다.";
    } else if (currentView === 'process' || path === '/process') {
      title = "VERARVO | 제작 과정";
      description = "기획 및 전략 수립부터 AI 에셋 생성, 최종 최적화까지 VERARVO만의 투명하고 신속한 광고 제작 과정을 소개합니다.";
    } else if (currentView === 'works' || path === '/services') {
      title = "VERARVO | 회사 서비스";
      description = "제품 광고, 이벤트 및 전시 홍보, 소셜 숏폼 콘텐츠 등 VERARVO가 선사하는 차세대 AI 기반 영상 광고 서비스를 확인하세요.";
    } else if (currentView === 'faq' || path === '/inquiry') {
      title = "VERARVO | 문의하기";
      description = "AI 영상 광고 제작 및 마케팅 협업 의뢰에 대한 문의사항을 남겨주시면, 담당 매니저가 신속하게 안내해 드립니다.";
    }

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [currentView]);

  // Initialize refs matching the size of targetVideos
  if (bgVideoRefs.current.length !== targetVideos.length) {
    bgVideoRefs.current = Array(targetVideos.length).fill(null);
  }

  const handleBgVideoEnded = () => {
    setCurrentBgVideoIndex(prev => (prev + 1) % targetVideos.length);
  };

  useEffect(() => {
    if (currentView === 'home') {
      const activeVid = bgVideoRefs.current[currentBgVideoIndex];
      const nextIdx = (currentBgVideoIndex + 1) % targetVideos.length;
      const nextVid = bgVideoRefs.current[nextIdx];

      // Play current active video
      if (activeVid) {
        activeVid.muted = true;
        activeVid.playsInline = true;
        activeVid.currentTime = 0;
        const playPromise = activeVid.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay was prevented on mobile:", error);
          });
        }
      }

      // Pre-warm the next video so it transitions with zero delay
      if (nextVid) {
        nextVid.muted = true;
        nextVid.playsInline = true;
        nextVid.load();
      }

      // Pause other inactive videos to save CPU/battery
      bgVideoRefs.current.forEach((video, idx) => {
        if (video && idx !== currentBgVideoIndex && idx !== nextIdx) {
          video.pause();
        }
      });

      // Touch / click handler for mobile autoplay permission unlock
      const handleTouchOrClick = () => {
        const currentV = bgVideoRefs.current[currentBgVideoIndex];
        if (currentV) {
          currentV.muted = true;
          currentV.play().catch(() => {});
        }
      };

      window.addEventListener('touchstart', handleTouchOrClick, { passive: true });
      window.addEventListener('click', handleTouchOrClick, { passive: true });

      return () => {
        window.removeEventListener('touchstart', handleTouchOrClick);
        window.removeEventListener('click', handleTouchOrClick);
      };
    }
  }, [currentBgVideoIndex, currentView]);

  // Preloader progress animation logic
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      // Dynamic random increment to feel organic (ranges 1 to 4)
      const increment = Math.floor(Math.random() * 4) + 1;
      progress = Math.min(progress + increment, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadeOut(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }, 600);
      }
    }, 35); // ~2 seconds total reveal duration

    return () => clearInterval(interval);
  }, []);

  // Careers Form States
  const [careerForm, setCareerForm] = useState({
    roles: [],
    customRole: '',
    name: '',
    nationality: 'Korea',
    email: '',
    portfolio: null,
    resume: null,
    notes: ''
  });
  const [careerSubmitting, setCareerSubmitting] = useState(false);
  const [careerSuccessShow, setCareerSuccessShow] = useState(false);
  const [careerError, setCareerError] = useState('');

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setCareerForm(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    if (careerForm.roles.length === 0 && (!careerForm.customRole || !careerForm.customRole.trim())) {
      alert(language === 'KO' ? "지원하실 직무를 선택하거나 직접 입력해 주세요." : "Please select a role or enter one.");
      return;
    }
    if (!careerForm.name || !careerForm.name.trim()) {
      alert(language === 'KO' ? "이름을 입력해 주세요." : "Please enter your name.");
      return;
    }
    if (!careerForm.email || !careerForm.email.trim()) {
      alert(language === 'KO' ? "이메일을 입력해 주세요." : "Please enter your email.");
      return;
    }
    if (!careerForm.portfolio) {
      alert(language === 'KO' ? "포트폴리오 파일을 첨부해 주세요." : "Please upload your portfolio.");
      return;
    }
    if (!careerForm.resume) {
      alert(language === 'KO' ? "이력서 파일을 첨부해 주세요." : "Please upload your resume.");
      return;
    }

    setCareerSubmitting(true);
    setCareerError('');

    try {
      const finalRoles = [...careerForm.roles];
      if (careerForm.customRole && careerForm.customRole.trim()) {
        finalRoles.push(careerForm.customRole.trim());
      }

      const formData = new FormData();
      formData.append('roles', finalRoles.join(', '));
      formData.append('name', careerForm.name.trim());
      formData.append('nationality', careerForm.nationality);
      formData.append('email', careerForm.email.trim());
      if (careerForm.notes) {
        formData.append('notes', careerForm.notes.trim());
      }
      if (careerForm.portfolio) {
        formData.append('portfolio', careerForm.portfolio);
      }
      if (careerForm.resume) {
        formData.append('resume', careerForm.resume);
      }

      const response = await fetch(`${API_BASE_URL}/api/careers`, {
        method: 'POST',
        body: formData
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setCareerSuccessShow(true);
        setCareerForm({
          roles: [],
          customRole: '',
          name: '',
          nationality: 'Korea',
          email: '',
          portfolio: null,
          resume: null,
          notes: ''
        });
        setTimeout(() => {
          setCareerSuccessShow(false);
        }, 6000);
      } else {
        console.error("Failed to submit career application:", resData);
        setCareerError(language === 'KO' ? `제출 실패: ${resData.error || '서버 오류'}` : `Failed to submit: ${resData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error("Error submitting career application:", err);
      setCareerError(language === 'KO' ? "네트워크 오류가 발생했습니다." : "A network error occurred.");
    } finally {
      setCareerSubmitting(false);
    }
  };

  const handleProcessScroll = (e) => {
    const container = e.currentTarget;
    const cards = container.querySelectorAll('.process-card-item');
    if (!cards.length) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top;
    
    let closestStep = 0;
    let minDiff = Infinity;
    
    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const diff = Math.abs(cardRect.top - containerTop - 120);
      if (diff < minDiff) {
        minDiff = diff;
        closestStep = idx;
      }
    });
    
    // Check if scrolled to the absolute bottom
    if (Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight) {
      closestStep = cards.length - 1;
    }
    
    if (closestStep !== activeStep) {
      setActiveStep(closestStep);
    }
  };

  const scrollToStep = (idx, stepNum) => {
    setActiveStep(idx);
    const element = document.getElementById(`process-card-${stepNum}`);
    const container = document.querySelector('.process-scroll-content');
    if (element && container) {
      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const scrollOffset = elementTop - containerTop + container.scrollTop - 90;
      container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
    }
  };

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
        { type: "9:16", url: "/A.mp4", title: { KO: "세로 광고 시안", EN: "Vertical Ad Preview" } }
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
        { type: "9:16", url: "/B.mp4", title: { KO: "바이럴 모델 영상", EN: "Viral Model Preview" } }
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
      aboutText4: " 汇集了 AI 创作者和营销专家，共同协作，携手打造注重实际成效、而非单纯交付成果的广告内容。",
      statTime: "平均制作时间",
      statCostSaving: "制作成本节省",
      statSatisfaction: "客户满意度"
    },
    JA: {
      aboutTag: "ABOUT VERARVO",
      aboutText1: "従来の広告制作は、多くの時間と費用が必要でした。撮影場所を手配し、モデルをキャスティングし、撮影と編集のプロセスを経る必要がありました。1つの広告を完成させるために数日から数週間がかかり、高い制作費が発生するのが一般的でした。",
      aboutText2: "は、こうしたプロセスを革新します。私たちは生成AI技術を活用し、わずか1枚の製品写真から高品質な広告画像や動画コンテンツを制作します。複雑な撮影プロセスを経ることなく、多様なコンセプトやスタイルを迅速に実現し、ブランドが求めるクリエイティブを短時間で提供します。",
      aboutText3: "広告は単に見栄えの良い映像ではありません。顧客の視線を引きつけ、行動を促す強力なツールです。",
      aboutText4: "は、AIクリエイターとマーケティングの専門家が連携し、単なる制作物の提供にとどまらず、成果を生み出すための広告コンテンツを制作します。",
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

  const processText = {
    KO: {
      tag: "작업 방식",
      titlePre: "VERARVO",
      titlePost: "프로세스",
      subtitle: "기획서 제출부터 최종 전달까지, 투명하고 신속한 4단계 워크플로우를 제공합니다.",
      steps: [
        { num: "01", letter: "B", label: "의뢰", title: "작업 의뢰", details: ["예산 및 일정 상담", "브랜드 분석 및 광고 목표 설계", "타겟 오디언스 및 배포 채널 선정"] },
        { num: "02", letter: "P", label: "기획", title: "작업 기획", details: ["AI 기반 프로젝트 컨셉 기획", "크리에이티브 메시지 및 슬로건 도출", "4컷 스토리보드 / 스크립트 설계"] },
        { num: "03", letter: "D", label: "시안", title: "시안 공유 및 수정", details: ["초고화질 AI 비디오 1차 시안 생성", "피드백 반영 및 2차 시안 디테일 보정", "최종 고해상도 이미지/영상 미세 조정"] },
        { num: "04", letter: "F", label: "납품", title: "최종 검토 및 납품", details: ["최종 완성본 4K 광고 영상 검토", "플랫폼별 멀티 포맷 가이드라인 제공", "라이선스 이전 및 최종 납품 패키지(.zip) 전달"] }
      ]
    },
    EN: {
      tag: "WORKFLOW",
      titlePre: "VERARVO",
      titlePost: "Process",
      subtitle: "A transparent and fast 4-step workflow, from brief submission to final delivery.",
      steps: [
        { num: "01", letter: "B", label: "Brief", title: "Brief & Strategy", details: ["Budget & timeline consultation", "Brand analysis & ad goal design", "Target audience & channel selection"] },
        { num: "02", letter: "P", label: "Plan", title: "Concept & Planning", details: ["AI-driven project concept planning", "Creative messaging & slogan design", "4-panel storyboard & script drafting"] },
        { num: "03", letter: "D", label: "Draft", title: "AI Production & Polish", details: ["1st draft generation of AI video ads", "Feedback integration & 2nd draft polishing", "Final fine-tuning of high-res image & video assets"] },
        { num: "04", letter: "F", label: "Final", title: "Review & Delivery", details: ["Final review of completed 4K ad videos", "Multi-format guidelines per platform", "License transfer & final package delivery (.zip)"] }
      ]
    },
    ZH: {
      tag: "工作方式",
      titlePre: "VERARVO",
      titlePost: "工作流程",
      subtitle: "从简报提交到最终交付，提供透明、快速的4步法工作流。",
      steps: [
        { num: "01", letter: "B", label: "需求", title: "项目委托", details: ["预算及日程咨询", "品牌分析及广告目标设定", "目标受众及分发渠道选择"] },
        { num: "02", letter: "P", label: "策划", title: "方案策划", details: ["基于AI的项目创意策划", "创意文案与广告标语提炼", "4格分镜故事板与脚本设计"] },
        { num: "03", letter: "D", label: "设计", title: "样片确认与修改", details: ["生成超高清 AI 视频第一版初稿", "整合反馈并进行第二版润色修改", "最终高分辨率图像与视频资产微调"] },
        { num: "04", letter: "F", label: "交付", title: "最终交付", details: ["审核完成的 4K 广告视频", "提供符合各平台规格的素材指南", "版权移交及最终交付包 (.zip) 发送"] }
      ]
    },
    JA: {
      tag: "制作プロセス",
      titlePre: "VERARVO",
      titlePost: "プロセス",
      subtitle: "ヒアリングから最終納品まで、透明性が高く迅速な4ステップのワークフローを提供します。",
      steps: [
        { num: "01", letter: "B", label: "依頼", title: "作業依頼", details: ["予算および日程のコンサルティング", "ブランド分析および広告ゴールの設計", "ターゲット層と配信チャネルの選定"] },
        { num: "02", letter: "P", label: "企画", title: "企画立案", details: ["AI基盤のプロジェクトコンセプト企画", "クリエイティブメッセージとスローガンの導出", "4カットストーリーボード・スクリプト設計"] },
        { num: "03", letter: "D", label: "試案", title: "試案共有・修正", details: ["超高画質AIビデオ第1次試案の生成", "フィードバック反映＆第2次試案の磨き上げ", "最終高解像度画像・映像アセットの微調整"] },
        { num: "04", letter: "F", label: "納品", title: "最終検品・納品", details: ["完成した4K広告動画の最終確認", "プラットフォーム別マルチフォーマットガイドの提供", "ライセンス移転および最終納品パッケージ（.zip）の引き渡し"] }
      ]
    },
    VI: {
      tag: "Quy trình",
      titlePre: "Quy trình",
      titlePost: "VERARVO",
      subtitle: "Quy trình làm việc 4 bước nhanh chóng và minh bạch từ gửi brief đến bàn giao sản phẩm.",
      steps: [
        { num: "01", letter: "B", label: "Brief", title: "Yêu cầu Dự án", details: ["Tư vấn về ngân sách và lộ trình", "Phân tích thương hiệu & thiết lập mục tiêu", "Lựa chọn đối tượng mục tiêu & kênh phân phối"] },
        { num: "02", letter: "P", label: "Plan", title: "Lập Kế hoạch", details: ["Lập kế hoạch ý tưởng dự án dựa trên AI", "Xây dựng thông điệp sáng tạo & slogan", "Thiết kế kịch bản & phân cảnh 4 khung hình"] },
        { num: "03", letter: "D", label: "Draft", title: "Duyệt & Chỉnh sửa", details: ["Tạo bản nháp video AI chất lượng siêu cao", "Tiếp thu phản hồi & tối ưu hóa bản nháp thứ 2", "Chỉnh sửa chi tiết tài nguyên hình ảnh & video cuối cùng"] },
        { num: "04", letter: "F", label: "Final", title: "Bàn giao & Nghiệm thu", details: ["Đánh giá video quảng cáo 4K hoàn thiện cuối cùng", "Cung cấp gói hướng dẫn định dạng đa kênh", "Chuyển giao bản quyền & bàn giao gói sản phẩm (.zip)"] }
      ]
    }
  };

  const careersText = {
    KO: {
      tag: "채용 안내",
      titlePre: "당신은 새로운 감각을 가진 인재입니다",
      titlePost: "VERARVO와 함께 합시다",
      subtitle: "포트폴리오와 이력서를 함께 보내주세요.",
      applyHeader: "지원하기",
      jobsLabel: "직무",
      nameLabel: "이름",
      nationalityLabel: "국적",
      emailLabel: "이메일",
      portfolioLabel: "포트폴리오 - PDF",
      resumeLabel: "이력서 - PDF",
      notesLabel: "기타 붙임말",
      notesPlaceholder: "기타 지원동기나 하실 말씀을 입력해 주세요...",
      submitBtn: "지원서 제출하기",
      customRoleLabel: "기타 직무 (직접 입력)",
      successMsg: "지원서가 성공적으로 전달되었습니다. 검토 후 연락드리겠습니다.",
      submittingText: "제출 중...",
      jobsList: [
        "AI 비디오 크리에이터",
        "영상 편집 & 모션 디자이너",
        "AI 프롬프트 엔지니어",
        "크리에이티브 프로젝트 매니저 (PM)"
      ]
    },
    EN: {
      tag: "CAREER",
      titlePre: "We are waiting for creators with",
      titlePost: "New Senses & Perspectives",
      subtitle: "Please submit your portfolio and resume together.",
      applyHeader: "Apply Now",
      jobsLabel: "Position / Role",
      nameLabel: "Name",
      nationalityLabel: "Nationality",
      emailLabel: "Email",
      portfolioLabel: "Portfolio - PDF",
      resumeLabel: "Resume - PDF",
      notesLabel: "Additional Notes",
      notesPlaceholder: "Enter your statement or other details here...",
      submitBtn: "Submit Application",
      customRoleLabel: "Other Role (Direct Entry)",
      successMsg: "Your application has been submitted successfully. We will review and contact you.",
      submittingText: "Submitting...",
      jobsList: [
        "AI Video Creator",
        "Video Editor & Motion Designer",
        "AI Prompt Engineer",
        "Creative Project Manager (PM)"
      ]
    },
    ZH: {
      tag: "招贤纳士",
      titlePre: "我们一直在等待拥有",
      titlePost: "全新感官与视角的创意人才",
      subtitle: "请同时提交您的作品集和简历。",
      applyHeader: "申请职位",
      jobsLabel: "职位",
      nameLabel: "姓名",
      nationalityLabel: "国籍",
      emailLabel: "邮箱",
      portfolioLabel: "作品集 - PDF",
      resumeLabel: "个人简历 - PDF",
      notesLabel: "备注说明",
      notesPlaceholder: "请输入您的求职动机或其他要说的话...",
      submitBtn: "提交申请",
      customRoleLabel: "其他职位 (直接输入)",
      successMsg: "您的申请已成功提交。我们将进行评估并与您联系。",
      submittingText: "正在提交...",
      jobsList: [
        "AI 视频创作者",
        "视频编辑与动态设计师",
        "AI 提示词工程师",
        "创意项目经理 (PM)"
      ]
    },
    JA: {
      tag: "CAREER",
      titlePre: "新しい感覚と視点を持ったクリエイターを",
      titlePost: "常にお待ちしております",
      subtitle: "ポートフォリオと履歴書を一緒にご送付ください。",
      applyHeader: "応募する",
      jobsLabel: "職種",
      nameLabel: "お名前",
      nationalityLabel: "国籍",
      emailLabel: "メールアドレス",
      portfolioLabel: "ポートフォリオ - PDF",
      resumeLabel: "履歴書 - PDF",
      notesLabel: "その他メッセージ",
      notesPlaceholder: "志望動機やメッセージを自由に入力してください...",
      submitBtn: "応募書類を提出する",
      customRoleLabel: "その他の職種 (直接入力)",
      successMsg: "応募書類が正常に送信されました。確認後、ご連絡いたします。",
      submittingText: "送信中...",
      jobsList: [
        "AIビデオクリエイター",
        "映像編集＆モーションデザイナー",
        "AIプロンプトエンジニア",
        "クリエイティブプロジェクトマネージャー (PM)"
      ]
    },
    VI: {
      tag: "TUYỂN DỤNG",
      titlePre: "Chúng tôi luôn chào đón các nhà sáng tạo có",
      titlePost: "Góc nhìn & Cảm quan mới",
      subtitle: "Vui lòng gửi kèm CV và Portfolio (PDF) của bạn.",
      applyHeader: "Ứng tuyển ngay",
      jobsLabel: "Vị trí ứng tuyển",
      nameLabel: "Họ và Tên",
      nationalityLabel: "Quốc tịch",
      emailLabel: "Địa chỉ Email",
      portfolioLabel: "Portfolio - PDF",
      resumeLabel: "CV - PDF",
      notesLabel: "Lời nhắn thêm",
      notesPlaceholder: "Vui lòng nhập lý do ứng tuyển hoặc lời nhắn khác...",
      submitBtn: "Nộp hồ sơ",
      customRoleLabel: "Vị trí khác (Nhập trực tiếp)",
      successMsg: "Hồ sơ của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại.",
      submittingText: "Đang nộp...",
      jobsList: [
        "Nhà sáng tạo video AI",
        "Biên tập video & Thiết kế chuyển động",
        "Kỹ sư Prompt AI",
        "Quản lý dự án sáng tạo (PM)"
      ]
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (langDropdownOpen) setLangDropdownOpen(false);
  };

  const handleMenuClick = (item) => {
    setMenuOpen(false);
    if (item === 'WORK') {
      setCurrentView('works-category');
    } else if (item === 'SERVICES') {
      setCurrentView('services');
    } else if (item === 'PROCESS') {
      setCurrentView('process');
      setActiveStep(0);
    } else if (item === 'CAREERS') {
      setCurrentView('careers');
      setCareerForm({
        roles: [],
        customRole: '',
        name: '',
        nationality: 'Korea',
        email: '',
        portfolio: null,
        resume: null,
        notes: ''
      });
      setCareerError('');
      setCareerSuccessShow(false);
    } else if (item === 'FAQ') {
      setCurrentView('faq');
      setOpenFaqIndex(null);
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
      {/* 0. Mobile Loading Preloader */}
      {isLoading && (
        <div className={`mobile-preloader ${isFadeOut ? 'fade-out' : ''}`}>
          <div className="mobile-preloader-content">
            <div className="mobile-preloader-logo-wrapper">
              {/* Logo Container (Custom SVG Path Drawing Mask) */}
              <div 
                className="mobile-preloader-logo-container" 
                style={{ 
                  position: 'absolute', 
                  top: 0, left: 0,
                  opacity: 0.12,
                  zIndex: 1
                }}
              >
                <svg viewBox="0 0 280 280" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                  <defs>
                    <mask id="drawing-mask">
                      <path 
                        d="M 42 238 L 42 42 L 182 238 L 238 42" 
                        stroke="white" 
                        strokeWidth="85" 
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="650" 
                        style={{
                          strokeDashoffset: 650 - (650 * loadingProgress) / 100,
                          transition: 'stroke-dashoffset 0.1s linear'
                        }}
                      />
                    </mask>
                  </defs>
                  <image 
                    href="/logo-nv-transparent-hq.png" 
                    width="100%" 
                    height="100%" 
                    mask="url(#drawing-mask)" 
                    preserveAspectRatio="xMidYMid meet"
                  />
                </svg>
                
                {/* Full logo overlay to fill any anti-aliasing gaps smoothly */}
                <img 
                  src="/logo-nv-transparent-hq.png" 
                  alt="NV Logo" 
                  className="preloader-bg-logo"
                  style={{
                    opacity: loadingProgress >= 100 ? 1 : 0,
                    transition: 'opacity 0.6s ease-in-out',
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Text Container (Left-to-Right horizontal reveal) */}
              <div 
                className="mobile-preloader-logo-container" 
                style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, 
                  clipPath: `inset(0 ${100 - loadingProgress}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - loadingProgress}% 0 0)`,
                  zIndex: 10
                }}
              >
                <h1 className="preloader-title">VERARVO</h1>
              </div>
            </div>
            <div className="mobile-preloader-percentage">{loadingProgress}</div>
          </div>
        </div>
      )}
      {/* Background Video for the ENTIRE screen on Home view */}
      {currentView === 'home' && (
        <div className="mobile-video-bg-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0 }}>
          {targetVideos.map((src, index) => {
            const isActive = index === currentBgVideoIndex;
            return (
              <video
                key={src}
                ref={el => {
                  bgVideoRefs.current[index] = el;
                  if (el) {
                    el.muted = true;
                    el.playsInline = true;
                  }
                }}
                src={src}
                muted
                playsInline
                preload="auto"
                onEnded={handleBgVideoEnded}
                onError={() => {
                  console.warn(`Background video failed to load: ${src}`);
                  if (isActive) handleBgVideoEnded();
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  zIndex: isActive ? 2 : 1
                }}
              />
            );
          })}
          <div className="mobile-video-bg-overlay"></div>
        </div>
      )}

      {/* 1. Header (Only show when menu is closed and not on full-screen works views) */}
      {currentView !== 'works-category' && currentView !== 'works-image' && (
        <header className={`mobile-header ${menuOpen ? 'header-hidden' : ''}`}>
          <div className="mobile-header-left" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
            <div className="mobile-logo-wrapper">
              <span className="mobile-logo-text">VERARVO</span>
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
      )}

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
          {/* Foreground Content */}
          <div className="mobile-hero-content">
            <div className="mobile-hero-title-wrapper">
              <div className="mobile-bg-logo-container">
                <img src="/logo-nv-transparent-hq.png" alt="NV Logo" className="mobile-bg-logo-img" />
              </div>
              <h1 className="mobile-hero-title">VERARVO</h1>
            </div>
            <p className="mobile-hero-subtitle">REIMAGINING THE VALUE OF BRANDS</p>
            <button className="mobile-works-btn" onClick={() => setCurrentView('works-category')}>
              <span className="mobile-works-btn-text">see works</span>
            </button>
          </div>

          {/* Bottom-left Contact Block */}
          <div className="mobile-home-contact">
            <h4 className="mobile-contact-title">CONTACT</h4>
            <p className="mobile-contact-desc">
              Contact us today to discuss your next campaign<br />
              and turn bold ideas into powerful AI-driven advertising.
            </p>
            <div className="mobile-contact-manager">
              <span>
                {language === 'KO' ? '담당 매니저' : 
                 language === 'ZH' ? '项目经理' : 
                 language === 'JA' ? '担当マネージャー' : 
                 language === 'VI' ? 'Quản lý phụ trách' : 
                 'Manager'}
              </span>
              {' : '}
              <a href="mailto:jobsverarvo@gmail.com" className="mobile-contact-email">
                jobsverarvo@gmail.com
              </a>
            </div>
            <div className="mobile-contact-socials">
              {/* KakaoTalk */}
              <a href="https://pf.kakao.com/_xhxiBnX" target="_blank" rel="noopener noreferrer" className="mobile-social-icon-btn" aria-label="KakaoTalk">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.125 0H1.875C.839 0 0 .84 0 1.875v20.25C0 23.161.84 24 1.875 24h20.25C23.161 24 24 23.16 24 22.125V1.875C24 .839 23.16 0 22.125 0zM12 18.75c-.591 0-1.17-.041-1.732-.12-.562.396-3.813 2.679-4.12 2.722 0 0-.125.049-.232-.014s-.088-.229-.088-.229c.032-.22.843-3.018.992-3.533-2.745-1.36-4.57-3.769-4.57-6.513 0-4.246 4.365-7.688 9.75-7.688s9.75 3.442 9.75 7.688c0 4.245-4.365 7.687-9.75 7.687zM8.05 9.867h-.878v3.342c0 .296-.252.537-.563.537s-.562-.24-.562-.537V9.867h-.878a.552.552 0 0 1 0-1.101h2.88a.552.552 0 0 1 0 1.101zm10.987 2.957a.558.558 0 0 1 .109.417.559.559 0 0 1-.219.37.557.557 0 0 1-.338.114.558.558 0 0 1-.45-.224l-1.319-1.747-.195.195v1.227a.564.564 0 0 1-.562.563.563.563 0 0 1-.563-.563V9.328a.563.563 0 0 1 1.125 0v1.21l1.57-1.57a.437.437 0 0 1 .311-.126c.14 0 .282.061.388.167a.555.555 0 0 1 .165.356.438.438 0 0 1-.124.343l-1.282 1.281 1.385 1.835zm-8.35-3.502c-.095-.27-.383-.548-.75-.556-.366.008-.654.286-.749.555l-1.345 3.541c-.171.53-.022.728.133.8a.857.857 0 0 0 .357.077c.235 0 .414-.095.468-.248l.279-.73h1.715l.279.73c.054.153.233.248.468.248a.86.86 0 0 0 .357-.078c.155-.071.304-.268.133-.8l-1.345-3.54zm-1.311 2.443.562-1.596.561 1.596H9.376zm5.905 1.383a.528.528 0 0 1-.539.516h-1.804a.528.528 0 0 1-.54-.516v-3.82c0-.31.258-.562.575-.562s.574.252.574.562v3.305h1.195c.297 0 .54.231.54.515z" />
                </svg>
              </a>
              {/* X */}
              <a href="https://x.com/VERARVO" target="_blank" rel="noopener noreferrer" className="mobile-social-icon-btn" aria-label="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/verarvo/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon-btn" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61590815180891" target="_blank" rel="noopener noreferrer" className="mobile-social-icon-btn" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </main>
      )}

      {currentView === 'works-category' && (
        <main className="mobile-works-category-view" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100 }}>
            <button className="mobile-back-btn" onClick={() => setCurrentView('home')} style={{ background: 'none', padding: 0 }}>
              <ArrowLeft size={18} color="#fff" />
              <span style={{ color: '#fff', marginLeft: '6px', fontSize: '14px' }}>Back</span>
            </button>
          </div>
          
          <div 
            className="category-half" 
            onClick={() => setCurrentView('works-image')} 
            style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
          >
            <img src="/openart-image_1779918779704_080a80c5_1779918781015_6d955aa5_Original.PNG" alt="Image Category" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: 700, letterSpacing: '4px', margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.5)' }}>IMAGE</h2>
            </div>
          </div>

          <div 
            className="category-half" 
            onClick={() => setCurrentView('works')} 
            style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
          >
            <video src="/12681248_2160_3840_60fps.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '3rem', fontWeight: 700, letterSpacing: '4px', margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.5)' }}>VIDEO</h2>
            </div>
          </div>
        </main>
      )}

      {currentView === 'works-image' && (
        <main className="mobile-works-image-view" style={{ width: '100vw', height: '100vh', overflowY: 'auto', backgroundColor: '#111' }}>
          <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 100 }}>
            <button className="mobile-back-btn" onClick={() => setCurrentView('works-category')} style={{ background: 'none', padding: 0 }}>
              <ArrowLeft size={18} color="#fff" />
              <span style={{ color: '#fff', marginLeft: '6px', fontSize: '14px' }}>Back</span>
            </button>
          </div>
          <div className="mobile-image-feed" style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '90px' }}>
            {[
              '/a.jpeg',
              '/a (1).PNG', '/a (1).jpg',
              '/a (2).jpeg', '/a (2).jpg',
              '/a (3).jpeg', '/a (3).jpg',
              '/a (4).jpeg', '/a (4).jpg',
              '/a (5).jpeg', '/a (5).jpg',
              '/a (6).jpeg', '/a (6).jpg',
              '/092755CE-0A63-49ED-8180-A30EF8687056.jpg',
              '/3760999B-251C-41DC-B5F4-2EAD7E2AA190.jpg',
              '/56791D9A-9EEC-402C-85A5-B66F42DA5B85.jpg',
              '/578D39E0-5165-49E6-8C7F-DD5AE5D1F1EB.jpg',
              '/80811198-6082-461B-A227-DFC81D2EA772.jpg',
              '/820A046E-0FCF-4996-84F5-A01C5D7B1C46.jpg',
              '/A8DD8087-519E-4CA5-B6E5-AECAFAF27F45.jpg',
              '/ABB17C8A-BF95-4E2B-91A3-A918FEF7939C.jpg',
              '/BAAACB6B-AEFE-4CF0-AC98-9135BA541349.jpg',
              '/DECD6E41-38D0-4BB6-A9D4-7847BA2F0705.jpg',
              '/IMG_5315.jpeg',
              '/IMG_9116.JPG',
              '/IMG_9117.JPG',
              '/IMG_9296.PNG',
              '/IMG_9300.PNG',
              '/att.TJe27SYxmeMhozHrWA7RvmgV1Bq9CqKOxqnweYZc9Aw.jpg',
              '/file_000000002ad881f4b02295613fc8c996~2.png',
              '/openart-image_1779918779704_080a80c5_1779918781015_6d955aa5_Original.PNG',
              '/11FA9EAF-0D4F-4BEE-9670-4F2473094321.jpg',
              '/1BE99603-1471-4391-AA49-90CD31B1F4D6.jpg',
              '/408471063_1784275816512842~2.jpeg',
              '/4CBC8E25-E527-4295-A88A-372D67E7FAD0.jpg',
              '/549789471_1784276133887554~2.jpeg',
              '/55043724-C253-4C26-A5E7-8C55BCF46DC5.jpg',
              '/AD883D9D-13DD-400C-BB18-FEB80F173E07.jpg',
              '/IMG_5329.jpeg',
              '/file_00000000755c8243957ad3597b01b9a8.png',
              '/file_00000000dd5082469b53d340a3770d19.png',
              '/pale_blush_pink_seamless_202605201550_1_Original.JPG'
            ].map((src, idx) => (
              <img key={idx} src={src} style={{ width: '100%', height: 'auto', display: 'block' }} alt={`Work Image ${idx + 1}`} loading="lazy" />
            ))}
          </div>

          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '14px 16px',
            textAlign: 'center',
            zIndex: 100,
            borderTop: '1px solid rgba(255, 230, 0, 0.2)'
          }}>
            <p style={{
              color: '#ffe600',
              fontSize: '13px',
              fontWeight: 600,
              margin: 0,
              wordBreak: 'keep-all',
              letterSpacing: '-0.2px',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}>
              {
                language === 'KO' ? "VERARVO와 함께 하고 있는 AI 크리에이터들의 작품입니다" :
                language === 'ZH' ? "这是与 VERARVO 合作的 AI 创作者的作品" :
                language === 'JA' ? "VERARVOと共に活動しているAIクリエイターの作品です" :
                language === 'VI' ? "Đây là tác phẩm của các nhà sáng tạo AI đang làm việc cùng VERARVO" :
                "These are works of AI creators working with VERARVO"
              }
            </p>
          </div>
        </main>
      )}

      {currentView === 'works' && (
        /* ================= WORKS VIEW (Mockup style) ================= */
        <main className="mobile-works-view">
          <div className="mobile-works-header">
            <button className="mobile-back-btn" onClick={() => setCurrentView('works-category')}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <h2 className="mobile-works-title">VIDEO SAMPLE</h2>
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
            <h1 style={{ display: 'none' }}>차세대 AI 광고대행사 VERARVO 회사 소개</h1>
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

      {currentView === 'process' && (
        /* ================= PROCESS VIEW (Workflow) ================= */
        <main className="mobile-process-view">
          <div className="mobile-process-header">
            <button className="mobile-back-btn" onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <h2 className="mobile-process-title">PROCESS</h2>
          </div>

          <div className="process-scroll-content" onScroll={handleProcessScroll}>
            <div className="process-section">
              <div className="process-tag-line">
                <span className="process-tag-line-bar"></span>
                <span className="process-tag-text">{processText[language]?.tag || processText['EN'].tag}</span>
              </div>

              <h1 className="process-main-title">
                <span className="highlight-gold">{processText[language]?.titlePre || processText['EN'].titlePre}</span> {processText[language]?.titlePost || processText['EN'].titlePost}
              </h1>
              <p className="process-subtitle-text">{processText[language]?.subtitle || processText['EN'].subtitle}</p>

              {/* Horizontal timeline stepper */}
              <div className="process-horizontal-timeline-container">
                <div className="process-horizontal-line"></div>
                <div className="process-horizontal-steps">
                  {(processText[language]?.steps || processText['EN'].steps).map((step, idx) => (
                    <div
                      key={step.num}
                      className={`process-horizontal-step ${activeStep === idx ? 'active' : ''}`}
                      onClick={() => scrollToStep(idx, step.num)}
                    >
                      <span className="process-step-node-label">{step.label}</span>
                      <div className="process-step-node-circle">
                        <span className="process-step-node-letter">{step.letter}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Cards Stack */}
              <div className="process-cards-container">
                {(processText[language]?.steps || processText['EN'].steps).map((step, idx) => (
                  <div
                    key={step.num}
                    id={`process-card-${step.num}`}
                    className={`process-card-item ${activeStep === idx ? 'active' : ''}`}
                  >
                    <div className="process-card-num">{step.num}</div>
                    <h3 className="process-card-title">{step.title}</h3>
                    <ul className="process-card-details">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="process-detail-item">
                          <span className="bullet-sq">■</span>
                          <span className="detail-text">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {currentView === 'careers' && (
        /* ================= CAREERS VIEW (Job Application) ================= */
        <main className="mobile-careers-view">
          <div className="mobile-careers-header">
            <button className="mobile-back-btn" onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <h2 className="mobile-careers-title">CAREER</h2>
          </div>

          <div className="careers-scroll-content">
            <div className="careers-section">
              <h1 style={{ display: 'none' }}>VERARVO 직원 채용</h1>
              {/* Header Tag */}
              <div className="careers-tag-line">
                <span className="careers-tag-line-bar"></span>
                <span className="careers-tag-text">{careersText[language]?.tag || careersText['EN'].tag}</span>
              </div>

              {/* Main Title */}
              <h1 className="careers-main-title">
                {careersText[language]?.titlePre || careersText['EN'].titlePre}<br />
                <span className="highlight-gold">{careersText[language]?.titlePost || careersText['EN'].titlePost}</span>
              </h1>
              <p className="careers-subtitle-text">{careersText[language]?.subtitle || careersText['EN'].subtitle}</p>

              {/* Application Form Card */}
              <form className="careers-form-card" onSubmit={handleCareerSubmit}>
                {/* Company Logo at the top of card */}
                <div className="careers-form-card-top-icon">
                  <img src="/logo-nv-transparent-hq.png" alt="VERARVO" className="careers-company-logo-img" />
                </div>

                <h2 className="careers-form-header">{careersText[language]?.applyHeader || careersText['EN'].applyHeader}</h2>

                {/* Job Checkboxes */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.jobsLabel || careersText['EN'].jobsLabel} <span className="req-star">*</span>
                  </label>
                  <div className="careers-checkbox-list">
                    {(careersText[language]?.jobsList || careersText['EN'].jobsList).map((job, idx) => {
                      const isChecked = careerForm.roles.includes(job);
                      return (
                        <label key={idx} className="careers-checkbox-label">
                          <input
                            type="checkbox"
                            className="careers-checkbox-input"
                            checked={isChecked}
                            onChange={() => {
                              const newRoles = isChecked
                                ? careerForm.roles.filter(r => r !== job)
                                : [...careerForm.roles, job];
                              setCareerForm({ ...careerForm, roles: newRoles });
                            }}
                          />
                          <span className="checkbox-custom"></span>
                          <span className="checkbox-text">{job}</span>
                        </label>
                      );
                    })}
                  </div>
                  {/* Custom Job entry */}
                  <div className="careers-custom-job-input-wrapper">
                    <input
                      type="text"
                      className="form-control-line"
                      placeholder={careersText[language]?.customRoleLabel || careersText['EN'].customRoleLabel}
                      value={careerForm.customRole}
                      onChange={(e) => setCareerForm({ ...careerForm, customRole: e.target.value })}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.nameLabel || careersText['EN'].nameLabel} <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control-line"
                    placeholder={careersText[language]?.nameLabel || careersText['EN'].nameLabel}
                    value={careerForm.name}
                    onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                    required
                  />
                </div>

                {/* Nationality */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.nationalityLabel || careersText['EN'].nationalityLabel} <span className="req-star">*</span>
                  </label>
                  <div className="careers-select-wrapper">
                    <select
                      className="form-control-line select-arrow"
                      value={careerForm.nationality}
                      onChange={(e) => setCareerForm({ ...careerForm, nationality: e.target.value })}
                      required
                    >
                      <option value="Korea">Korea</option>
                      <option value="United States">United States</option>
                      <option value="China">China</option>
                      <option value="Japan">Japan</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.emailLabel || careersText['EN'].emailLabel} <span className="req-star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control-line"
                    placeholder="example@verarvo.com"
                    value={careerForm.email}
                    onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                    required
                  />
                </div>

                {/* Portfolio File Upload */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.portfolioLabel || careersText['EN'].portfolioLabel} <span className="req-star">*</span>
                  </label>
                  <div
                    className={`mobile-file-upload-zone ${careerForm.portfolio ? 'has-file' : ''}`}
                    onClick={() => document.getElementById('portfolio-file-input').click()}
                  >
                    <input
                      type="file"
                      id="portfolio-file-input"
                      style={{ display: 'none' }}
                      accept="application/pdf, image/*"
                      onChange={(e) => handleFileChange(e, 'portfolio')}
                    />
                    {careerForm.portfolio ? (
                      <div className="selected-file-container">
                        <div className="file-info-text">
                          <span className="file-name-text">{careerForm.portfolio.name}</span>
                          <span className="file-size-text">({(careerForm.portfolio.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          className="file-remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCareerForm({ ...careerForm, portfolio: null });
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="upload-prompt">
                        <Upload size={24} className="upload-arrow-icon" />
                        <div className="upload-title">Upload</div>
                        <div className="upload-subtitle">Drag and drop file here</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resume File Upload */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.resumeLabel || careersText['EN'].resumeLabel} <span className="req-star">*</span>
                  </label>
                  <div
                    className={`mobile-file-upload-zone ${careerForm.resume ? 'has-file' : ''}`}
                    onClick={() => document.getElementById('resume-file-input').click()}
                  >
                    <input
                      type="file"
                      id="resume-file-input"
                      style={{ display: 'none' }}
                      accept="application/pdf, image/*"
                      onChange={(e) => handleFileChange(e, 'resume')}
                    />
                    {careerForm.resume ? (
                      <div className="selected-file-container">
                        <div className="file-info-text">
                          <span className="file-name-text">{careerForm.resume.name}</span>
                          <span className="file-size-text">({(careerForm.resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          className="file-remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCareerForm({ ...careerForm, resume: null });
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="upload-prompt">
                        <Upload size={24} className="upload-arrow-icon" />
                        <div className="upload-title">Upload</div>
                        <div className="upload-subtitle">Drag and drop file here</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="careers-form-group">
                  <label className="careers-field-label">
                    {careersText[language]?.notesLabel || careersText['EN'].notesLabel}
                  </label>
                  <textarea
                    className="form-control-textarea"
                    placeholder={careersText[language]?.notesPlaceholder || careersText['EN'].notesPlaceholder}
                    value={careerForm.notes}
                    onChange={(e) => setCareerForm({ ...careerForm, notes: e.target.value })}
                  />
                </div>

                {/* Submit Feedback */}
                {careerError && <div className="careers-error-msg">{careerError}</div>}
                {careerSuccessShow && (
                  <div className="careers-success-msg">
                    {careersText[language]?.successMsg || careersText['EN'].successMsg}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="careers-submit-btn"
                  disabled={careerSubmitting}
                >
                  <span className="submit-btn-text">
                    {careerSubmitting
                      ? (careersText[language]?.submittingText || careersText['EN'].submittingText)
                      : (careersText[language]?.submitBtn || careersText['EN'].submitBtn)}
                  </span>
                  {!careerSubmitting && <Send size={14} className="submit-btn-rocket" />}
                </button>
              </form>
            </div>
          </div>
        </main>
      )}

      {currentView === 'faq' && (
        /* ================= FAQ VIEW ================= */
        <main className="mobile-faq-view">
          <div className="mobile-faq-header">
            <button className="mobile-back-btn" onClick={() => setCurrentView('home')}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <h2 className="mobile-faq-title">
              {language === 'KO' ? '자주 하는 질문' :
               language === 'ZH' ? '常见问题' :
               language === 'JA' ? 'よくある質問' :
               language === 'VI' ? 'Câu hỏi thường gặp' :
               'FAQ'}
            </h2>
          </div>

          <div className="mobile-faq-list">
            {faqData[language]?.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`mobile-faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <div className="mobile-faq-question-row">
                    <span className="mobile-faq-question">{item.q}</span>
                    <span className="mobile-faq-toggle">
                      {isOpen ? '—' : '+'}
                    </span>
                  </div>
                  <div className="mobile-faq-answer-wrapper">
                    <div className="mobile-faq-answer-inner">
                      <div className="mobile-faq-divider"></div>
                      <p className="mobile-faq-answer">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
          <span 
            className="mobile-menu-logo" 
            onClick={() => {
              setCurrentView('home');
              setMenuOpen(false);
            }}
            style={{ cursor: 'pointer' }}
          >
            VERARVO
          </span>
          <button className="mobile-menu-close" onClick={toggleMenu} aria-label="Close Menu">
            <X size={24} />
          </button>
        </header>

        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list">
            <li>
              <button onClick={() => handleMenuClick('WORK')}>WORKS</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('SERVICES')}>ABOUT</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('PROCESS')}>PROCESS</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('CAREERS')}>CAREER</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('FAQ')}>FAQ</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileApp;
