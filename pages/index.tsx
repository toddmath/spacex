import type { GetStaticProps, NextPage } from "next";
import type { DehydratedState } from "@tanstack/react-query";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";

import Hero from "components/Hero";
import FullScreenLayout from "components/FullScreenLayout";
import { getCompanyInfo, companyInfoKey } from "lib/companyInfo";
import { description } from "@/next-seo.config";

type HomeProps = { dehydrated: DehydratedState };

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(companyInfoKey, getCompanyInfo);
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  };
};

const Home: NextPage<HomeProps> = () => {
  const { data, isSuccess } = useQuery(companyInfoKey, getCompanyInfo, {
    select: (company) => ({
      title: company.name,
      summary: company.summary,
    }),
    notifyOnChangeProps: ["isSuccess", "data"],
  });

  return (
    <FullScreenLayout className="h-screen" description={description}>
      {isSuccess ? (
        <Hero title={data.title} summary={data.summary} />
      ) : (
        <div className="-mt-16 grid min-h-full w-full place-items-center">
          <VscLoading className="h-1/4 w-1/4 animate-spin text-current opacity-40" />
        </div>
      )}
    </FullScreenLayout>
  );

  // if (isSuccess) {
  //   return (
  //     <FullScreenLayout className='-mt-16' description={description}>
  //       <Hero title={data.title} summary={data.summary} />
  //     </FullScreenLayout>
  //   )
  // }
  // if (isLoading) return <Layout description={description} />
  // return null

  // return (
  //   <Suspense fallback={<Loader />}>
  //     <FullScreenLayout className='-mt-16' description={description}>
  //       {data ? <Hero title={data.title} summary={data.summary} /> : <Loader />}
  //     </FullScreenLayout>
  //   </Suspense>
  // )
};

export default Home;
