import { Inter } from "next/font/google"
import { NextPageWithLayout } from "@/utils/types"
import { getAppLayout } from "@/components/layout/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

const Home: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    const handleAppRestart = () => {
      // Redirect the user to a specific page on app restart
      router.push("/brands")
    }

    // Listen for the beforeunload event
    window.addEventListener("beforeunload", handleAppRestart)

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("beforeunload", handleAppRestart)
    }
  }, [router])
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      home
    </main>
  )
}
export default Home
Home.isProtected = true
// Home.getLayout = getAppLayout(null,"Home")
