import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Img from "next/image"
// import { useState } from "react"
// import Link from "next/link"

import Carousel from "nuka-carousel"
import Layout from "components/Layout"
import { getRoadster, roadsterKey } from "lib/roadster"
import Loader from "components/LoadingSpinner"

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

  if (isLoading) {
    return (
      <Layout description='Loading roadster data...'>
        <Loader />
      </Layout>
    )
  }

  if (isSuccess) {
    return (
      <Layout title={data.name} description={data.details}>
        <div className='prose dark:prose-invert mx-auto'>
          <p className=''>{data.details}</p>

          <section>
            <h3>Images</h3>
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
                <Img
                  key={src}
                  src={src}
                  alt=''
                  width={1200}
                  height={600}
                  className='m-0 p-0 w-full'
                />
              ))}
            </Carousel>

            {/* <div className='rounded-box relative'>
              <div className='carousel rounded-box'>
                {imgs.map((src, i) => (
                  <div
                    key={src}
                    id={`item${i + 1}`}
                    className='carousel-item w-full'
                  >
                    <Img
                      src={src}
                      alt=''
                      width={1200}
                      height={800}
                      className='m-0 p-0 object-cover w-full h-auto'
                    />
                  </div>
                ))}
                <div
                  className='flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'
                >
                  <a
                    href={`#item${index - 1 < 1 ? imgs.length : index - 1}`}
                    className='btn btn-circle absolute top-1/2 left-0 -translate-y-1/2 transition duration-200'
                    onClick={() => setIndex(index - 1 < 1 ? imgs.length : index - 1)}
                  >
                    ❮
                  </a>
                  <a
                    href={`#item${index + 1 > imgs.length ? 1 : index + 1}`}
                    className='btn btn-circle absolute top-1/2 right-0 -translate-y-1/2 transition duration-200'
                    onClick={() => setIndex(index + 1 > imgs.length ? 1 : index + 1)}
                  >
                    ❯
                  </a>
                </div>
              </div>
            </div> */}

            {/* <div className='flex justify-center w-full py-2 gap-2'>
              {Array.from({ length: imgs.length }, (_, i) => i + 1).map(n => (
                <a
                  href={`#item${n}`}
                  key={`btn-item${n}`}
                  className='btn btn-xs'
                  onClick={() => setIndex(n)}
                >
                  {n}
                </a>
              ))}
            </div> */}
          </section>
        </div>
      </Layout>
    )
  }

  return null
}

export default Roadster
