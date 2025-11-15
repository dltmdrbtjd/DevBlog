import { GithubIcon, LinkedInIcon } from "@/src/shared/ui";
import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="text-white">
      <h2 className="text-5xl text-left border-b-2 border-b-gray-500 pb-5 mb-8">
        About Me
      </h2>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-4 space-x-2">
          <Image
            alt="profile image"
            src={"/images/profile.jpeg"}
            width={200}
            height={200}
            className="rounded-full"
          />
          <p className="font-bold text-2xl mt-6 text-white">Lee Seung Gyu</p>
          <p className="mt-1">Frontend Engineer</p>
          <p>Seoul, Korea</p>
          <p className="text-sm mt-1 text-emerald-300">dltmdrbtjd@gmail.com</p>
          <div className="flex pt-6 space-x-3">
            <GithubIcon />
            <LinkedInIcon />
          </div>
        </div>
        <div className="pt-4 pb-8 prose max-w-none xl:col-span-2">
          <p>
            함께 고민하면서 일하는걸 좋아하는
            <span className="font-bold text-white"> 이승규</span>입니다.
          </p>
          <p className="mt-6">
            TypeScript, React, Next.js를 사용하여 프론트엔드 개발을
            하고있습니다. 주로 프론트엔드에 관심이 많고 좋아하고 사용자에게 더
            나은 UI/UX를 제공하고 사용성을 높이는것과 디자인 시스템과 디자인
            패턴에 대해서 관심이 많고 내가 하는 프로젝트 및 개발이 어떤 비즈니스
            임팩트를 줄 수 있는지 생각을 많이 하는편입니다.
          </p>
          <p className="text-xl mt-6 font-bold">경력</p>
          <ul className="mt-2 list-disc">
            <strong>어스얼라이언스 (2022.11 ~ ing)</strong>
            <li className="ml-4 mt-2">서비스: 금융 콘텐츠 플랫폼</li>
            <li className="ml-4 mt-2">
              메인 사용 기술: TypeScript ,React, Next.js, Storybook, Vitest,
              tailwindcss, Sentry
            </li>
            <li className="ml-4 mt-2">
              Vercel 기반 배포 환경 운영 및 비용 관리
            </li>
            <li className="ml-4 mt-2">turborepo기반 FE monorepo 구조 적용</li>
            <li className="ml-4 mt-2">모니터링: Sentry, Datadog RUM</li>
            <li className="ml-4 mt-2">
              디자인 시스템: 초기 디자인 시스템 구성/적용 및 확장중
            </li>
            <li className="ml-4 mt-2">
              앱 내 웹뷰 개발: Flutter 앱에서 콘텐츠를 표시하기 위한 웹뷰 개발
            </li>
            <li className="ml-4 mt-2">
              콘텐츠 에디터/뷰어: tiptap editor 기반 커스터마이징 콘텐츠 에디터
              및 뷰어 개발
            </li>
            <li className="ml-4 mt-2">
              구독형 콘텐츠 서비스: 구독형 프리미엄 콘텐츠 서비스를 제공하는
              서비스 개발
            </li>
            <li className="ml-4 mt-2">
              어드민 서비스: 대시보드 및 운영 관리를 위한 어드민 서비스 개발
            </li>
            <li className="ml-4 mt-2">
              커머스 서비스: 도서 및 강연등등의 커머스 서비스 개발
            </li>
          </ul>
          <ul className="mt-6 list-disc">
            <strong>코드브릭 (2021.11 ~ 2022.10)</strong>
            <li className="ml-4 mt-2">서비스: 인도네시아 이커머스 플랫폼</li>
            <li className="ml-4 mt-2">
              메인 사용 기술: Go, TypeScript ,Vue, Nuxt.js
            </li>
            <li className="ml-4 mt-2">
              Google Marketing: 진입장벽이 제법 높은 구글 마케팅을 유저들이 편한
              UI/UX 및 연동하기 쉽게 구글 마케팅을 사용할 수 있도록 하는 FE/BE
              개발
            </li>
            <li className="ml-4 mt-2">
              그 외에는 주로 서비스의 프론트엔드 개발을 담당하였습니다.
            </li>
          </ul>
          <strong className="mt-6 block">Language</strong>
          <p>JavaScript / TypeScript / Golang</p>
          <strong className="mt-3 block">Front-End</strong>
          <p>
            React, Redux, Next.js, React-Query, Recoil, Emotion, tailwindcss /
            Vue, Vuex, Pinia
          </p>
          <strong className="mt-3 block">Back-End</strong>
          <p>Nest.js / Express / Gin / MySQL / MongoDB</p>
          <strong className="mt-3 block">Cloud Service</strong>
          <p>Vercel, Amplify, S3, CloudFront, Route53, Lambda, API-Gateway</p>
          <strong className="mt-3 block">Communication</strong>
          <p>Jira, Confluence, Notion, Slack, Figma</p>
          <strong className="mt-3 block">Monitor</strong>
          <p>Setnry, Datadog RUM</p>
          <strong className="mt-3 block">ETC</strong>
          <p>Docker, Google Analytics(GA, Gtag)</p>
        </div>
      </div>
    </div>
  );
}
