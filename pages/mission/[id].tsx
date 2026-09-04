import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { TbBrandTwitter } from "react-icons/tb"
import { ImWikipedia } from "react-icons/im"
import { FiExternalLink } from "react-icons/fi"

import Layout from "components/Layout";
import type { Missions as IMissions } from "types/missions";
import { getMission, getMissions, missionsKeys } from "lib/missions";
import Loader from "components/LoadingSpinner";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await getMissions();
    return {
      paths: (data || []).map((m) => ({
        params: { id: m.mission_id || "unknown" },
      })),
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<MissionProps> = async ({ params }) => {
  const id = params!.id as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: missionsKeys.mission(id),
    queryFn: getMission,
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      missionID: id,
    },
  }
}

type MissionProps = { dehydratedState: DehydratedState; missionID: string }

const Mission: NextPage<MissionProps> = props => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: missionsKeys.mission(props.missionID),
    queryFn: getMission,
  })

  if (isSuccess) {
    return (
      <Layout title={data.mission_name} description={data.description}>
        <div className='dark:prose-invert container mx-auto prose space-y-8'>
          <p className='wrap-break-word text-ellipsis'>{data.description}</p>

          <div className='btn-group'>
            {data.twitter && (
              <a href={data.twitter} className='btn btn-primary'>
                <TbBrandTwitter
                  title={`${data.mission_name} twitter account`}
                  className='size-5'
                />
              </a>
            )}
            <a href={data.wikipedia} className='btn btn-primary'>
              <ImWikipedia
                title={`${data.mission_name} wikipedia article`}
                className='size-5'
              />
            </a>
            <a href={data.website} className='btn btn-primary'>
              <FiExternalLink title={data.mission_name} className='size-5' />
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
