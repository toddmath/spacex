import type { FC, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { generateNextSeo, type OpenGraphMedia } from "next-seo/pages";

import Header from "components/Header";
import { defaultOgImages } from "@/next-seo.config";
import Head from "next/head";

type LayoutProps = PropsWithChildren<{
  date?: string;
  title?: string;
  description?: string;
  image?: string;
  ogImages?: OpenGraphMedia[];
  type?: string;
  className?: string;
  containerClassName?: string;
  headerTag?: "h1" | "h2" | null;
}>;

const spaceXDescription = "Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, Elon Musk's tesla roadster, company info, and more.";
const Layout: FC<LayoutProps> = ({
  headerTag = "h1",
  title = "SpaceX",
  className,
  containerClassName = "my-14",
  ogImages,
  image,
  description = spaceXDescription,
  children}) => {
  const router = useRouter();
  const url = `https://spacex-one.vercel.app${router.asPath}`;

  const imageType =
    image?.substring(image.lastIndexOf(".") + 1) === "jpg"
      ? "image/jpeg"
      : undefined;

  const images: OpenGraphMedia[] = image
    ? [
        {
          url: image,
          width: 800,
          height: 600,
          type: imageType,
        },
        ...(ogImages ?? []),
      ]
    : (ogImages ?? defaultOgImages);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: title === "SpaceX" ? undefined : title,
          description,
          canonical: url,
          openGraph: {
            title: title === "SpaceX" ? undefined : title,
            url,
            description,
            images,
          },
        })}
      </Head>
      <div
        className={cn(
          containerClassName,
          "relative w-full space-y-14 bg-base-100 text-base-content transition-colors",
        )}
      >
        {headerTag && <Header title={title} tag={headerTag} />}
        <main
          id="skip"
          className={cn(
            className,
            "flex h-full min-h-[70vh] flex-col items-start justify-start gap-y-14 bg-inherit px-8 text-inherit",
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
