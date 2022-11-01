import type { GetStaticProps, NextPage } from "next"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import type { DehydratedState } from "@tanstack/react-query"
// import Image from "next/image"

import Layout from "components/Layout"
import Hero from "components/Hero"
import FullScreenLayout from "components/FullScreenLayout"
import { getCompanyInfo, companyInfoKey } from "lib/companyInfo"

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
  const { data, isSuccess, isLoading } = useQuery(companyInfoKey, getCompanyInfo, {
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
    select: info => ({
      title: info.name,
      summary: info.summary,
    }),
  })

  if (isSuccess) {
    return (
      <FullScreenLayout
        className='-mt-16'
        description="Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, launchpads, Elon Musk's tesla roadster, company info, and more."
      >
        <Hero title={data.title} summary={data.summary} />
      </FullScreenLayout>
    )
  }

  if (isLoading) return <Layout title='' description='Loading data...' />

  return null
}

export default Home
