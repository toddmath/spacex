import type { GetStaticProps, NextPage } from "next"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import type { DehydratedState } from "@tanstack/react-query"
// import Image from "next/future/image"

import Layout from "components/Layout"
import Hero from "components/Hero"
import FullScreenLayout from "components/FullScreenLayout"
import { getCompanyInfo, companyInfoKey } from "lib/companyInfo"

// import launchSrc from "public/static/image/launch.jpg"

type HomeProps = { dehydrated: DehydratedState }

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(companyInfoKey, getCompanyInfo)

  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  }
}

const Home: NextPage = () => {
  const { data, isError, isLoading } = useQuery(companyInfoKey, getCompanyInfo)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <Layout title='' description='Loading data...' />

  return (
    <FullScreenLayout className='-mt-16'>
      <Hero title={data.name} summary={data.summary} />
    </FullScreenLayout>
  )
}

export default Home
