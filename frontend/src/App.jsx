import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Download,
  Upload,
  AlertCircle,
  FileText,
  Globe,
  Printer,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const translations = {
  KO: {
    navServices: "서비스",
    navWork: "회사 소개",
    navProcess: "프로세스",
    navCareers: "직원 채용",
    navContact: "문의하기",
    btnStartProject: "프로젝트 시작",
    btnLandingPage: "홈화면으로 돌아가기",
    heroTag: "AI로 새롭게 만들다",
    heroTitlePre: "새로운 시각,",
    heroTitleSpan: "새로운 광고",
    heroTitlePost: "VERARVO",
    heroSubtitleMain: <>새로운 AI 기술로 새로운 시대를 만듭니다<br />더 이상 광고 제작에 큰 돈을 쓰지 마세요</>,
    heroSubtitleSub1: "단 하나의 기획서로 완성되는 높은 퀄리티의 광고",
    heroSubtitleSub2: "상상을 뛰어넘는 새로운 경험",
    heroSubtitleSub3: "여러 AI 기술자가 함께합니다",
    videoQualityText: "보이는 영상과 같은 퀄리티를 만듭니다",
    aiDisclaimer: "모두 AI로 제작된 영상입니다",
    btnStartProjectAction: "프로젝트 시작",
    btnExploreServices: "서비스 탐색",
    reelText: "verarvo — AI로 새롭게 만들다 — 2026",
    reelStartCampaign: "프로젝트 시작",
    aboutTag: "ABOUT VERARVO",
    aboutHandwriting: "아이디어를 현실로 만들어냅니다",
    aboutTitlePre: "새로운 기술로",
    aboutTitleSpan: "현실을 만듭니다,",
    aboutTitlePost: "VERARVO",
    aboutText1: "기존 광고 제작은 많은 시간과 비용이 필요했습니다. 촬영 장소를 섭외하고, 모델을 섭외하며, 촬영과 편집 과정을 거쳐야 했습니다. 하나의 광고를 완성하기 위해 수일에서 수주가 소요되고 높은 제작 비용이 발생하는 것이 일반적이었습니다.",
    aboutText2: <><span style={{ color: '#FACC15' }}>VERARVO</span>는 이러한 과정을 새롭게 바꿉니다. 우리는 생성형 AI 기술을 활용하여 제품 사진 한 장만으로 광고 이미지와 영상 콘텐츠를 제작합니다. 복잡한 촬영 과정 없이도 다양한 컨셉과 스타일을 빠르게 구현할 수 있으며, 브랜드가 원하는 크리에이티브를 짧은 시간 안에 제공합니다.</>,
    aboutText3: "광고는 단순히 보기 좋은 영상이 아닙니다. 고객의 시선을 사로잡고 행동을 이끌어내는 강력한 도구입니다.",
    aboutText4: <><span style={{ color: '#FACC15' }}>VERARVO</span>는 AI 크리에이터와 마케팅 전문가가 함께 협업하여 단순한 결과물이 아닌 성과를 위한 광고 콘텐츠를 제작합니다.</>,
    statProjects: "완료된 프로젝트",
    statTime: "평균 제작 시간",
    statCostSaving: "제작 비용 절감",
    statSatisfaction: "고객 만족도",
    servicesTag: "제작물",
    servicesTitlePre: "VERARVO",
    servicesTitleSpan: "창조물",
    servicesSubtitle: "통합 AI 기반 광고 솔루션으로 브랜드의 모든 광고 니즈를 해결합니다.",
    service1Name: "제품 광고",
    service1Desc: "고객님의 기획서에서 시작하는 고품질 비디오 광고 제작을 AI기술자와 함께 합니다",
    service2Name: "이벤트 · 전시 홍보",
    service2Desc: "박람회, 축제, 브랜드 팝업스토어 및 전시회 등 다양한 오프라인·온라인 이벤트를 위한 최적의 홍보 영상을 제작합니다",
    service3Name: "소셜 숏폼 콘텐츠",
    service3Desc: "인스타그램 릴스, 틱톡, 유튜브 쇼츠 등 숏폼에 최적화된 트렌디한 세로형 비디오 광고를 제작합니다",
    service4Name: "가상 모델 & 인플루언서",
    service4Desc: "고객님의 요청에 따른 가상 인물을 만들어 냅니다",
    service5Name: "인테리어 · 가구 프로젝트",
    service5Desc: "공간의 가치를 극대화하는 하이엔드 인테리어 및 가구 비주얼 솔루션을 제공합니다",
    processTag: "작업 방식",
    processTitlePre: "VERARVO",
    processTitleSpan: "프로세스",
    processSubtitle: "기획서 제출부터 최종 전달까지, 투명하고 신속한 4단계 워크플로우를 제공합니다.",
    process1Title: "기획 및 전략",
    process1Desc: "브랜드 목표와 타겟 고객을 분석하여 최적의 AI 광고 전략을 수립합니다.",
    process2Title: "컨셉 생성",
    process2Desc: "AI가 수백 가지의 크리에이티브 컨셉을 생성하고 가장 우수한 옵션을 선정합니다.",
    process3Title: "AI 비디오 제작",
    process3Desc: "선택된 컨셉을 바탕으로 AI가 비디오를 생성하고 전문 팀이 디테일을 조정합니다.",
    process4Title: "전달 및 최적화",
    process4Desc: "각 플랫폼에 맞춤 포맷팅된 에셋을 전달하고 성과 데이터에 기반해 지속적으로 최적화합니다.",
    footerRights: "모든 권리 보유. Advanced AI Agency Intelligence 기술 지원.",
    wizardTitle: "프로젝트 전략 및 기획",
    step1: "기획 & 전략",
    step2: "프로젝트 전달",
    step3: "전달 & 최적화",
    errFillRequired: "브랜드 이름과 제품 설명을 입력해 주세요.",
    errBrandNameRequired: "브랜드 / 서비스 이름을 입력해 주세요.",
    errProductDescRequired: "제품 / 서비스 설명을 입력해 주세요.",
    errEmailRequired: "완성된 제작물을 받으실 이메일 주소를 입력해 주세요.",
    errEmailInvalid: "제대로 된 형식에 맞춰 작성 부탁드립니다.",
    errConceptRequired: "프로젝트 핵심 광고 컨셉을 입력해 주세요.",
    errConceptLength: "조금 더 작성해주십시오.",
    errCustomCategory: "맞춤형 프로젝트 카테고리를 지정해 주세요.",
    errCustomGoal: "맞춤형 프로젝트 목적을 지정해 주세요.",
    errCustomPlacements: "맞춤형 채널을 지정해 주세요.",
    errCustomAudience: "맞춤형 타겟 오디언스를 지정해 주세요.",
    errCustomMood: "맞춤형 광고 무드를 지정해 주세요.",
    errCustomBudget: "맞춤형 예산 범위를 지정해 주세요.",
    errCustomTimeline: "맞춤형 일정을 지정해 주세요.",
    briefStage1: "프로젝트 전략",
    briefStage2: "상세 기획서",
    labelCategory: "프로젝트 카테고리 / 산업군",
    labelObjective: "프로젝트 목적",
        labelPlacements: "배포 채널 및 게재 지면",
    btnNextSpecs: "다음 단계: 상세 설정",
    labelBrandName: "브랜드 / 서비스 이름",
    labelProductDesc: "제품 / 서비스 설명",
    placeholderBrandName: "예: Vespera, Nike, Stripe",
    placeholderProductDesc: "고객님의 의도와 정확한 광고 제작을 위해 최대한 상세히 작성해주시길 바랍니다",
    labelAudience: "타겟 오디언스",
    labelMood: "광고 무드 & 톤",
    labelBudget: "예산 범위",
    labelTimeline: "희망 완료 일정",
    btnPrevStrategy: "이전 단계",
    btnGenerateConcepts: "프로젝트 전달하기",
    optionOther: "기타 (직접 입력...)",
    loadingStrategy: "전략 분석 중...",
    step2Title: "프로젝트 전달",
    step2Desc: "프로젝트의 핵심 광고 컨셉을 타이핑해 주세요. 입력하신 컨셉을 바탕으로 뛰어난 기술자들과 AI 창작물을 제작합니다. 고객님의 의도에 맞게 최대한 자세히 작성해 주시길 바랍니다.",
    step2Placeholder: "예: 바쁜 현대인을 위해 터치 한 번으로 끝나는 간편한 커피 머신의 편리함을 강조. 따뜻하고 고급스러운 톤앤매너로 신뢰감을 부여함.",
    labelPlacementsRec: "추천 채널",
    labelEstimatedCTR: "예상 CTR",
    labelEstimatedROAS: "예상 ROAS",
    btnBack: "이전",
    btnStartProduction: "프로젝트 신청",
    errSelectConcept: "진행하려면 컨셉을 설정해 주세요.",
    loadingSelectConcept: "컨셉 설정 중...",
    loadingTitle: "AI가 비디오 및 스토리보드를 생성하는 중입니다",
    loadingDesc: "기획서 기반의 크리에이티브 시퀀스를 구성하고 오디오/비디오 레이아웃을 모델링하고 있습니다.",
    loadStep1: "브랜드 전략 분석 및 핵심 키워드 추출 중...",
    loadStep2: "오디언스 행동 데이터 기반 크리에이티브 컨셉 매핑 중...",
    loadStep3: "4단 스토리보드 비주얼 구성 중...",
    loadStep4: "내레이션 보이스오버 스크립트 작성 중...",
    loadStep5: "최종 프로젝트 에셋 및 미디어 가이드라인 패키징 중...",
    step4Title: "프로젝트 에셋 전달 및 최적화",
    panelPreviewTitle: "생성된 AI 프로젝트 미리보기",
    placeholderPlay: "프로젝트 테스트 프리뷰 재생",
    labelHeadline: "헤드라인",
    labelPrimaryCopy: "메인 카피",
    labelCta: "CTA 버튼 문구",
    panelStoryboardTitle: "비디오 스토리보드 스크립트",
    panelOptimizeTitle: "채널별 프로젝트 최적화 가이드",
    btnDownload: "신청 정보 다운로드",
    btnCreateNew: "새 프로젝트 신청하기",
    btnPrint: "인쇄하기",
    alertZipReady: "신청 정보가 준비되었습니다.",
    sceneLabel: "장면",
    sceneVisual: "비주얼",
    sceneAudio: "오디오/내레이션",
    btnBackToLanding: "돌아가기",
    btnStartCampaignType: "이 프로젝트 제작하기",
    labelKeyMetrics: "핵심 지표",
    labelSuccessCases: "성공 사례",
    labelMediaShowcase: "크리에이티브 쇼케이스",
    labelWorkflow: "작업 프로세스",
    faqTitle: "자주 하는 질문",
    faqQ1: "광고는 어떻게 만들어 지나요?",
    faqA1: "요청하신 내용대로 다양한 AI기술자와 함께 최상급의 사진과 영상을 만들어냅니다.",
    faqQ2: "제작 시간은 어느정도 걸리나요?",
    faqA2: "제작물의 경우에 따라 다릅니다. 하지만 최대한 빨리 72시간안에 대부분 만들어 드립니다.",
    faqQ3: "광고용만 제작하나요?",
    faqA3: "광고뿐만 아니라 다양한 포스터, 그 외 어떤 AI제작물이든 만듭니다.",
    faqQ4: "단가는 어떻게 되나요?",
    faqA4: "최대한 합리적인 가격에 맞춰드립니다. 제작물에 따라 단가가 달라집니다.",
    contactTitle: "직접 문의하기",
    contactSubtitle: "궁금하신 점이 있거나 새로운 프로젝트를 시작하고 싶으신가요? 편하게 문의를 남겨주세요.",
    contactName: "성함 / 회사명",
    contactNamePlaceholder: "홍길동 / 뉴베라코리아",
    contactEmail: "이메일 주소",
    contactMessage: "문의 내용",
    contactSubmit: "문의 제출하기",
    contactSuccess: "문의가 성공적으로 전달되었습니다. 24시간 이내에 회신드리겠습니다.",
    careersTag: "채용 안내",
    careersTitlePre: "당신은 새로운 감각을 가진 인재입니다",
    careersTitleSpan: "VERARVO와 함께 합시다",
    careersSubtitle: "포트폴리오와 이력서를 함께 보내주세요.",
    careersApplyHeader: "지원하기",
    careersJobsLabel: "직무",
    careersNameLabel: "이름",
    careersNationalityLabel: "국적",
    careersEmailLabel: "이메일",
    careersPortfolioLabel: "포트폴리오 - PDF",
    careersResumeLabel: "이력서 - PDF",
    careersNotesLabel: "기타 붙임말",
    careersSubmitBtn: "지원서 제출하기",
    careersSuccessMsg: "지원서가 성공적으로 전달되었습니다. 검토 후 연락드리겠습니다.",
    careersJobsList: [
      "AI 비디오 크리에이터",
      "영상 편집 & 모션 디자이너",
      "AI 프롬프트 엔지니어",
      "크리에이티브 프로젝트 매니저 (PM)"
    ]
  },
  EN: {
    navServices: "Services",
    navWork: "About Us",
    navProcess: "Process",
    navCareers: "Careers",
    navContact: "Contact",
    btnStartProject: "Start a Project",
    btnLandingPage: "Back to Home",
    heroTag: "CREATE ANEW WITH AI",
    heroTitlePre: "New Perspective,",
    heroTitleSpan: "New Ads",
    heroTitlePost: "VERARVO",
    heroSubtitleMain: <>We create a new era with new AI technology.<br />Expensive models are no longer needed.</>,
    heroSubtitleSub1: "High-quality advertising completed from a single brief.",
    heroSubtitleSub2: "New experiences that transcend imagination.",
    heroSubtitleSub3: "Multiple AI engineers work together.",
    videoQualityText: "We create the same quality as the video shown",
    aiDisclaimer: "All videos are generated by AI",
    btnStartProjectAction: "Start Project",
    btnExploreServices: "Explore Services",
    reelText: "verarvo — Create Anew With AI — 2026",
    reelStartCampaign: "Start Campaign",
    aboutTag: "ABOUT VERARVO",
    aboutHandwriting: "Turning ideas into reality",
    aboutTitlePre: "New Ads",
    aboutTitleSpan: "Created with AI,",
    aboutTitlePost: "VERARVO",
    aboutText1: "Traditional ad production required a lot of time and money. It involved scouting shooting locations, casting models, and going through filming and editing processes. It was common for a single ad to take days to weeks to complete and incur high production costs.",
    aboutText2: <><span style={{ color: '#FACC15' }}>VERARVO</span> changes this process. We leverage generative AI technology to create ad images and video content from just a single product photo. Various concepts and styles can be implemented quickly without complex filming processes, delivering the brand's desired creative in a short period.</>,
    aboutText3: "Advertising is not just a nice-looking video. It is a powerful tool that captures customer attention and drives action.",
    aboutText4: <><span style={{ color: '#FACC15' }}>VERARVO</span>'s AI creators and marketing experts collaborate to produce ad content that drives performance, not just simple output.</>,
    statProjects: "Completed Projects",
    statTime: "Average Production Time",
    statCostSaving: "Cost Reduction",
    statSatisfaction: "Client Satisfaction",
    servicesTag: "CREATIVE ASSETS",
    servicesTitlePre: "What VERARVO",
    servicesTitleSpan: "Create",
    servicesSubtitle: "Solve all your brand's advertising needs with our integrated AI-powered ad solutions.",
    service1Name: "AI Video Ad Creation",
    service1Desc: "High-quality video ads completed from a single text brief. AI handles filming, editing, and virtual model casting.",
    service2Name: "Event & Exhibition Promo",
    service2Desc: "High-impact promotional videos for offline & online events, festivals, brand pop-ups, and exhibitions.",
    service3Name: "Social Short-form Content",
    service3Desc: "A bulk content creation solution for AI videos optimized for Instagram, TikTok, and YouTube Shorts.",
    service4Name: "Virtual Models & Influencers",
    service4Desc: "A one-stop solution for AI virtual model generation, character development, and campaigns.",
    service5Name: "Interior & Furniture Projects",
    service5Desc: "High-end interior and furniture visual solutions that maximize the value of spaces.",
    processTag: "HOW WE WORK",
    processTitlePre: "VERARVO",
    processTitleSpan: "Process",
    processSubtitle: "A transparent and fast 4-step workflow, from brief submission to final delivery.",
    process1Title: "Brief & Strategy",
    process1Desc: "We analyze your brand goals and target audience to establish the optimal AI advertising strategy.",
    process2Title: "Concept Generation",
    process2Desc: "AI generates hundreds of creative concepts and selects the best options.",
    process3Title: "AI Video Production",
    process3Desc: "AI generates videos based on selected concepts, which are then polished by our professional team.",
    process4Title: "Delivery & Optimization",
    process4Desc: "We deliver formatted assets for each platform and continuously optimize based on performance data.",
    footerRights: "All rights reserved. Powered by Advanced AI Agency Intelligence.",
    wizardTitle: "Project Strategy & Planning",
    step1: "Brief & Strategy",
    step2: "Project Delivery",
    step3: "Delivery & Optimization",
    errFillRequired: "Please enter a brand name and product description.",
    errBrandNameRequired: "Please enter a brand / service name.",
    errProductDescRequired: "Please enter a product / service description.",
    errEmailRequired: "Please enter your email address to receive the completed assets.",
    errEmailInvalid: "Please enter a valid email address.",
    errConceptRequired: "Please type your creative concept.",
    errConceptLength: "Please write a bit more (minimum 10 characters).",
    errCustomCategory: "Please specify your custom project category.",
    errCustomGoal: "Please specify your custom project goal.",
    errCustomPlacements: "Please specify your custom distribution placements.",
    errCustomAudience: "Please specify your custom target audience.",
    errCustomMood: "Please specify your custom ad mood & tone.",
    errCustomBudget: "Please specify your custom budget range.",
    errCustomTimeline: "Please specify your custom timeline.",
    briefStage1: "Project Strategy",
    briefStage2: "Detailed Brief",
    labelCategory: "Project Category / Industry",
    labelObjective: "Project Goal",
    labelPlacements: "Distribution Channels & Placements",
    btnNextSpecs: "Next: Detailed Specs",
    labelBrandName: "Brand / Service Name",
    labelProductDesc: "Product / Service Description",
    placeholderBrandName: "e.g., Vespera, Nike, Stripe",
    placeholderProductDesc: "Describe your product benefits, core value propositions, and features...",
    labelAudience: "Target Audience",
    labelMood: "Ad Mood & Tone",
    labelBudget: "Estimated Budget Range",
    labelTimeline: "Target Completion Timeline",
    btnPrevStrategy: "Core Strategy",
    btnGenerateConcepts: "Proceed to Delivery",
    optionOther: "Other (Custom...)",
    loadingStrategy: "Analyzing Strategy...",
    step2Title: "Project Delivery",
    step2Desc: "Please type the core creative concept of your project. Custom video and storyboard assets will be generated immediately based on your concept.",
    step2Placeholder: "e.g., Emphasize the convenience of a one-touch coffee machine for busy professionals. Set in a warm, premium tone to build trust.",
    labelPlacementsRec: "Recommended Placements",
    labelEstimatedCTR: "Estimated CTR",
    labelEstimatedROAS: "Estimated ROAS",
    btnBack: "Back",
    btnStartProduction: "Apply for Project",
    errSelectConcept: "Please set your concept to proceed.",
    loadingSelectConcept: "Setting Concept...",
    loadingTitle: "AI is generating video & storyboards",
    loadingDesc: "Computing brief-based creative sequences and modeling audio/video layouts.",
    loadStep1: "Analyzing brand strategy and extracting core keywords...",
    loadStep2: "Mapping creative concepts based on audience behavior data...",
    loadStep3: "Structuring 4-panel storyboard visuals...",
    loadStep4: "Generating narration voiceover script...",
    loadStep5: "Packaging final project assets and media guidelines...",
    step4Title: "Project Assets Delivery & Optimization",
    panelPreviewTitle: "Generated AI Project Preview",
    placeholderPlay: "Play Project Test Preview",
    labelHeadline: "Headline",
    labelPrimaryCopy: "Primary Copy",
    labelCta: "CTA Button Text",
    panelStoryboardTitle: "Video Storyboard Script",
    panelOptimizeTitle: "Channel-specific Project Optimization Guide",
    btnDownload: "Download Application Info",
    btnCreateNew: "Apply for New Project",
    btnPrint: "Print Summary",
    alertZipReady: "Application info is ready.",
    sceneLabel: "Scene",
    sceneVisual: "Visual",
    sceneAudio: "Audio/Narration",
    btnBackToLanding: "Back to Home",
    btnStartCampaignType: "Launch This Project",
    labelKeyMetrics: "Key Metrics",
    labelSuccessCases: "Success Cases",
    labelMediaShowcase: "Creative Showcase",
    labelWorkflow: "Workflow Steps",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "How are ads generated?",
    faqA1: "We create top-tier photos and videos together with various AI engineers as you requested.",
    faqQ2: "How long does production take?",
    faqA2: "It depends on the production type, but we deliver most of them within 72 hours.",
    faqQ3: "Do you only create ads?",
    faqA3: "We create ads, various posters, and any other AI-generated creative assets.",
    faqQ4: "What is the pricing?",
    faqA4: "We adjust to the most reasonable prices. The price varies depending on the specific asset.",
    contactTitle: "Direct Inquiry",
    contactSubtitle: "Have questions or want to launch a new project? Drop us a line.",
    contactName: "Name / Company",
    contactNamePlaceholder: "John Doe / NewVera Korea",
    contactNamePlaceholder: "John Doe / NewVera Korea",
    contactEmail: "Email Address",
    contactMessage: "Your Message",
    contactSubmit: "Submit Inquiry",
    contactSuccess: "Inquiry sent successfully. We will get back to you within 24 hours.",
    careersTag: "CAREERS",
    careersTitlePre: "We are always waiting for creators with",
    careersTitleSpan: "New Senses & Perspectives",
    careersSubtitle: "Please submit your portfolio and resume together.",
    careersApplyHeader: "Apply Now",
    careersJobsLabel: "Position / Role",
    careersNameLabel: "Name",
    careersNationalityLabel: "Nationality",
    careersEmailLabel: "Email",
    careersPortfolioLabel: "Portfolio - PDF",
    careersResumeLabel: "Resume - PDF",
    careersNotesLabel: "Additional Notes",
    careersSubmitBtn: "Submit Application",
    careersSuccessMsg: "Your application has been submitted successfully. We will review and contact you.",
    careersJobsList: [
      "AI Video Creator",
      "Video Editor & Motion Designer",
      "AI Prompt Engineer",
      "Creative Project Manager (PM)"
    ]
  },
  ZH: {
    navServices: "服务",
    navWork: "公司介绍",
    navProcess: "流程",
    navCareers: "人才招聘",
    navContact: "联系我们",
    btnStartProject: "开始项目",
    btnLandingPage: "返回主页",
    heroTag: "用 AI 重新创造",
    heroTitlePre: "全新的视角,",
    heroTitleSpan: "全新的广告",
    heroTitlePost: "VERARVO",
    heroSubtitleMain: <>用全新的 AI 技术创造全新时代。<br />不再需要昂贵的模特。</>,
    heroSubtitleSub1: "仅需一份创意简报，完成高品质广告。",
    heroSubtitleSub2: "超越想象的全新体验。",
    heroSubtitleSub3: "多位 AI 工程师携手合作。",
    videoQualityText: "制作与所示视频相同品质的广告",
    aiDisclaimer: "所有视频均由 AI 制作",
    btnStartProjectAction: "开始项目",
    btnExploreServices: "探索服务",
    reelText: "verarvo — 用 AI 重新创造 — 2026",
    reelStartCampaign: "开启活动",
    aboutTag: "ABOUT VERARVO",
    aboutHandwriting: "将创意变为现实",
    aboutTitlePre: "由 AI 打造的",
    aboutTitleSpan: "全新广告，",
    aboutTitlePost: "VERARVO",
    aboutText1: "传统的广告制作需要耗费大量的时间和资金。它涉及物色拍摄场地、招募模特，以及经历拍摄和编辑过程。通常，一个广告需要几天到几周的时间才能完成，并且制作成本高昂。",
    aboutText2: <><span style={{ color: '#FACC15' }}>VERARVO</span> 改变了这一流程。我们利用生成式 AI 技术，仅凭一张产品照片即可制作广告图片和视频内容。无需复杂的拍摄流程即可快速实现各种概念和风格，在短时间内交付品牌所需的创意。</>,
    aboutText3: "广告不仅仅是好看的视频。它是吸引客户注意并促进行动的强大工具。",
    aboutText4: <><span style={{ color: '#FACC15' }}>VERARVO</span> 汇集了 AI 创作者和营销专家，共同协作，生产旨在实现业绩而非单纯产出的广告内容。</>,
    statProjects: "已完成项目",
    statTime: "平均制作时间",
    statCostSaving: "制作成本节省",
    statSatisfaction: "客户满意度",
    servicesTag: "创意制作",
    servicesTitlePre: "VERARVO",
    servicesTitleSpan: "创造什么",
    servicesSubtitle: "通过我们整合的AI智能广告解决方案，解决您品牌的所有广告需求。",
    service1Name: "AI 视频广告制作",
    service1Desc: "仅凭一份文本简报即可完成的高质量视频广告。AI负责拍摄、剪辑和虚拟模特选角。",
    service2Name: "活动与展览宣传",
    service2Desc: "为博览会、节日、品牌快闪店及展览会等各类线上线下活动制作最佳的宣传视频。",
    service3Name: "社交短视频内容",
    service3Desc: "针对Instagram Reels、TikTok和YouTube Shorts优化的大批量AI视频内容创作解决方案。",
    service4Name: "虚拟模特 & 网红",
    service4Desc: "AI虚拟模特生成、角色定制开发及持续营销活动的一站式服务。",
    service5Name: "室内设计与家具项目",
    service5Desc: "提供高端室内设计与家具视觉解决方案，最大化空间价值。",
    processTag: "工作流程",
    processTitlePre: "VERARVO",
    processTitleSpan: "工作流程",
    processSubtitle: "从简报提交到最终交付，提供透明、快速的4步法工作流。",
    process1Title: "简报与策略",
    process1Desc: "分析品牌目标和目标受众，确立最佳的AI广告定位与策略。",
    process2Title: "概念生成",
    process2Desc: "AI生成数百个创意方向，并筛选出最佳的执行方案。",
    process3Title: "AI 视频制作",
    process3Desc: "AI根据选定的创意概念生成视频，并由我们的专业团队进行精细打磨。",
    process4Title: "交付与优化",
    process4Desc: "交付针对各平台优化的广告资产，并根据数据反馈进行持续优化。",
    footerRights: "保留所有权利。由 Advanced AI Agency Intelligence 提供技术支持。",
    wizardTitle: "项目战略与规划",
    step1: "简报与策略",
    step2: "概念设置",
    step3: "交付与优化",
    errFillRequired: "请输入品牌名称和产品描述。",
    errBrandNameRequired: "请输入品牌 / 服务名称。",
    errProductDescRequired: "请输入产品 / 服务详细描述。",
    errEmailRequired: "请输入您的电子邮箱地址以接收完成的资产。",
    errEmailInvalid: "请输入有效的电子邮箱地址。",
    errConceptRequired: "请输入项目的核心创意概念。",
    errConceptLength: "请再多写一点（最少 10 个字）。",
    errCustomCategory: "请指定您的自定义项目类别。",
    errCustomGoal: "请指定您的自定义项目目标。",
    errCustomPlacements: "请指定您的自定义分发渠道。",
    errCustomAudience: "请指定您的自定义目标受众。",
    errCustomMood: "请指定您的自定义广告风格基调。",
    errCustomBudget: "请指定您的自定义预算范围。",
    errCustomTimeline: "请指定您的自定义交付时间。",
    briefStage1: "项目战略阶段",
    briefStage2: "创意简报阶段",
    labelCategory: "项目类别 / 行业",
    labelObjective: "项目目的",
    labelPlacements: "分发渠道与广告版位",
    btnNextSpecs: "下一步：详细配置",
    labelBrandName: "品牌 / 服务名称",
    labelProductDesc: "产品 / 服务详细描述",
    placeholderBrandName: "例如：Vespera, Nike, Stripe",
    placeholderProductDesc: "描述您的产品优势、核心价值主张以及关键特征...",
    labelAudience: "目标受众群体",
    labelMood: "广告风格与调性",
    labelBudget: "预估预算范围",
    labelTimeline: "期望交付时间",
    btnPrevStrategy: "返回主要策略",
    btnGenerateConcepts: "概念设置",
    optionOther: "其他 (自定义输入...)",
    loadingStrategy: "策略分析中...",
    step2Title: "项目创意概念设置",
    step2Desc: "请输入您的项目的核心创意概念。系统将根据您输入的概念立即生成定制的视频和分镜脚本资产。",
    step2Placeholder: "例如：为忙碌的专业人士强调一键式咖啡机的便利。采用温暖、高端的色调以建立信任。",
    labelPlacementsRec: "推荐版位",
    labelEstimatedCTR: "预估点击率",
    labelEstimatedROAS: "预估回报率",
    btnBack: "返回",
    btnStartProduction: "申请项目",
    errSelectConcept: "请设置一个概念以继续项目。",
    loadingSelectConcept: "概念设置中...",
    loadingTitle: "AI 正在生成视频及分镜脚本",
    loadingDesc: "正在计算基于创意简报的视频序列并建模音频/视频布局。",
    loadStep1: "正在分析品牌策略并提取核心关键词...",
    loadStep2: "正在基于受众行为数据匹配创意概念...",
    loadStep3: "正在构建4格分镜视觉脚本...",
    loadStep4: "正在生成旁白配音脚本...",
    loadStep5: "正在打包最终项目资产及媒体规范指南...",
    step4Title: "项目资产交付与投放优化",
    panelPreviewTitle: "生成的 AI 项目预览",
    placeholderPlay: "播放项目演示预览",
    labelHeadline: "广告标题",
    labelPrimaryCopy: "主文案",
    labelCta: "CTA 按钮文本",
    panelStoryboardTitle: "视频分镜脚本明细",
    panelOptimizeTitle: "渠道专属项目优化指南",
    btnDownload: "下载申请信息",
    btnCreateNew: "申请新项目",
    btnPrint: "打印摘要",
    alertZipReady: "申请信息已准备就绪。",
    sceneLabel: "场景",
    sceneVisual: "视觉画面",
    sceneAudio: "音频/旁白",
    btnBackToLanding: "返回首页",
    btnStartCampaignType: "启动此项项目制作",
    labelKeyMetrics: "核心指标",
    labelSuccessCases: "成功案例",
    labelMediaShowcase: "创意作品展示",
    labelWorkflow: "工作流程",
    faqTitle: "常见问题",
    faqQ1: "广告是如何制作的？",
    faqA1: "根据您的要求，我们与多位 AI 工程师携手，创作出顶级的照片与视频。",
    faqQ2: "制作需要多长时间？",
    faqA2: "取决于制作类型，但我们通常会在 72 小时内尽快完成。",
    faqQ3: "只制作广告吗？",
    faqA3: "不仅制作广告，还制作各种海报以及任何其他 AI 创意作品。",
    faqQ4: "价格是多少？",
    faqA4: "我们将提供最合理的价格。具体价格根据制作内容有所不同。",
    contactTitle: "直接咨询",
    contactSubtitle: "有任何问题或想启动新项目？请随时与我们联系。",
    contactName: "姓名 / 公司名",
    contactEmail: "邮箱地址",
    contactMessage: "咨询内容",
    contactSubmit: "提交咨询",
    contactSuccess: "咨询已成功提交。我们将在 24 小时内回复您。",
    careersTag: "招贤纳士",
    careersTitlePre: "我们一直在等待拥有",
    careersTitleSpan: "全新感官与视角的创意人才",
    careersSubtitle: "请同时提交您的作品集和简历。",
    careersApplyHeader: "申请职位",
    careersJobsLabel: "职位",
    careersNameLabel: "姓名",
    careersNationalityLabel: "国籍",
    careersEmailLabel: "邮箱地址",
    careersPortfolioLabel: "作品集 - PDF",
    careersResumeLabel: "个人简历 - PDF",
    careersNotesLabel: "备注说明",
    careersSubmitBtn: "提交申请",
    careersSuccessMsg: "您的申请已成功提交。我们将进行评估并与您联系。",
    careersJobsList: [
      "AI 视频创作者",
      "视频编辑与动效设计师",
      "AI 提示词工程师",
      "创意项目经理 (PM)"
    ]
  },
  JA: {
    navServices: "サービス",
    navWork: "会社概要",
    navProcess: "プロセス",
    navCareers: "採用情報",
    navContact: "お問い合わせ",
    btnStartProject: "プロジェクト開始",
    btnLandingPage: "ホーム画面に戻る",
    heroTag: "AIで新しく創る",
    heroTitlePre: "新しい視点,",
    heroTitleSpan: "新しい広告",
    heroTitlePost: "VERARVO",
    heroSubtitleMain: <>新しいAI技術で新しい時代を創ります。<br />もう高価なモデルは必要ありません。</>,
    heroSubtitleSub1: "たった一つの構成案から完成する高品質な広告。",
    heroSubtitleSub2: "想像を超える新しい体験。",
    heroSubtitleSub3: "複数のAIエンジニアが共に取り組みます。",
    videoQualityText: "表示されている映像と同等のクオリティの広告を制作します",
    aiDisclaimer: "すべての動画はAIによって作成されています",
    btnStartProjectAction: "プロジェクト開始",
    btnExploreServices: "サービスを見る",
    reelText: "verarvo — AIで新しく創る — 2026",
    reelStartCampaign: "キャンペーン開始",
    aboutTag: "ABOUT VERARVO",
    aboutHandwriting: "アイデアを現実にします",
    aboutTitlePre: "AIが創る",
    aboutTitleSpan: "新しい広告、",
    aboutTitlePost: "VERARVO",
    aboutText1: "従来の広告制作は、多くの時間と費用が必要でした。撮影場所を手配し、モデルをキャスティングし、撮影と編集のプロセスを経る必要がありました。1つの広告を完成させるために数日から数週間がかかり、高い制作費が発生するのが一般的でした。",
    aboutText2: <><span style={{ color: '#FACC15' }}>VERARVO</span>はこのようなプロセスを新しく変えます。私たちは生成AI技術を活用し、製品写真1枚だけで広告画像や映像コンテンツを制作します。複雑な撮影プロセスなしで多様なコンセプトとスタイルを迅速に実現でき、ブランドが求めるクリエイティブを短時間で提供します。</>,
    aboutText3: "広告は単に見栄えの良い映像ではありません。顧客の視線を引きつけ、行動を促す強力なツールです。",
    aboutText4: <><span style={{ color: '#FACC15' }}>VERARVO</span>は、AIクリエイターとマーケティングの専門家が連携し、単なる成果物ではなく成果を出すための広告コンテンツを制作します。</>,
    statProjects: "完了プロジェクト数",
    statTime: "平均制作時間",
    statCostSaving: "制作コスト削減",
    statSatisfaction: "顧客満足度",
    servicesTag: "制作物",
    servicesTitlePre: "VERARVO가",
    servicesTitleSpan: "創り出すもの",
    servicesSubtitle: "統合されたAI搭載広告ソリューションで、ブランドのあらゆる広告ニーズを解決します。",
    service1Name: "AI 動画広告制作",
    service1Desc: "1つのテキスト構成案から完成する高品質な動画広告。撮影、編集、バーチャルモデルのキャスティングまでAIが実行します。",
    service2Name: "イベント・展示会プロモーション",
    service2Desc: "博覧会、フェスティバル、ポップアップストア、展示会など、多様なオフライン・オンラインイベントのための最適なプロモーション動画を制作します。",
    service3Name: "ソーシャルショート動画",
    service3Desc: "Instagramリール、TikTok、YouTubeショート向けに最適化されたAI動画コンテンツの大量生成ソリューションです。",
    service4Name: "バーチャルモデル & インフルエンサー",
    service4Desc: "AIバーチャルモデルの生成、キャラクター開発、および継続的なキャンペーン運営のためのワンストップサービスです。",
    service5Name: "インテリア・家具プロジェクト",
    service5Desc: "空間の価値を極大化するハイエンドなインテリア・家具のビジュアルソリューションを提供します。",
    processTag: "プロセス",
    processTitlePre: "VERARVO",
    processTitleSpan: "プロセス",
    processSubtitle: "ヒアリングから最終納品まで、透明性が高く迅速な4ステップのワークフローを提供します。",
    process1Title: "構成と戦略",
    process1Desc: "ブランドの目標とターゲット層を分析し、最適なAI広告戦略を策定します。",
    process2Title: "コンセプト設計",
    process2Desc: "AIが何百ものクリエイティブな方向性を生成し、最適なコンセプトを選定します。",
    process3Title: "AI 動画制作",
    process3Desc: "選定されたコンセプトに基づいてAIが動画を生成し、専任のプロチームが微調整を行います。",
    process4Title: "納品と最適化",
    process4Desc: "各プラットフォーム向けにフォーマットされたアセットを納品し、実績データに基づいて継続的に最適化します。",
    footerRights: "All rights reserved. Powered by Advanced AI Agency Intelligence.",
    wizardTitle: "プロジェクト戦略と計画",
    step1: "戦略と構成",
    step2: "コンセプト設定",
    step3: "納品と最適化",
    errFillRequired: "ブランド名と製品説明を入力してください。",
    errBrandNameRequired: "ブランド / サービス名を入力してください。",
    errProductDescRequired: "製品 / サービスの説明を入力してください。",
    errEmailRequired: "完成したアセットを受け取るメールアドレスを入力してください。",
    errEmailInvalid: "有効なメールアドレスを入力してください。",
    errConceptRequired: "プロジェクトの核心となるクリエイティブコンセプトを入力してください。",
    errConceptLength: "もう少し詳しく入力してください（最小10文字）。",
    errCustomCategory: "カスタムプロジェクトカテゴリーを指定してください。",
    errCustomGoal: "カスタムプロジェクトの目標を指定してください。",
    errCustomPlacements: "カスタム配信チャネルを指定してください。",
    errCustomAudience: "カスタムターゲット層を指定してください。",
    errCustomMood: "カスタム広告のトーン＆マナーを指定してください。",
    errCustomBudget: "カスタム予算範囲を指定してください。",
    errCustomTimeline: "カスタム納期を指定してください。",
    briefStage1: "基本戦略",
    briefStage2: "詳細な構成案",
    labelCategory: "プロジェクトカテゴリー / 業界",
    labelObjective: "プロジェクト目的",
    labelPlacements: "配信チャネル＆掲載面",
    btnNextSpecs: "次へ: 詳細設定",
    labelBrandName: "ブランド / サービス名",
    labelProductDesc: "製品 / サービスの説明",
    placeholderBrandName: "例: Vespera, Nike, Stripe",
    placeholderProductDesc: "製品のメリット、強み、特徴などを詳しく説明してください...",
    labelAudience: "ターゲット層",
    labelMood: "広告のトーン＆マナー",
    labelBudget: "ご予算範囲",
    labelTimeline: "ご希望の納期",
    btnPrevStrategy: "基本戦略へ戻る",
    btnGenerateConcepts: "コンセプト設定",
    optionOther: "その他 (直接入力...)",
    loadingStrategy: "戦略を分析中...",
    step2Title: "プロジェクトクリエイティブコンセプト設定",
    step2Desc: "プロジェクトの核心となるクリエイティブコンセプトを入力してください。入力されたコンセプトに基づいて、カスタムビデオとストーリーボードアセットが即座に生成されます。",
    step2Placeholder: "例：忙しい現代人のために、ワンタッチで完結するコーヒーマシンの便利さを強調。温かく高級感のあるトーンで信頼感を与えます。",
    labelPlacementsRec: "推奨掲載面",
    labelEstimatedCTR: "想定CTR",
    labelEstimatedROAS: "想定ROAS",
    btnBack: "戻る",
    btnStartProduction: "プロジェクト申請",
    errSelectConcept: "進めるにはコンセプトを設定してください。",
    loadingSelectConcept: "コンセプト設定中...",
    loadingTitle: "AIが動画とストーリーボードを生成しています",
    loadingDesc: "構成案に基づいた動画シーケンスの演算とオーディオ/ビデオレイアウトのモデリングを行っています。",
    loadStep1: "ブランド戦略の分析および重要キーワードの抽出中...",
    loadStep2: "ユーザー行動データに基づくクリエイティブコンセプトのマッピング中...",
    loadStep3: "4コマの絵コンテビジュアルの構成中...",
    loadStep4: "ナレーション・ボイスオーバースクリプトの生成中...",
    loadStep5: "最終プロジェクトアセットおよびメディアガイドラインのパッケージング中...",
    step4Title: "プロジェクトアセットの納品と最適化",
    panelPreviewTitle: "生成されたAIプロジェクトプレビュー",
    placeholderPlay: "プロジェクトテストプレビューを再生",
    labelHeadline: "広告見出し",
    labelPrimaryCopy: "メインコピー",
    labelCta: "CTAボタンテキスト",
    panelStoryboardTitle: "動画絵コンテスクリプト",
    panelOptimizeTitle: "チャネル別プロジェクト最適化ガイド",
    btnDownload: "申請情報のダウンロード",
    btnCreateNew: "新規プロジェクトの申請",
    btnPrint: "要約を印刷する",
    alertZipReady: "申請情報が準備できました。",
    sceneLabel: "カット",
    sceneVisual: "映像",
    sceneAudio: "音声/ナレーション",
    btnBackToLanding: "トップページへ戻る",
    btnStartCampaignType: "このプロジェクトを制作する",
    labelKeyMetrics: "コア指標",
    labelSuccessCases: "成功事例",
    labelMediaShowcase: "クリエイティブ・ショーケース",
    labelWorkflow: "制作プロセス",
    faqTitle: "よくある質問",
    faqQ1: "広告はどのように制作されますか？",
    faqA1: "ご要望に応じて、複数のAI技術者と共に最高水準の写真や映像を制作します。",
    faqQ2: "制作期間はどのくらいですか？",
    faqA2: "制作物によって異なりますが、基本的には72時間以内に迅速に制作いたします。",
    faqQ3: "広告用のみ制作していますか？",
    faqA3: "広告だけでなく、各種ポスターやその他あらゆるAIクリエイティブに対応しています。",
    faqQ4: "料金はいくらですか？",
    faqA4: "最も合理的な価格でご提供いたします。制作物によって料金は異なります。",
    contactTitle: "直接お問い合わせ",
    contactSubtitle: "ご質問や新規プロジェクトのご相談など、お気軽にお問い合わせください。",
    contactName: "名前 / 会社名",
    contactNamePlaceholder: "山田太郎 / ニューベラコリア",
    contactEmail: "メールアドレス",
    contactMessage: "お問い合わせ内容",
    contactSubmit: "送信する",
    contactSuccess: "お問い合わせを送信しました。24時間以内にご連絡いたします。",
    careersTag: "CAREERS",
    careersTitlePre: "新しい感覚と視点を持ったクリエイターを",
    careersTitleSpan: "常にお待ちしております。",
    careersSubtitle: "ポートフォリオと履歴書を一緒にご送付ください。",
    careersApplyHeader: "応募する",
    careersJobsLabel: "職種",
    careersNameLabel: "お名前",
    careersNationalityLabel: "国籍",
    careersEmailLabel: "メールアドレス",
    careersPortfolioLabel: "ポートフォリオ - PDF",
    careersResumeLabel: "履歴書 - PDF",
    careersNotesLabel: "その他メッセージ",
    careersSubmitBtn: "応募書類を提出する",
    careersSuccessMsg: "応募書類が正常に送信されました。確認後、ご連絡いたします。",
    careersJobsList: [
      "AIビデオクリエイター",
      "映像編集＆モーションデザイナー",
      "AIプロンプトエンジニア",
      "クリエイティブプロジェクトマネージャー (PM)"
    ]
  },
  VI: {
    navServices: "Dịch vụ",
    navWork: "Về chúng tôi",
    navProcess: "Quy trình",
    navCareers: "Tuyển dụng",
    navContact: "Liên hệ",
    btnStartProject: "Bắt đầu dự án",
    btnLandingPage: "Quay lại trang chủ",
    heroTag: "SÁNG TẠO MỚI VỚI AI",
    heroTitlePre: "Góc nhìn mới,",
    heroTitleSpan: "Quảng cáo mới",
    heroTitlePost: "VERARVO",
    heroSubtitleMain: <>Chúng tôi kiến tạo kỷ nguyên mới với công nghệ AI đột phá.<br />Không còn cần những người mẫu đắt tiền nữa.</>,
    heroSubtitleSub1: "Quảng cáo chất lượng cao hoàn thiện chỉ từ một bản mô tả duy nhất.",
    heroSubtitleSub2: "Những trải nghiệm vượt bậc ngoài sức tưởng tượng.",
    heroSubtitleSub3: "Đội ngũ kỹ sư AI giàu kinh nghiệm đồng hành cùng bạn.",
    videoQualityText: "Chúng tôi tạo ra chất lượng đúng như video hiển thị",
    aiDisclaimer: "Tất cả video đều được tạo bởi AI",
    btnStartProjectAction: "Bắt đầu dự án",
    btnExploreServices: "Khám phá dịch vụ",
    reelText: "verarvo — Sáng tạo mới với AI — 2026",
    reelStartCampaign: "Bắt đầu chiến dịch",
    aboutTag: "ABOUT VERARVO",
    aboutHandwriting: "Biến ý tưởng thành hiện thực",
    aboutTitlePre: "Quảng cáo mới",
    aboutTitleSpan: "tạo bởi AI,",
    aboutTitlePost: "VERARVO",
    aboutText1: "Sản xuất quảng cáo truyền thống đòi hỏi rất nhiều thời gian và chi phí. Quy trình này bao gồm việc khảo sát địa điểm quay, tuyển chọn người mẫu, thực hiện ghi hình và biên tập. Việc hoàn thiện một quảng cáo thường mất từ vài ngày đến vài tuần và phát sinh chi phí sản xuất cao là điều phổ biến.",
    aboutText2: <><span style={{ color: '#FACC15' }}>VERARVO</span> thay đổi hoàn toàn quy trình này. Chúng tôi tận dụng công nghệ AI tạo sinh để sản xuất hình ảnh quảng cáo và nội dung video chỉ từ một bức ảnh sản phẩm duy nhất. Các ý tưởng và phong cách đa dạng có thể được thực hiện nhanh chóng mà không cần quy trình quay phim phức tạp, mang lại hiệu quả sáng tạo như thương hiệu mong muốn trong thời gian ngắn.</>,
    aboutText3: "Quảng cáo không chỉ là một video đẹp mắt. Đó là một công cụ mạnh mẽ thu hút sự chú ý của khách hàng và thúc đẩy hành động.",
    aboutText4: <><span style={{ color: '#FACC15' }}>VERARVO</span> là sự hợp tác giữa các nhà sáng tạo AI và chuyên gia tiếp thị để sản xuất nội dung quảng cáo mang lại hiệu suất thực tế chứ không chỉ là những sản phẩm đơn thuần.</>,
    statProjects: "Dự án đã hoàn thành",
    statTime: "Thời gian sản xuất trung bình",
    statCostSaving: "Tiết kiệm chi phí sản xuất",
    statSatisfaction: "Sự hài lòng của khách hàng",
    servicesTag: "SẢN PHẨM SÁNG TẠO",
    servicesTitlePre: "Sản phẩm sáng tạo từ",
    servicesTitleSpan: "VERARVO",
    servicesSubtitle: "Giải quyết mọi nhu cầu quảng cáo thương hiệu của bạn với các giải pháp tích hợp AI toàn diện.",
    service1Name: "Sản xuất video quảng cáo AI",
    service1Desc: "Video quảng cáo chất lượng cao bắt đầu từ một bản mô tả văn bản duy nhất. AI tự động hóa việc quay phim, chỉnh sửa và tuyển chọn người mẫu ảo.",
    service2Name: "Quảng bá Sự kiện & Triển lãm",
    service2Desc: "Sản xuất video quảng bá tối ưu cho các sự kiện trực tiếp/trực tuyến như hội chợ, lễ hội, cửa hàng pop-up và triển lãm.",
    service3Name: "Nội dung ngắn mạng xã hội",
    service3Desc: "Giải pháp sản xuất video ngắn hàng loạt, tối ưu hóa cho Instagram Reels, TikTok và YouTube Shorts.",
    service4Name: "Người mẫu ảo & Influencer AI",
    service4Desc: "Dịch vụ trọn gói tạo người mẫu ảo AI, phát triển nhân vật và chạy chiến dịch tiếp thị.",
    service5Name: "Dự án nội thất & đồ gỗ",
    service5Desc: "Cung cấp giải pháp hình ảnh nội thất và đồ gỗ cao cấp giúp tối đa hóa giá trị không gian.",
    processTag: "Quy trình làm việc",
    processTitlePre: "Quy trình",
    processTitleSpan: "VERARVO",
    processSubtitle: "Quy trình làm việc 4 bước nhanh chóng và minh bạch từ gửi brief đến bàn giao sản phẩm.",
    process1Title: "Lập kế hoạch & Chiến lược",
    process1Desc: "Phân tích mục tiêu thương hiệu và khách hàng mục tiêu để thiết lập chiến lược quảng cáo AI tối ưu.",
    process2Title: "Tạo ý tưởng (Concept)",
    process2Desc: "AI tạo ra hàng trăm ý tưởng sáng tạo và chọn ra những phương án xuất sắc nhất.",
    process3Title: "Sản xuất video AI",
    process3Desc: "Dựa trên ý tưởng được chọn, AI tiến hành tạo video và đội ngũ chuyên gia tinh chỉnh chi tiết.",
    process4Title: "Bàn giao & Tối ưu hóa",
    process4Desc: "Bàn giao các định dạng video tối ưu cho từng nền tảng và tiếp tục cải thiện dựa trên hiệu quả dữ liệu.",
    footerRights: "Bảo lưu mọi quyền. Hỗ trợ kỹ thuật bởi Advanced AI Agency Intelligence.",
    wizardTitle: "Chiến lược & Lập kế hoạch Dự án",
    step1: "Kế hoạch & Chiến lược",
    step2: "Thiết lập ý tưởng",
    step3: "Bàn giao & Tối ưu",
    errFillRequired: "Vui lòng nhập tên thương hiệu và mô tả sản phẩm.",
    errBrandNameRequired: "Vui lòng nhập tên thương hiệu / dịch vụ.",
    errProductDescRequired: "Vui lòng nhập mô tả sản phẩm / dịch vụ.",
    errEmailRequired: "Vui lòng nhập địa chỉ email của bạn để nhận tài nguyên hoàn thiện.",
    errEmailInvalid: "Vui lòng nhập địa chỉ email hợp lệ.",
    errConceptRequired: "Vui lòng nhập ý tưởng sáng tạo cốt lõi của dự án.",
    errConceptLength: "Vui lòng viết thêm một chút (tối thiểu 10 ký tự).",
    errCustomCategory: "Vui lòng chỉ định ngành hàng dự án tùy chỉnh.",
    errCustomGoal: "Vui lòng chỉ định mục tiêu dự án tùy chỉnh.",
    errCustomPlacements: "Vui lòng chỉ định kênh phân phối tùy chỉnh.",
    errCustomAudience: "Vui lòng chỉ định đối tượng mục tiêu tùy chỉnh.",
    errCustomMood: "Vui lòng chỉ định phong cách/tông màu tùy chỉnh.",
    errCustomBudget: "Vui lòng chỉ định ngân sách tùy chỉnh.",
    errCustomTimeline: "Vui lòng chỉ định thời gian mong muốn tùy chỉnh.",
    briefStage1: "Chiến lược dự án",
    briefStage2: "Bản mô tả chi tiết",
    labelCategory: "Ngành hàng / Lĩnh vực dự án",
    labelObjective: "Mục tiêu dự án",
    labelPlacements: "Kênh phân phối & Vị trí hiển thị",
    btnNextSpecs: "Tiếp theo: Thiết lập chi tiết",
    labelBrandName: "Tên thương hiệu / Dịch vụ",
    labelProductDesc: "Mô tả sản phẩm / Dịch vụ",
    placeholderBrandName: "Ví dụ: Vespera, Nike, Stripe",
    placeholderProductDesc: "Mô tả ưu điểm sản phẩm, giá trị cốt lõi và các tính năng chính...",
    labelAudience: "Đối tượng mục tiêu",
    labelMood: "Phong cách & Tông màu quảng cáo",
    labelBudget: "Ngân sách dự kiến",
    labelTimeline: "Thời gian hoàn thành mong muốn",
    btnPrevStrategy: "Quay lại",
    btnGenerateConcepts: "Thiết lập ý tưởng",
    optionOther: "Khác (Nhập thủ công...)",
    loadingStrategy: "Đang phân tích chiến lược...",
    step2Title: "Thiết lập ý tưởng sáng tạo Dự án",
    step2Desc: "Vui lòng nhập ý tưởng sáng tạo cốt lõi của dự án. Video và phân cảnh tùy chỉnh sẽ được tạo ngay lập tức dựa trên ý tưởng của bạn.",
    step2Placeholder: "Ví dụ: Nhấn mạnh sự tiện lợi của máy pha cà phê một chạm cho người bận rộn. Thiết lập tông màu ấm áp, cao cấp để xây dựng lòng tin.",
    labelPlacementsRec: "Kênh đề xuất",
    labelEstimatedCTR: "CTR dự kiến",
    labelEstimatedROAS: "ROAS dự kiến",
    btnBack: "Quay lại",
    btnStartProduction: "Đăng ký dự án",
    errSelectConcept: "Vui lòng thiết lập ý tưởng để tiếp tục.",
    loadingSelectConcept: "Đang thiết lập ý tưởng...",
    loadingTitle: "AI đang tạo video và kịch bản phân cảnh",
    loadingDesc: "Đang xây dựng chuỗi phân cảnh sáng tạo và thiết lập bố cục âm thanh/hình ảnh dựa trên brief.",
    loadStep1: "Đang phân tích chiến lược thương hiệu và trích xuất từ khóa cốt lõi...",
    loadStep2: "Đang thiết lập ý tưởng sáng tạo dựa trên dữ liệu hành vi của đối tượng mục tiêu...",
    loadStep3: "Đang dựng bố cục hình ảnh phân cảnh 4 bước...",
    loadStep4: "Đang biên soạn kịch bản thuyết minh (Voiceover)...",
    loadStep5: "Đang đóng gói tài nguyên dự án và hướng dẫn truyền thông cuối cùng...",
    step4Title: "Bàn giao & Tối ưu hóa tài nguyên dự án",
    panelPreviewTitle: "Xem trước dự án AI được tạo",
    placeholderPlay: "Phát thử nghiệm dự án",
    labelHeadline: "Tiêu đề",
    labelPrimaryCopy: "Nội dung chính (Primary Copy)",
    labelCta: "Nút kêu gọi hành động (CTA)",
    panelStoryboardTitle: "Kịch bản phân cảnh video",
    panelOptimizeTitle: "Hướng dẫn tối ưu hóa dự án theo kênh",
    btnDownload: "Tải xuống thông tin đăng ký",
    btnCreateNew: "Đăng ký dự án mới",
    btnPrint: "In tóm tắt",
    alertZipReady: "Thông tin đăng ký đã sẵn sàng.",
    sceneLabel: "Cảnh",
    sceneVisual: "Hình ảnh hiển thị",
    sceneAudio: "Âm thanh / Thuyết minh",
    btnBackToLanding: "Quay lại trang chủ",
    btnStartCampaignType: "Bắt đầu dự án này",
    labelKeyMetrics: "Chỉ số cốt lõi",
    labelSuccessCases: "Dự án thành công",
    labelMediaShowcase: "Thành phẩm sáng tạo",
    labelWorkflow: "Quy trình làm việc",
    faqTitle: "Câu hỏi thường gặp (FAQ)",
    faqQ1: "Quảng cáo được sản xuất như thế nào?",
    faqA1: "Dựa trên yêu cầu của bạn, chúng tôi làm việc cùng các chuyên gia AI hàng đầu để sản xuất hình ảnh và video chất lượng cao nhất.",
    faqQ2: "Mất bao lâu để hoàn thành?",
    faqA2: "Thời gian tùy thuộc vào từng loại sản phẩm sáng tạo. Tuy nhiên, hầu hết đều được bàn giao trong vòng 72 giờ.",
    faqQ3: "Chỉ làm quảng cáo video thôi sao?",
    faqA3: "Không chỉ quảng cáo, chúng tôi còn thiết kế poster, banner và bất kỳ sản phẩm sáng tạo AI nào bạn yêu cầu.",
    faqQ4: "Đơn giá dịch vụ thế nào?",
    faqA4: "Chúng tôi cam kết mức giá hợp lý nhất có thể. Đơn giá sẽ thay đổi tùy theo yêu cầu của từng sản phẩm sáng tạo.",
    contactTitle: "Liên hệ trực tiếp",
    contactSubtitle: "Bạn có thắc mắc hay muốn bắt đầu dự án mới? Hãy để lại lời nhắn, chúng tôi sẽ hỗ trợ ngay.",
    contactName: "Tên / Tên công ty",
    contactNamePlaceholder: "Nguyễn Văn A / NewVera Korea",
    contactEmail: "Địa chỉ Email",
    contactMessage: "Nội dung tin nhắn",
    contactSubmit: "Gửi lời nhắn",
    contactSuccess: "Gửi liên hệ thành công. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
    careersTag: "TUYỂN DỤNG",
    careersTitlePre: "Chúng tôi luôn chào đón các nhà sáng tạo có",
    careersTitleSpan: "Góc nhìn & Cảm quan mới.",
    careersSubtitle: "Vui lòng gửi kèm CV và Portfolio (PDF) của bạn.",
    careersApplyHeader: "Ứng tuyển ngay",
    careersJobsLabel: "Vị trí ứng tuyển",
    careersNameLabel: "Họ và Tên",
    careersNationalityLabel: "Quốc tịch",
    careersEmailLabel: "Địa chỉ Email",
    careersPortfolioLabel: "Portfolio - PDF",
    careersResumeLabel: "CV - PDF",
    careersNotesLabel: "Lời nhắn thêm",
    careersSubmitBtn: "Nộp hồ sơ",
    careersSuccessMsg: "Hồ sơ của bạn đã được gửi thành công. Chúng tôi sẽ đánh giá và liên hệ lại với bạn.",
    careersJobsList: [
      "Nhà sáng tạo video AI",
      "Biên tập viên video & Thiết kế chuyển động",
      "Kỹ sư Prompt AI",
      "Quản lý dự án sáng tạo (PM)"
    ]
  }
};

const serviceDetailsData = {
  KO: {
    1: {
      title: "제품 광고",
      tag: "PRODUCT AD",
      desc: "고객님의 기획서에서 시작하는 고품질 비디오 광고 제작을 AI기술자와 함께 합니다. 시선을 사로잡는 강력한 비주얼과 압도적인 퀄리티로 브랜드의 핵심 가치를 가장 돋보이게 표현합니다.",
      metrics: [
        { label: "제작 기간", val: "72시간 이내" },
        { label: "영상 퀄리티", val: "4K UHD" },
        { label: "고객 만족도", val: "99%" }
      ],
      cases: [],
      features: [
        { title: "광고가 전달하려는 메시지", desc: "브랜드 고유의 가치를 살려 타겟의 마음을 움직이는 핵심 메시지를 전달합니다." },
        { title: "합리적인 가격", desc: "제작 공정의 거품을 빼고 AI 최적화 파이프라인을 통해 경제적인 비용으로 제작합니다." },
        { title: "직관적인 연출", desc: "시각적 후크와 감각적인 구성을 활용해 제품의 매력을 직관적으로 이해시킵니다." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "가로로 긴 직사각형 영상 (16:9)", placeholderText: "가로로 긴 직사각형 영상 (16:9)", url: "/4215716-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "세로로 긴 직사각형 영상 (9:16)", placeholderText: "세로로 긴 직사각형 영상 (9:16)", url: "/12392266_1080_1920_25fps.mp4", rotate: false }
      ]
    },

    2: {
      title: "이벤트 · 전시 홍보",
      tag: "EVENT · FESTIVAL",
      desc: "박람회, 축제, 브랜드 팝업스토어 및 전시회 등 다양한 오프라인·온라인 이벤트를 위한 최적의 홍보 영상을 제작합니다. 감각적인 영상미와 명확한 정보 전달로 티켓 예매율과 방문객 참여를 극대화합니다.",
      metrics: [
        { label: "예매 및 등록률", val: "+58% 상승" },
        { label: "소셜 바이럴 지수", val: "2.5배 증가" },
        { label: "누적 프로모션 수", val: "500회 이상" }
      ],
      cases: [
        { title: "글로벌 아트 페스티벌 K사", desc: "얼리버드 티켓 매진 및 현장 방문객 전년 대비 45% 신장 달성." },
        { title: "IT 컨퍼런스 & 전시회 M사", desc: "사전 등록자 목표 120% 초과 달성 및 비즈니스 매칭 유도 성공." }
      ],
      features: [
        { title: "핵심 정보를 명확하게", desc: "일시, 장소, 라인업 등 필수적인 정보와 행사 콘셉트를 직관적으로 디자인하여 노출합니다." },
        { title: "이목을 끄는 시각적 연출", desc: "웅장한 스케일과 트렌디한 편집 기법을 활용해 행사의 열기와 무드를 감각적으로 재현합니다." },
        { title: "참여를 부르는 강력한 CTA", desc: "얼리버드 마감, 한정 티켓 등 즉각적인 등록과 예매를 촉진하는 유도 연출을 삽입합니다." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "이벤트 하이라이트 홍보 시안 (16:9)", url: "/13548788_3840_2160_24fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "인스타그램 릴스 전용 쇼츠 시안 (9:16)", url: "/12053133_1080_1920_30fps.mp4", rotate: false }
      ]
    },
    3: {
      title: "소셜 숏폼 콘텐츠",
      tag: "SHORTFORM · SNS",
      desc: "인스타그램 릴스, 틱톡, 유튜브 쇼츠 등 숏폼에 최적화된 트렌디한 세로형 비디오 광고. 트렌디한 음악 씽크와 시각적 후크로 유저의 이목을 끕니다.",
      metrics: [
        { label: "초기 이탈률 감소", val: "-35% 개선" },
        { label: "최적화 비율", val: "9:16 모바일 전용" },
        { label: "주간 대량 생산량", val: "최대 50편" }
      ],
      cases: [
        { title: "라이프스타일 굿즈 E사", desc: "틱톡 트렌드 챌린지 비주얼 연출로 누적 조회수 250만 회 돌파." },
        { title: "푸드 배달 서비스 F사", desc: "15초 숏폼 시리즈로 앱 신규 가입자 40% 증가." }
      ],
      features: [
        { title: "광고가 전달하려는 메시지", desc: "트렌디한 후크와 메시지로 SNS 유저들의 즉각적인 공감과 반응을 끌어냅니다." },
        { title: "합리적인 가격", desc: "숏폼 포맷에 맞춘 경량화된 제작 공정으로 대량 에셋을 경제적으로 생산합니다." },
        { title: "직관적인 연출", desc: "모바일에 최적화된 화면 구도와 빠른 컷 전환으로 3초 이내에 시선을 사로잡습니다." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "소셜 브이로그 홍보 시안 (16:9)", url: "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4" },
        { type: "video", aspectRatio: "9/16", title: "인플루언서 세로형 쇼츠 시안 (9:16)", url: "/mixkit-portrait-of-an-influencer-talking-to-the-camera-42323-full-hd.mp4", rotate: false }
      ]
    },
    4: {
      title: "가상 모델 & 인플루언서",
      tag: "VIRTUAL MODEL",
      desc: "브랜드 이미지에 완벽히 부합하는 AI 가상 앰배서더를 기용합니다. 초상권 리스크와 시공간의 제약 없이 24시간 일관된 하이엔드 룩을 전달합니다.",
      metrics: [
        { label: "초상권 라이센스", val: "영구 귀속" },
        { label: "매칭 오차 범위", val: "0.1% 이하 미세 조정" },
        { label: "마케팅 시너지", val: "전통 모델 대비 60% 절감" }
      ],
      cases: [
        { title: "럭셔리 코스메틱 G사", desc: "AI 앰배서더 ‘Aria’ 단독 기용으로 브랜드 인지도 70% 제고." },
        { title: "스트릿 애슬레저 H사", desc: "가상 페르소나 모델의 디지털 화보 제작으로 바이럴 효과 2배." }
      ],
      features: [
        { title: "광고가 전달하려는 메시지", desc: "브랜드가 지향하는 페르소나에 완벽히 부합하는 AI 가상 앰배서더를 기용합니다." },
        { title: "합리적인 가격", desc: "초상권 계약 및 오프라인 촬영 비용을 제거하여 장기적 마케팅 비용을 크게 절감합니다." },
        { title: "직관적인 연출", desc: "시공간의 제약이 없는 디지털 환경에서 브랜드 제품을 가장 돋보이게 비주얼화합니다." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "가상 모델 클로즈업 컷 (16:9)", url: "/3763027-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "디지털 피팅룸 바이럴 비디오 (9:16)", url: "/7957040-uhd_2160_3840_30fps.mp4", rotate: false }
      ]
    },
    5: {
      title: "인테리어 · 가구 프로젝트",
      tag: "INTERIOR",
      desc: "하이엔드 인테리어 공간 및 고급 프리미엄 가구 브랜드를 위한 초고화질 가상 쇼룸 및 광고 비주얼 솔루션. 제품의 질감, 가죽의 미세한 결, 조명에 따른 공간의 입체감을 완벽히 구현합니다.",
      metrics: [
        { label: "공간 모델링 해상도", val: "8K 초고화질" },
        { label: "비주얼 오차 범위", val: "0.1% 미만 극사실" },
        { label: "제작 비용 절감", val: "실물 스튜디오 대비 75%" }
      ],
      cases: [
        { title: "럭셔리 소파 브랜드 L사", desc: "실사 수준의 3D 공간 연출 광고 캠페인으로 매장 방문율 35% 증가." },
        { title: "리빙 인테리어 플랫폼 D사", desc: "AI 기반 가상 쇼룸 카탈로그 도입으로 구매 전환율 2.8배 성장." }
      ],
      features: [
        { title: "극사실주의 가구 렌더링", desc: "목재의 결, 금속의 광택, 가죽의 모공까지 실제 제품과 구분이 불가능할 정도로 섬세하게 디테일을 묘사합니다." },
        { title: "트렌디한 가상 공간 연출", desc: "모던, 미니멀, 내추럴 등 브랜드가 표현하고자 하는 공간의 테마와 무드를 AI가 감각적인 인테리어 디자인으로 스타일링합니다." },
        { title: "시공간 제약 없는 마케팅 에셋", desc: "대규모 가구 촬영을 위한 실물 스튜디오 대여 및 세팅 비용 없이, 다양한 평형대와 컨셉의 공간 연출 영상을 무한대로 제작합니다." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "인테리어 공간 영상 (16:9)", placeholderText: "인테리어 공간 영상 (16:9)", url: "/6632880-hd_1920_1080_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "프리미엄 가구 영상 (9:16)", placeholderText: "프리미엄 가구 영상 (9:16)", url: "/12681248_2160_3840_60fps.mp4", rotate: false }
      ]
    }
  },
  EN: {
    1: {
      title: "Product Advertising",
      tag: "PRODUCT AD",
      desc: "We create high-quality video ads starting from your brief, working together with AI technicians. We express your brand's core values with eye-catching, powerful visuals and overwhelming quality.",
      metrics: [
        { label: "Production Time", val: "Under 72h" },
        { label: "Video Quality", val: "4K UHD" },
        { label: "Client Satisfaction", val: "99%" }
      ],
      cases: [],
      features: [
        { title: "Message the Ad Delivers", desc: "We craft high-impact storylines that deliver your brand's core values to move target audiences." },
        { title: "Reasonable Pricing", desc: "We eliminate production bloat using AI technology to offer high-quality video ads at competitive prices." },
        { title: "Intuitive Directing", desc: "Using strong visual hooks and pacing, we instantly communicate your product's appeal without words." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Horizontal Wide Video (16:9)", placeholderText: "Horizontal Wide Video (16:9)", url: "/4215716-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Vertical Long Video (9:16)", placeholderText: "Vertical Long Video (9:16)", url: "/12392266_1080_1920_25fps.mp4", rotate: false }
      ]
    },

    2: {
      title: "Event & Exhibition Promo",
      tag: "EVENT · FESTIVAL",
      desc: "We craft high-impact promotional videos for offline and online events, including festivals, exhibitions, brand pop-ups, and conventions. Boost ticket pre-sales and visitor engagement with stunning visuals and clear call-to-actions.",
      metrics: [
        { label: "Registration Rate", val: "+58% Increase" },
        { label: "Social Viral Index", val: "2.5x Growth" },
        { label: "Promoted Campaigns", val: "500+ Projects" }
      ],
      cases: [
        { title: "Global Art Festival K", desc: "Achieved sold-out early bird tickets and a 45% year-on-year increase in onsite visitors." },
        { title: "IT Conference & Exhibition M", desc: "Exceeded pre-registration goals by 120% and successfully boosted business matchings." }
      ],
      features: [
        { title: "Clear Information Delivery", desc: "We overlay critical event details like dates, location, and lineups with high-end motion graphics." },
        { title: "Captivating Visual Directing", desc: "Using epic sound sync and dynamic edit cuts, we replicate the energy and mood of your venue." },
        { title: "Urgency-Driven CTAs", desc: "We insert visual prompts for early-bird closings and limited ticket offers to trigger instant bookings." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Event Highlight Promo (16:9)", url: "/13548788_3840_2160_24fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Instagram Reels Shortform (9:16)", url: "/12053133_1080_1920_30fps.mp4", rotate: false }
      ]
    },
    3: {
      title: "Social Short-form Content",
      tag: "SHORTFORM · SNS",
      desc: "Trendy vertical video ads optimized for Instagram Reels, TikTok, and YouTube Shorts. Attract attention with visual hooks and sound synchronizations.",
      metrics: [
        { label: "Hook Drop-off Rate", val: "-35% Lower" },
        { label: "Optimal Aspect Ratio", val: "9:16 Mobile Native" },
        { label: "Weekly Production Volume", val: "Up to 50 Videos" }
      ],
      cases: [
        { title: "Lifestyle Goods Brand E", desc: "Captured TikTok trending visual flow, exceeding 2.5M cumulative views." },
        { title: "Food Delivery App F", desc: "Increased new app registrations by 40% via a series of 15s short-form video ads." }
      ],
      features: [
        { title: "Message the Ad Delivers", desc: "We evoke immediate empathy and responses from SNS users with trendy hooks and messages." },
        { title: "Reasonable Pricing", desc: "We produce bulk assets economically with lightweight processes tailored for short-form video." },
        { title: "Intuitive Directing", desc: "We capture attention within 3 seconds using mobile-optimized compositions and fast transitions." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Social Vlog Promo (16:9)", url: "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Influencer Vertical Shorts (9:16)", url: "/mixkit-portrait-of-an-influencer-talking-to-the-camera-42323-full-hd.mp4", rotate: false }
      ]
    },
    4: {
      title: "Virtual Models & Influencers",
      tag: "VIRTUAL MODEL",
      desc: "Cast custom AI virtual ambassadors that represent your brand message perfectly, with zero licensing risk and 24/7 availability.",
      metrics: [
        { label: "Likeness License", val: "Permanent Ownership" },
        { label: "Model Matching Rate", val: "99.9% Persona Accuracy" },
        { label: "Marketing Synergy", val: "60% Cost Reduction" }
      ],
      cases: [
        { title: "Luxury Cosmetics Brand G", desc: "Built exclusive AI ambassador 'Aria', raising brand awareness by 70%." },
        { title: "Street Athleisure H", desc: "Generated virtual photoshoot portfolios, doubling viral engagement rates." }
      ],
      features: [
        { title: "Message the Ad Delivers", desc: "We cast custom AI virtual ambassadors that represent your brand message perfectly." },
        { title: "Reasonable Pricing", desc: "We reduce long-term marketing costs by eliminating likeness contracts and physical shoots." },
        { title: "Intuitive Directing", desc: "We visualize brand products in digital environments free from time or space constraints." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Virtual Ambassador Portrait Cut (16:9)", url: "/3763027-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Digital Fitting Room Viral Video (9:16)", url: "/7957040-uhd_2160_3840_30fps.mp4", rotate: false }
      ]
    },
    5: {
      title: "Interior & Furniture Projects",
      tag: "INTERIOR",
      desc: "Ultra-high definition virtual showroom and advertising visual solutions for high-end interior spaces and premium furniture brands. We perfectly reproduce product textures, fine wood grains, and the 3D depth of spaces under various lighting.",
      metrics: [
        { label: "Space Modeling Resolution", val: "8K UHD" },
        { label: "Visual Margin of Error", val: "Under 0.1%" },
        { label: "Cost Reduction", val: "75% Over Real Studio" }
      ],
      cases: [
        { title: "Luxury Sofa Brand L", desc: "Increased store visits by 35% through photorealistic 3D space advertising campaigns." },
        { title: "Living & Interior Platform D", desc: "Achieved 2.8x purchase conversion growth by introducing an AI-powered virtual showroom catalog." }
      ],
      features: [
        { title: "Photorealistic Furniture Rendering", desc: "We describe wood grains, metal gloss, and leather textures so delicately that they are indistinguishable from real products." },
        { title: "Trendy Virtual Space Design", desc: "AI styles the theme and mood of the space—whether modern, minimal, or natural—into sensuous interior designs." },
        { title: "Limitless Marketing Assets", desc: "Produce unlimited space-oriented promo videos across various sizes and concepts without paying for studio rental and setup." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Interior Space Video (16:9)", url: "/6632880-hd_1920_1080_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Premium Furniture Video (9:16)", url: "/12681248_2160_3840_60fps.mp4", rotate: false }
      ]
    }
  },
  ZH: {
    1: {
      title: "AI 视频广告制作",
      tag: "TEXT-TO-VIDEO",
      desc: "仅需一份文本简报即可开始的高品质视频广告。AI 全面负责拍摄、剪辑和虚拟模特选角，以完美诠释品牌形象。",
      metrics: [
        { label: "平均制作周期", val: "72小时以内" },
        { label: "费用降低比例", val: "高达 80%" },
        { label: "输出分辨率", val: "支持 4K UHD 超高清" }
      ],
      cases: [],
      features: [
        { title: "广告传递的商业信息", desc: "充分挖掘品牌核心价值，制作打动目标受众的高效广告创意与脚本。" },
        { title: "合理的价格", desc: "优化制作流程并结合AI技术，大幅节省后期成本，提供高性价比视频广告。" },
        { title: "直观的呈现方式", desc: "运用极具视觉冲击力的镜头构图与剪辑节奏，无需言语即刻传递产品魅力。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "横屏广告样片 (16:9)", placeholderText: "横屏广告样片 (16:9)", url: "/4215716-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "竖屏广告样片 (9:16)", placeholderText: "竖屏广告样片 (9:16)", url: "/12392266_1080_1920_25fps.mp4", rotate: false }
      ]
    },
    2: {
      title: "活动与展览宣传",
      tag: "EVENT · FESTIVAL",
      desc: "为博览会、节日、品牌快闪店及展览会等各类线下与线上活动制作最佳的宣传视频。通过感性的画面美感与清晰的信息传递，最大化门票预订率和访客参与度。",
      metrics: [
        { label: "门票预订与注册率", val: "+58% 提升" },
        { label: "社交媒体病毒式传播", val: "2.5倍 增加" },
        { label: "累计推广次数", val: "500次 以上" }
      ],
      cases: [
        { title: "全球艺术节 K公司", desc: "早鸟票全部售罄，现场访客数量比去年增长 45%。" },
        { title: "IT会议与展览 M公司", desc: "预登记人数超过目标 120%，成功引导商业配对。" }
      ],
      features: [
        { title: "明确的核心信息", desc: "直观设计并展示日期、地点、阵容等核心信息与活动概念。" },
        { title: "引人入胜的视觉呈现", desc: "利用宏大尺度与潮流剪辑手法，感性地重现活动的现场热情与氛围。" },
        { title: "引导参与的强力 CTA", desc: "加入早鸟截止、限量门票等能即时促成注册与购票的引导画面。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "活动精彩瞬间宣传样片 (16:9)", url: "/13548788_3840_2160_24fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Instagram Reels 专属短视频样片 (9/16)", url: "/12053133_1080_1920_30fps.mp4", rotate: false }
      ]
    },
    3: {
      title: "社交短视频",
      tag: "SHORTFORM · SNS",
      desc: "专为 Instagram Reels, TikTok, 抖音等平台设计的潮流竖屏视频广告。通过视觉钩子和音效同步快速吸引注意力。",
      metrics: [
        { label: "跳出率降低", val: "-35% 改善" },
        { label: "最佳屏幕比例", val: "9:16 移动端原生" },
        { label: "每周产出量", val: "可达 50 支视频" }
      ],
      cases: [
        { title: "生活方式品牌 E", desc: "紧跟 TikTok 潮流视觉玩法，累计播放量突破 250 万。" },
        { title: "外卖配送 App F", desc: "通过 15 秒系列短视频广告，新用户注册量提升 40%。" }
      ],
      features: [
        { title: "广告传递的商业信息", desc: "利用潮流创意 and 文案，激发社媒用户的即时共鸣与互动。" },
        { title: "合理的价格", desc: "采用适合短视频의 轻量化流程，低成本量产大批视频素材。" },
        { title: "直观的呈现方式", desc: "通过移动端优化的画面构图与快速剪辑，3秒内锁定注意力。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "社交视频博客宣传样片 (16:9)", url: "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4" },
        { type: "video", aspectRatio: "9/16", title: "网红代言人竖屏短视频 (9:16)", url: "/mixkit-portrait-of-an-influencer-talking-to-the-camera-42323-full-hd.mp4", rotate: false }
      ]
    },
    4: {
      title: "虚拟模特与代言人",
      tag: "VIRTUAL MODEL",
      desc: "定制完美的 AI 虚拟代言人形象，消除版权及违约风险，提供 24/7 的品牌营销 support。",
      metrics: [
        { label: "肖像权属性", val: "永久使用权" },
        { label: "模特匹配精准度", val: "99.9% 契合度" },
        { label: "营销费用节省", val: "较传统代言省 60%" }
      ],
      cases: [
        { title: "轻奢美妆品牌 G", desc: "打造专属 AI 代言人“Aria”，帮助品牌知名度提升 70%。" },
        { title: "运动潮流服饰 H", desc: "自动生成虚拟拍摄画册，使社媒互动率翻倍。" }
      ],
      features: [
        { title: "广告传递的商业信息", desc: "启用与品牌定位完美契合的AI虚拟品牌代言人。" },
        { title: "合理的价格", desc: "免去肖像权签约及线下拍摄成本，大幅降低长期营销开支。" },
        { title: "直观的呈现方式", desc: "在无时空限制的数字空间中，最完美地展示品牌产品的魅力。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "虚拟代言人肖像片段 (16:9)", url: "/3763027-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "数字试衣间创意视频 (9:16)", url: "/7957040-uhd_2160_3840_30fps.mp4", rotate: false }
      ]
    },
    5: {
      title: "室内设计与家具项目",
      tag: "INTERIOR",
      desc: "为高端室内空间和优质家具品牌提供超清虚拟展厅及广告视觉解决方案。完美再现产品质感、微细木纹以及不同照明下的空间立体感。",
      metrics: [
        { label: "空间建模分辨率", val: "8K超高清" },
        { label: "视觉误差范围", val: "低于 0.1%" },
        { label: "制作费用节省", val: "比实体影棚省 75%" }
      ],
      cases: [
        { title: "奢侈沙发品牌 L公司", desc: "通过逼真的 3D 空间广告活动使门店访问率提高 35%。" },
        { title: "生活家居平台 D公司", desc: "引入 AI 虚拟展厅画册后，购买转化率增长 2.8 倍。" }
      ],
      features: [
        { title: "极致写实的家具渲染", desc: "精细描绘木纹、金属光泽和皮革纹理，甚至达到了与真实产品无法区分的程度。" },
        { title: "前沿的虚拟空间设计", desc: "AI 能够根据品牌想要表达的主题，设计出极具审美感官的空间风格（现代、极简、自然等）。" },
        { title: "打破时空限制的营销素材", desc: "无需为大批量家具拍摄支付高昂的影棚租赁及搭建费用，即可无限量产多种房型与风格的演示视频。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "室内空间视频 (16:9)", url: "/6632880-hd_1920_1080_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "高端家具视频 (9:16)", url: "/12681248_2160_3840_60fps.mp4", rotate: false }
      ]
    }
  },
  JA: {
    1: {
      title: "AI動画制作",
      tag: "TEXT-TO-VIDEO",
      desc: "テキストのみの簡単なブリーフから高品質な動画広告を制作します。撮影・編集・バーチャルモデルのキャスティングまでAIがフルで対応し、ブランドイメージを完璧に表現します。",
      metrics: [
        { label: "平均制作期間", val: "72時間以内" },
        { label: "コスト削減比率", val: "最大 80%" },
        { label: "解像度", val: "4K UHD 対応" }
      ],
      cases: [],
      features: [
        { title: "広告メッセージ", desc: "ブランド固有の価値を引き出し、ターゲットに深く響くコアメッセージを伝えます。" },
        { title: "合理的な価格", desc: "制作プロセスの無駄を省き、AI最適化により圧倒的低コストで高品質な動画を作ります。" },
        { title: "直感的な演出", desc: "視聴者の心を掴むカット構成により、言葉がなくても魅力を直感的に伝えます。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "横型ワイド動画 (16:9)", placeholderText: "横型ワイド動画 (16:9)", url: "/4215716-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "縦型動画 (9:16)", placeholderText: "縦型動画 (9:16)", url: "/12392266_1080_1920_25fps.mp4", rotate: false }
      ]
    },
    2: {
      title: "イベント・展示会プロモーション",
      tag: "EVENT · FESTIVAL",
      desc: "博覧会、フェスティバル、ブランドのポップアップストア、展示会など、多様なオフライン・オンラインイベントのための最適なプロモーション動画を制作します。感性豊かな映像美と明確な情報伝達で、チケット予約率と来場者のエンゲージメントを極大化します。",
      metrics: [
        { label: "予約・登録率", val: "+58% 向上" },
        { label: "ソーシャル拡散指数", val: "2.5倍 増加" },
        { label: "累計プロモーション実績", val: "500回 以上" }
      ],
      cases: [
        { title: "グローバルアートフェスティバル K社", desc: "アーリーバードチケット完売、および現地来場者数を前年比45%増加達成。" },
        { title: "ITカンファレンス＆展示会 M社", desc: "事前登録目標を120%超過達成し、ビジネスビジネスマッチングの誘導に成功。" }
      ],
      features: [
        { title: "重要情報を明確に", desc: "日時、場所、ラインナップなどの必須情報とイベントコンセプトを直感的にデザインして表示します。" },
        { title: "目を引く映像演出", desc: "壮大なスケールとトレンド感のある編集技術を活用し、イベントの熱気とムードをエモーショナルに再現します。" },
        { title: "行動を促す強力なCTA", desc: "アーリーバード終了、限定チケットなど、即時の登録やチケット購入を促進する誘導演出を挿入します。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "イベントハイライトプロモーション試案 (16:9)", url: "/13548788_3840_2160_24fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Instagramリール専用ショート試案 (9:16)", url: "/12053133_1080_1920_30fps.mp4", rotate: false }
      ]
    },
    3: {
      title: "ソーシャルショート動画",
      tag: "SHORTFORM · SNS",
      desc: "Instagramリール、TikTok、YouTubeショート向けに最適化されたトレンディな縦型動画広告。ビジュアルフックと音源の同期で瞬時に目を引きます。",
      metrics: [
        { label: "離脱率減少", val: "-35% 改善" },
        { label: "画面比率", val: "9:16 モバイル専用" },
        { label: "週次制作本数", val: "最大 50本" }
      ],
      cases: [
        { title: "ライフスタイルブランド E社", desc: "TikTokのトレンド動画フォーマットを採用し、累計250回再生を突破。" },
        { title: "フードデリバリー F社", desc: "15秒のショート動画シリーズの広告で、新規登録者数が40%増加。" }
      ],
      features: [
        { title: "広告メッセージ", desc: "トレンドのフックとメッセージで、SNSユーザーの共感と反応を呼び起こします。" },
        { title: "合理的な価格", desc: "ショートフォームに合わせた軽量プロセスで、大量アセットを安価に制作します。" },
        { title: "直感的な演出", desc: "スマホ最適化の構図と高速カットで、3秒以内に視線を引きつけます。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "ソーシャルVlogプロモーション試案 (16:9)", url: "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4" },
        { type: "video", aspectRatio: "9/16", title: "インフルエンサー縦型ショート試案 (9:16)", url: "/mixkit-portrait-of-an-influencer-talking-to-the-camera-42323-full-hd.mp4", rotate: false }
      ]
    },
    4: {
      title: "バーチャルモデル＆アンバサダー",
      tag: "VIRTUAL MODEL",
      desc: "肖像権契約のリスクや撮影コストがなく、24時間稼働可能な、ブランドイメージに完璧に一致するカスタムAIアンバサダーを提供します。",
      metrics: [
        { label: "使用権期間", val: "永久使用可能" },
        { label: "モデル適合率", val: "99.9% 適合" },
        { label: "広告コスト削減", val: "実モデル比 60%削減" }
      ],
      cases: [
        { title: "コスメブランド G社", desc: "専属AIアンバサダー「Aria」を構築し、ブランド認知度を70%向上。" },
        { title: "アパレルブランド H社", desc: "仮想モデルによるデジタル撮影カタログを作成し、エンゲージメント率が倍増。" }
      ],
      features: [
        { title: "広告メッセージ", desc: "ブランドのペルソナに完全に一致するAIバーチャルアンバサダーを起用します。" },
        { title: "合理的な価格", desc: "肖像権契約やオフライン撮影費を排除し、長期的なコストを大幅削減します。" },
        { title: "直感的な演出", desc: "制約のないデジタル環境で、ブランド製品を最も際立たせて可視化します。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "バーチャルモデル ポートレート動画 (16:9)", url: "/3763027-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "デジタルフィッティング動画 (9:16)", url: "/7957040-uhd_2160_3840_30fps.mp4", rotate: false }
      ]
    },
    5: {
      title: "インテリア・家具プロジェクト",
      tag: "INTERIOR",
      desc: "ハイエンドなインテリア空間や高級プレミアム家具ブランドのための超高解像度バーチャルショールーム＆広告ビジュアルソリューション。製品の質感、木目の微細なニュアンス、照明による空間の立体感を完璧に再現します。",
      metrics: [
        { label: "予約・登録率", val: "+58% 向上" },
        { label: "ソーシャル拡散指数", val: "2.5倍 増加" },
        { label: "累計プロモーション実績", val: "500回 以上" }
      ],
      cases: [
        { title: "ラグジュアリーソファブランド L社", desc: "実写レベルの3D空間演出広告キャンペーンにより、店舗への訪問客数が35%増加。" },
        { title: "リビング・インテリアプラットフォーム D社", desc: "AI搭載のバーチャルショールームカタログの導入により、購入転換率が2.8倍に成長。" }
      ],
      features: [
        { title: "極写実的な家具レンダリング", desc: "木目、金属の光沢、革の質感まで、実際の製品と見分けがつかないほど繊細にディテールを表現します。" },
        { title: "トレンド感のあるバーチャル空間設計", desc: "モダン、ミニマル、ナチュラルなど、ブランドが表現したい空間のテーマやムードを、AIが感性豊かなインテリアデザインで演出します。" },
        { title: "時空を超えたマーケティングアセット", desc: "大規模な家具撮影のための実物スタジオのレンタルやセッティング費用をかけず、多様な間取りやコンセプトの空間演出動画を無限に制作できます。" }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "インテリア空間動画 (16:9)", url: "/6632880-hd_1920_1080_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "プレミアム家具動画 (9:16)", url: "/12681248_2160_3840_60fps.mp4", rotate: false }
      ]
    }
  },
  VI: {
    1: {
      title: "Sản xuất Video quảng cáo AI",
      tag: "TEXT-TO-VIDEO",
      desc: "Tạo video quảng cáo chất lượng cao chỉ từ văn bản ngắn gọn, kết hợp với các kỹ thuật viên AI. Thể hiện giá trị cốt lõi của thương hiệu với hình ảnh bắt mắt, mạnh mẽ và chất lượng vượt trội.",
      metrics: [
        { label: "Thời gian sản xuất", val: "Dưới 72h" },
        { label: "Chất lượng Video", val: "4K UHD" },
        { label: "Mức độ hài lòng", val: "99%" }
      ],
      cases: [],
      features: [
        { title: "Thông điệp quảng cáo", desc: "Nắm bắt các giá trị cốt lõi của thương hiệu để xây dựng cốt truyện cuốn hút, tác động sâu sắc đến đối tượng mục tiêu." },
        { title: "Giá cả hợp lý", desc: "Tối ưu hóa quy trình nhờ công nghệ AI giúp giảm chi phí sản xuất, cung cấp video quảng cáo chất lượng cao với giá cạnh tranh." },
        { title: "Dàn dựng trực quan", desc: "Dàn dựng trực quan và bắt mắt giúp truyền tải trọn vẹn điểm hấp dẫn của sản phẩm mà không cần thuyết minh." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Video Ngang Rộng (16:9)", placeholderText: "Video Ngang Rộng (16:9)", url: "/4215716-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Video Dọc Dài (9:16)", placeholderText: "Video Dọc Dài (9:16)", url: "/12392266_1080_1920_25fps.mp4", rotate: false }
      ]
    },
    2: {
      title: "Quảng bá Sự kiện & Triển lãm",
      tag: "EVENT · FESTIVAL",
      desc: "Chúng tôi sản xuất video quảng bá ấn tượng cho các sự kiện trực tiếp và trực tuyến, bao gồm lễ hội, triển lãm, cửa hàng pop-up và hội nghị. Tăng tỷ lệ bán vé sớm và lượng khách tham dự với hình ảnh sắc nét, thông tin rõ ràng.",
      metrics: [
        { label: "Tỷ lệ đăng ký vé", val: "+58% Tăng trưởng" },
        { label: "Chỉ số lan truyền MXH", val: "Gấp 2.5 lần" },
        { label: "Số chiến dịch đã làm", val: "Hơn 500 dự án" }
      ],
      cases: [
        { title: "Lễ hội Nghệ thuật Toàn cầu K", desc: "Bán hết toàn bộ vé sớm và tăng 45% số lượng khách tham quan trực tiếp so với năm ngoái." },
        { title: "Hội nghị & Triển lãm Công nghệ M", desc: "Vượt 120% mục tiêu đăng ký trước và kết nối thành công nhiều đối tác kinh doanh." }
      ],
      features: [
        { title: "Truyền tải thông tin rõ ràng", desc: "Thiết kế đồ họa chuyển động làm nổi bật các chi tiết quan trọng như ngày, giờ, địa điểm và dàn khách mời." },
        { title: "Dàn dựng hình ảnh mãn nhãn", desc: "Tái hiện không khí sôi động và quy mô hoành tráng của sự kiện thông qua các nhịp dựng lôi cuốn." },
        { title: "Lời kêu gọi hành động khẩn thiết", desc: "Lồng ghép các ưu đãi có hạn để thúc đẩy khách hàng đưa ra quyết định mua vé hoặc đăng ký ngay lập tức." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Video Điểm nhấn Sự kiện (16:9)", url: "/13548788_3840_2160_24fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Video Ngắn Reels/TikTok (9:16)", url: "/12053133_1080_1920_30fps.mp4", rotate: false }
      ]
    },
    3: {
      title: "Nội dung Ngắn mạng Xã hội",
      tag: "SHORTFORM · SNS",
      desc: "Quảng cáo video dọc hợp xu hướng được tối ưu hóa cho Instagram Reels, TikTok và YouTube Shorts. Thu hút sự chú ý bằng các cú hook trực quan và đồng bộ hóa âm thanh.",
      metrics: [
        { label: "Giảm tỷ lệ bỏ cuộc", val: "-35% Cải thiện" },
        { label: "Tỷ lệ khung hình tối ưu", val: "9:16 Nguyên bản Di động" },
        { label: "Sản lượng hàng tuần", val: "Lên đến 50 Video" }
      ],
      cases: [
        { title: "Thương hiệu đồ dùng đời sống E", desc: "Nắm bắt luồng hình ảnh thịnh hành trên TikTok, vượt quá 2,5 triệu lượt xem tích lũy." },
        { title: "Ứng dụng giao đồ ăn F", desc: "Tăng 40% số lượng đăng ký ứng dụng mới qua chuỗi quảng cáo video ngắn 15 giây." }
      ],
      features: [
        { title: "Thông điệp quảng cáo", desc: "Thu hút sự tương tác tức thì của người dùng mạng xã hội bằng các cú hook và thông điệp hợp xu hướng." },
        { title: "Giá cả hợp lý", desc: "Sản xuất hàng loạt tài nguyên một cách kinh tế với quy trình tinh gọn cho định dạng ngắn." },
        { title: "Dàn dựng trực quan", desc: "Thu hút sự chú ý trong vòng 3 giây với bố cục tối ưu cho di động và chuyển cảnh nhanh." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Vlog mạng xã hội quảng bá (16:9)", url: "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Video ngắn dọc người ảnh hưởng (9:16)", url: "/mixkit-portrait-of-an-influencer-talking-to-the-camera-42323-full-hd.mp4", rotate: false }
      ]
    },
    4: {
      title: "Người mẫu & Influencer Ảo",
      tag: "VIRTUAL MODEL",
      desc: "Tuyển chọn các đại sứ ảo AI tùy chỉnh để thể hiện hoàn hảo thông điệp thương hiệu của bạn, không có rủi ro về bản quyền hình ảnh và hoạt động 24/7.",
      metrics: [
        { label: "Bản quyền hình ảnh", val: "Sở hữu vĩnh viễn" },
        { label: "Tỷ lệ khớp mẫu", val: "99.9% Độ chính xác hình tượng" },
        { label: "Hiệu quả chi phí", val: "Giảm 60% chi phí" }
      ],
      cases: [
        { title: "Thương hiệu mỹ phẩm cao cấp G", desc: "Xây dựng đại sứ ảo độc quyền 'Aria', nâng cao nhận thức thương hiệu lên 70%." },
        { title: "Thời trang thể thao H", desc: "Tạo các danh mục hình ảnh chụp ảo, nhân đôi tỷ lệ tương tác lan truyền." }
      ],
      features: [
        { title: "Thông điệp quảng cáo", desc: "Tuyển chọn đại sứ ảo AI hoàn toàn phù hợp với hình tượng thương hiệu hướng tới." },
        { title: "Giá cả hợp lý", desc: "Loại bỏ chi phí hợp đồng chân dung và quay chụp offline để tiết kiệm tối đa chi phí marketing dài hạn." },
        { title: "Dàn dựng trực quan", desc: "Hiển thị sản phẩm nổi bật nhất trong môi trường kỹ thuật số không giới hạn không gian." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Cảnh cận cảnh đại sứ ảo (16:9)", url: "/3763027-uhd_3840_2160_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Video phòng thử đồ kỹ thuật số (9:16)", url: "/7957040-uhd_2160_3840_30fps.mp4", rotate: false }
      ]
    },
    5: {
      title: "Dự án nội thất & đồ gỗ",
      tag: "INTERIOR",
      desc: "Giải pháp hình ảnh quảng cáo & phòng trưng bày ảo siêu độ phân giải dành cho không gian nội thất cao cấp và các thương hiệu nội thất cao cấp. Tái hiện hoàn hảo kết cấu sản phẩm, sắc thái nhỏ của vân gỗ và chiều sâu ba chiều của không gian thông qua ánh sáng.",
      metrics: [
        { label: "Tỷ lệ đặt trước", val: "+58% Cải thiện" },
        { label: "Chỉ số lan truyền", val: "Tăng gấp 2.5 lần" },
        { label: "Dự án quảng bá tích lũy", val: "Hơn 500 chiến dịch" }
      ],
      cases: [
        { title: "Thương hiệu sofa sang trọng L", desc: "Chiến dịch quảng cáo diễn họa không gian 3D chất lượng tương đương thực tế, tăng 35% lượng khách ghé thăm cửa hàng." },
        { title: "Nền tảng nội thất đời sống D", desc: "Tăng 2.8 lần tỷ lệ chuyển đổi mua hàng nhờ giới thiệu danh mục showroom ảo AI." }
      ],
      features: [
        { title: "Dựng hình đồ gỗ chân thực", desc: "Miêu tả chi tiết vân gỗ, độ bóng của kim loại và chất liệu da một cách tinh xảo, không thể phân biệt được với sản phẩm thực tế." },
        { title: "Thiết kế không gian ảo thời thượng", desc: "AI tự động phối cảnh nội thất theo đúng chủ đề và phong cách thương hiệu hướng tới (hiện đại, tối giản, tự nhiên...)." },
        { title: "Tài nguyên marketing vô hạn", desc: "Sản xuất vô hạn các video diễn họa không gian với nhiều diện tích và concept khác nhau mà không mất chi phí chụp ảnh, thuê studio cồng kềnh." }
      ],
      media: [
        { type: "video", aspectRatio: "16/9", title: "Xem trước không gian nội thất cao cấp (16:9)", url: "/6632880-hd_1920_1080_25fps.mp4" },
        { type: "video", aspectRatio: "9/16", title: "Video ngắn nội thất đồ gỗ premium (9:16)", url: "/12681248_2160_3840_60fps.mp4", rotate: false }
      ]
    }
  }
};

const heroVideos = [
  "/14887170_1080_1920_30fps.mp4",
  "/mixkit-portrait-of-an-influencer-talking-to-the-camera-42323-full-hd.mp4",
  "/mixkit-man-being-recorded-himself-for-a-blog-on-the-street-34469-full-hd.mp4",
  "/11939614_2160_3840_60fps.mp4",
  "/3917703-uhd_2160_4096_25fps.mp4",
  "/4650065-uhd_2160_4096_30fps.mp4",
  "/4752362-hd_1066_1920_25fps.mp4",
  "/5927742-hd_1080_1920_25fps.mp4",
  "/5927748-hd_1080_1920_25fps.mp4",
  "/12681248_2160_3840_60fps.mp4",
  "/9222816-uhd_2160_4096_25fps.mp4",
  "/9558207-uhd_2160_4096_25fps.mp4",
  "/9595210-uhd_2160_4096_25fps.mp4",
  "/9558193-uhd_2160_4096_25fps.mp4",
  "/7680441-uhd_2160_4096_25fps.mp4",
  "/9558200-uhd_2160_4096_25fps.mp4",
  "/13361127_2160_3840_60fps.mp4",
  "/14864506_1080_1920_25fps.mp4",
  "/15079186_1080_1920_30fps.mp4",
  "/3894693-uhd_2160_4096_25fps.mp4",
  "/6487454-uhd_2160_4096_25fps.mp4",
  "/7569383-uhd_2160_4096_25fps.mp4",
  "/7599304-uhd_2160_4096_25fps.mp4",
  "/7957049-uhd_2160_3840_30fps.mp4",
  "/8042702-uhd_2160_4096_25fps.mp4"
];

const backgroundVideos = [
  "/6632880-hd_1920_1080_25fps.mp4",
  "/6975809-uhd_2880_2160_25fps.mp4",
  "/5889454-uhd_3840_2160_25fps.mp4",
  "/4650869-uhd_4096_2160_30fps.mp4",
  "/14815442_3840_2160_30fps.mp4",
  "/6248334-uhd_3840_2160_25fps.mp4",
  "/8131897-uhd_4096_2160_25fps.mp4",
  "/10097613-hd_3840_2160_30fps.mp4",
  "/4215416-uhd_3840_2160_25fps.mp4",
  "/7727416-hd_1920_1080_25fps.mp4",
  "/9698783-uhd_3840_2160_25fps.mp4"
];

const languageFlags = {
  KO: 'kr',
  EN: 'us',
  ZH: 'cn',
  JA: 'jp',
  VI: 'vn'
};

const FlagIcon = ({ code, alt }) => (
  <img 
    src={`https://flagcdn.com/${code.toLowerCase()}.svg`} 
    alt={alt}
    style={{
      width: '18px',
      height: '12px',
      objectFit: 'cover',
      borderRadius: '2px',
      border: '1.5px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
      display: 'block',
      flexShrink: 0
    }}
  />
);

const processStepsData = {
  KO: [
    {
      num: "01",
      letter: "B",
      title: "작업 의뢰",
      details: ["예산 및 일정 상담", "브랜드 분석 및 광고 목표 설계", "타겟 오디언스 및 배포 채널 선정"]
    },
    {
      num: "02",
      letter: "P",
      title: "작업 기획",
      details: ["AI 기반 프로젝트 컨셉 기획", "크리에이티브 메시지 및 슬로건 도출", "4컷 스토리보드 / 스크립트 설계"]
    },
    {
      num: "03",
      letter: "D",
      title: "시안 공유 및 수정",
      details: ["초고화질 AI 비디오 1차 시안 생성", "피드백 반영 및 2차 시안 디테일 보정", "최종 고해상도 이미지/영상 미세 조정"]
    },
    {
      num: "04",
      letter: "F",
      title: "최종 검토 및 납품",
      details: ["최종 완성본 4K 광고 영상 검토", "플랫폼별 멀티 포맷 가이드라인 제공", "라이선스 이전 및 최종 납품 패키지(.zip) 전달"]
    }
  ],
  EN: [
    {
      num: "01",
      letter: "B",
      title: "Brief & Strategy",
      details: ["Budget & timeline consultation", "Brand analysis & ad goal design", "Target audience & channel selection"]
    },
    {
      num: "02",
      letter: "P",
      title: "Concept & Planning",
      details: ["AI-driven project concept planning", "Creative messaging & slogan design", "4-panel storyboard & script drafting"]
    },
    {
      num: "03",
      letter: "D",
      title: "AI Production & Polish",
      details: ["1st draft generation of AI video ads", "Feedback integration & 2nd draft polishing", "Final fine-tuning of high-res image & video assets"]
    },
    {
      num: "04",
      letter: "F",
      title: "Review & Delivery",
      details: ["Final review of completed 4K ad videos", "Multi-format guidelines per platform", "License transfer & final package delivery (.zip)"]
    }
  ],
  ZH: [
    {
      num: "01",
      letter: "B",
      title: "项目委托",
      details: ["预算及日程咨询", "品牌分析及广告目标设定", "目标受众及分发渠道选择"]
    },
    {
      num: "02",
      letter: "P",
      title: "方案策划",
      details: ["基于AI的项目创意策划", "创意文案与广告标语提炼", "4格分镜故事板与脚本设计"]
    },
    {
      num: "03",
      letter: "D",
      title: "样片确认与修改",
      details: ["生成超高清 AI 视频第一版初稿", "整合反馈并进行第二版润色修改", "最终高分辨率图像与视频资产微调"]
    },
    {
      num: "04",
      letter: "F",
      title: "最终交付",
      details: ["审核完成 of 4K 广告视频", "提供符合各平台规格的素材指南", "版权移交及最终交付包 (.zip) 发送"] // Wait, in ZH details 4: '审核完成的 4K 广告视频'
    }
  ],
  JA: [
    {
      num: "01",
      letter: "B",
      title: "作業依頼",
      details: ["予算および日程のコンサルティング", "ブランド分析および広告ゴールの設計", "ターゲット層と配信チャネルの選定"]
    },
    {
      num: "02",
      letter: "P",
      title: "企画立案",
      details: ["AI基盤のプロジェクトコンセプト企画", "クリエイティブメッセージとスローガンの導出", "4コマストーリーボード・スクリプト設計"]
    },
    {
      num: "03",
      letter: "D",
      title: "試案共有・修正",
      details: ["超高画質AIビデオ第1次試案の生成", "フィードバック反映＆第2次試案の磨き上げ", "最終高解像度画像・映像アセットの微調整"]
    },
    {
      num: "04",
      letter: "F",
      title: "最終検品・納品",
      details: ["完成した4K広告動画の最終確認", "プラットフォーム별 멀티 포맷 가이드라인 제공", "라이선스 이전 및 최종 납품 패키지(.zip) 전달"] // Wait, JA in bundle used Japanese: 'プラットフォーム別マルチフォーマットガイドの提供', 'ライセンス移転および最終納品パッケージ（.zip）の引き渡し'
    }
  ],
  VI: [
    {
      num: "01",
      letter: "B",
      title: "Yêu cầu Dự án",
      details: ["Tư vấn về ngân sách và lộ trình", "Phân tích thương hiệu & thiết lập mục tiêu", "Lựa chọn đối tượng mục tiêu & kênh phân phối"]
    },
    {
      num: "02",
      letter: "P",
      title: "Lập Kế hoạch",
      details: ["Lập kế hoạch ý tưởng dự án dựa trên AI", "Xây dựng thông điệp sáng tạo & slogan", "Thiết kế kịch bản & phân cảnh 4 khung hình"]
    },
    {
      num: "03",
      letter: "D",
      title: "Duyệt & Chỉnh sửa",
      details: ["Tạo bản nháp video AI chất lượng siêu cao", "Tiếp thu phản hồi & tối ưu hóa bản nháp thứ 2", "Chỉnh sửa chi tiết tài nguyên hình ảnh & video cuối cùng"]
    },
    {
      num: "04",
      letter: "F",
      title: "Bàn giao & Nghiệm thu",
      details: ["Đánh giá video quảng cáo 4K hoàn thiện cuối cùng", "Cung cấp gói hướng dẫn định dạng đa kênh", "Chuyển giao bản quyền & bàn giao gói sản phẩm (.zip)"]
    }
  ]
};

const getInitialUrlState = () => {
  if (typeof window === 'undefined') return { view: 'landing', service: null };
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view');
  const serviceParam = params.get('service');
  
  if (serviceParam) {
    return { view: 'landing', service: parseInt(serviceParam, 10) };
  } else if (viewParam === 'careers') {
    return { view: 'careers', service: null };
  } else if (viewParam === 'wizard') {
    return { view: 'wizard', service: null };
  } else {
    return { view: 'landing', service: null };
  }
};
const initialUrlState = getInitialUrlState();

const renderTitleWithGradient = (text) => {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/(VERARVO)/i);
  return parts.map((part, index) => 
    part.toUpperCase() === 'VERARVO' ? (
      <span key={index} className="text-gradient-gold-glow">VERARVO</span>
    ) : (
      part
    )
  );
};

function App() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [contactNameInput, setContactNameInput] = useState('');
  const [contactEmailInput, setContactEmailInput] = useState('');
  const [contactMessageInput, setContactMessageInput] = useState('');
  const [contactSuccessShow, setContactSuccessShow] = useState(false);

  // Reconstructed Preloader states & logic
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);

  useEffect(() => {
    if (!preloaderActive) return;
    const interval = setInterval(() => {
      setPreloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPreloaderActive(false), 800);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 8) + 4);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [preloaderActive]);

  // Reconstructed Contact Form Handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactNameInput.trim() || !contactEmailInput.trim() || !contactMessageInput.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactNameInput,
          email: contactEmailInput,
          message: contactMessageInput
        })
      });
      if (response.ok) {
        setContactSuccessShow(true);
        setContactNameInput('');
        setContactEmailInput('');
        setContactMessageInput('');
        setTimeout(() => {
          setContactSuccessShow(false);
        }, 6000);
      } else {
        const errData = await response.json();
        console.error("Failed to send inquiry:", errData);
        alert(lang === 'KO' ? `전송 실패: ${errData.error || '서버 오류'}` : `Failed to send: ${errData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error("Error sending inquiry:", err);
      alert(lang === 'KO' ? '네트워크 오류가 발생했습니다. 백엔드가 실행 중인지 확인하세요.' : 'Network error occurred. Make sure backend is running.');
    }
  };

  // Reconstructed Career Form states & handlers
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
  const [careerError, setCareerError] = useState('');
  const [careerSubmitting, setCareerSubmitting] = useState(false);
  const [careerSuccessShow, setCareerSuccessShow] = useState(false);

  const handleCareerJobChange = (job, checked) => {
    setCareerForm(prev => {
      const roles = checked
        ? [...prev.roles, job]
        : prev.roles.filter(r => r !== job);
      return { ...prev, roles };
    });
  };

  const handleCareerDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleCareerDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleCareerDrop = (e, fileType) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setCareerForm(prev => ({ ...prev, [fileType]: file }));
      setCareerError('');
    } else {
      setCareerError(lang === 'KO' ? 'PDF 파일만 업로드할 수 있습니다.' : 'Please upload a PDF file.');
    }
  };

  const handleCareerFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCareerForm(prev => ({ ...prev, [fileType]: file }));
      setCareerError('');
    } else {
      setCareerError(lang === 'KO' ? 'PDF 파일만 업로드할 수 있습니다.' : 'Please upload a PDF file.');
    }
  };

  const handleCareersSubmit = async (e) => {
    e.preventDefault();
    if (careerForm.roles.length === 0 && (!careerForm.customRole || !careerForm.customRole.trim())) {
      alert(translations[lang].careersJobsLabel + " 을(를) 선택하거나 입력해주세요.");
      return;
    }
    if (!careerForm.name || !careerForm.name.trim()) {
      alert("Please fill in your name.");
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
      
      const response = await fetch('http://localhost:8080/api/careers', {
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
        setCareerError(lang === 'KO' ? `제출 실패: ${resData.error || '서버 오류'}` : `Failed to submit: ${resData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error("Error submitting career application:", err);
      setCareerError(lang === 'KO' ? '네트워크 오류가 발생했습니다. 백엔드가 실행 중인지 확인하세요.' : 'Network error occurred. Make sure backend is running.');
    } finally {
      setCareerSubmitting(false);
    }
  };

  // Navigation states: 'landing' or 'wizard'
  const [view, setView] = useState(initialUrlState.view);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => Math.floor(Math.random() * heroVideos.length));
  const [currentBgVideoIndex, setCurrentBgVideoIndex] = useState(() => Math.floor(Math.random() * backgroundVideos.length));
  const [lang, setLang] = useState('KO');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeServiceDetail, setActiveServiceDetail] = useState(initialUrlState.service);
  
  // Wizard states
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Form inputs for Step 1 (Detailed & Custom Fallbacks)
  const [brandName, setBrandName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [email, setEmail] = useState('');

  const [categoryPreset, setCategoryPreset] = useState([]);
  const [customCategory, setCustomCategory] = useState('');

  const [goalPreset, setGoalPreset] = useState([]);
  const [customGoal, setCustomGoal] = useState('');

  const [placementsPreset, setPlacementsPreset] = useState([]);
  const [customPlacements, setCustomPlacements] = useState('');

  const [audiencePreset, setAudiencePreset] = useState([]);
  const [customAudience, setCustomAudience] = useState('');

  const [moodPreset, setMoodPreset] = useState([]);
  const [customMood, setCustomMood] = useState('');

  const [budgetPreset, setBudgetPreset] = useState([]);
  const [customBudget, setCustomBudget] = useState('');

  const [timelinePreset, setTimelinePreset] = useState([]);
  const [customTimeline, setCustomTimeline] = useState('');

  const [customConceptText, setCustomConceptText] = useState('');

  const togglePreset = (currentList, setList, val) => {
    if (currentList.includes(val)) {
      setList(currentList.filter(item => item !== val));
    } else {
      setList([...currentList, val]);
    }
  };

  // Sub-stage tracking for Step 1 (Stage 1: Core Strategy, Stage 2: Detailed Specs)
  const [briefStage, setBriefStage] = useState(1);

  // Backend response states
  const [campaignId, setCampaignId] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const [finalAsset, setFinalAsset] = useState(null);
  const [activeLoadStep, setActiveLoadStep] = useState(1);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Custom cursor states
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTransform, setCursorTransform] = useState({ scaleX: 1, scaleY: 1, angle: 0 });
  const [hovering, setHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const targetPosRef = useRef({ x: -100, y: -100 });
  const currentPosRef = useRef({ x: -100, y: -100 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        currentPosRef.current = { x: e.clientX, y: e.clientY };
        setCursorPos({ x: e.clientX, y: e.clientY });
        hasMovedRef.current = true;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.select-card') ||
        target.closest('.concept-card') ||
        target.closest('.process-card') ||
        target.closest('.pulse-ring') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      setHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let animationFrameId;
    const updateCursor = () => {
      if (hasMovedRef.current) {
        const speed = 0.15; // interpolation speed
        const dx = targetPosRef.current.x - currentPosRef.current.x;
        const dy = targetPosRef.current.y - currentPosRef.current.y;
        
        currentPosRef.current.x += dx * speed;
        currentPosRef.current.y += dy * speed;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        const stretch = Math.min(distance * 0.008, 0.35);
        
        let angle = currentPosRef.current.angle || 0;
        if (distance > 1) {
          angle = Math.atan2(dy, dx) * (180 / Math.PI);
          currentPosRef.current.angle = angle;
        }
        
        setCursorPos({ x: currentPosRef.current.x, y: currentPosRef.current.y });
        setCursorTransform({
          scaleX: 1 + stretch,
          scaleY: 1 - stretch * 0.5,
          angle: angle
        });
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Fetch campaign history on mount (just for console print or future use)
  useEffect(() => {
    fetch('http://localhost:8080/api/ads/campaigns')
      .then(res => res.json())
      .then(data => console.log('Loaded campaigns history:', data))
      .catch(err => console.log('Backend not connected yet or offline. Using fallback.'));
  }, []);

  // Scroll to top when view, service details, step, or brief stage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view, activeServiceDetail, step, briefStage]);
  // Handle browser Back / Forward navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const serviceParam = params.get('service');
    
    let initialView = 'landing';
    let initialService = null;
    
    if (serviceParam) {
      initialService = parseInt(serviceParam, 10);
    } else if (viewParam === 'careers') {
      initialView = 'careers';
    } else if (viewParam === 'wizard') {
      initialView = 'wizard';
    }
    
    const initialUrl = window.location.pathname + window.location.search;
    console.log('[History] Initializing state on mount:', { view: initialView, activeServiceDetail: initialService }, initialUrl);
    window.history.replaceState({ view: initialView, activeServiceDetail: initialService }, '', initialUrl);
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;
      console.log('[History] popstate event fired. State:', state, 'Location:', window.location.search);
      if (state) {
        setView(state.view || 'landing');
        setActiveServiceDetail(state.activeServiceDetail !== undefined ? state.activeServiceDetail : null);
      } else {
        const params = new URLSearchParams(window.location.search);
        const viewParam = params.get('view');
        const serviceParam = params.get('service');
        
        if (serviceParam) {
          setView('landing');
          setActiveServiceDetail(parseInt(serviceParam, 10));
        } else if (viewParam === 'careers') {
          setView('careers');
          setActiveServiceDetail(null);
        } else if (viewParam === 'wizard') {
          setView('wizard');
          setActiveServiceDetail(null);
        } else {
          setView('landing');
          setActiveServiceDetail(null);
        }
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // State synchronization is handled explicitly in navigation event handlers to prevent timing issues.

  // Reset wizard state when leaving the wizard view
  useEffect(() => {
    if (view !== 'wizard') {
      setCampaignId(null);
      setConcepts([]);
      setSelectedConceptId(null);
      setFinalAsset(null);
      setStep(1);
      setBriefStage(1);
      setBrandName('');
    }
  }, [view]);

  // Scroll animation observer
  useEffect(() => {
    if (view !== 'landing' && view !== 'careers') return;

    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, observerOptions);

      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [view, activeServiceDetail]);

  const handleStartProject = () => {
    setView('wizard');
    setStep(1);
    setBriefStage(1);
    setErrorMsg('');
    setActiveServiceDetail(null);
    console.log('[History] Pushing wizard state (handleStartProject)');
    window.history.pushState({ view: 'wizard', activeServiceDetail: null }, '', '/?view=wizard');
  };

  const handleBackToLanding = () => {
    setView('landing');
    // Reset state
    setCampaignId(null);
    setConcepts([]);
    setSelectedConceptId(null);
    setFinalAsset(null);
    setStep(1);
    setBriefStage(1);
    setBrandName('');
    console.log('[History] Pushing landing state (handleBackToLanding)');
    window.history.pushState({ view: 'landing', activeServiceDetail: null }, '', '/');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (targetId === 'careers') {
      setView('careers');
      setActiveServiceDetail(null);
      window.scrollTo(0, 0);
      console.log('[History] Pushing careers state (handleNavClick)');
      window.history.pushState({ view: 'careers', activeServiceDetail: null }, '', '/?view=careers');
      return;
    }
    setView('landing');
    setActiveServiceDetail(null);
    setStep(1);
    setBriefStage(1);
    console.log('[History] Pushing landing state (handleNavClick)');
    window.history.pushState({ view: 'landing', activeServiceDetail: null }, '', '/');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDownloadInfo = () => {
    const categories = categoryPreset.map(item => item === 'CUSTOM' ? customCategory : item).join(', ');
    const goals = goalPreset.map(item => item === 'CUSTOM' ? customGoal : item).join(', ');
    const placements = placementsPreset.map(item => item === 'CUSTOM' ? customPlacements : item).join(', ');
    const audiences = audiencePreset.map(item => item === 'CUSTOM' ? customAudience : item).join(', ');
    const moods = moodPreset.map(item => item === 'CUSTOM' ? customMood : item).join(', ');
    const budgets = budgetPreset.map(item => item === 'CUSTOM' ? customBudget : item).join(', ');
    const timelines = timelinePreset.map(item => item === 'CUSTOM' ? customTimeline : item).join(', ');

    let content = '';
    if (lang === 'KO') {
      content = `[VERARVO 프로젝트 신청 정보 요약]

■ 브랜드 / 서비스 이름: ${brandName}
■ 이메일 주소: ${email}
■ 제품 / 서비스 설명:
${productDesc}

■ 프로젝트 광고 컨셉:
${customConceptText}

■ 선택 및 체크한 항목
- 프로젝트 카테고리: ${categories}
- 프로젝트 목적: ${goals}
- 배포 채널: ${placements}
- 타겟 오디언스: ${audiences}
- 광고 무드 & 톤: ${moods}
- 예산 범위: ${budgets}
- 희망 완료 일정: ${timelines}
`;
    } else {
      content = `[VERARVO Project Application Summary]

■ Brand / Service Name: ${brandName}
■ Email Address: ${email}
■ Product / Service Description:
${productDesc}

■ Creative Concept:
${customConceptText}

■ Selected Options
- Project Category: ${categories}
- Project Goal: ${goals}
- Distribution Channels: ${placements}
- Target Audience: ${audiences}
- Ad Mood & Tone: ${moods}
- Budget Range: ${budgets}
- Target Timeline: ${timelines}
`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `verarvo_project_application_${brandName || 'summary'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCreateNewProject = () => {
    setView('wizard');
    setStep(1);
    setBriefStage(1);
    
    // Reset state
    setCampaignId(null);
    setConcepts([]);
    setSelectedConceptId(null);
    setFinalAsset(null);
    setBrandName('');
    setProductDesc('');
    setEmail('');
    setCustomConceptText('');
    setFormErrors({});

    console.log('[History] Pushing wizard state (handleCreateNewProject)');
    window.history.pushState({ view: 'wizard', activeServiceDetail: null }, '', '/?view=wizard');
  };

  // Submit Step 1: Create brief & generate concepts
  const handleBriefSubmit = async (e) => {
    e.preventDefault();

    const getFinalValue = (presetArray, customText) => {
      return presetArray
        .map(item => item === 'CUSTOM' ? customText : item)
        .filter(item => item && item.trim() !== '')
        .join(', ');
    };

    const finalCategory = getFinalValue(categoryPreset, customCategory);
    const finalGoal = getFinalValue(goalPreset, customGoal);
    const finalPlacements = getFinalValue(placementsPreset, customPlacements);
    const finalAudience = getFinalValue(audiencePreset, customAudience);
    const finalMood = getFinalValue(moodPreset, customMood);
    const finalBudget = getFinalValue(budgetPreset, customBudget);
    const finalTimeline = getFinalValue(timelinePreset, customTimeline);

    const errors = {};

    if (!brandName.trim()) {
      errors.brandName = translations[lang].errBrandNameRequired || 'Please enter a brand / service name.';
    }
    if (!productDesc.trim()) {
      errors.productDesc = translations[lang].errProductDescRequired || 'Please enter a product / service description.';
    }

    if (!email.trim()) {
      errors.email = translations[lang].errEmailRequired || 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = translations[lang].errEmailInvalid || 'Please enter a valid email address.';
      }
    }

    if (categoryPreset.length === 0) {
      errors.category = lang === 'KO' ? '카테고리를 최소 하나 이상 선택해 주세요.' : 'Please select at least one category.';
    } else if (categoryPreset.includes('CUSTOM') && !customCategory.trim()) {
      errors.category = translations[lang].errCustomCategory || 'Please specify your custom category.';
    }

    if (goalPreset.length === 0) {
      errors.goal = lang === 'KO' ? '프로젝트 목적을 최소 하나 이상 선택해 주세요.' : 'Please select at least one project goal.';
    } else if (goalPreset.includes('CUSTOM') && !customGoal.trim()) {
      errors.goal = translations[lang].errCustomGoal || 'Please specify your custom goal.';
    }

    if (placementsPreset.length === 0) {
      errors.placements = lang === 'KO' ? '배포 채널을 최소 하나 이상 선택해 주세요.' : 'Please select at least one distribution channel.';
    } else if (placementsPreset.includes('CUSTOM') && !customPlacements.trim()) {
      errors.placements = translations[lang].errCustomPlacements || 'Please specify your custom channels.';
    }

    if (audiencePreset.length === 0) {
      errors.audience = lang === 'KO' ? '타겟 오디언스를 최소 하나 이상 선택해 주세요.' : 'Please select at least one target audience.';
    } else if (audiencePreset.includes('CUSTOM') && !customAudience.trim()) {
      errors.audience = translations[lang].errCustomAudience || 'Please specify your custom target audience.';
    }

    if (moodPreset.length === 0) {
      errors.mood = lang === 'KO' ? '광고 무드를 최소 하나 이상 선택해 주세요.' : 'Please select at least one ad mood & tone.';
    } else if (moodPreset.includes('CUSTOM') && !customMood.trim()) {
      errors.mood = translations[lang].errCustomMood || 'Please specify your custom mood.';
    }

    if (budgetPreset.length === 0) {
      errors.budget = lang === 'KO' ? '예산 범위를 최소 하나 이상 선택해 주세요.' : 'Please select at least one budget range.';
    } else if (budgetPreset.includes('CUSTOM') && !customBudget.trim()) {
      errors.budget = translations[lang].errCustomBudget || 'Please specify your custom budget range.';
    }

    if (timelinePreset.length === 0) {
      errors.timeline = lang === 'KO' ? '희망 완료 일정을 최소 하나 이상 선택해 주세요.' : 'Please select at least one timeline.';
    } else if (timelinePreset.includes('CUSTOM') && !customTimeline.trim()) {
      errors.timeline = translations[lang].errCustomTimeline || 'Please specify your custom timeline.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const isStage1Err = errors.category || errors.goal || errors.placements;
      if (isStage1Err) {
        setBriefStage(1);
        setTimeout(() => {
          const firstErrField = Object.keys(errors).find(k => ['category', 'goal', 'placements'].includes(k));
          const el = document.getElementById(`input-${firstErrField}`);
          if (el) {
            el.focus();
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        // Stage 2 errors
        const firstErrField = Object.keys(errors).find(k => ['brandName', 'email', 'productDesc'].includes(k)) || Object.keys(errors)[0];
        const el = document.getElementById(`input-${firstErrField}`);
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setFormErrors({});

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8080/api/ads/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          productDescription: productDesc,
          email,
          targetAudience: finalAudience,
          campaignGoal: finalGoal,
          mood: finalMood,
          projectCategory: finalCategory,
          placements: finalPlacements,
          budgetRange: finalBudget,
          targetTimeline: finalTimeline
        })
      });

      if (!response.ok) throw new Error('Failed to connect to backend server');

      const data = await response.json();
      setCampaignId(data.campaign.id);
      setConcepts(data.concepts);
      setStep(2);
    } catch (err) {
      console.error(err);
      setErrorMsg('Unable to connect to the backend server. Please make sure it is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Step 2: Set creative concept and generate assets immediately
  const handleConceptSubmit = async (overrideText, overrideCampaignId) => {
    const conceptVal = (typeof overrideText === 'string' ? overrideText : customConceptText).trim();
    const activeCampaignId = overrideCampaignId || campaignId;

    if (!conceptVal) {
      const errText = translations[lang].errConceptRequired || 'Please type your creative concept.';
      setFormErrors({ concept: errText });
      const el = document.getElementById('input-concept');
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (conceptVal.length < 10) {
      const errText = translations[lang].errConceptLength || 'Please write a bit more (minimum 10 characters).';
      setFormErrors({ concept: errText });
      const el = document.getElementById('input-concept');
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setFormErrors({});

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Post custom concept to backend
      const customConceptResponse = await fetch(`http://localhost:8080/api/ads/campaign/${activeCampaignId}/custom-concept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptText: conceptVal })
      });

      if (!customConceptResponse.ok) throw new Error('Failed to save custom concept on backend');

      // 2. Generate assets immediately
      const generateResponse = await fetch(`http://localhost:8080/api/ads/campaign/${activeCampaignId}/generate-assets`, {
        method: 'POST'
      });

      if (!generateResponse.ok) throw new Error('Failed to generate ad assets on backend');

      const assetData = await generateResponse.json();
      setFinalAsset(assetData);
      setStep(3); // Transition directly to Step 3 (final dashboard)
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred while saving the concept or generating assets.');
    } finally {
      setLoading(false);
    }
  };

  const parseScriptJson = (jsonStr) => {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return [];
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Premium Preloader Overlay */}
      {preloaderActive && (
        <div className={`preloader-overlay ${preloadProgress === 100 ? 'fade-out' : ''}`}>
          {/* Subtle Ambient Background Glow inside preloader */}
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
            zIndex: -1
          }}></div>

          <div className="preloader-logo-container">
            <div className="preloader-logo">
              <span className={preloadProgress >= 14 ? 'filled' : ''}>V</span>
              <span className={preloadProgress >= 28 ? 'filled' : ''}>E</span>
              <span className={preloadProgress >= 42 ? 'filled' : ''}>R</span>
              <span className={`preloader-logo-a ${preloadProgress >= 57 ? 'filled' : ''}`}>
                A
                <img 
                  src="/logo-nv-transparent-hq.png" 
                  alt="" 
                  className={preloadProgress >= 57 ? 'visible' : ''} 
                />
              </span>
              <span className={preloadProgress >= 71 ? 'filled' : ''}>R</span>
              <span className={preloadProgress >= 85 ? 'filled' : ''}>V</span>
              <span className={preloadProgress >= 100 ? 'filled' : ''}>O</span>
            </div>
          </div>

          <div className="preloader-counter">{preloadProgress}%</div>

          <div className="preloader-progress-bar">
            <div className="preloader-progress-fill" style={{ width: `${preloadProgress}%` }}></div>
          </div>
        </div>
      )}
      
      {/* Ambient background glows wrapper to prevent scroll height expansion */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Ported from body::before to prevent scroll height expansion on short pages */}
        <div className="ambient-glow" style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.035) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}></div>

        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        {view === 'landing' && activeServiceDetail === null && (
          <>
            <div className="ambient-glow glow-3"></div>
            <div className="ambient-glow glow-4"></div>
            <div className="ambient-glow glow-5"></div>
            <div className="ambient-glow glow-6"></div>
            {/* Ported from body::after to prevent scroll height expansion on short pages */}
            <div className="ambient-glow" style={{
              position: 'absolute',
              top: '1200px',
              right: '10%',
              width: '900px',
              height: '900px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.02) 0%, transparent 75%)',
              filter: 'blur(100px)',
              pointerEvents: 'none'
            }}></div>
          </>
        )}
      </div>
      
      {/* Header bar */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={(e) => { e.preventDefault(); setView('landing'); setActiveServiceDetail(null); setStep(1); setBriefStage(1); console.log('[History] Pushing landing state (Logo click)'); window.history.pushState({ view: 'landing', activeServiceDetail: null }, '', '/'); window.scrollTo(0, 0); }}>
            VER
            <span style={{ 
              position: 'relative', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              WebkitTextStroke: '1.2px #ffcc00'
            }}>
              A
              <img 
                src="/logo-nv-transparent-hq.png" 
                alt="" 
                style={{
                  position: 'absolute',
                  left: '50%',
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
          
          {view === 'landing' || view === 'careers' ? (
            <>
              <ul className="nav-menu">
                <li><a href="#work" className="nav-link" onClick={(e) => handleNavClick(e, 'work')}>{translations[lang].navWork}</a></li>
                <li><a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, 'services')}>{translations[lang].navServices}</a></li>
                <li><a href="#process" className="nav-link" onClick={(e) => handleNavClick(e, 'process')}>{translations[lang].navProcess}</a></li>
                <li><a href="#careers" className="nav-link" onClick={(e) => handleNavClick(e, 'careers')}>{translations[lang].navCareers}</a></li>
                <li><a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>{translations[lang].navContact}</a></li>
                
                {/* Language Dropdown Selector */}
                <li className="lang-selector-container">
                  <div className="lang-selector-trigger" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                    <Globe size={15} />
                    <FlagIcon code={languageFlags[lang]} alt={lang} />
                    <span>{lang}</span>
                  </div>
                  {langDropdownOpen && (
                    <div className="lang-dropdown-menu">
                      <div className={`lang-dropdown-item ${lang === 'KO' ? 'active' : ''}`} onClick={() => { setLang('KO'); setLangDropdownOpen(false); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FlagIcon code="kr" alt="Korean" />
                          <span>한국어</span>
                        </div>
                      </div>
                      <div className={`lang-dropdown-item ${lang === 'EN' ? 'active' : ''}`} onClick={() => { setLang('EN'); setLangDropdownOpen(false); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FlagIcon code="us" alt="English" />
                          <span>English</span>
                        </div>
                      </div>
                      <div className={`lang-dropdown-item ${lang === 'ZH' ? 'active' : ''}`} onClick={() => { setLang('ZH'); setLangDropdownOpen(false); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FlagIcon code="cn" alt="Chinese" />
                          <span>中文</span>
                        </div>
                      </div>
                      <div className={`lang-dropdown-item ${lang === 'JA' ? 'active' : ''}`} onClick={() => { setLang('JA'); setLangDropdownOpen(false); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FlagIcon code="jp" alt="Japanese" />
                          <span>日本語</span>
                        </div>
                      </div>
                      <div className={`lang-dropdown-item ${lang === 'VI' ? 'active' : ''}`} onClick={() => { setLang('VI'); setLangDropdownOpen(false); }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FlagIcon code="vn" alt="Vietnamese" />
                          <span>Tiếng Việt</span>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
              <button className="btn-gold-outline btn-header-project" onClick={handleStartProject}>
                {translations[lang].btnStartProject}
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {/* Language Selector in Wizard header */}
              <div className="lang-selector-container" style={{ listStyle: 'none' }}>
                <div className="lang-selector-trigger" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                  <Globe size={15} />
                  <FlagIcon code={languageFlags[lang]} alt={lang} />
                  <span>{lang}</span>
                </div>
                {langDropdownOpen && (
                  <div className="lang-dropdown-menu">
                    <div className={`lang-dropdown-item ${lang === 'KO' ? 'active' : ''}`} onClick={() => { setLang('KO'); setLangDropdownOpen(false); }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FlagIcon code="kr" alt="Korean" />
                        <span>한국어</span>
                      </div>
                    </div>
                    <div className={`lang-dropdown-item ${lang === 'EN' ? 'active' : ''}`} onClick={() => { setLang('EN'); setLangDropdownOpen(false); }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FlagIcon code="us" alt="English" />
                        <span>English</span>
                      </div>
                    </div>
                    <div className={`lang-dropdown-item ${lang === 'ZH' ? 'active' : ''}`} onClick={() => { setLang('ZH'); setLangDropdownOpen(false); }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FlagIcon code="cn" alt="Chinese" />
                        <span>中文</span>
                      </div>
                    </div>
                    <div className={`lang-dropdown-item ${lang === 'JA' ? 'active' : ''}`} onClick={() => { setLang('JA'); setLangDropdownOpen(false); }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FlagIcon code="jp" alt="Japanese" />
                        <span>日本語</span>
                      </div>
                    </div>
                    <div className={`lang-dropdown-item ${lang === 'VI' ? 'active' : ''}`} onClick={() => { setLang('VI'); setLangDropdownOpen(false); }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FlagIcon code="vn" alt="Vietnamese" />
                        <span>Tiếng Việt</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="btn-gold-outline" onClick={handleBackToLanding}>
                {translations[lang].btnLandingPage}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        {activeServiceDetail !== null ? (
          /* ========================================================
             SERVICE DETAIL VIEW
             ======================================================== */
          <div className="service-detail-view container" style={{ padding: '6rem 2rem 3rem 2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Additional Yellow Ambient Glows for Service Details */}
            <div className="ambient-glow" style={{ position: 'absolute', top: '10%', left: '-20%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, transparent 70%)', filter: 'blur(130px)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div className="ambient-glow" style={{ position: 'absolute', top: '40%', right: '-30%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)', filter: 'blur(150px)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div className="ambient-glow" style={{ position: 'absolute', bottom: '0px', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: 0, pointerEvents: 'none' }}></div>
            <div className="service-detail-header">
              <button className="btn-back-landing" onClick={() => { setActiveServiceDetail(null); console.log('[History] Pushing landing state (Close Service Detail)'); window.history.pushState({ view: 'landing', activeServiceDetail: null }, '', '/'); }} style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--gold)', fontSize: '0.9rem', cursor: 'pointer', gap: '8px', padding: '0', marginBottom: '2rem', transition: 'color 0.2s' }}>
                <ArrowLeft size={16} /> {translations[lang].btnBackToLanding}
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="service-num-badge" style={{ fontSize: '1.2rem', background: 'rgba(212,175,55,0.1)', color: 'var(--gold)', padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid rgba(212,175,55,0.2)', fontWeight: '600' }}>
                  0{activeServiceDetail}
                </span>
                <h2 className="service-detail-title" style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '-1px', margin: '0' }}>
                  {serviceDetailsData[lang][activeServiceDetail].title}
                </h2>
                <span className="service-badge" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {serviceDetailsData[lang][activeServiceDetail].tag}
                </span>
              </div>
              
              <p className="service-detail-desc" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1.5rem', maxWidth: '800px', lineHeight: '1.8', fontWeight: '300' }}>
                {serviceDetailsData[lang][activeServiceDetail].desc}
              </p>
            </div>

            <div className="service-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', marginTop: '4rem' }}>
              
              {/* LEFT COLUMN: MULTIPLE VIDEOS */}
              <div className="service-detail-visuals">
                <h3 className="section-subtitle-small" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: '600' }}>
                  {lang === 'KO' ? `${serviceDetailsData[lang][activeServiceDetail].title} 영상 예시` : (lang === 'EN' ? `${serviceDetailsData[lang][activeServiceDetail].title} Video Examples` : (lang === 'JA' ? `${serviceDetailsData[lang][activeServiceDetail].title}の動画例` : translations[lang].labelMediaShowcase))}
                </h3>
                
                <div className="visuals-flex" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%' }}>
                  {serviceDetailsData[lang][activeServiceDetail].media.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '0.8rem' }}>
                      <div className="visual-card-wrap" style={{ flex: 'none', width: '100%', maxWidth: item.aspectRatio === '9/16' ? '300px' : '480px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
                        <div className="video-card-preview" style={{ position: 'relative', width: '100%', aspectRatio: item.aspectRatio || '16/9', overflow: 'hidden', background: '#000' }}>
                          
                          {item.url ? (
                            <video 
                              src={item.url} 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', border: '2px dashed rgba(255,255,255,0.1)' }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, marginBottom: '1rem' }}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', fontWeight: '500', textAlign: 'center', padding: '0 1rem' }}>{item.placeholderText}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {item.aspectRatio === '9/16' && (
                        <div style={{ 
                          fontSize: '0.85rem', 
                          color: '#FACC15', 
                          fontWeight: '400',
                          textAlign: 'center',
                          marginTop: '0.2rem',
                          letterSpacing: '0.5px'
                        }}>
                          {translations[lang].aiDisclaimer || "모두 AI로 제작된 영상입니다"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: CORE METRICS & CASES */}
              <div className="service-detail-specs" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>



                {/* KEY FEATURES */}
                {serviceDetailsData[lang][activeServiceDetail].features && serviceDetailsData[lang][activeServiceDetail].features.length > 0 && (
                  <div className="spec-card" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem', backdropFilter: 'blur(20px)' }}>
                    <h3 className="spec-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: '600' }}>
                      {lang === 'KO' ? '핵심 제작 포인트' : lang === 'EN' ? 'Key Features' : lang === 'JP' ? '制作ポイント' : lang === 'CN' ? '核心制作特点' : 'Các tính năng chính'}
                    </h3>
                    <div className="features-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      {serviceDetailsData[lang][activeServiceDetail].features.map((feat, idx) => (
                        <div key={idx} className="feature-item">
                          <h4 className="feature-title" style={{ fontSize: '1rem', color: '#fff', fontWeight: '600', margin: '0 0 0.4rem 0' }}>{feat.title}</h4>
                          <p className="feature-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5', fontWeight: '300' }}>{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA ACTION */}
                <div style={{ marginTop: '1rem' }}>
                  <button 
                    className="btn-white-fill" 
                    style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', gap: '10px' }}
                    onClick={() => {
                      if (activeServiceDetail === 1) setCategoryPreset(['E-commerce & Retail']);
                      if (activeServiceDetail === 2) setCategoryPreset(['SaaS & Technology']);
                      if (activeServiceDetail === 3) setCategoryPreset(['Beauty & Lifestyle']);
                      if (activeServiceDetail === 4) setCategoryPreset(['Beauty & Lifestyle']);
                      if (activeServiceDetail === 5) setCategoryPreset(['E-commerce & Retail']);
                      
                      setView('wizard');
                      setStep(1);
                      setBriefStage(1);
                      console.log('[History] Pushing wizard state (Service Detail CTA)');
                      window.history.pushState({ view: 'wizard', activeServiceDetail: null }, '', '/?view=wizard');
                      setActiveServiceDetail(null);
                    }}
                  >
                    {translations[lang].btnStartCampaignType} <Sparkles size={18} />
                  </button>
                </div>
                
              </div>
              
            </div>
          </div>
) : view === 'careers' ? (
  <div className='careers-page' style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            {/* CAREERS SECTION */}
            <section id="careers" className="careers-sec container">
              <div className="services-intro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="hero-tag" style={{ margin: '0 0 1rem 0', alignSelf: 'flex-start' }}>{translations[lang].careersTag}</div>
                <h2 className="section-title">
                  <span style={{ fontWeight: 300, color: '#ffffff', fontStyle: 'normal' }}>{translations[lang].careersTitlePre}</span> <br /><span>{translations[lang].careersTitleSpan}</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontWeight: '300', whiteSpace: 'pre-line' }}>
                  {translations[lang].careersSubtitle}
                </p>
              </div>

              <div className="careers-content-box" style={{ 
                marginTop: '3.5rem', 
                background: 'linear-gradient(135deg, rgba(20, 20, 24, 0.4) 0%, rgba(6, 6, 8, 0.8) 100%)', 
                borderRadius: '16px', 
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '3rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
              }}>
                <h3 className="section-subtitle-small" style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                  {translations[lang].careersApplyHeader}
                </h3>

                <form onSubmit={handleCareersSubmit} className="careers-form-el">
                  {/* Job positions checkboxes */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersJobsLabel} <span style={{ color: '#ef4444' }}>*</span>
                    </div>
                    <div className="careers-form-input-col">
                      <div className="careers-checkbox-list">
                        {(translations[lang].careersJobsList || []).map((job) => (
                          <label key={job} className="careers-checkbox-item">
                            <input 
                              type="checkbox" 
                              name="roles" 
                              value={job} 
                              checked={careerForm.roles.includes(job)}
                              onChange={(e) => handleCareerJobChange(job, e.target.checked)}
                              className="careers-checkbox-input"
                            />
                            <span className="careers-checkbox-label" style={{
                              color: careerForm.roles.includes(job) ? '#ffffff' : 'var(--text-muted)',
                              fontWeight: careerForm.roles.includes(job) ? '600' : 'normal'
                            }}>
                              {job}
                            </span>
                          </label>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        className="form-control-line" 
                        placeholder={lang === 'KO' ? "기타 직무 (직접 입력)" : "Other role (Please specify)"}
                        value={careerForm.customRole || ''}
                        onChange={(e) => setCareerForm({...careerForm, customRole: e.target.value})}
                        style={{ marginTop: '1rem' }}
                      />
                    </div>
                  </div>
                  {/* Name field */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersNameLabel} <span style={{ color: '#ef4444' }}>*</span>
                    </div>
                    <div className="careers-form-input-col">
                      <input 
                        type="text" 
                        className="form-control-line" 
                        placeholder={lang === 'KO' ? "이름" : "Name"}
                        value={careerForm.name || ''}
                        onChange={(e) => setCareerForm({...careerForm, name: e.target.value})}
                        required 
                      />
                    </div>
                  </div>

                  {/* Nationality dropdown */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersNationalityLabel} <span style={{ color: '#ef4444' }}>*</span>
                    </div>
                    <div className="careers-form-input-col">
                      <select 
                        className="form-control-line"
                        value={careerForm.nationality}
                        onChange={(e) => setCareerForm({...careerForm, nationality: e.target.value})}
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

                  {/* Email field */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersEmailLabel} <span style={{ color: '#ef4444' }}>*</span>
                    </div>
                    <div className="careers-form-input-col">
                      <input 
                        type="email" 
                        className="form-control-line" 
                        placeholder="example@verarvo.com"
                        value={careerForm.email}
                        onChange={(e) => setCareerForm({...careerForm, email: e.target.value})}
                        required 
                      />
                    </div>
                  </div>

                  {/* Portfolio PDF upload */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersPortfolioLabel} <span style={{ color: '#ef4444' }}>*</span>
                    </div>
                    <div className="careers-form-input-col">
                      <div 
                        onDragOver={(e) => handleCareerDragOver(e)}
                        onDragLeave={(e) => handleCareerDragLeave(e)}
                        onDrop={(e) => handleCareerDrop(e, 'portfolio')}
                        onClick={() => document.getElementById('portfolio-file-input').click()}
                        style={{ 
                          border: '2px dashed rgba(212, 175, 55, 0.3)', 
                          borderRadius: '10px', 
                          padding: '2.5rem 1rem', 
                          textAlign: 'center', 
                          cursor: 'pointer',
                          background: 'rgba(255,255,255,0.01)',
                          transition: 'all 0.3s ease-in-out'
                        }}
                        className="file-upload-zone"
                      >
                        <input 
                          type="file" 
                          id="portfolio-file-input" 
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          onChange={(e) => handleCareerFileChange(e, 'portfolio')}
                        />
                        <Upload size={36} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#ffffff' }}>Upload</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {careerForm.portfolio ? careerForm.portfolio.name : 'Drag and drop file here'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume PDF upload */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersResumeLabel} <span style={{ color: '#ef4444' }}>*</span>
                    </div>
                    <div className="careers-form-input-col">
                      <div 
                        onDragOver={(e) => handleCareerDragOver(e)}
                        onDragLeave={(e) => handleCareerDragLeave(e)}
                        onDrop={(e) => handleCareerDrop(e, 'resume')}
                        onClick={() => document.getElementById('resume-file-input').click()}
                        style={{ 
                          border: '2px dashed rgba(212, 175, 55, 0.3)', 
                          borderRadius: '10px', 
                          padding: '2.5rem 1rem', 
                          textAlign: 'center', 
                          cursor: 'pointer',
                          background: 'rgba(255,255,255,0.01)',
                          transition: 'all 0.3s ease-in-out'
                        }}
                        className="file-upload-zone"
                      >
                        <input 
                          type="file" 
                          id="resume-file-input" 
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          onChange={(e) => handleCareerFileChange(e, 'resume')}
                        />
                        <Upload size={36} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#ffffff' }}>Upload</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {careerForm.resume ? careerForm.resume.name : 'Drag and drop file here'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes field */}
                  <div className="careers-form-row">
                    <div className="careers-form-label-col">
                      {translations[lang].careersNotesLabel}
                    </div>
                    <div className="careers-form-input-col">
                      <textarea 
                        className="form-control" 
                        placeholder={lang === 'KO' ? "기타 지원동기나 하실 말씀을 입력해 주세요..." : "Please enter any additional comments..."}
                        value={careerForm.notes}
                        onChange={(e) => setCareerForm({...careerForm, notes: e.target.value})}
                        style={{ minHeight: '120px' }}
                      />
                    </div>
                  </div>

                  {careerError && (
                    <div style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
                      {careerError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-white-fill" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={careerSubmitting}
                  >
                    {careerSubmitting ? '제출 중...' : translations[lang].careersSubmitBtn} <Sparkles size={16} />
                  </button>
                </form>

                {careerSuccessShow && (
                  <div className="contact-success-toast" style={{ marginTop: '1.5rem', background: 'rgba(212,175,55,0.15)', borderColor: 'var(--gold)' }}>
                    <Check size={20} className="toast-success-icon" style={{ color: 'var(--gold)' }} />
                    <span>{translations[lang].careersSuccessMsg}</span>
                  </div>
                )}
              </div>
            </section>
  </div>
        ) : view === 'landing' ? (
          
          /* ========================================================
             LANDING PAGE VIEW (Matching reference screenshots)
             ======================================================== */
          <>
            {/* HERO SECTION */}
            <section className="hero-sec">
              {/* Background Video */}
              <div className="hero-video-bg">
                <video
                  key={currentBgVideoIndex}
                  src={backgroundVideos[currentBgVideoIndex]}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="hero-video-overlay"></div>
              </div>

              {/* Background Video Arrow Controls on screen edges */}
              <button 
                className="bg-video-arrow bg-video-arrow-left" 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBgVideoIndex((prev) => (prev === 0 ? backgroundVideos.length - 1 : prev - 1));
                }}
                aria-label="Previous background video"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="bg-video-arrow bg-video-arrow-right" 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBgVideoIndex((prev) => (prev === backgroundVideos.length - 1 ? 0 : prev + 1));
                }}
                aria-label="Next background video"
              >
                <ChevronRight size={24} />
              </button>

              <div className="container hero-inner-container">
                <div className="hero-two-column-layout">
                  <div className="hero-content">
                    <div className="hero-tag">{translations[lang].heroTag}</div>

                    <h1 className="hero-title">
                      {translations[lang].heroTitlePre} <br />
                      <span>{translations[lang].heroTitleSpan}</span> <br />
                      <span style={{
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStroke: '1.5px var(--gold)',
                        display: 'inline-block'
                      }}>
                        {translations[lang].heroTitlePost}
                      </span>
                    </h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.2rem', lineHeight: '1.9' }}>
                      {translations[lang].heroSubtitleMain} <br />
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'block', marginTop: '1.6rem', lineHeight: '1.8' }}>
                        {translations[lang].heroSubtitleSub1} <br />
                        {translations[lang].heroSubtitleSub2} <br />
                        {translations[lang].heroSubtitleSub3}
                      </span>
                    </p>

                  </div>

                  <div className="hero-visual">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', width: '100%' }}>
                      <div className="glass-reel">
                        <video
                          key={currentVideoIndex}
                          className="glass-reel-video"
                          src={heroVideos[currentVideoIndex]}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                        <button 
                          className="reel-arrow-btn reel-arrow-left" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentVideoIndex((prev) => (prev === 0 ? heroVideos.length - 1 : prev - 1));
                          }}
                          aria-label="Previous video"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          className="reel-arrow-btn reel-arrow-right" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentVideoIndex((prev) => (prev === heroVideos.length - 1 ? 0 : prev + 1));
                          }}
                          aria-label="Next video"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="glass-reel-subtitle" style={{ color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.5px', margin: '0', textAlign: 'center', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', userSelect: 'none' }}>
                          <Sparkles size={13} style={{ color: 'var(--gold)', animation: 'ai-pulse 2s infinite ease-in-out' }} /> {translations[lang].videoQualityText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ position: 'absolute', bottom: '0.2rem', left: '50%', transform: 'translateX(-50%)', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', fontWeight: 500, letterSpacing: '1px', userSelect: 'none', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {translations[lang].aiDisclaimer}
                  </p>
                </div>
              </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="work" className="about-sec container">
              <div className="section-grid" style={{ gridTemplateColumns: '0.8fr 1.2fr', gap: '4rem' }}>
                <div className="about-header" style={{ position: 'relative' }}>
                  <div className="about-header-text animate-on-scroll" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="hero-tag" style={{ marginTop: '-4.5rem' }}>{translations[lang].aboutTag}</div>
                    
                    {/* Relative wrapper that keeps document flow height, centering text on logo */}
                    <div style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '240px',
                      transform: 'translate(2.5rem, 1.5rem)' // Reverted text position
                    }}>
                      {/* Background Emblem Watermark (Centered inside wrapper, shifted down by 5rem) */}
                      <img 
                        src="/logo-nv.png" 
                        alt="" 
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, calc(-50% + 5rem))', // Shifts only the logo image down by 5rem (additional 2rem)
                          width: '450px',
                          opacity: 0.3,
                          zIndex: 0,
                          pointerEvents: 'none',
                          mixBlendMode: 'screen',
                          filter: 'brightness(0.9) contrast(1.5)'
                        }} 
                      />
                      
                      {/* VERARVO text (Centered in wrapper, shifted down by 2rem) */}
                      <h2 className="section-title" style={{ position: 'relative', zIndex: 1, margin: 0, padding: 0, transform: 'translateY(2rem)' }}>
                        <span style={{ 
                          fontFamily: "'Playfair Display', serif", 
                          fontSize: '1.35em', 
                          fontWeight: 900, 
                          display: 'inline-block', 
                          color: 'transparent', 
                          WebkitTextFillColor: 'transparent', 
                          WebkitTextStroke: '1.2px #eab308' 
                        }}>
                          {translations[lang].aboutTitlePost}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="about-content" style={{ position: 'relative', paddingTop: 0, marginTop: '-2.0rem' }}>
                  <div className="about-text animate-on-scroll" style={{ position: 'relative', zIndex: 1, color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.02rem', lineHeight: '1.9', wordBreak: 'keep-all', '--delay': '0.2s' }}>
                    <p style={{ marginBottom: '1.25rem', fontWeight: 300 }}>
                      {translations[lang].aboutText1}
                    </p>
                    <p style={{ marginBottom: '1.25rem', fontWeight: 300 }}>
                      {translations[lang].aboutText2}
                    </p>
                    <p style={{ marginBottom: '1.25rem', fontWeight: 300 }}>
                      {translations[lang].aboutText3}
                    </p>
                    {translations[lang].aboutText4 && (
                      <p style={{ marginBottom: 0, fontWeight: 300 }}>
                        {translations[lang].aboutText4}
                      </p>
                    )}
                  </div>
                  
<div className="stats-grid animate-on-scroll" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '720px', marginTop: '2rem', '--delay': '0.4s' }}>
                    <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', height: '100%', minHeight: '140px' }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="stat-val" style={{ display: 'block', width: '100%', textAlign: 'center', lineHeight: 1.1, margin: 0 }}>24h~72h</div>
                      </div>
                      <div className="stat-label" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minHeight: '2.8rem' }}>{translations[lang].statTime}</div>
                    </div>
                    <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', height: '100%', minHeight: '140px' }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="stat-val" style={{ display: 'block', width: '100%', textAlign: 'center', lineHeight: 1.1, margin: 0 }}>80%↓</div>
                      </div>
                      <div className="stat-label" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minHeight: '2.8rem' }}>{translations[lang].statCostSaving}</div>
                    </div>
                    <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', height: '100%', minHeight: '140px' }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="stat-val" style={{ display: 'block', width: '100%', textAlign: 'center', lineHeight: 1.1, margin: 0 }}>98%</div>
                      </div>
                      <div className="stat-label" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minHeight: '2.8rem' }}>{translations[lang].statSatisfaction}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="services-sec container">
              <div className="services-intro">
                <div className="hero-tag">{translations[lang].servicesTag}</div>
                <h2 className="section-title">{renderTitleWithGradient(translations[lang].servicesTitlePre)} <span>{renderTitleWithGradient(translations[lang].servicesTitleSpan)}</span></h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontWeight: '300' }}>
                  {translations[lang].servicesSubtitle}
                </p>
              </div>

              <div className="services-list">
                <div className="service-row" onClick={() => { setActiveServiceDetail(1); console.log('[History] Pushing service detail 1'); window.history.pushState({ view: 'landing', activeServiceDetail: 1 }, '', '/?service=1'); }}>
                  <span className="service-num">01</span>
                  <span className="service-name">{translations[lang].service1Name}</span>
                  <p className="service-desc">{translations[lang].service1Desc}</p>
                  <span className="service-badge">PRODUCT AD</span>
                </div>
                
                <div className="service-row" onClick={() => { setActiveServiceDetail(2); console.log('[History] Pushing service detail 2'); window.history.pushState({ view: 'landing', activeServiceDetail: 2 }, '', '/?service=2'); }}>
                  <span className="service-num">02</span>
                  <span className="service-name">{translations[lang].service2Name}</span>
                  <p className="service-desc">{translations[lang].service2Desc}</p>
                  <span className="service-badge">EVENT · FESTIVAL</span>
                </div>

                <div className="service-row" onClick={() => { setActiveServiceDetail(3); console.log('[History] Pushing service detail 3'); window.history.pushState({ view: 'landing', activeServiceDetail: 3 }, '', '/?service=3'); }}>
                  <span className="service-num">03</span>
                  <span className="service-name">{translations[lang].service3Name}</span>
                  <p className="service-desc">{translations[lang].service3Desc}</p>
                  <span className="service-badge">SHORT-FORM</span>
                </div>

                <div className="service-row" onClick={() => { setActiveServiceDetail(4); console.log('[History] Pushing service detail 4'); window.history.pushState({ view: 'landing', activeServiceDetail: 4 }, '', '/?service=4'); }}>
                  <span className="service-num">04</span>
                  <span className="service-name">{translations[lang].service4Name}</span>
                  <p className="service-desc">{translations[lang].service4Desc}</p>
                  <span className="service-badge">VIRTUAL INFLUENCER</span>
                </div>

                <div className="service-row" onClick={() => { setActiveServiceDetail(5); console.log('[History] Pushing service detail 5'); window.history.pushState({ view: 'landing', activeServiceDetail: 5 }, '', '/?service=5'); }}>
                  <span className="service-num">05</span>
                  <span className="service-name">{translations[lang].service5Name}</span>
                  <p className="service-desc">{translations[lang].service5Desc}</p>
                  <span className="service-badge">INTERIOR</span>
                </div>
              </div>
            </section>

            {/* PROCESS SECTION */}
            <section id="process" className="process-sec container">
              <div className="services-intro">
                <div className="hero-tag">{translations[lang].processTag}</div>
                <h2 className="section-title">{renderTitleWithGradient(translations[lang].processTitlePre)} <span>{renderTitleWithGradient(translations[lang].processTitleSpan)}</span></h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontWeight: '300' }}>
                  {translations[lang].processSubtitle}
                </p>
              </div>

              {/* TIMELINE CONTAINER */}
              <div className="timeline-container">
                {/* Horizontal connection line for desktop */}
                <div className="timeline-line-horizontal">
                  <div className="timeline-line-horizontal-fill"></div>
                </div>

                <div className="timeline-steps">
                  {(processStepsData[lang] || processStepsData['EN']).map((step, idx) => (
                    <div 
                      key={idx} 
                      className="timeline-step-column animate-on-scroll"
                      style={{ '--delay': `${idx * 0.15}s` }}
                    >
                      {/* Text label above the node */}
                      <div className="timeline-node-label" style={{ 
                        position: 'absolute',
                        top: '-2rem',
                        fontSize: '0.95rem', 
                        color: 'var(--gold)', 
                        fontWeight: '700', 
                        fontFamily: 'var(--font-serif)',
                        letterSpacing: '0.5px',
                        whiteSpace: 'nowrap'
                      }}>
                        {({
                          KO: { B: '의뢰', P: '기획', D: '시안', F: '납품' },
                          EN: { B: 'Brief', P: 'Planning', D: 'Draft', F: 'Final' },
                          ZH: { B: '委托', P: '策划', D: '样片', F: '交付' },
                          JA: { B: '依頼', P: '企画', D: '試案', F: '納品' },
                          VI: { B: 'Yêu cầu', P: 'Kế hoạch', D: 'Chỉnh sửa', F: 'Bàn giao' }
                        }[lang] || { B: 'Brief', P: 'Planning', D: 'Draft', F: 'Final' })[step.letter]}
                      </div>

                      {/* Node circle on the line */}
                      <div className="timeline-node" style={{ marginTop: '0' }}>
                        <span className="timeline-node-letter">{step.letter}</span>
                      </div>
                      
                      {/* Vertical line leading to content */}
                      <div className="timeline-connector-vertical"></div>

                      {/* Content block */}
                      <div className="timeline-card">
                        <div className="timeline-card-number">{step.num}</div>
                        <h4 className="timeline-card-title">{step.title}</h4>
                        <ul className="timeline-card-details">
                          {step.details.map((detail, dIdx) => (
                            <li key={dIdx} className="timeline-detail-item">
                              <span className="timeline-dot">•</span>
                              <span className="timeline-detail-text">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            {/* CONTACT & FAQ SECTION */}
            <section id="contact" className="contact-sec container">
              <div className="contact-grid">
                
                {/* FAQ Accordion Block */}
                <div className="faq-block animate-on-scroll" style={{ '--delay': '0s' }}>
                  <div className="hero-tag">FAQ</div>
                  <h2 className="section-title" style={{ marginBottom: '3rem' }}>
                    {translations[lang].faqTitle}
                  </h2>
                  
                  <div className="faq-list">
                    {[
                      { q: translations[lang].faqQ1, a: translations[lang].faqA1 },
                      { q: translations[lang].faqQ2, a: translations[lang].faqA2 },
                      { q: translations[lang].faqQ3, a: translations[lang].faqA3 },
                      { q: translations[lang].faqQ4, a: translations[lang].faqA4 }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                      >
                        <div className="faq-question-row">
                          <span className="faq-question">Q{index + 1}. {item.q}</span>
                          <span className="faq-toggle-icon">{activeFaqIndex === index ? '−' : '+'}</span>
                        </div>
                        <div className="faq-answer-row">
                          <p className="faq-answer">A. {item.a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Form Block */}
                <div className="inquiry-block animate-on-scroll" style={{ '--delay': '0.2s' }}>
                  <div className="hero-tag">{translations[lang].contactTitle}</div>
                  <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                    VERARVO <span>Inquiry</span>
                  </h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: 300, fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {translations[lang].contactSubtitle}
                  </p>
                  
                  <form onSubmit={handleContactSubmit} className="contact-form-el">
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label">{translations[lang].contactName}</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={contactNameInput}
                        onChange={(e) => setContactNameInput(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label">{translations[lang].contactEmail}</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={contactEmailInput}
                        onChange={(e) => setContactEmailInput(e.target.value)}
                        placeholder="example@verarvo.com"
                        required 
                      />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                      <label className="form-label">{translations[lang].contactMessage}</label>
                      <textarea 
                        className="form-control" 
                        value={contactMessageInput}
                        onChange={(e) => setContactMessageInput(e.target.value)}
                        placeholder="문의하실 내용을 입력해 주세요..."
                        style={{ minHeight: '150px' }}
                        required 
                      />
                    </div>
                    
                    <button type="submit" className="btn-white-fill" style={{ width: '100%', justifyContent: 'center' }}>
                      {translations[lang].contactSubmit} <Sparkles size={16} />
                    </button>
                  </form>

                  {/* Glassmorphic Success Toast / Banner */}
                  {contactSuccessShow && (
                    <div className="contact-success-toast">
                      <Check size={20} className="toast-success-icon" />
                      <span>{translations[lang].contactSuccess}</span>
                    </div>
                  )}
                </div>

              </div>
            </section>
          </>

        ) : (
          
          /* ========================================================
             WIZARD VIEW (Step-by-step interactive workflow)
             ======================================================== */
          <div className="wizard-container container">
            
            {/* STEPPER HEADER */}
            <div className="stepper">
              <div className={`step-item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-node">
                  {step > 1 ? <Check size={18} /> : '01'}
                </div>
                <div className="step-label">{translations[lang].step1}</div>
              </div>
              
              <div className={`step-item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-node">
                  {step > 2 ? <Check size={18} /> : '02'}
                </div>
                <div className="step-label">{translations[lang].step2}</div>
              </div>

              <div className={`step-item ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                <div className="step-node">
                  {step > 3 ? <Check size={18} /> : '03'}
                </div>
                <div className="step-label">{translations[lang].step3}</div>
              </div>
            </div>



            {/* ERROR DISPLAY */}
            {errorMsg && (
              <div style={{ maxWidth: '760px', margin: '0 auto 2rem auto', display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem 1.5rem', borderRadius: '6px', color: '#ef4444', fontSize: '0.9rem' }}>
                <AlertCircle size={20} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP CONTENT SWITCH */}
            
            {/* STEP 1: BRIEF INPUT FORM */}
            {step === 1 && (
              <div className="form-card animate-fade">
                {briefStage === 1 ? (
                  // STAGE 1: CORE STRATEGY (큰틀)
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: 0, color: 'var(--white)' }}>
                        {translations[lang].briefStage1} <span style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: '400', fontFamily: 'var(--font-display)', marginLeft: '0.5rem' }}>Stage 1/2</span>
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>CORE FRAMEWORK</span>
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelCategory}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                        {['E-commerce & Retail', 'SaaS & Technology', 'Beauty & Lifestyle', 'Food & Beverage', 'Finance & Apps'].map((cat) => (
                          <div 
                            key={cat}
                            className={`select-card ${categoryPreset.includes(cat) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(categoryPreset, setCategoryPreset, cat);
                              if (formErrors.category) {
                                setFormErrors(prev => ({ ...prev, category: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{cat}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${categoryPreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(categoryPreset, setCategoryPreset, 'CUSTOM');
                            if (formErrors.category) {
                              setFormErrors(prev => ({ ...prev, category: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {categoryPreset.includes('CUSTOM') && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <input 
                            id="input-category"
                            type="text" 
                            className={`form-control ${formErrors.category ? 'is-invalid' : ''}`} 
                            placeholder="Type your custom industry / category..." 
                            value={customCategory}
                            onChange={(e) => {
                              setCustomCategory(e.target.value);
                              if (formErrors.category) {
                                setFormErrors(prev => ({ ...prev, category: '' }));
                              }
                            }}
                            required
                          />
                        </div>
                      )}
                      {formErrors.category && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.category}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelObjective}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {['Conversions & Sales', 'Brand Awareness', 'Lead Generation & Signups'].map((goal) => (
                          <div 
                            key={goal}
                            className={`select-card ${goalPreset.includes(goal) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(goalPreset, setGoalPreset, goal);
                              if (formErrors.goal) {
                                setFormErrors(prev => ({ ...prev, goal: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{goal}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${goalPreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(goalPreset, setGoalPreset, 'CUSTOM');
                            if (formErrors.goal) {
                              setFormErrors(prev => ({ ...prev, goal: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {goalPreset.includes('CUSTOM') && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <input 
                            id="input-goal"
                            type="text" 
                            className={`form-control ${formErrors.goal ? 'is-invalid' : ''}`} 
                            placeholder="Type your custom campaign goal..." 
                            value={customGoal}
                            onChange={(e) => {
                              setCustomGoal(e.target.value);
                              if (formErrors.goal) {
                                setFormErrors(prev => ({ ...prev, goal: '' }));
                              }
                            }}
                            required
                          />
                        </div>
                      )}
                      {formErrors.goal && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.goal}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelPlacements}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        {['Social Video Ads (Instagram/FB)', 'YouTube Shorts & Videos', 'TikTok Viral Video Ads', 'Omni-channel Campaign'].map((placement) => (
                          <div 
                            key={placement}
                            className={`select-card ${placementsPreset.includes(placement) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(placementsPreset, setPlacementsPreset, placement);
                              if (formErrors.placements) {
                                setFormErrors(prev => ({ ...prev, placements: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{placement}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${placementsPreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(placementsPreset, setPlacementsPreset, 'CUSTOM');
                            if (formErrors.placements) {
                              setFormErrors(prev => ({ ...prev, placements: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {placementsPreset.includes('CUSTOM') && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <input 
                            id="input-placements"
                            type="text" 
                            className={`form-control ${formErrors.placements ? 'is-invalid' : ''}`} 
                            placeholder="Type your custom channels or formats..." 
                            value={customPlacements}
                            onChange={(e) => {
                              setCustomPlacements(e.target.value);
                              if (formErrors.placements) {
                                setFormErrors(prev => ({ ...prev, placements: '' }));
                              }
                            }}
                            required
                          />
                        </div>
                      )}
                      {formErrors.placements && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.placements}
                        </div>
                      )}
                    </div>

                    <div className="wizard-footer" style={{ justifyContent: 'flex-end' }}>
                      <button 
                        type="button" 
                        className="btn-white-fill" 
                        onClick={() => {
                          const errors = {};
                          if (categoryPreset.length === 0) {
                            errors.category = lang === 'KO' ? '카테고리를 최소 하나 이상 선택해 주세요.' : 'Please select at least one category.';
                          } else if (categoryPreset.includes('CUSTOM') && !customCategory.trim()) {
                            errors.category = translations[lang].errCustomCategory;
                          }

                          if (goalPreset.length === 0) {
                            errors.goal = lang === 'KO' ? '프로젝트 목적을 최소 하나 이상 선택해 주세요.' : 'Please select at least one project goal.';
                          } else if (goalPreset.includes('CUSTOM') && !customGoal.trim()) {
                            errors.goal = translations[lang].errCustomGoal;
                          }

                          if (placementsPreset.length === 0) {
                            errors.placements = lang === 'KO' ? '배포 채널을 최소 하나 이상 선택해 주세요.' : 'Please select at least one distribution channel.';
                          } else if (placementsPreset.includes('CUSTOM') && !customPlacements.trim()) {
                            errors.placements = translations[lang].errCustomPlacements;
                          }

                          if (Object.keys(errors).length > 0) {
                            setFormErrors(errors);
                            return;
                          }
                          setFormErrors({});
                          setErrorMsg('');
                          setBriefStage(2);
                        }}
                      >
                        {translations[lang].btnNextSpecs} <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // STAGE 2: DETAILED SPECS (디테일)
                  <form onSubmit={handleBriefSubmit} noValidate>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: 0, color: 'var(--white)' }}>
                        {translations[lang].briefStage2} <span style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: '400', fontFamily: 'var(--font-display)', marginLeft: '0.5rem' }}>Stage 2/2</span>
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>CREATIVE DETAILS</span>
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelBrandName}</label>
                      <input 
                        id="input-brandName"
                        type="text" 
                        className={`form-control ${formErrors.brandName ? 'is-invalid' : ''}`} 
                        placeholder={translations[lang].placeholderBrandName} 
                        value={brandName}
                        onChange={(e) => {
                          setBrandName(e.target.value);
                          if (formErrors.brandName) {
                            setFormErrors(prev => ({ ...prev, brandName: '' }));
                          }
                        }}
                        required
                      />
                      {formErrors.brandName && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.brandName}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        {lang === 'KO' ? '완성된 제작물을 받으실 이메일' : 
                         lang === 'ZH' ? '接收完成资产的电子邮箱' :
                         lang === 'JA' ? '完成アセット受取用メールアドレス' :
                         lang === 'VI' ? 'Email nhận tài nguyên hoàn thiện' :
                         'Email to Receive Completed Assets'}
                      </label>
                      <input 
                        id="input-email"
                        type="text" 
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} 
                        placeholder="example@email.com" 
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formErrors.email) {
                            setFormErrors(prev => ({ ...prev, email: '' }));
                          }
                        }}
                        required
                      />
                      {formErrors.email && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.email}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelProductDesc}</label>
                      <textarea 
                        id="input-productDesc"
                        className={`form-control ${formErrors.productDesc ? 'is-invalid' : ''}`} 
                        placeholder={translations[lang].placeholderProductDesc} 
                        value={productDesc}
                        onChange={(e) => {
                          setProductDesc(e.target.value);
                          if (formErrors.productDesc) {
                            setFormErrors(prev => ({ ...prev, productDesc: '' }));
                          }
                        }}
                        required
                      />
                      {formErrors.productDesc && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.productDesc}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelAudience}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        {['2030 Career Professionals', 'Gen Z Trendsetters', 'Parents & Families'].map((aud) => (
                          <div 
                            key={aud}
                            className={`select-card ${audiencePreset.includes(aud) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(audiencePreset, setAudiencePreset, aud);
                              if (formErrors.audience) {
                                setFormErrors(prev => ({ ...prev, audience: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{aud}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${audiencePreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(audiencePreset, setAudiencePreset, 'CUSTOM');
                            if (formErrors.audience) {
                              setFormErrors(prev => ({ ...prev, audience: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {audiencePreset.includes('CUSTOM') && (
                        <input 
                          type="text" 
                          className={`form-control ${formErrors.audience ? 'is-invalid' : ''}`} 
                          placeholder="Type your custom target audience..." 
                          value={customAudience}
                          onChange={(e) => {
                            setCustomAudience(e.target.value);
                            if (formErrors.audience) {
                              setFormErrors(prev => ({ ...prev, audience: '' }));
                            }
                          }}
                          required
                        />
                      )}
                      {formErrors.audience && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.audience}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelMood}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        {['Sophisticated & Premium', 'Energetic & Viral', 'Emotional & Story-driven'].map((m) => (
                          <div 
                            key={m}
                            className={`select-card ${moodPreset.includes(m) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(moodPreset, setMoodPreset, m);
                              if (formErrors.mood) {
                                setFormErrors(prev => ({ ...prev, mood: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{m}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${moodPreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(moodPreset, setMoodPreset, 'CUSTOM');
                            if (formErrors.mood) {
                              setFormErrors(prev => ({ ...prev, mood: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {moodPreset.includes('CUSTOM') && (
                        <input 
                          type="text" 
                          className={`form-control ${formErrors.mood ? 'is-invalid' : ''}`} 
                          placeholder="Type your custom creative mood..." 
                          value={customMood}
                          onChange={(e) => {
                            setCustomMood(e.target.value);
                            if (formErrors.mood) {
                              setFormErrors(prev => ({ ...prev, mood: '' }));
                            }
                          }}
                          required
                        />
                      )}
                      {formErrors.mood && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.mood}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelBudget}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        {['Starter ($1,000 - $3,000)', 'Growth ($3,000 - $10,000)', 'Enterprise ($10,000+)'].map((b) => (
                          <div 
                            key={b}
                            className={`select-card ${budgetPreset.includes(b) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(budgetPreset, setBudgetPreset, b);
                              if (formErrors.budget) {
                                setFormErrors(prev => ({ ...prev, budget: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{b}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${budgetPreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(budgetPreset, setBudgetPreset, 'CUSTOM');
                            if (formErrors.budget) {
                              setFormErrors(prev => ({ ...prev, budget: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {budgetPreset.includes('CUSTOM') && (
                        <input 
                          type="text" 
                          className={`form-control ${formErrors.budget ? 'is-invalid' : ''}`} 
                          placeholder="Type your custom budget tier..." 
                          value={customBudget}
                          onChange={(e) => {
                            setCustomBudget(e.target.value);
                            if (formErrors.budget) {
                              setFormErrors(prev => ({ ...prev, budget: '' }));
                            }
                          }}
                          required
                        />
                      )}
                      {formErrors.budget && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.budget}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">{translations[lang].labelTimeline}</label>
                      <div className="grid-select" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        {['Express (72 Hours)', 'Standard (1 Week)', 'Flexible (2+ Weeks)'].map((t) => (
                          <div 
                            key={t}
                            className={`select-card ${timelinePreset.includes(t) ? 'active' : ''}`}
                            onClick={() => {
                              togglePreset(timelinePreset, setTimelinePreset, t);
                              if (formErrors.timeline) {
                                setFormErrors(prev => ({ ...prev, timeline: '' }));
                              }
                            }}
                          >
                            <span className="select-card-title" style={{ fontSize: '0.85rem' }}>{t}</span>
                          </div>
                        ))}
                        <div 
                          className={`select-card ${timelinePreset.includes('CUSTOM') ? 'active' : ''}`}
                          onClick={() => {
                            togglePreset(timelinePreset, setTimelinePreset, 'CUSTOM');
                            if (formErrors.timeline) {
                              setFormErrors(prev => ({ ...prev, timeline: '' }));
                            }
                          }}
                        >
                          <span className="select-card-title" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{translations[lang].optionOther}</span>
                        </div>
                      </div>
                      {timelinePreset.includes('CUSTOM') && (
                        <input 
                          type="text" 
                          className={`form-control ${formErrors.timeline ? 'is-invalid' : ''}`} 
                          placeholder="Type your custom delivery deadline..." 
                          value={customTimeline}
                          onChange={(e) => {
                            setCustomTimeline(e.target.value);
                            if (formErrors.timeline) {
                              setFormErrors(prev => ({ ...prev, timeline: '' }));
                            }
                          }}
                          required
                        />
                      )}
                      {formErrors.timeline && (
                        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                          {formErrors.timeline}
                        </div>
                      )}
                    </div>

                    <div className="wizard-footer">
                      <button type="button" className="btn-gold-outline" onClick={() => setBriefStage(1)}>
                        <ArrowLeft size={16} style={{ marginRight: '8px' }} /> {translations[lang].btnPrevStrategy}
                      </button>
                      <button type="submit" className="btn-white-fill" disabled={loading}>
                        {loading ? translations[lang].loadingStrategy : translations[lang].btnGenerateConcepts} <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 2: CONCEPT SETUP (USER TYPING) */}
            {step === 2 && (
              <div className="concepts-container animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', textAlign: 'center', marginBottom: '1rem', color: 'var(--white)' }}>
                  {translations[lang].step2Title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textAlign: 'center', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                  {translations[lang].step2Desc}
                </p>

                <div className="form-group" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
                    <Sparkles size={18} style={{ color: 'var(--gold)' }} />
                    {translations[lang].step2Title}
                  </label>
                  <textarea 
                    id="input-concept"
                    className={`form-control ${formErrors.concept ? 'is-invalid' : ''}`} 
                    rows={6}
                    style={{ minHeight: '160px', resize: 'vertical', fontSize: '0.95rem', lineHeight: '1.6', width: '100%', boxSizing: 'border-box' }}
                    placeholder={translations[lang].step2Placeholder}
                    value={customConceptText}
                    onChange={(e) => {
                      setCustomConceptText(e.target.value);
                      if (formErrors.concept) {
                        setFormErrors(prev => ({ ...prev, concept: '' }));
                      }
                    }}
                    required
                  />
                  {formErrors.concept && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                      {formErrors.concept}
                    </div>
                  )}
                </div>

                <div className="wizard-footer" style={{ marginTop: '2.5rem' }}>
                  <button type="button" className="btn-gold-outline" onClick={() => setStep(1)}>
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> {translations[lang].btnBack}
                  </button>
                  <button 
                    type="button" 
                    className="btn-white-fill" 
                    onClick={handleConceptSubmit}
                    disabled={loading || !customConceptText.trim()}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" style={{ width: '1.25rem', height: '1.25rem', marginRight: '8px', color: 'currentColor' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {translations[lang].loadingSelectConcept || 'Generating...'}
                      </>
                    ) : (
                      <>
                        {translations[lang].btnStartProduction} <Sparkles size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: FINAL DASHBOARD / DELIVERY */}
            {step === 3 && finalAsset && (
              <div className="concepts-container animate-fade">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', textAlign: 'center', marginBottom: '1.5rem', color: 'var(--white)' }}>
                  {translations[lang].step4Title}
                </h3>

                {/* Grand Confirmation Banner */}
                <div style={{
                  maxWidth: '900px',
                  margin: '0 auto 3rem auto',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-20%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '1.5px solid var(--gold)',
                      color: 'var(--gold)',
                      marginBottom: '1.5rem',
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
                    }}>
                      <Sparkles size={28} />
                    </div>
                    <h4 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.8rem',
                      color: 'var(--white)',
                      margin: '0 0 1rem 0',
                      letterSpacing: '0.5px'
                    }}>
                      {lang === 'KO' ? '프로젝트 최종 전달 완료!' : 
                       lang === 'ZH' ? '项目最终交付完成！' :
                       lang === 'JA' ? 'プロジェクト最終納品完了！' :
                       lang === 'VI' ? 'Bàn giao dự án hoàn tất!' :
                       'Project Delivery Confirmed!'}
                    </h4>
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '1.05rem',
                      lineHeight: '1.8',
                      maxWidth: '720px',
                      margin: '0 auto',
                      fontWeight: 300
                    }}>
                      {lang === 'KO' ? (
                        <>
                          저희 VERARVO는 귀하의 소중한 아이디어를 충실히 고려하여 최고의 품질로 제공해 드리겠습니다.<br />
                          완성된 제작물은 작성해주신 이메일 <strong style={{ color: 'var(--gold)', fontWeight: 600 }}>{email}</strong> 주소로 완성되는 즉시 보내드리겠습니다. VERARVO를 믿고 프로젝트를 함께해 주셔서 진심으로 감사드립니다.
                        </>
                      ) : lang === 'ZH' ? (
                        <>
                          实现您宝贵创意的超高清 4K 视频广告、4 格分镜脚本序列以及渠道优化媒体指南包 (.zip) 已成功生成。<br />
                          包含下载链接的最终项目报告已即时发送至您填写的电子邮箱地址：<strong style={{ color: 'var(--gold)', fontWeight: 600 }}>{email}</strong>。
                        </>
                      ) : lang === 'JA' ? (
                        <>
                          お客様の貴重なアイデアを具現化した高画質4Kビデオ広告映像、4コマストーリーボードシーケンス、およびチャネル最適化メディアガイドラインパッケージ（.zip）の生成が正常に完了しました。<br />
                          ご記入いただいたメールアドレス <strong style={{ color: 'var(--gold)', fontWeight: 600 }}>{email}</strong> 宛てに、ダウンロードリンクを含む最終プロジェクトレポートが即座に送信されました。
                        </>
                      ) : lang === 'VI' ? (
                        <>
                          Video quảng cáo 4K chất lượng cao hiện thực hóa ý tưởng của bạn, chuỗi phân cảnh 4 khung hình và gói hướng dẫn truyền thông tối ưu hóa kênh (.zip) đã được tạo thành công.<br />
                          Báo cáo dự án cuối cùng chứa liên kết tải xuống đã được gửi ngay lập tức đến địa chỉ email bạn đã nhập: <strong style={{ color: 'var(--gold)', fontWeight: 600 }}>{email}</strong>.
                        </>
                      ) : (
                        <>
                          The high-resolution 4K video ads, 4-panel storyboard sequences, and multi-format media guidelines package (.zip) have been successfully compiled.<br />
                          A full project report with download links has been dispatched to your email: <strong style={{ color: 'var(--gold)', fontWeight: 600 }}>{email}</strong>.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto 3rem auto' }}>
                  <div className="print-summary-card" style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(20px)'
                  }}>
                    <h4 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      color: 'var(--white)',
                      marginBottom: '2rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <FileText size={22} style={{ color: 'var(--gold)' }} />
                      {lang === 'KO' ? '신청 정보 요약' : 'Project Application Summary'}
                    </h4>

                    {/* 1. 신청자 작성 정보 Section */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h5 style={{
                        color: 'var(--gold)',
                        fontSize: '1.1rem',
                        marginBottom: '1.25rem',
                        fontWeight: '600',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                        paddingBottom: '0.5rem'
                      }}>
                        {lang === 'KO' ? '✍️ 신청자 작성 정보' : '✍️ Applicant Details'}
                      </h5>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div>
                          <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                            {lang === 'KO' ? '브랜드 / 서비스 이름' : 'Brand / Service Name'}
                          </strong>
                          <span style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 500 }}>{brandName}</span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                            {lang === 'KO' ? '이메일 주소' : 'Email Address'}
                          </strong>
                          <span style={{ color: 'var(--white)', fontSize: '0.95rem' }}>{email}</span>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                        <div>
                          <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            {lang === 'KO' ? '제품 / 서비스 설명' : 'Product / Service Description'}
                          </strong>
                          <p style={{
                            margin: 0,
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            color: 'var(--white)',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.5'
                          }}>
                            {productDesc}
                          </p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            {lang === 'KO' ? '프로젝트 광고 컨셉' : 'Creative Concept'}
                          </strong>
                          <p style={{
                            margin: 0,
                            padding: '1rem',
                            background: 'rgba(212, 175, 55, 0.03)',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            borderRadius: '8px',
                            color: 'var(--white)',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.5'
                          }}>
                            {customConceptText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2. 선택 및 체크한 항목 Section */}
                    <div>
                      <h5 style={{
                        color: 'var(--gold)',
                        fontSize: '1.1rem',
                        marginBottom: '1.25rem',
                        fontWeight: '600',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                        paddingBottom: '0.5rem'
                      }}>
                        {lang === 'KO' ? '☑️ 선택 및 체크한 항목' : '☑️ Selected & Checked Options'}
                      </h5>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                      }}>
                        {[
                          { label: lang === 'KO' ? '프로젝트 카테고리' : 'Project Category', preset: categoryPreset, custom: customCategory },
                          { label: lang === 'KO' ? '프로젝트 목적' : 'Project Goal', preset: goalPreset, custom: customGoal },
                          { label: lang === 'KO' ? '배포 채널' : 'Distribution Channels', preset: placementsPreset, custom: customPlacements },
                          { label: lang === 'KO' ? '타겟 오디언스' : 'Target Audience', preset: audiencePreset, custom: customAudience },
                          { label: lang === 'KO' ? '광고 무드 & 톤' : 'Ad Mood & Tone', preset: moodPreset, custom: customMood },
                          { label: lang === 'KO' ? '예산 범위' : 'Budget Range', preset: budgetPreset, custom: customBudget },
                          { label: lang === 'KO' ? '희망 완료 일정' : 'Target Timeline', preset: timelinePreset, custom: customTimeline },
                        ].map((item, index) => {
                          const items = item.preset.map(p => p === 'CUSTOM' ? item.custom : p).filter(Boolean);
                          if (items.length === 0) return null;
                          return (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              flexWrap: 'wrap',
                              gap: '1rem',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                              paddingBottom: '0.75rem'
                            }}>
                              <strong style={{ color: 'var(--white)', minWidth: '150px', fontSize: '0.9rem' }}>{item.label}</strong>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {items.map((val, idx) => (
                                  <span key={idx} className="print-badge" style={{
                                    background: 'rgba(212, 175, 55, 0.08)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    borderRadius: '6px',
                                    padding: '3px 10px',
                                    fontSize: '0.85rem',
                                    color: 'var(--gold)',
                                    fontWeight: '500',
                                    display: 'inline-block'
                                  }}>
                                    {val}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard actions */}
                <div className="wizard-footer" style={{ justifyContent: 'space-between' }}>
                  <button type="button" className="btn-gold-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={() => setStep(2)}>
                    <ArrowLeft size={16} /> {translations[lang].btnBack}
                  </button>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" className="btn-gold-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleDownloadInfo}>
                      <Download size={16} /> {translations[lang].btnDownload}
                    </button>
                    <button type="button" className="btn-gold-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handlePrint}>
                      <Printer size={16} /> {translations[lang].btnPrint}
                    </button>
                    <button type="button" className="btn-white-fill" onClick={handleCreateNewProject}>
                      {translations[lang].btnCreateNew} <RotateCcw size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Footer bar */}
      <footer className="footer">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)' }}>
            {lang === 'KO' ? (
              <span>모든 문의 이메일은 <a href="mailto:james42286910@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>james42286910@gmail.com</a> 으로 보내주시기 바랍니다.</span>
            ) : lang === 'ZH' ? (
              <span>所有咨询请发送电子邮件至 <a href="mailto:james42286910@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>james42286910@gmail.com</a>。</span>
            ) : lang === 'JA' ? (
              <span>すべてのお問い合わせは <a href="mailto:james42286910@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>james42286910@gmail.com</a> までメールでお送りください。</span>
            ) : lang === 'VI' ? (
              <span>Mọi thắc mắc vui lòng gửi email đến <a href="mailto:james42286910@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>james42286910@gmail.com</a>.</span>
            ) : (
              <span>For all inquiries, please send an email to <a href="mailto:james42286910@gmail.com" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>james42286910@gmail.com</a>.</span>
            )}
          </div>
        </div>
        </footer>

      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${hovering ? 'hovering' : ''} ${isClicked ? 'clicked' : ''}`}
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) rotate(${cursorTransform.angle}deg) scale(${cursorTransform.scaleX}, ${cursorTransform.scaleY})`,
          pointerEvents: 'none'
        }}
      >
        <div className="custom-cursor-dot" style={{ pointerEvents: 'none' }}></div>
      </div>

      {/* Global Bottom Glow Bar */}
      <div className="bottom-glow-bar" style={{ pointerEvents: 'none' }}></div>
    </div>
  );
}

export default App;
