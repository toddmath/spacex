import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import Launch from "components/Launch";
import { getNextLaunches, launchesKeys } from "lib/launches";

type LaunchesProps = { dehydratedState: DehydratedState };

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: launchesKeys.next,
    queryFn: getNextLaunches,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

const NextLaunch: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: launchesKeys.next,
    queryFn: getNextLaunches,
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  });

  return (
    <Layout title="Next Launch" description="Next planned launch.">
      {isLoading && <Loader />}
      {isSuccess && <Launch data={data} />}
    </Layout>
  );
};

export default NextLaunch;
