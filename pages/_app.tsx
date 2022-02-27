import '../styles/global.css'
import { AppProps } from 'next/app'
import AppBar from '../components/appbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full">
      <AppBar />
      <Component {...pageProps} />
    </div>
  )
}
