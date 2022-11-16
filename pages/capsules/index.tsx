import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { Suspense } from "react"

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

/* [grid-template-columns:repeat(auto-fit,minmax(min(100%,40ch),1fr))] */

const Capsules: NextPage<CapsulesProps> = () => {
  const { data } = useQuery(allCapsulesKey, getCapsules, {
    suspense: true,
  })

  return (
    <Suspense fallback={<Loader className='min-h-screen' />}>
      {data ? (
        <Layout
          title='Capsules'
          description='SpaceX capsules used for different missions.'
        >
          {/* <div className='w-full'> */}
          <ul className='mx-auto my-0 p-0 list-none grid grid-cols-[repeat(auto-fit,minmax(min(100%,theme(spacing.80)),1fr))] gap-8 w-full container lg:max-w-6xl'>
            {data.map(cap => (
              <li key={cap.id} className='flex relative w-full m-0 p-0'>
                <Card
                  title={cap.type}
                  className='transition border-4 border-primary hover:border-neutral focus-within:border-neutral shadow-xl'
                  tabIndex={0}
                >
                  <div className='prose dark:prose-invert flex flex-col h-full w-full items-between'>
                    {/* <h3>Last Update</h3> */}
                    <p className='w-full text-center'>{cap.last_update}</p>
                    {/* <span className='badge'>{cap.status}</span> */}
                    {/* <div className='mockup-code'>
                      <pre className='w-fit whitespace-pre-wrap break-normal font-mono'>
                        <code>{JSON.stringify(cap, null, 2)}</code>
                      </pre>
                    </div> */}
                    <div className='card-actions'>
                      <div className='transition-all shadow-inner stats auto-cols-fr overflow-x-hidden mx-auto w-full bg-primary text-primary-content text-center group-hover/card:bg-neutral group-hover/cards:text-neutral-content group-focus-within/card:bg-neutral group-focus-within/cards:text-neutral-content'>
                        <div className='stat place-items-center p-2 sm:p-3'>
                          <div className='stat-title'>Resued</div>
                          <div className='stat-value'>{cap.reuse_count}</div>
                          <div className='stat-desc'>Times</div>
                        </div>

                        <div className='stat place-items-center p-2 sm:p-3'>
                          <div className='stat-title'>Water</div>
                          <div className='stat-value'>{cap.water_landings}</div>
                          <div className='stat-desc'>Landings</div>
                        </div>

                        <div className='stat place-items-center p-2 sm:p-3'>
                          <div className='stat-title'>Land</div>
                          <div className='stat-value'>{cap.land_landings}</div>
                          <div className='stat-desc'>Landings</div>
                        </div>

                        {/* <div className='stat'>
                      <div className='stat-title'>Status</div>
                      <div className='stat-value'>{cap.status}</div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
          {/* </div> */}
        </Layout>
      ) : (
        <Loader />
      )}
    </Suspense>
  )
}

export default Capsules
