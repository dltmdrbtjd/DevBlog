import GithubIcon from '@/components/icons/github';
import LinkedInIcon from '@/components/icons/linkedIn';
import Image from 'next/image';

export default function AboutMe() {
  return (
    <div className="text-white">
      <h2 className="text-5xl text-left border-b-[2px] border-b-gray-500 pb-5 mb-8">About Me</h2>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-4 space-x-2">
          <Image
            alt="profile image"
            src={`/images/profile.jpeg`}
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
            함께 고민하면서 일하는걸 좋아하는 2.5년차 개발자{' '}
            <span className="font-bold text-white">이승규</span>입니다.
          </p>
          <p className="mt-6">
            주로 프론트엔드에 관심이 많고 좋아하고 현재는 사용자에게 더 나은 UI/UX를 제공하고
            사용성을 높이는것과 디자인 시스템에 대해서 관심이 많고 내가 하는 프로젝트 및 개발이 어떤
            비즈니스 임팩트를 줄 수 있는지 생각을 많이 하는편입니다.
          </p>
          <p className="mt-6">
            첫 회사는 인도네시아에 이커머스 서비스를 하던 국내회사에서 Vue, Nuxt.js, Go 를 사용하여
            개발을 진행하였고, 주로 개발했던 서비스는 진입장벽이 제법 높은 구글 마케팅을 유저들이 더
            쉽고 편한 UI/UX로 구글 마케팅을 사용할 수 있도록 하는 FE/BE 개발을 함께 했었습니다. 그
            외에는 주로 서비스의 프론트엔드 개발을 담당하였습니다.
          </p>
          <p className="mt-6">
            현재는 국내에서 금융 구독형 콘텐츠 서비스를 제공하는 회사에 개발팀에 초창기 멤버로
            합류하여 주로 TypeScript, React, Next.js를 사용하여 프론트엔드 개발을 진행하고있고,
            구독형 콘텐츠를 볼 수 있는 메인 웹 서비스와 앱(Flutter)내에서 사용될 웹뷰 개발을
            하고있고 추가적으로 콘텐츠를 생산할 수 있는 서비스 및 어드민 서비스를 개발하고 있습니다.
            어드민 서비스의 경우는 Nest.js, MongoDB, MySQL을 사용하여 프론트엔드와 백엔드 함께
            개발하고 있습니다.
          </p>
          <strong className="mt-6 block">Language</strong>
          <p>JavaScript / TypeScript / Golang</p>
          <strong className="mt-3 block">Front-End</strong>
          <p>React, Redux, Next.js, React-Query, Recoil, Emotion, tailwindcss / Vue, Vuex, Pinia</p>
          <strong className="mt-3 block">Back-End</strong>
          <p>Nest.js / Express / Gin / MySQL / MongoDB</p>
          <strong className="mt-3 block">AWS</strong>
          <p>Amplify, S3, CloudFront, Route53, Lambda, API-Gateway</p>
          <strong className="mt-3 block">Communication</strong>
          <p>Jira, Confluence, Notion, Slack, Figma</p>
          <strong className="mt-3 block">Etc</strong>
          <p>Docker</p>
        </div>
      </div>
    </div>
  );
}
