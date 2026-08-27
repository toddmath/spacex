import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import cn from "classnames";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import Card from "components/Card";
import DataViewer from "components/DataViewer";
import { getAllLaunchPads, launchPadKeys } from "lib/launchPads";

type LaunchPadProps = { dehydratedState: DehydratedState };

export const getStaticProps: GetStaticProps<LaunchPadProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(launchPadKeys.all, getAllLaunchPads);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

const MotionCard = motion(Card);

const LaunchPads: NextPage<LaunchPadProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(
    launchPadKeys.all,
    getAllLaunchPads,
    {
      notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
    }
  );

  if (isSuccess) {
    const ogImages = data
      .map(({ images, full_name }) =>
        images.large.map((url) => ({ url, alt: full_name }))
      )
      .flat(2);

    return (
      <Layout
        title="Launchpads"
        description="All SpaceX rocket launchpads."
        ogImages={ogImages}
      >
        <div className="container mx-auto space-y-10 lg:max-w-6xl">
          <motion.ul
            role="list"
            className={cn(
              "group h-full w-full snap-y snap-mandatory",
              "grid grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))] gap-8"
            )}
          >
            {data.map((pad) => (
              <MotionCard
                // cardKey={pad.id}
                layoutId={pad.id}
                layout
                key={pad.id}
                title={pad.full_name}
                image={pad.images.large[0]}
                className="border-4 border-primary"
                // wrapperClassName="w-full list-none p-0 m-0"
                // title={
                //   <Fragment>
                //     {pad.full_name}
                //     <span className='badge badge-lg capitalize'>{pad.status}</span>
                //   </Fragment>
                // }
                // aria-label={pad.full_name}
              >
                <div className="flex flex-wrap gap-2">
                  <p className="badge-primary badge w-fit shrink grow-0">
                    {pad.locality}
                  </p>
                  <p className="badge-primary badge w-fit shrink grow-0">
                    {pad.region}
                  </p>
                  <p className="badge-primary badge w-fit shrink grow-0">
                    Status:&nbsp;{pad.status}
                  </p>
                  {/* <p className='badge badge-secondary shrink grow-0 w-fit'>
                      Attempts:&nbsp;{pad.launch_attempts}
                    </p>
                    <p className='badge badge-secondary shrink grow-0 w-fit'>
                      Success&apos;s:&nbsp;{pad.launch_successes}
                    </p> */}
                </div>

                <p className="mx-auto w-full max-w-[50ch]">{pad.details}</p>

                {/* <footer className='card-actions'> */}
                <footer className="stats stats-vertical mx-auto w-full max-w-[50ch] bg-primary text-primary-content shadow @md/card:stats-horizontal">
                  <div className="stat place-items-center">
                    <div className="stat-title">Attempts</div>
                    <div className="stat-value text-2xl @lg/card:text-3xl">
                      {pad.launch_attempts}
                    </div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title">Success&apos;s</div>
                    <div className="stat-value text-2xl @lg/card:text-3xl">
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
              </MotionCard>
            ))}
          </motion.ul>

          <DataViewer data={data} />
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title="Launchpads" description="Loading launchpads...">
        <Loader />
      </Layout>
    );
  }

  return null;
};

/*
{data.map(pad => (
  <li
    key={pad.id}
    className='grow shrink basis-[35ch] card bg-base-200 btext-base-content image-full shadow-xl relative'
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
