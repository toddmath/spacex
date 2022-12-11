import '../styles/globals.css'
import type { QueryClientConfig } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { useState } from "react"
import { ThemeProvider } from "next-themes"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { DefaultSeo } from "next-seo"
import { MotionConfig } from "framer-motion"

import NavBar from "components/NavBar"
import Footer from "components/Footer"
import seoConfig from "next-seo.config"

const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
    },
  },
}

type Props = { dehydratedState: QueryClient }

function MyApp({ Component, pageProps }: AppProps<Props>) {
  const [queryClient] = useState(() => new QueryClient(defaultQueryClientConfig))

  return (
    <MotionConfig
    // reducedMotion='user'
    >
      <DefaultSeo {...seoConfig} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider enableSystem enableColorScheme>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
            <ReactQueryDevtools
              closeButtonProps={{
                className: "!btn !btn-ghost !normal-case",
              }}
            />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
      <Analytics />
    </MotionConfig>
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