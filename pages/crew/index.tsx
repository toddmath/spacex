import type { NextPage, GetStaticProps } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { AnimatePresence, LayoutGroup } from "framer-motion";

import Layout from "components/Layout";
import Loader from "components/LoadingSpinner";
import { getAllCrew, crewKeys } from "lib/crew";
import Card from "components/Card";

type CrewProps = { dehydratedState: DehydratedState };

export const getStaticProps: GetStaticProps<CrewProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(crewKeys.all, getAllCrew);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  };
};

// TODO: create page for individual crew member (by id)

const CrewPage: NextPage<CrewProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(crewKeys.all, getAllCrew, {
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  });

  if (isSuccess) {
    return (
      <Layout title="Crew" description="All SpaceX crew members.">
        <ul
          role="list"
          className="container mx-auto grid list-none grid-cols-1 gap-6 md:gap-8 lg:max-w-5xl lg:grid-cols-2"
        >
          <LayoutGroup id="crew">
            {data.map((member) => (
              <Card
                key={member.id}
                // title={<CrewTitle name={member.name} badge={member.agency} />}
                title={member.name}
                image={member.image}
                wrapperClassName="w-full h-full rounded-box @container/wrapper"
                imageClassName="object-[50%_25%]"
                className="[aspect-ratio:3/4] @xs/wrapper:[aspect-ratio:3/4] @sm/wrapper:[aspect-ratio:3/4] @md/wrapper:[aspect-ratio:1/1] @lg/wrapper:[aspect-ratio:3/2]"
              >
                <div className="stats mx-auto mt-auto w-fit bg-primary text-primary-content shadow">
                  <div className="stat">
                    <div className="stat-title">Agency</div>
                    <div className="stat-value">{member.agency}</div>
                    <div className="stat-desc capitalize">
                      Status: {member.status}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Launches</div>
                    <div className="stat-value">{member.launches.length}</div>
                  </div>
                </div>
              </Card>
            ))}
          </LayoutGroup>
        </ul>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title="Crew" description="All SpaceX crew members.">
        <Loader />
      </Layout>
    );
  }

  return null;
};

/*
{data.map(member => (
  <li
    key={member.id}
    className='card image-full shadow-xl w-full h-full [aspect-ratio:1/1] rounded-box'
  >
    <figure>
      <Image
        src={member.image}
        fill
        className='w-full h-auto object-cover overflow-hidden'
        alt=''
      />
    </figure>
    <div className='card-body'>
      <h2 className='card-title'>{member.name}</h2>
    </div>
  </li>
))}
*/

export default CrewPage;
