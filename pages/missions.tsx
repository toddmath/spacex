import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import MissionCard from "components/MissionCard";
import { getMissions, missionsKeys, useMissionsQuery } from "lib/missions";

export const getStaticProps: GetStaticProps<MissionProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: missionsKeys.all,
    queryFn: getMissions,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

type MissionProps = { dehydratedState: DehydratedState };

const Missions: NextPage<MissionProps> = () => {
  const { data, isLoading } = useMissionsQuery();

  return (
    <Layout
      title="All Missions"
      description="List of every mission, both completed and upcoming."
    >
      {isLoading && <Loader />}
      <div className="container mx-auto w-fit max-w-5xl">
        <ol
          role="list"
          aria-label="missions"
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {data?.map((m) => (
            <MissionCard key={m.mission_id} data={m} />
          ))}
        </ol>
      </div>
    </Layout>
  );
};

export default Missions;
