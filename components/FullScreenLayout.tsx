import type { FC, ReactNode } from "react";
import type { OpenGraph, OpenGraphMedia } from "next-seo/pages";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import cn from "classnames";

import { defaultOgImages } from "@/next-seo.config";
import Header from "./Header";

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
      {title && <Header title={title} tag="h1" />}
      <main id="skip" className={cn(className, "m-0 min-h-full w-screen p-0")}>
        {children}
      </main>
    </>
  );
};

export default FullScreenLayout;
