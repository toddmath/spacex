import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { Suspense } from "react"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import Link from "next/link"

import Layout from "components/Layout"
import { getMissions, missionsKeys, useMissionsQuery } from "lib/missions"
import { TbBrandTwitter, TbExternalLink } from "react-icons/tb"
import { MdReadMore } from "react-icons/md"
import { FaWikipediaW } from "react-icons/fa"
import Loader from "components/LoadingSpinner"
import MissionCard from "components/MissionCard"
// import LongText from "components/LongText"
// import SocialLinks from "components/SocialLinks"
// import { ImWikipedia } from "react-icons/im"
// import { BiDetail } from "react-icons/bi"

export const getStaticProps: GetStaticProps<MissionProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(missionsKeys.all, getMissions)
  return {
    props: { dehydrated: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

type MissionProps = { dehydrated: DehydratedState }

const Missions: NextPage = () => {
  const { data, isLoading, isSuccess } = useMissionsQuery()

  if (isSuccess) {
    return (
      <Suspense fallback={<Loader />}>
        <Layout
          title='All Missions'
          description='List of every mission, both completed and upcoming.'
        >
          <div className='container max-w-5xl w-fit mx-auto'>
            <ol
              aria-label='missions'
              className='grid grid-cols-1 md:grid-cols-2 gap-8'
            >
              {data.map(m => (
                <MissionCard key={m.mission_id} data={m} />
              ))}
            </ol>
          </div>
        </Layout>
      </Suspense>
    )
  }

  if (isLoading) {
    return (
      <Layout title='All Missions' description='Loading missions data...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default Missions

// {data.map(mission => (
//   <li
//     key={mission.mission_id}
//     className='flex-1 basis-72 w-full prose dark:prose-invert list-none m-0 bg-gray-200 dark:bg-gray-800 dark:text-gray-50 text-gray-900 px-6 py-4 rounded-lg shadow'
//   >
//     <section className='group m-0 p-0'>
//       <header className='focus-visible:outline-none'>
//         <Link href={`/mission/${mission.mission_id}`}>
//           <a className='focus-visible:outline-none no-underline'>
//             <h3 className='subtitle m-0 p-0 w-fit'>
//               {mission.mission_name}
//             </h3>
//           </a>
//         </Link>
//       </header>

//       <LongText text={mission.description} maxLength={MAX_LENGTH} />

//       <SocialLinks
//         twitter={mission.twitter ?? undefined}
//         name={mission.mission_name}
//         wikipedia={mission.wikipedia}
//         website={mission.website}
//       />
//     </section>
//   </li>
// ))}
