import type { FC } from "react";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import cn from "classnames";
import dynamic from "next/dynamic";

import type { Launch as ILaunch } from "types/launches";
import TimeBadge from "components/TimeBadge";
// import { formatDate } from "lib/date";
// import YoutubePlayer from "components/YoutubePlayer";
// import Video from "./Video";
// import YouTube from "react-youtube";

const YouTube = dynamic(() => import("./Video"));

type LaunchProps = {
  data: ILaunch;
};

const Launch: FC<LaunchProps> = ({ data }) => {
  const success = data.success ?? data.failures.length === 0;
  const patchSrc = data.links.patch.small ?? data.links.patch.large;

  return (
    <div className="prose mx-auto w-full max-w-6xl space-y-20 dark:prose-invert">
      <div className="container mx-auto flex w-full max-w-prose flex-col items-center justify-between gap-6 sm:flex-row sm:flex-wrap">
        <p className="m-0 w-full self-end p-0 text-lg">
          Launched:&nbsp;
          <TimeBadge
            time={data.date_utc}
            success={success}
            size="md"
            className="font-bold"
          />
        </p>

        {patchSrc || data.details ? (
          <div className="m-0 block w-full p-0">
            {patchSrc ? (
              <>
                <Image
                  src={patchSrc}
                  alt={`${data.name} patch`}
                  width={224}
                  height={224}
                  sizes="screen and (min-width: 40em) 400px, (min-width: 60em) 200px"
                  crossOrigin="anonymous"
                  referrerPolicy="same-origin"
                  loading="lazy"
                  placeholder="empty"
                  decoding="async"
                  quality={75}
                  style={{
                    shapeOutside: `url('/_next/image?url=${encodeURI(
                      patchSrc,
                    )}&w=3840&q=75')`,
                    shapeImageThreshold: "0.8",
                    shapeMargin: "0.7rem",
                  }}
                  className={cn("mx-auto h-full max-w-sm p-0", {
                    "mt-0 mb-4 sm:float-left sm:my-0 sm:mx-0 sm:pr-2":
                      data.details,
                    "my-0 block w-full": !data.details,
                  })}
                />
                {data.details && <p className="m-0 block">{data.details}</p>}
              </>
            ) : data.details ? (
              <p className="m-0 block">{data.details}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <section
        className="container mx-auto w-full lg:max-w-5xl"
        aria-label="Media"
      >
        <header className="mb-6">
          <h2 className="border-b border-accent">Media</h2>
        </header>

        {data.links.youtube_id ? (
          <div className="container mx-auto h-auto w-full overflow-hidden rounded-lg object-cover shadow-lg lg:max-w-5xl">
            <div className="w-full object-cover aspect-video">
              <YouTube
                videoid={data.links.youtube_id}
                title={"Play launch video of " + data.name}
              />
            </div>
          </div>
        ) : null}

        {data.links.flickr.original.length ? (
          <div className="not-prose mx-auto mt-12 w-full max-w-5xl shadow-lg aspect-video">
            <Carousel slideInterval={5000} slide={false}>
              {data.links.flickr.original.map((src, i) => (
                <Image
                  key={`carousel-image-${i}`}
                  src={src}
                  alt=""
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="not-prose m-0 block h-full w-full object-cover object-center"
                />
              ))}
            </Carousel>
          </div>
        ) : null}
      </section>

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Launch;

/*
<p
  className={cn("badge gap-1", {
    "badge-success": success,
    "badge-error": !success,
  })}
>
  Launched
  <time dateTime={data.date_utc} className="inline-block">
    {formatDate(data.date_utc)}
  </time>
</p>
*/

// <div className="container mx-auto h-auto w-full overflow-hidden rounded-lg object-cover shadow-lg lg:max-w-5xl">
//   <YoutubePlayer
//     videoId={data.links.youtube_id}
//     title={`${data.name} launch video`}
//     className='aspect-video w-full object-cover'
//     iframeClassName='object-cover w-full h-full'
//   />
// </div>
