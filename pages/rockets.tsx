import type { GetStaticProps, NextPage } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import cn from "classnames";
import { AnimatePresence, LayoutGroup } from "framer-motion";
// import { Suspense } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import Tilt from "react-parallax-tilt"

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import { getRockets, rocketKeys } from "lib/rockets";
// import RocketCard from "components/RocketCard"
import RocketSection from "components/RocketSection";
import DataViewer from "components/DataViewer";
import FullScreenLayout from "../components/FullScreenLayout.jsx";

export const getStaticProps: GetStaticProps<RocketProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(rocketKeys.all, getRockets);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

type RocketProps = { dehydratedState: DehydratedState };

const Rockets: NextPage<RocketProps> = () => {
  const { data, isLoading, isSuccess } = useQuery(rocketKeys.all, getRockets, {
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  });

  if (isSuccess) {
    data.reverse();
    const ogImages = data.flatMap((r) =>
      r.flickr_images.map((url) => ({ url, alt: r.name }))
    );

    return (
      <div className="my-16">
        <FullScreenLayout
          title="Rockets"
          description="SpaceX Rockets."
          ogImages={ogImages}
        >
          <ol
            role="list"
            // className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))] gap-8 mx-auto container lg:max-w-5xl'
            className={cn(
              // "container lg:max-w-5xl mx-auto relative"
              "relative m-0 w-full snap-y snap-mandatory p-0"
            )}
          >
            <LayoutGroup id="rockets">
              {/* <AnimatePresence> */}
              {data.map((rocket, i) => (
                <RocketSection key={rocket.id} index={i} {...rocket} />
              ))}
              {/* </AnimatePresence> */}
            </LayoutGroup>
          </ol>

          <DataViewer data={data} />
        </FullScreenLayout>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Layout title="Rockets" description="SpaceX Rockets.">
        <Loader />
      </Layout>
    );
  }

  return null;
};

/*
 {data.map(rocket => (
    <RocketCard key={rocket.id} {...rocket} />
  ))}
*/

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

export default Rockets;
