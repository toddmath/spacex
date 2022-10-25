import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Image from "next/image"

import type {
  Diameter,
  Mass,
  Rockets as IRockets,
  Rocket as IRocket,
  FirstStage,
  Thrust,
  SecondStage,
  Engines,
  ISP,
} from "types/rockets"
import Layout from "components/Layout"
import { getRocket, rocketKeys } from "lib/rockets"
import Loader from "components/LoadingSpinner"
import Specs, { type SpecData } from "components/Specs"
import { is } from "lib/utils"

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/rockets")
  const data: IRockets = await res.json()

  return {
    paths: data.map(({ id }) => ({ params: { id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<RocketProps> = async ({ params }) => {
  const id = params!.id as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(rocketKeys.rocket(id), getRocket)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      rocketID: id,
    },
  }

  // const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
  // const data: IRocket = await res.json()
  // if (!res.ok) {
  //   throw new Error(
  //     `Failed to fetch rocket (id: ${id}), received status ${res.status}`
  //     )
  //   }
  //   // If the request was successful, return the posts and revalidate every 3600 seconds (1 hour).
  //   return {
  //     props: { data },
  //     revalidate: 3600,
  //   }
}

type RocketProps = {
  dehydratedState: DehydratedState
  rocketID: string
}

const Rocket: NextPage<RocketProps> = props => {
  const { data, isLoading, isSuccess } = useQuery(
    rocketKeys.rocket(props.rocketID),
    getRocket
  )

  if (isLoading) {
    return (
      <Layout title='' description='Loading rocket data...'>
        <Loader />
      </Layout>
    )
  }

  if (isSuccess) {
    const specs = Object.keys(data) as Array<keyof typeof data>

    const rocketSpecData = specs
      .filter(k => {
        return k === "height" || k === "diameter" || k === "mass"
      })
      .map(spec => {
        const value = data[spec]
        return {
          title: spec,
          description:
            spec === "diameter" || spec === "height"
              ? `${(value as Diameter).feet} ft or ${(value as Diameter).meters} m`
              : spec === "mass"
              ? `${(value as Mass).lb} lb or ${(value as Mass).kg} kg`
              : (value as string),
        }
      })

    const firstStageSpecData = (
      Object.keys(data.first_stage) as Array<keyof FirstStage>
    ).map(spec => {
      const value = data.first_stage[spec]
      return {
        title: spec.replaceAll("_", " "),
        description: is.number(value)
          ? value.toString()
          : is.boolean(value)
          ? value
            ? "True"
            : "False"
          : spec === "thrust_sea_level" || spec === "thrust_vacuum"
          ? `${(value as Thrust).kN} kN or ${(value as Thrust).lbf} lbf`
          : "",
      }
    })

    const secondStageSpecData: Array<SpecData> = (
      Object.keys(data.second_stage) as Array<keyof SecondStage>
    )
      .filter(k => k !== "payloads")
      .map(spec => {
        const value = data.second_stage[spec]
        return {
          title: spec.replaceAll("_", " "),
          description: is.number(value)
            ? value.toString()
            : is.boolean(value)
            ? value
              ? "True"
              : "False"
            : spec === "thrust"
            ? `${(value as Thrust).kN} kN or ${(value as Thrust).lbf} lbf`
            : "",
        }
      })

    secondStageSpecData.push({
      title: "payloads",
      description: (
        <ul
          role='list'
          className='divide-y divide-gray-200 rounded-md border border-gray-200'
        >
          <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
            <div className='flex w-0 flex-1 items-center'>Composite Fairing</div>
            <div className='ml-4 flex-shrink-0'>
              {data.second_stage.payloads.composite_fairing.diameter.feet} ft or{" "}
              {data.second_stage.payloads.composite_fairing.diameter.meters} m
            </div>
          </li>
          <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
            <div className='flex w-0 flex-1 items-center'>Option 1</div>
            <div className='ml-4 flex-shrink-0'>
              {data.second_stage.payloads.option_1}
            </div>
          </li>
        </ul>
      ),
    })

    const engineSpecData = (Object.keys(data.engines) as Array<keyof Engines>).map(
      spec => {
        const value = data.engines[spec]
        return {
          title: spec.replaceAll("_", " "),
          description: is.string(value)
            ? value
            : is.number(value)
            ? value.toString()
            : spec === "thrust_sea_level" || spec === "thrust_vacuum"
            ? `${(value as Thrust).kN} kN or ${(value as Thrust).lbf} lbf`
            : spec === "isp"
            ? `${(value as ISP).sea_level} sea level / ${
                (value as ISP).vacuum
              } vacuum`
            : "",
        }
      }
    )

    const payloadWeightSpecData = data.payload_weights

    return (
      <Layout title={data.name} description={data.description}>
        <div className='prose dark:prose-invert mx-auto container max-w-4xl'>
          <p className='max-w-prose mx-auto'>{data.description}</p>
          <h3>Images</h3>
          <div className='divider' />
          <ul className='not-prose m-0 p-0 list-none smol-flexbox-grid smol-aspect-ratio-gallery w-full h-auto max-w-5xl mx-auto rounded-md overflow-hidden shadow'>
            {data.flickr_images.map(img => (
              <li key={img}>
                <Image src={img} width={640} height={360} alt='' loading='lazy' />
              </li>
            ))}
          </ul>

          <section className='w-full p-0 m-0'>
            <h3>Specifications</h3>
            <div className='divider' />
            <div className='card shadow bg-base-300'>
              <Specs
                title='Dimensions'
                summary='Rocket details and specs'
                data={rocketSpecData}
              />
              <Specs
                title='First Stage'
                summary='First stage details and specs'
                data={firstStageSpecData}
              />
              <Specs
                title='Second Stage'
                summary='Second stage details and specs'
                data={secondStageSpecData}
              />
              <Specs
                title='Engines'
                summary='Engine details and specs'
                data={engineSpecData}
              />
              <Specs
                title='Payload Weights'
                summary='Various orbit payload weight details'
              >
                <table className='table-auto w-full text-left'>
                  <thead className='border-b'>
                    <tr className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-neutral text-neutral-content border-t first:border-none'>
                      <th>Orbit</th>
                      <th>Kg</th>
                      <th>Lb</th>
                    </tr>
                  </thead>
                  <tbody className='bg-neutral text-neutral-content'>
                    {payloadWeightSpecData.map(spec => (
                      <tr
                        key={spec.name}
                        className='text-sm px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-neutral text-neutral-content border-t first:border-none'
                      >
                        <td className='font-medium'>{spec.name}</td>
                        <td>{spec.kg}</td>
                        <td>{spec.lb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Specs>
            </div>
          </section>

          <div className='mt-14 mx-auto gap-y-4 md:gap-y-6 w-full'>
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </div>
      </Layout>
    )
  }

  return null
}

export default Rocket
