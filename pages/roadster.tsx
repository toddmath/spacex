import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Image from "next/image"

import Carousel from "nuka-carousel"
import Layout from "components/Layout"
import { getRoadster, roadsterKey } from "lib/roadster"
import Loader from "components/LoadingSpinner"
import Link from "next/link"

export const getStaticProps: GetStaticProps<RoadsterProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(roadsterKey, getRoadster)
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  }
}

type RoadsterProps = { dehydrated: DehydratedState }

const Roadster: NextPage = () => {
  const { data, isLoading, isSuccess } = useQuery(roadsterKey, getRoadster)
  // const [index, setIndex] = useState(0)

  if (isSuccess) {
    return (
      <Layout title={data.name} description={data.details}>
        <div className='prose dark:prose-invert container lg:max-w-4xl mx-auto'>
          <p className='lg:max-w-prose mx-auto'>{data.details}</p>

          <section>
            <h2>Images</h2>

            <div className='not-prose carousel w-full carousel-center max-w-5xl p-4 space-x-4 bg-neutral rounded-box shadow'>
              {data.flickr_images.map((src, i) => (
                <div
                  key={src}
                  id={`img-${i}`}
                  className='carousel-item w-full object-cover relative'
                >
                  <Image
                    src={src}
                    alt=''
                    // fill
                    width={1024}
                    height={576}
                    loading='lazy'
                    className='w-full h-full object-cover rounded-box'
                  />
                </div>
              ))}
            </div>
            <div className='py-2 flex justify-center'>
              <div className='btn-group shadow'>
                {Array.from({ length: data.flickr_images.length }, (_, i) => i).map(
                  n => (
                    <Link
                      key={`link-${n}`}
                      href={`#img-${n}`}
                      className='btn btn-sm'
                    >
                      {n + 1}
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout description='Loading roadster data...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

/*
<ul className='not-prose p-0 m-0 rounded-box'>
  {data.flickr_images.map(src => (
    <li key={src} className='list-none overflow-hidden object-cover'>
      <Image
        src={src}
        alt=''
        width={800}
        height={600}
        loading='lazy'
        className='w-full h-auto'
      />
    </li>
  ))}
</ul>
*/

/*
<Carousel
  adaptiveHeight
  wrapAround={true}
  autoplay={true}
  defaultControlsConfig={{
    pagingDotsContainerClassName:
      "btn-group not-prose p-3 bg-neutral text-neutral-content rounded-box",
    pagingDotsStyle: {
      fill: "currentcolor",
    },
    pagingDotsClassName:
      "bg-neutral text-neutral-content btn btn-sm fill-current",
    nextButtonText: "❯",
    prevButtonText: "❮",
    nextButtonClassName:
      "bg-neutral text-neutral-content btn btn-circle",
    prevButtonClassName:
      "bg-neutral text-neutral content btn btn-circle",
  }}
  className='rounded-box shadow-xl'
  >
  {data.flickr_images.map(src => (
    <Image
      key={src}
      src={src}
      alt=''
      width={1200}
      height={600}
      className='m-0 p-0 w-full'
    />
  ))}
  </Carousel>
*/

export default Roadster
