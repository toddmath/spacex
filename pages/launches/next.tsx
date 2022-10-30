import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import Launch from "components/Launch"
import { getNextLaunches, launchesKeys } from "lib/launches"

type LaunchesProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.next, getNextLaunches)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

const NextLaunch: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(launchesKeys.next, getNextLaunches)

  if (isSuccess) {
    return (
      <Layout title='Next Launch' description='Next planned launch.'>
        <Launch data={data} />
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Next Launch' description='Loading next launch data...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default NextLaunch
