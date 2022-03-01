import Layout from '../components/layout'
import Image from 'next/image'
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedIn'

export default function AboutMe() {
  return (
    <Layout back>
      <h2 className="text-5xl text-left border-b-[2px] border-b-gray-500 pb-5 mb-8">
        About Me
      </h2>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center pt-4 space-x-2">
          <Image
            src={`/images/profile.jpeg`}
            width={200}
            height={200}
            className="rounded-full"
          />
          <p className="font-bold text-2xl mt-6 text-white">Lee Seung Gyu</p>
          <p className="mt-1">Software Developer</p>
          <p>Seoul, Korea</p>
          <div className="flex pt-6 space-x-3">
            <GithubIcon />
            <LinkedInIcon />
          </div>
        </div>
        <div className="pt-4 pb-8 prose max-w-none xl:col-span-2">
          <p>
            안녕하세요. 서울에서 근무중인 주니어 개발자{' '}
            <span className="font-bold text-white">이승규</span>입니다.
          </p>
          <p className="mt-6">
            주로 프론트엔드 개발에 관심이 많이있고 사용자에게 더 나은 UI/UX를
            제공하고 사용성을 높이는것과 디자인 시스템, 성능 최적화 및 SEO부분에
            관심이 많이 있습니다. 회사에서 프론트엔드 부분을 전담하고 있는것이
            아니라서 개인적으로 시간이 있을때마다 공부중입니다.
          </p>
          <strong className="mt-6 block">Language</strong>
          <p>JavaScript / TypeScript / Golang</p>
          <strong className="mt-3 block">Front-End</strong>
          <p>React, Redux, Next.js / Vue, Vuex, Pinia</p>
          <strong className="mt-3 block">Back-End</strong>
          <p>Gin / MongoDB / MySQL</p>
        </div>
      </div>
    </Layout>
  )
}
