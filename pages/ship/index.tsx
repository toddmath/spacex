import type { NextPage, GetStaticProps } from "next";
import type { ImageProps } from "next/image";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
// import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import { getAllShips, shipKeys } from "lib/ship";
import DataViewer from "components/DataViewer";
import ShipCard from "components/ShipCard";

type ShipProps = { dehydratedState: DehydratedState };

export const getStaticProps: GetStaticProps<ShipProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: shipKeys.all,
    queryFn: getAllShips,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

const defaultImageProps = {
  fill: true,
  sizes: "50vw",
  loading: "lazy",
  decoding: "async",
} as ImageProps;

const ShipPage: NextPage<ShipProps> = () => {
  const { data, isLoading } = useQuery({
    queryKey: shipKeys.all,
    queryFn: getAllShips,
    notifyOnChangeProps: ["data", "isLoading"],
  });

  if (isLoading) {
    return (
      <Layout title="Ships" description="All SpaceX ships.">
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout title="Ships" description="All SpaceX ships.">
      <ul
        role="list"
        className="container lg:max-w-5xl mx-auto list-none grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
      >
        {data?.map((ship, i) => (
          <ShipCard
            key={ship.id}
            cardKey={ship.id}
            wrapperClassName="w-full h-full rounded-box @container/wrapper"
            ship={ship}
            imageProps={{
              priority: i <= 2,
              loading: i > 2 ? "lazy" : "eager",
              ...defaultImageProps,
            }}
          />
        ))}
      </ul>

      {data && <DataViewer data={data} />}
    </Layout>
  );
};

export default ShipPage;
