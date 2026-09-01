import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import Layout from "components/Layout";
import Launches from "components/Launches";
import Loader from "components/LoadingSpinner";
import { getUpcomingLaunches, launchesKeys } from "lib/launches";

type LaunchesProps = { dehydratedState: DehydratedState };

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: launchesKeys.upcoming,
    queryFn: getUpcomingLaunches,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

const UpcomingLaunches: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: launchesKeys.upcoming,
    queryFn: getUpcomingLaunches,
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  });

  return (
    <Layout
      title="Upcoming Launches"
      description="List of all upcoming launches."
    >
      {isLoading && <Loader />}
      {isSuccess && <Launches data={data} />}
    </Layout>
  );
};

export default UpcomingLaunches;
