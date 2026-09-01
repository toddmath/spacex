import type { GetStaticProps, NextPage } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import RocketSection from "components/RocketSection";
import DataViewer from "components/DataViewer";
import FullScreenLayout from "components/FullScreenLayout";
import { getRockets, rocketKeys } from "lib/rockets";

export const getStaticProps: GetStaticProps<RocketProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: rocketKeys.all,
    queryFn: getRockets,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

type RocketProps = { dehydratedState: DehydratedState };

const Rockets: NextPage<RocketProps> = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: rocketKeys.all,
    queryFn: getRockets,
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  });

  if (isLoading) {
    return (
      <Layout title="Rockets" description="SpaceX Rockets.">
        <Loader />
      </Layout>
    );
  }

  if (isSuccess) {
    data.reverse();

    return (
      <div className="my-16">
        <FullScreenLayout
          title="Rockets"
          description="SpaceX Rockets."
          ogImages={data.flatMap((r) =>
            r.flickr_images.map((url) => ({ url, alt: r.name })),
          )}
        >
          <motion.ol
            role="list"
            className="relative m-0 w-full snap-y snap-mandatory p-0"
            layout
          >
            {data.map((rocket, i) => (
              <RocketSection key={rocket.id} index={i} {...rocket} />
            ))}
          </motion.ol>

          <DataViewer data={data} />
        </FullScreenLayout>
      </div>
    );
  }

  return null;
};

export default Rockets;
