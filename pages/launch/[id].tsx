import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import Launch from "components/Launch";
import { getLaunch, getAllLaunches, launchesKeys } from "lib/launches";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery({
      queryKey: launchesKeys.all,
      queryFn: getAllLaunches,
    });
    return {
      paths: (data || []).map(({ id }) => ({ params: { id } })),
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<LaunchProps> = async ({
  params,
}) => {
  const id = params!.id as string;
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: launchesKeys.launch(id),
      queryFn: getLaunch,
    });
  } catch {
    return { notFound: true };
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      launchID: id,
    },
    revalidate: 60 * 30,
  };
};

type LaunchProps = {
  dehydratedState: DehydratedState;
  launchID: string;
};

const LaunchPage: NextPage<LaunchProps> = (props) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: launchesKeys.launch(props.launchID),
    queryFn: getLaunch,
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  });

  if (isLoading) {
    return (
      <Layout title="" description="Loading launch data...">
        <Loader />
      </Layout>
    );
  }

  if (isSuccess && data) {
    const ogImages = (data.links?.flickr?.original || []).map((url) => ({
      url,
      alt: data.name,
    }));

    if (data.links?.patch?.large) {
      ogImages.unshift({
        url: data.links.patch.large,
        alt: `${data.name} mission patch`,
      });
    }

    return (
      <Layout
        title={data.name}
        description={data.details ?? undefined}
        ogImages={ogImages}
      >
        <Launch data={data} />
      </Layout>
    );
  }

  return null;
};

export default LaunchPage;
