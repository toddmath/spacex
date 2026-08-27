import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import { LayoutGroup, motion } from "framer-motion";

import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import { getCapsules, allCapsulesKey } from "lib/capsules"
import Card from "components/Card"

type CapsulesProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<CapsulesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(allCapsulesKey, getCapsules)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

/* grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))] */

const MotionCard = motion(Card);

const Capsules: NextPage<CapsulesProps> = () => {
  const { data } = useQuery(allCapsulesKey, getCapsules, {
    suspense: true,
  })

  return (
    <Suspense fallback={<Loader className="min-h-screen" />}>
      {data ? (
        <Layout
          title="Capsules"
          description="SpaceX capsules used for different missions."
        >
          {/* <div className='w-full'> */}
          <motion.ol
            role="list"
            layout
            className="container mx-auto my-0 grid w-full list-none grid-cols-[repeat(auto-fit,minmax(min(100%,--spacing(80)),1fr))] gap-8 p-0 lg:max-w-6xl"
          >
            <LayoutGroup id="capsules">
              {data.map((cap) => (
                <MotionCard
                  key={cap.id}
                  title={cap.type}
                  whileHover={{ scale: 1.1 }}
                  wrapperClassName="flex relative w-full m-0 p-0"
                  className="border border-primary shadow-xl transition focus-within:border-neutral hover:border-neutral"
                  tabIndex={0}
                >
                  <div className="items-between prose flex h-full w-full flex-col dark:prose-invert">
                    {/* <h3>Last Update</h3> */}
                    <p className="w-full text-center">{cap.last_update}</p>
                    {/* <span className='badge'>{cap.status}</span> */}
                    {/* <div className='mockup-code'>
                      <pre className='w-fit whitespace-pre-wrap break-normal font-mono'>
                        <code>{JSON.stringify(cap, null, 2)}</code>
                      </pre>
                    </div> */}
                    <div className="card-actions">
                      <div className="stats mx-auto w-full auto-cols-fr overflow-x-hidden bg-primary text-center text-primary-content shadow-inner transition-all group-focus-within/card:bg-neutral group-focus-within/cards:text-neutral-content group-hover/card:bg-neutral group-hover/cards:text-neutral-content">
                        <div className="stat place-items-center p-2 sm:p-3">
                          <div className="stat-title">Resued</div>
                          <div className="stat-value">{cap.reuse_count}</div>
                          <div className="stat-desc">Times</div>
                        </div>

                        <div className="stat place-items-center p-2 sm:p-3">
                          <div className="stat-title">Water</div>
                          <div className="stat-value">{cap.water_landings}</div>
                          <div className="stat-desc">Landings</div>
                        </div>

                        <div className="stat place-items-center p-2 sm:p-3">
                          <div className="stat-title">Land</div>
                          <div className="stat-value">{cap.land_landings}</div>
                          <div className="stat-desc">Landings</div>
                        </div>

                        {/* <div className='stat'>
                      <div className='stat-title'>Status</div>
                      <div className='stat-value'>{cap.status}</div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </MotionCard>
              ))}
            </LayoutGroup>
          </motion.ol>
          {/* </div> */}
        </Layout>
      ) : (
        <Loader />
      )}
    </Suspense>
  );
}

export default Capsules
