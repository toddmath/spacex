import "styles/globals.css"
import type { DehydratedState, QueryClientConfig } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useState } from "react"
import { ThemeProvider } from "next-themes"
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { generateDefaultSeo } from "next-seo/pages"
import { MotionConfig } from "framer-motion"

import NavBar from "components/NavBar"
import Footer from "components/Footer"
import seoConfig from "@/next-seo.config"
import themeConfig from "@/themes.config.json"

const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
    },
  },
}

type Props = { dehydratedState?: DehydratedState }

function MyApp({ Component, pageProps }: AppProps<Props>) {
  const [queryClient] = useState(() => new QueryClient(defaultQueryClientConfig))

  return (
    <>
      <Head>{generateDefaultSeo(seoConfig)}</Head>
      <MotionConfig>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary
            state={pageProps.dehydratedState}
            queryClient={queryClient}
          >
            <ThemeProvider
              enableSystem
              enableColorScheme
              themes={themeConfig.themes}
            >
              <NavBar />
              <Component {...pageProps} />
              <Footer />
              <ReactQueryDevtools />
            </ThemeProvider>
          </HydrationBoundary>
        </QueryClientProvider>
        <Analytics />
        <SpeedInsights />
      </MotionConfig>
    </>
  )
}

export default MyApp

/*
INFO: QueryClient config for toast error messages
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
*/
