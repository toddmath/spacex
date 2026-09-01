import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import Layout from "components/Layout";
import Launches from "components/Launches";
import Loader from "components/LoadingSpinner";
import { getPastLaunches, launchesKeys } from "lib/launches";

type LaunchesProps = { dehydratedState: DehydratedState };

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: launchesKeys.past,
    queryFn: getPastLaunches,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

const PastLaunches: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: launchesKeys.past,
    queryFn: getPastLaunches,
  });

  return (
    <Layout
      title="Past Launches"
      description="List of past launches, successes and failures."
    >
      {isLoading && <Loader />}
      {isSuccess && (
        <Launches data={data} showStatus={["all", "success", "failed"]} />
      )}
    </Layout>
  );
};

export default PastLaunches;
