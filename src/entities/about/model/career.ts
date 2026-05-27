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
    company: '어스얼라이언스',
    role: 'Frontend Engineer',
    period: '2022.11 – Present',
    current: true,
    service: '금융 콘텐츠 플랫폼',
    stack: ['TypeScript', 'React', 'Next.js', 'Storybook', 'Vitest', 'tailwindcss', 'Sentry'],
    bullets: [
      'Turborepo 기반 FE monorepo 구조 적용 및 운영',
      '초기 디자인 시스템 구성 → 확장 (토큰 / 프리미티브 / 패턴)',
      'Tiptap 기반 콘텐츠 에디터/뷰어 커스터마이징',
      '구독형 프리미엄 콘텐츠 / 커머스 / 어드민 도메인 개발',
      'Flutter 앱 내 웹뷰 콘텐츠 표시를 위한 웹뷰 개발',
      'Vercel 기반 배포 환경 운영 및 비용 관리',
      'Sentry + Datadog RUM 기반 모니터링 도입 및 운영',
    ],
  },
  {
    company: '코드브릭',
    role: 'Frontend Engineer',
    period: '2021.11 – 2022.10',
    service: '인도네시아 이커머스 플랫폼',
    stack: ['Go', 'TypeScript', 'Vue', 'Nuxt.js'],
    bullets: [
      'Google Marketing 연동 — 유저가 쉽게 쓸 수 있는 UI/UX 및 BE/FE 개발',
      '이커머스 서비스 프론트엔드 전반 담당',
    ],
  },
];

export type SkillGroup = { k: string; v: string[] };

export const SKILLS: SkillGroup[] = [
  { k: 'Language', v: ['JavaScript', 'TypeScript', 'Golang'] },
  {
    k: 'Front-End',
    v: [
      'React',
      'Next.js',
      'React-Query',
      'Recoil',
      'Redux',
      'Vue',
      'Pinia',
      'tailwindcss',
      'Emotion',
    ],
  },
  { k: 'Back-End', v: ['Nest.js', 'Express', 'Gin', 'MySQL', 'MongoDB'] },
  { k: 'Cloud', v: ['Vercel', 'Amplify', 'S3', 'CloudFront', 'Route53', 'Lambda', 'API-GW'] },
  { k: 'Monitor', v: ['Sentry', 'Datadog RUM'] },
  { k: 'Collab', v: ['Jira', 'Confluence', 'Notion', 'Slack', 'Figma'] },
];
