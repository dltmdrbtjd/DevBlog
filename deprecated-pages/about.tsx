import Layout from './layout'
import Image from 'next/image'
import GithubIcon from '../components/icons/github'
import LinkedInIcon from '../components/icons/linkedIn'
import Head from 'next/head'

export default function AboutMe() {
  return (
    <Layout back title="About Me" desc="dltmdrbtjd | About Me">
      <Head>
        <title>dltmdrbtjd | About Me</title>
      </Head>
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
          <p className="text-sm mt-1 text-emerald-300">dltmdrbtjd@gmail.com</p>
          <div className="flex pt-6 space-x-3">
            <GithubIcon />
            <LinkedInIcon />
          </div>
        </div>
        <div className="pt-4 pb-8 prose max-w-none xl:col-span-2">
          <p>
            함께 고민하면서 일하는걸 좋아하는 1년차 개발자{' '}
            <span className="font-bold text-white">이승규</span>입니다.
          </p>
          <p className="mt-6">
            주로 프론트엔드에 관심이 많고 좋아하고 현재는 사용자에게 더 나은
            UI/UX를 제공하고 사용성을 높이는것과 디자인 시스템에 대해서 관심이
            많고 내가 하는 프로젝트 및 개발이 어떤 비즈니스 임팩트를 줄 수
            있는지 생각을 많이 하는편입니다.
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
