import '../styles/globals.css'
import type { QueryClientConfig } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import type { NextPage } from "next"
import { useState } from "react"
import { ThemeProvider } from "next-themes"
import {
  Hydrate,
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import toast, { Toaster } from "react-hot-toast"

import NavBar from "components/NavBar"
import Footer from "components/Footer"
// import CustomToaster from "components/Toaster"
// import Notifications from "components/Notifications"

const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
    },
  },
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout<P = { dehydratedState: QueryClient }> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

// type Props = { dehydratedState: QueryClient }

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (error instanceof Error && query.state.data !== undefined) {
              toast.error(`Somethign went wrong: ${error.message}`)
            }
          },
        }),
        ...defaultQueryClientConfig,
      })
  )

  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          enableSystem
          enableColorScheme
          // attribute="class"
          // defaultTheme='system'
        >
          <Toaster />
          <NavBar />
          <Component {...pageProps} />
          <Footer />
          <ReactQueryDevtools />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
