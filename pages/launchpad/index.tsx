import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import cn from "classnames"

import Layout from "components/Layout"
import { getAllLaunchPads, launchPadKeys } from "lib/launchPads"
import Loader from "components/LoadingSpinner"
import Image from "next/image"

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
      .map(pad => pad.images.large.map(url => ({ url, alt: pad.full_name })))
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
              "flex flex-wrap gap-6"
              // "grid grid-cols-1 sm:grid-cols-2 gap-6"
            )}
          >
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

export default LaunchPads
