import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
// import cn from "classnames"

import Layout from "components/Layout"
import Launches from "components/Launches"
import Loader from "components/LoadingSpinner"
import { getAllLaunches, launchesKeys } from "lib/launches"
// import LaunchCard from "components/LaunchCard"

// export const getServerSideProps: GetServerSideProps<LaunchesProps> = async ({
//   res,
// }) => {
//   const queryClient = new QueryClient()
//   await queryClient.prefetchQuery(launchesKeys.all, getAllLaunches)
//   return { props: { dehydratedState: dehydrate(queryClient) } }
// }

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.all, getAllLaunches)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 1000 * 60 * 30,
  }
}

type LaunchesProps = { dehydratedState: DehydratedState }

const AllLaunches: NextPage<LaunchesProps> = () => {
  const { data, isLoading, isError } = useQuery(launchesKeys.all, getAllLaunches)

  if (isLoading) {
    return (
      <Layout
        title='All Launches'
        description='List of all launches, past and upcoming, successes and failures.'
      >
        <Loader />
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout
        title='Error loading launch data'
        description='Cannot load launch data at this time :('
      />
    )
  }

  return (
    <Layout
      title='All Launches'
      description='List of all launches, past and upcoming, successes and failures.'
    >
      <Launches data={data} />

      {/* <ol
        aria-label='Launches'
        className={cn(
          "group w-full h-full mx-auto snap-mandatory snap-y container lg:max-w-6xl",
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        )}
      >
        {data.map((launch, i) => (
          <LaunchCard {...launch} index={i} key={launch.id} />
        ))}
      </ol> */}
    </Layout>
  )
}

export default AllLaunches
