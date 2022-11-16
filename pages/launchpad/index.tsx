import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import cn from "classnames"


import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import Card from "components/Card"
import { getAllLaunchPads, launchPadKeys } from "lib/launchPads"

type LaunchPadProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchPadProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchPadKeys.all, getAllLaunchPads)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

const LaunchPads: NextPage<LaunchPadProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(
    launchPadKeys.all,
    getAllLaunchPads,
    {
      notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
    }
  )

  if (isSuccess) {
    const ogImages = data
      .map(({ images, full_name }) =>
        images.large.map(url => ({ url, alt: full_name }))
      )
      .flat(2)

    return (
      <Layout
        title='Launchpads'
        description='List of all rocket launchpads used by SpaceX.'
        ogImages={ogImages}
      >
        <div className='mx-auto container lg:max-w-6xl space-y-10'>
          <ul
            className={cn(
              "group w-full h-full snap-mandatory snap-y",
              "grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))]"
              // "flex flex-wrap gap-6"
              // "grid grid-cols-1 sm:grid-cols-2 gap-6"
            )}
          >
            {data.map(pad => (
              <li key={pad.id} className='w-full list-none p-0 m-0'>
                <Card
                  title={pad.full_name}
                  image={pad.images.large[0]}
                  className='border-4 border-primary'
                  // title={
                  //   <Fragment>
                  //     {pad.full_name}
                  //     <span className='badge badge-lg capitalize'>{pad.status}</span>
                  //   </Fragment>
                  // }
                  // aria-label={pad.full_name}
                >
                  <div className='flex flex-wrap gap-2'>
                    <p className='badge badge-primary flex-shrink flex-grow-0 w-fit'>
                      {pad.locality}
                    </p>
                    <p className='badge badge-primary flex-shrink flex-grow-0 w-fit'>
                      {pad.region}
                    </p>
                    <p className='badge badge-primary flex-shrink flex-grow-0 w-fit'>
                      Status:&nbsp;{pad.status}
                    </p>
                    {/* <p className='badge badge-secondary flex-shrink flex-grow-0 w-fit'>
                      Attempts:&nbsp;{pad.launch_attempts}
                    </p>
                    <p className='badge badge-secondary flex-shrink flex-grow-0 w-fit'>
                      Success&apos;s:&nbsp;{pad.launch_successes}
                    </p> */}
                  </div>

                  <p className='w-full max-w-[50ch] mx-auto'>{pad.details}</p>

                  {/* <footer className='card-actions'> */}
                  <footer className='stats stats-vertical @md/card:stats-horizontal mx-auto max-w-[50ch] w-full shadow bg-primary text-primary-content'>
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
                    {/* <div className='stat'>
                      <div className='stat-title'>Latitude</div>
                      <div className='stat-value text-2xl @lg/card:text-3xl'>
                        {pad.latitude}
                      </div>
                    </div>
                    <div className='stat'>
                      <div className='stat-title'>Longitude</div>
                      <div className='stat-value text-2xl @lg/card:text-3xl'>
                        {pad.longitude}
                      </div>
                    </div> */}
                  </footer>
                  {/* </footer> */}
                </Card>
              </li>
            ))}
          </ul>

          <div className='prose dark:prose-invert mx-auto'>
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </div>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Launchpads' description='Loading launchpads...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

/*
{data.map(pad => (
  <li
    key={pad.id}
    className='flex-grow flex-shrink basis-[35ch] card bg-base-200 btext-base-content image-full shadow-xl relative'
  >
    <figure className='relative'>
      <Image
        src={pad.images.large[0]}
        alt=''
        fill
        sizes='(max-width: 640px) 600px, 60vw'
      />
    </figure>
    <div className='card-body'>
      <h3 className='card-title'>{pad.full_name}</h3>
      <p>{pad.details}</p>
    </div>
  </li>
))}
*/

export default LaunchPads
