import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { TbBrandTwitter } from "react-icons/tb"
import { ImWikipedia } from "react-icons/im"
import { FiExternalLink } from "react-icons/fi"

import Layout from "components/Layout"
import type { Missions as IMissions } from "types/missions"
import { getMission, missionsKeys } from "lib/missions"

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://api.spacexdata.com/v3/missions")
  const data: IMissions = await res.json()
  return {
    paths: data.map(({ mission_id }) => ({ params: { id: mission_id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<MissionProps> = async ({ params }) => {
  const id = params!.id as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(missionsKeys.mission(id), getMission)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      missionID: id,
    },
  }
  // const res = await fetch(`https://api.spacexdata.com/v3/missions/${id}`)
  // const data: IMission = await res.json()
  // if (!res.ok) {
  //   throw new Error(
  //     `Failed to fetch mission (id: ${id}), received status ${res.status}`
  //   )
  // }
  // return {
  //   props: { data },
  //   revalidate: 3600,
  // }
}

type MissionProps = { dehydratedState: DehydratedState; missionID: string }

const Mission: NextPage<MissionProps> = props => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    missionsKeys.mission(props.missionID),
    getMission,
    { staleTime: 1000 * 60 * 30 }
  )

  if (isError) {
    return (
      <Layout title='' description='Error loading mission data.'>
        Error Loading mission data :(
      </Layout>
    )
  }

  if (isLoading) {
    return <Layout title='' description='Loading mission data...'></Layout>
  }

  if (isSuccess) {
    return (
      <Layout title={data.mission_name} description={data.description}>
        <div className='container max-2-6xl mx-auto prose dark:prose-invert'>
          <p className='text-ellipsis break-words'>{data.description}</p>

          <ul className='flex gap-4'>
            {data.twitter && (
              <li className='m-0 p-0 list-none focus:outline-none bg-gray-100 dark:bg-gray-800 ring-emerald-500 focus:ring-2 focus-within:ring-2  rounded-full hover:ring-2 shadow-inner'>
                <a
                  href={data.twitter}
                  className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
                >
                  <TbBrandTwitter
                    title={`${data.mission_name} twitter account`}
                    className='p-3 w-11 h-11'
                  />
                </a>
              </li>
            )}
            <li className='m-0 p-0 list-none focus:outline-none hover:outline-none bg-gray-100 dark:bg-gray-800 ring-emerald-500 focus:ring-2 focus-within:ring-2 rounded-full hover:ring-2 shadow-inner'>
              <a
                href={data.wikipedia}
                className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
              >
                <ImWikipedia
                  title={`${data.mission_name} wikipedia article`}
                  className='p-3 w-11 h-11'
                />
              </a>
            </li>
            <li className='m-0 p-0 list-none focus:outline-none hover:outline-none bg-gray-100 dark:bg-gray-800 ring-emerald-500 focus:ring-2 focus-within:ring-2 rounded-full hover:ring-2 shadow-inner'>
              <a
                href={data.website}
                className='text-gray-900 dark:text-gray-100 rounded-full focus:outline-none hover:outline-none'
              >
                <FiExternalLink
                  title={data.mission_name}
                  className='p-3 w-11 h-11'
                />
              </a>
            </li>
          </ul>

          {/* <div className='mx-auto'>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div> */}
        </div>
      </Layout>
    )
  }

  return null
}

export default Mission
