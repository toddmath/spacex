import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

import Layout from "components/Layout"
import Launches from "components/Launches"
import Loader from "components/LoadingSpinner"
import { getUpcomingLaunches, launchesKeys } from "lib/launches"
// import LaunchCard from "components/LaunchCard"

type LaunchesProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.upcoming, getUpcomingLaunches)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 1000 * 60 * 30,
  }
}

const UpcomingLaunches: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(
    launchesKeys.upcoming,
    getUpcomingLaunches
  )

  if (isLoading) {
    return (
      <Layout title='Upcoming Launches' description='List of upcoming launches.'>
        <Loader />
      </Layout>
    )
  }

  if (isSuccess) {
    return (
      <Layout title='Upcoming Launches' description='List of all upcoming launches.'>
        <Launches data={data} />

        {/* <ol className='w-full h-full mx-auto px-2 md:px-0 flex flex-col flex-wrap items-start justify-start gap-y-8 snap-mandatory snap-y container max-w-5xl'>
          {data.map((props, i) => (
            <LaunchCard key={props.id} index={i} {...props} />
          ))}
        </ol> */}
      </Layout>
    )
  }

  return null
}

export default UpcomingLaunches
