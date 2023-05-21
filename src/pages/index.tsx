import Image from 'next/image'
import { Inter } from 'next/font/google'
import { NextPageWithLayout } from '@/utils/types'
import { getAppLayout } from '@/components/layout/layout'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      home
    </main>
  )
}
export default Home;
Home.isProtected = true
Home.getLayout = getAppLayout;