import Layout from "@/components/layout/layout"
import PrivateRoute from "@/components/privateRoute/privateRoute"
import "@/styles/globals.css"
// pages/_app.tsx
import "@/styles/style.css"
import { QueryClientProvider } from "react-query"
import { AppPropsWithLayout } from "@/utils/types"
import { queryClient } from "@/lib/react-query"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const isProtected = Component.isProtected ?? false
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isProtected ? (
          getLayout(
            <PrivateRoute>
              <Component {...pageProps} />
            </PrivateRoute>
          )
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </>
  )
}
