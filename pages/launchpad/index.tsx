import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

import Layout from "components/Layout"
import { getAllLaunchPads, launchPadKeys } from "lib/launchPads"

type LaunchPadProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchPadProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchPadKeys.all, getAllLaunchPads)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const LaunchPads: NextPage<LaunchPadProps> = () => {
  const { data, isSuccess } = useQuery(launchPadKeys.all, getAllLaunchPads)

  if (!isSuccess) {
    return (
      <Layout
        title='Error loading launch pad data'
        description='Cannot load launch pads at this time'
      >
        <h1>Error</h1>
      </Layout>
    )
  }

  return (
    <Layout title='Launch Pads' description='List of all spacex launch pads'>
      <div className='container prose dark:prose-invert mx-auto'>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </Layout>
  )
}

export default LaunchPads
