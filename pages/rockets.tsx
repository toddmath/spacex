import type { GetServerSideProps, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { Suspense } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Tilt from "react-parallax-tilt"

import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import { getRockets, rocketKeys } from "lib/rockets"
import Link from "next/link"
import RocketCard from "components/RocketCard"

export const getStaticProps: GetStaticProps<RocketProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(rocketKeys.all, getRockets)

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

type RocketProps = { dehydratedState: DehydratedState }

const Rockets: NextPage<RocketProps> = () => {
  const { data, isLoading, isSuccess } = useQuery(rocketKeys.all, getRockets, {
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  })

  if (isSuccess) {
    const ogImages = data.flatMap(r =>
      r.flickr_images.map(url => ({ url, alt: r.name }))
    )

    return (
      <Suspense fallback={<Loader />}>
        <Layout title='Rockets' description='SpaceX Rockets.' ogImages={ogImages}>
          <ol
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))] gap-8 mx-auto container lg:max-w-5xl"
            // className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mx-auto p-0 container lg:max-w-5xl'
          >
            {data.map(rocket => (
              <li key={rocket.id} className="w-full h-full">
                <RocketCard {...rocket} />
              </li>
            ))}
          </ol>

          <div className='mx-auto w-full mt-14 mockup-code container lg:max-w-5xl'>
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </Layout>
      </Suspense>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Rockets' description='Loading data for all rockets...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

/*
{data.map(rocket => (
  <li key={rocket.id} className='w-full h-full'>
    <Tilt
      tiltEnable
      perspective={500}
      style={{
        transformStyle: "preserve-3d",
      }}
      className='isolate bg-primary text-primary-content card image-full shadow-xl w-fit h-full bg-opacity-30'
    >
      <figure className='[transform:translateZ(0px)]'>
        <Image
          src={rocket.flickr_images[1]}
          alt=''
          width={1200}
          height={1200}
          priority
          quality={50}
          className='[transform:translateZ(0px)] w-full h-auto object-cover'
        />
      </figure>
      <div className='card-body [transform:translateZ(theme(spacing.20))] bg-primary text-primary-content bg-opacity-30 rounded-box'>
        <header className='card-title flex-1 basis-6'>
          <h3 className='text-2xl'>{rocket.name}</h3>
        </header>
        <p className='flex-1 basis-3/4'>{rocket.description}</p>
        <div className='card-actions justify-center'>
          <Link href={`/rocket/${rocket.id}`} className='btn'>
            Details
          </Link>
        </div>
      </div>
    </Tilt>
  </li>
))}
*/

export default Rockets
