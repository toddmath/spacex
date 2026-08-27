import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
// import Image from "next/image"
// import Link from "next/link"
import { RxRocket } from "react-icons/rx";
import { IoRocketSharp, IoRocket } from "react-icons/io5";
import { ImEarth } from "react-icons/im";

// import Carousel from "nuka-carousel"
import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import { getRoadster, roadsterKey } from "lib/roadster";
import DataViewer from "components/DataViewer";
// import FullScreenLayout from "components/FullScreenLayout"
// import { Suspense } from "react"

export const getStaticProps: GetStaticProps<RoadsterProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: roadsterKey,
    queryFn: getRoadster,
  });
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  };
};

type RoadsterProps = { dehydrated: DehydratedState };

// TODO: finish refactoring this page

const Roadster: NextPage = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: roadsterKey,
    queryFn: getRoadster,
    notifyOnChangeProps: ["isLoading", "isSuccess", "data"],
  });

  if (isSuccess) {
    return (
      <Layout
        title={data.name}
        description={data.details}
        ogImages={data.flickr_images.map((src) => ({
          url: src,
          width: 1024,
          height: 576,
          alt: "Elon Musk's Telsa roadster in space",
        }))}
      >
        <div className="container prose mx-auto">
          <p>{data.details}</p>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <IoRocketSharp className="inline-block h-8 w-8 stroke-current" />
              </div>
              <div className="stat-title">Launch Mass</div>
              <div className="stat-value text-primary">
                {data.launch_mass_kg} kg
              </div>
              <div className="stat-desc">Or {data.launch_mass_lbs} lbs</div>
            </div>

            <div className="stat">
              <div className="stat-title">Speed</div>
              <div className="stat-value text-secondary">
                {~~data.speed_kph} kph
              </div>
              <div className="stat-desc">Or {~~data.speed_mph} mph</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <ImEarth className="inline-block h-8 w-8 stroke-current" />
              </div>
              <div className="stat-title">Distance</div>
              <div className="stat-value text-primary">
                {data.earth_distance_km.toLocaleString("en-US")} km
              </div>
              <div className="stat-desc">
                Or {data.earth_distance_mi.toLocaleString("en-US")} miles
              </div>
            </div>
          </div>

          {/* <pre>
            <code>{data.video}</code>
          </pre> */}
          <DataViewer data={data as Record<string, any>} />
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title="Elon Musk's Tesla Roadster">
        <Loader className="h-1/2 w-1/2" />
      </Layout>
    );
  }

  return null;
};

/*
! NOTE: unfinished:
if (isSuccess) {
    return (
      <div className="relative -mt-16 w-full bg-base-100 text-base-content">
        <div
          className="sticky top-0 mt-16 h-[50vh] w-full bg-fixed bg-no-repeat"
          style={{
            backgroundImage: `url(${data.flickr_images[1]})`,
            backgroundSize: "100% auto",
            backgroundPosition: "left top",
          }}
        />
        <Layout
          title={data.name}
          description={data.details}
          ogImages={data.flickr_images.map((src) => ({
            url: src,
            width: 1024,
            height: 576,
            alt: "Elon Musk's Telsa roadster in space",
          }))}
        >
          <div className="container mx-auto lg:max-w-4xl">
            <p>{data.details}</p>
          </div>
        </Layout>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Layout title="Elon Musk's Tesla Roadster">
        <Loader className="h-1/2 w-1/2" />
      </Layout>
    );
  }

  return null;
*/

/*
<figure
  // className='w-full h-auto min-h-full object-cover'
  className='w-full h-auto max-h-80 mt-16 sticky top-0'
>
  <Image
    src={data.flickr_images[0]}
    alt="Elon Musk's Telsa roadset in space"
    // fill
    height={320}
    width={1000}
    sizes='100vw'
    // className='w-full h-full object-cover bg-fixed'
    className='w-full max-h-full object-cover bg-fixed'
  />
</figure>
*/

/*
<Layout
  title={data.name}
  description={data.details}
  ogImages={data.flickr_images.map(src => ({
    url: src,
    width: 1024,
    height: 576,
    alt: "Elon Musk's Telsa roadster in space",
  }))}
>
  <div className='container lg:max-w-4xl mx-auto'>
    <p className='lg:max-w-prose mx-auto text-base leading-relaxed text-base-content'>
      {data.details}
    </p>

    <div className='mt-10 not-prose carousel w-full carousel-center max-w-5xl p-4 space-x-4 bg-neutral rounded-box shadow'>
      {data.flickr_images.map((src, i) => (
        <div
          key={src}
          id={`img-${i}`}
          className='carousel-item w-full object-cover relative'
        >
          <Image
            src={src}
            alt=''
            width={1024}
            height={576}
            priority={i === 0 ? true : false}
            loading={i === 0 ? "eager" : "lazy"}
            className='w-full h-full object-cover rounded-box'
          />
        </div>
      ))}
    </div>
    <div className='py-2 flex justify-center'>
      <div className='btn-group shadow'>
        {Array.from({ length: data.flickr_images.length }, (_, i) => i).map(
          n => (
            <Link key={`link-${n}`} href={`#img-${n}`} className='btn btn-sm'>
              {n + 1}
            </Link>
          )
        )}
      </div>
    </div>
  </div>
</Layout>
*/

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

export default Roadster;
