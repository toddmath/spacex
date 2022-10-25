import type { NextPage, GetStaticProps, GetServerSideProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { Suspense } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Link from "next/link"

import Layout from "components/Layout"
import { getMissions, missionsKeys } from "lib/missions"
import { TbBrandTwitter, TbExternalLink } from "react-icons/tb"
import { MdReadMore } from "react-icons/md"
import { FaWikipediaW } from "react-icons/fa"
// import LongText from "components/LongText"
// import SocialLinks from "components/SocialLinks"
// import { ImWikipedia } from "react-icons/im"
// import { BiDetail } from "react-icons/bi"

export const getServerSideProps: GetServerSideProps<MissionProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(missionsKeys.all, getMissions)
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  }
}

type MissionProps = { dehydrated: DehydratedState }

// const MAX_LENGTH = 150

const Missions: NextPage = () => {
  const { data, isLoading, isSuccess } = useQuery(missionsKeys.all, getMissions, {
    staleTime: 1000 * 60 * 30,
  })

  if (isLoading) {
    return (
      <Layout title='All Missions' description='Loading missions data...'></Layout>
    )
  }

  if (isSuccess) {
    return (
      <Suspense fallback={null}>
        <Layout
          title='All Missions'
          description='List of every mission, both completed and upcoming.'
        >
          <div className='container max-w-5xl w-fit mx-auto'>
            <ol
              // className='flex flex-wrap flex-row gap-6 m-0 p-0'
              className='grid grid-cols-1 md:grid-cols-2 gap-8'
            >
              {data.map(m => (
                <li
                  key={m.mission_id}
                  className='card bg-base-300 text-base-content w-full shadow-xl'
                >
                  <div className='card-body w-full'>
                    <h3 className='card-title'>{m.mission_name}</h3>
                    <p className='line-clamp-6'>{m.description}</p>
                    <div className='card-actions justify-end mt-6'>
                      <div className='inline-flex border-primary border-2 rounded-btn overflow-hidden'>
                        <Link href={`/mission/${m.mission_id}`}>
                          <a className='btn text-lg btn-primary btn-outline border-none btn-square rounded-none'>
                            <MdReadMore
                              title='read more details'
                              className='w-5 h-5'
                            />
                          </a>
                        </Link>
                        {m.twitter ? (
                          <a
                            href={m.twitter}
                            className='btn text-lg btn-primary btn-outline border-none btn-square rounded-none'
                          >
                            <TbBrandTwitter title='twitter' className='w-5 h-5' />
                          </a>
                        ) : null}
                        <a
                          href={m.wikipedia}
                          className='btn text-lg btn-primary btn-outline border-none btn-square rounded-none'
                        >
                          <FaWikipediaW title='wikipedia' className='w-5 h-5' />
                        </a>
                        <a
                          href={m.website}
                          className='btn text-lg btn-primary btn-outline border-none btn-square rounded-none'
                        >
                          <TbExternalLink
                            title='external page'
                            className='w-5 h-5'
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* <div className='prose mx-auto'>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div> */}
        </Layout>
      </Suspense>
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
