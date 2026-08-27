import type { FC, ReactNode } from "react";
import type { OpenGraph, OpenGraphMedia } from "next-seo/pages";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import cn from "classnames";

// import Seo from "components/Seo"
import { defaultOgImages } from "@/next-seo.config";
import Header from "./Header";

// type LayoutProps = PropsWithChildren<{
// date?: string
// title?: string
// description?: string
// image?: string
// type?: string
// className?: string
// containerClassName?: string
// headerTag?: "h1" | "h2" | null
// }>

type FullScreenLayoutProps = {
  children: NonNullable<ReactNode>;
  className?: string;
  image?: string;
  description?: string;
  title?: string;
  ogImages?: OpenGraphMedia[];
};

const FullScreenLayout: FC<FullScreenLayoutProps> = ({
  children,
  image,
  className,
  description,
  title,
  ogImages,
}) => {
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

  const openGraph = { title, description, images } satisfies OpenGraph;

  return (
    <>
      <Head>
        {generateNextSeo({
          openGraph,
          description,
          title,
        })}
      </Head>
      {title ? <Header title={title} tag="h1" /> : null}
      <main id="skip" className={cn(className, "min-h-full w-screen p-0 m-0")}>
        {children}
      </main>
    </>
  );
};

export default FullScreenLayout;
