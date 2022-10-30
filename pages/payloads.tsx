import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient } from "@tanstack/react-query"

import type { Payload as IPayload } from "types/payloads"
import Layout from "components/Layout"
import PayloadCard from "components/PayloadCard"
import Loader from "components/LoadingSpinner"
import {
  getSlimPayloads,
  payloadKeys,
  useSlimPayloadsQuery,
} from "lib/payloads"

export const getStaticProps: GetStaticProps<PayloadsProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(payloadKeys.slim, getSlimPayloads)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

type PayloadsProps = { dehydratedState: DehydratedState }

export type SlimPayload = Omit<IPayload, "norad_ids" | "launch" | "dragon">

const Payloads: NextPage = () => {
  const { data, isLoading, isSuccess } = useSlimPayloadsQuery()

  if (isSuccess) {
    return (
      <Layout title='Payloads' description='List of every payload.'>
        <ol
          aria-label='payloads'
          className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min grid-flow-dense container mx-auto lg:max-w-6xl'
        >
          {data.map(payload => (
            <PayloadCard payload={payload} key={payload.id} />
          ))}
        </ol>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Payloads' description='Loading list of all payloads.'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default Payloads