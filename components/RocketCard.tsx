import type { FC } from "react";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { SiWikipedia } from "react-icons/si";

import type { Rocket as IRocket } from "types/rockets";
import Card from "components/Card";
import { prettierFmt } from "lib/utils";

type RocketCardProps = IRocket;

const RocketCard: FC<RocketCardProps> = ({
  name,
  flickr_images,
  description,
  payload_weights,
  cost_per_launch,
  wikipedia,
  id,
}) => {
  const leoWeight = payload_weights?.find(({ id }) => id === "leo")?.lb ?? 0;

  return (
    <Card
      title={name}
      image={flickr_images?.[1] ?? flickr_images?.[0] ?? ""}
      className="rounded-box border-4 border-accent"
      imageProps={{
        priority: true,
        sizes: "40vw",
        fill: true,
      }}
    >
      <p className="mx-auto max-w-[50ch] @md/card:my-2 @lg/card:text-lg">
        {description}
      </p>

      <div className="stats stats-vertical mx-auto w-fit max-w-[50ch] bg-neutral text-neutral-content shadow @md/card:my-2 @md/card:stats-horizontal @lg/card:my-4 sm:w-full">
        <div className="stat">
          <div className="stat-title">Payload</div>
          <div className="stat-value text-2xl @lg/card:text-3xl">
            {prettierFmt(leoWeight)}
            &nbsp;
            <abbr title="pounds" className="decoration-accent">
              Lb
            </abbr>
          </div>
          <div className="stat-desc">Low Earth Orbit</div>
        </div>
        <div className="stat">
          <div className="stat-title">Cost</div>
          <div className="stat-value text-2xl @lg/card:text-3xl">
            &#36;{prettierFmt(cost_per_launch)}
          </div>
          <div className="stat-desc">Per Launch</div>
        </div>
      </div>
      <div className="card-actions justify-end">
        <a href={wikipedia} className="btn-accent rounded-btn btn gap-2">
          <SiWikipedia title="Wikipedia" className="h-6 w-6" />
        </a>
        <Link
          href={`/rocket/${id}`}
          className="group/link btn-accent rounded-btn btn gap-2"
        >
          <BiRightArrowAlt
            title="Rocket details page"
            className="h-6 w-6 transition-all group-hover/link:animate-shake"
          />
        </Link>
      </div>
    </Card>
  );
};

export default RocketCard;
