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
  await queryClient.prefetchQuery({
    queryKey: companyInfoKey,
    queryFn: getCompanyInfo,
  });
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  };
};

const Home: NextPage<HomeProps> = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: companyInfoKey,
    queryFn: getCompanyInfo,
    select: (company) => ({
      title: company.name,
      summary: company.summary,
    }),
    notifyOnChangeProps: ["isSuccess", "isLoading", "data"],
  });

  return (
    <FullScreenLayout className="h-screen" description={description}>
      {isLoading && (
        <div className="-mt-16 grid min-h-full w-full place-items-center">
          <VscLoading className="h-1/4 w-1/4 animate-spin text-current opacity-40" />
        </div>
      )}
      {isSuccess && <Hero title={data.title} summary={data.summary} />}
    </FullScreenLayout>
  );
};

export default Home;
