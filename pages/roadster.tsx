import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { IoRocketSharp } from "react-icons/io5";
import { ImEarth } from "react-icons/im";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import { getRoadster, roadsterKey } from "lib/roadster";
import DataViewer from "components/DataViewer";

export const getStaticProps: GetStaticProps<RoadsterProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: roadsterKey,
    queryFn: getRoadster,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

type RoadsterProps = { dehydratedState: DehydratedState };

const Roadster: NextPage<RoadsterProps> = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: roadsterKey,
    queryFn: getRoadster,
    notifyOnChangeProps: ["isLoading", "isSuccess", "data"],
  });

  if (isLoading) {
    return (
      <Layout title="Elon Musk's Tesla Roadster">
        <Loader className="size-1/2" />
      </Layout>
    );
  }

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
        <div className="container mx-auto prose">
          <p>{data.details}</p>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <IoRocketSharp className="inline-block size-8 stroke-current" />
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
                <ImEarth className="inline-block size-8 stroke-current" />
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

          <DataViewer data={Object.values(data)} />
        </div>
      </Layout>
    );
  }
};

export default Roadster;
