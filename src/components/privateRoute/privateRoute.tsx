import { decryptData } from "@/utils/localStorage"
import { useRouter } from "next/router"
import React, { ReactNode, useEffect } from "react"
interface PrivateRouteProps {
  children: ReactNode
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter()
  const user = decryptData("userdata")

  const isAuthenticated = user?.active ?? false

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin") // Redirect to sign-in page
    }
  }, [isAuthenticated, router])

  return <>{children}</>
}

export default PrivateRoute
