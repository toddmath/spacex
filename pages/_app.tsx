import '../styles/globals.css'
import type { QueryClientConfig } from "@tanstack/react-query"
import type { AppProps } from "next/app"
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
import { DefaultSeo } from "next-seo"

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

  return (
    <>
      <DefaultSeo {...seoConfig} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider enableSystem enableColorScheme>
            <Toaster />
            <NavBar />
            <Component {...pageProps} />
            <Footer />
            <ReactQueryDevtools />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
