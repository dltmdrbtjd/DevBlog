export type Career = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  service: string;
  stack: string[];
  bullets: string[];
};

export const CAREER: Career[] = [
  {
    company: "어스얼라이언스",
    role: "Frontend Engineer",
    period: "2022.11 – Present",
    current: true,
    service: "금융 콘텐츠 플랫폼",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Storybook",
      "Vitest",
      "tailwindcss",
      "Sentry",
    ],
    bullets: [
      "Turborepo 기반 FE monorepo 구조 적용 및 운영",
      "초기 디자인 시스템 구성 → 확장 (토큰 / 프리미티브 / 패턴)",
      "Tiptap 기반 콘텐츠 에디터/뷰어 커스터마이징",
      "구독형 프리미엄 콘텐츠 / 커머스 / 어드민 도메인 개발",
      "Flutter 앱 내 웹뷰 콘텐츠 표시를 위한 웹뷰 개발",
      "Vercel 기반 배포 환경 운영 및 비용 관리",
      "Sentry + Datadog RUM 기반 모니터링 도입 및 운영",
      "콘텐츠에 대한 video,audio 스크립트 기능 및 video,audio의 내용 및 콘텐츠 아티클에 대한 전체 맥락 요약 및 주요 키워드를 보여주는 기능 기획&개발&지표 측정(일일 활성화 유저중 50%이상 사용 검증) 및 비용 측정 - (주요 모델: whisper, haiku)",
      "유저가 주간에 읽은 콘텐츠(video,audio,article)들에 대한 주간 분석 리포트 작성 기능 기획&개발 및 비용 측정 - (주요 모델: text-embedding, haiku)",
    ],
  },
  {
    company: "코드브릭",
    role: "Frontend Engineer",
    period: "2021.11 – 2022.10",
    service: "인도네시아 이커머스 플랫폼",
    stack: ["Go", "TypeScript", "Vue", "Nuxt.js", "React"],
    bullets: [
      "Google Marketing 연동을 유저가 쉽게 쓸 수 있는 UI/UX 및 BE/FE 개발",
      "인앱웹뷰 내 Nuxt.js 기반 웹뷰 개발",
      "이커머스 서비스 프론트엔드를 전반 담당",
      "메인 서비스 vuex -> pinia (상태 관리 라이브러리 교체)",
      "메인 서비스 Vue -> React (프레임워크 교체)",
    ],
  },
];

export const SKILLS: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
];
