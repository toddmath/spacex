import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { TbBrandTwitter } from "react-icons/tb"
import { ImWikipedia } from "react-icons/im"
import { FiExternalLink } from "react-icons/fi"

import Layout from "components/Layout"
import type { Missions as IMissions } from "types/missions"
import { getMission, missionsKeys } from "lib/missions"
import Loader from "components/LoadingSpinner"

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
}

type MissionProps = { dehydratedState: DehydratedState; missionID: string }

const Mission: NextPage<MissionProps> = props => {
  const { data, isLoading, isSuccess } = useQuery(
    missionsKeys.mission(props.missionID),
    getMission
  )

  if (isSuccess) {
    return (
      <Layout title={data.mission_name} description={data.description}>
        <div className='container mx-auto prose dark:prose-invert space-y-8'>
          <p className='text-ellipsis break-words'>{data.description}</p>

          <div className='btn-group'>
            {data.twitter && (
              <a href={data.twitter} className='btn btn-primary'>
                <TbBrandTwitter
                  title={`${data.mission_name} twitter account`}
                  className='w-5 h-5'
                />
              </a>
            )}
            <a href={data.wikipedia} className='btn btn-primary'>
              <ImWikipedia
                title={`${data.mission_name} wikipedia article`}
                className='w-5 h-5'
              />
            </a>
            <a href={data.website} className='btn btn-primary'>
              <FiExternalLink title={data.mission_name} className='w-5 h-5' />
            </a>
          </div>
        </div>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='' description='Loading mission data...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default Mission
