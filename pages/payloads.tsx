import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { useMemo } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import cn from "classnames"
import { Card } from "flowbite-react"

import Layout from "components/Layout"
import { getPayloads, payloadKeys } from "lib/payloads"
import { Payload as IPayload } from "types/payloads"

export const getStaticProps: GetStaticProps<PayloadsProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(payloadKeys.all, getPayloads)
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  }
}

const filterStats = ([k, v]: [string, unknown]): boolean => {
  if (v == null || k === "dragon" || k === "id" || k === "name" || k === "launch")
    return false
  return Array.isArray(v) ? v.length > 0 : true
}

const mapStats = ([k, v]: [
  string,
  boolean | string | number | string[] | number[]
]) => {
  return [
    k.replaceAll("_", " "),
    (typeof v === "boolean"
      ? v
        ? "Yes"
        : "No"
      : Array.isArray(v)
      ? v.join(", ")
      : v?.toString() ?? ""
    ).replaceAll("-", " "),
    // .replace(/^([a-zA-Z]+?\d*?)(?:-)([a-zA-Z]+?\d*?)$/, "$1 $2"),
  ] as const
}

type PayloadsProps = { dehydrated: DehydratedState }

const Payloads: NextPage = () => {
  const { data, isLoading, isError } = useQuery(payloadKeys.all, getPayloads, {
    staleTime: 1000 * 60 * 30,
  })

  if (isLoading) return <Layout title='Loading payloads...' />
  if (isError) return <Layout title='Error loading payloads' />

  return (
    <Layout title='Payloads' description='List of every payload.'>
      {/* <div className='prose dark:prose-invert container mx-auto lg:max-w-6xl prose-li:list-none prose-h3:m-0'> */}
      <ol
        aria-label='Payloads'
        className='grid gap-y-5 gap-x-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto lg:max-w-6xl'
        // className='m-0 p-0 grid gap-y-5 gap-x-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      >
        {data.map(payload => (
          <li
            key={payload.id}
            aria-label={payload.name}
            className='card bg-neutral text-neutral-content shadow-lg w-full h-full'
          >
            <div className='card-body w-full'>
              <header className='card-title flex-wrap'>
                <h3>{payload.name}</h3>
              </header>
              {/* <div className='stats stats-vertical'> */}
              <ul>
                {Object.entries(payload)
                  .filter(filterStats)
                  .map(mapStats)
                  .map(([k, v]) => (
                    <li
                      key={payload.name + " " + k}
                      // className='stat'
                      className='flex gap-2 justify-between'
                    >
                      <strong className='capitalize'>{k}</strong>
                      {v}
                    </li>
                  ))}
              </ul>
            </div>
            {/* </div> */}
          </li>
        ))}
      </ol>
      {/* </div> */}
    </Layout>
  )
}

// {data.map(payload => (
//   <Payload key={payload.id} data={payload} />
// ))}
type PayloadProps = { data: IPayload }

const Payload: React.FC<PayloadProps> = ({ data }) => {
  const details = useMemo(
    () =>
      Object.entries(data)
        .filter(([k, v]) => {
          if (
            v == null ||
            k === "dragon" ||
            k === "id" ||
            k === "name" ||
            k === "launch"
          )
            return false
          return Array.isArray(v) ? v.length > 0 : true
        })
        .map(
          ([k, v]: [string, boolean | string | number | string[] | number[]]) =>
            ({
              label: k,
              value: (typeof v === "boolean"
                ? v
                  ? "Yes"
                  : "No"
                : Array.isArray(v)
                ? v.join(", ")
                : v?.toString() ?? ""
              ).replaceAll("-", " "),
              // .replace(/^([a-zA-Z]+?\d*?)(?:-)([a-zA-Z]+?\d*?)$/, "$1 $2"),
            } as const)
        ),
    [data]
  )

  return (
    <li
      key={data.id}
      aria-label={data.name}
      className={cn("group m-0 p-0", "payload-card")}
    >
      <Card>
        <h3 className='text-xl font-bold leading-none'>{data.name}</h3>
        <div className='flow-root'>
          <ul
            className='divide-y divide-gray-200 dark:divide-gray-700 m-0 p-0'
            aria-label='Details'
          >
            {details.map(({ label, value }) => (
              <CardListItem
                key={label}
                label={label.replaceAll(
                  /([a-zA-Z]+?\d*?)(?:_)([a-zA-Z]+?\d*?)/g,
                  "$1 $2"
                )}
                text={value}
              />
            ))}
          </ul>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <Link href={`/launch/${data.launch}`}>
            <a className='no-underline transition-colors hover:text-sky-700'>
              Launch &rarr;
            </a>
          </Link>
        </div>
      </Card>
    </li>
  )
}

export default Payloads

type CardListItemProps = {
  label: string
  text: string
}

const CardListItem: React.FC<CardListItemProps> = ({ label, text }) => {
  return (
    <li className='py-3 sm:py-4 px-0 m-0' aria-label={label}>
      <div className='flex items-center space-x-4'>
        {/* <p className='shrink-0 m-0 p-0'>
          <strong>{label}:</strong>&nbsp;{text}
        </p> */}
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium text-gray-900 dark:text-gray-50 m-0 p-0'>
            {label}
          </p>
        </div>
        <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-50'>
          {text}
        </div>
      </div>
    </li>
  )
}
