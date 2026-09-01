import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { LayoutGroup } from "framer-motion";

import type { Payload as IPayload } from "types/payloads";
import Layout from "components/Layout";
import PayloadCard from "components/PayloadCard";
import Loader from "components/LoadingSpinner";
import {
  getSlimPayloads,
  payloadKeys,
  useSlimPayloadsQuery,
} from "lib/payloads";

export const getStaticProps: GetStaticProps<PayloadsProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: payloadKeys.slim,
    queryFn: getSlimPayloads,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

type PayloadsProps = { dehydratedState: DehydratedState };

export type SlimPayload = Omit<IPayload, "norad_ids" | "launch" | "dragon">;

const Payloads: NextPage<PayloadsProps> = () => {
  const { data, isLoading } = useSlimPayloadsQuery();

  return (
    <Layout title="Payloads" description="Every SpaceX payload.">
      {isLoading && <Loader />}
      <ol
        role="list"
        aria-label="payloads"
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min grid-flow-dense container mx-auto lg:max-w-6xl"
      >
        <LayoutGroup id="payloads">
          {data?.map((payload) => (
            <PayloadCard payload={payload} key={payload.id} />
          ))}
        </LayoutGroup>
      </ol>
    </Layout>
  );
};

export default Payloads;
