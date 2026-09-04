import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"

import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import Card from "components/Card"
import DataViewer from "components/DataViewer"
import { getAllLaunchPads, launchPadKeys } from "lib/launchPads"

type LaunchPadProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchPadProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: launchPadKeys.all,
    queryFn: getAllLaunchPads,
  })
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

const MotionCard = motion.create(Card)

const LaunchPads: NextPage<LaunchPadProps> = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: launchPadKeys.all,
    queryFn: getAllLaunchPads,
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  })

  if (isLoading) {
    return (
      <Layout title='Launchpads' description='Loading launchpads...'>
        <Loader />
      </Layout>
    )
  }

  if (isSuccess) {
    return (
      <Layout
        title="Launchpads"
        description="All SpaceX rocket launchpads."
        ogImages={data.flatMap(({ images, full_name }) =>
          (images?.large || []).map((url) => ({ url, alt: full_name })),
        )}
      >
        <div className='container mx-auto space-y-10 lg:max-w-6xl'>
          <motion.ul
            role='list'
            className='group h-full w-full snap-y snap-mandatory grid grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))] gap-8'
            layout
          >
            {data.map(pad => (
              <MotionCard
                layoutId={pad.id}
                layout
                key={pad.id}
                title={pad.full_name}
                image={pad.images.large[0]}
                className='border-4 border-primary'
              >
                <div className='flex flex-wrap gap-2'>
                  <p className='badge-primary badge w-fit shrink grow-0'>
                    {pad.locality}
                  </p>
                  <p className='badge-primary badge w-fit shrink grow-0'>
                    {pad.region}
                  </p>
                  <p className='badge-primary badge w-fit shrink grow-0'>
                    Status:&nbsp;{pad.status}
                  </p>
                </div>

                <p className='mx-auto w-full max-w-[50ch]'>{pad.details}</p>

                <footer className='stats stats-vertical mx-auto w-full max-w-[50ch] bg-primary text-primary-content shadow @md/card:stats-horizontal'>
                  <div className='stat place-items-center'>
                    <div className='stat-title'>Attempts</div>
                    <div className='stat-value text-2xl @lg/card:text-3xl'>
                      {pad.launch_attempts}
                    </div>
                  </div>
                  <div className='stat place-items-center'>
                    <div className='stat-title'>Success&apos;s</div>
                    <div className='stat-value text-2xl @lg/card:text-3xl'>
                      {pad.launch_successes}
                    </div>
                  </div>
                </footer>
              </MotionCard>
            ))}
          </motion.ul>

          <DataViewer data={data} />
        </div>
      </Layout>
    )
  }

  return null
}

export default LaunchPads
