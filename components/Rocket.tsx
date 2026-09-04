import Link from "next/link";
import { useRef } from "react";

import type { Rocket as IRocket } from "types/rockets";
import TiltCard from "components/TiltCard";

type RocketProps = { data: IRocket };

const Rocket: React.FC<RocketProps> = ({ data }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      href={`/rocket/${encodeURIComponent(data.id)}`}
      className="block no-underline"
      ref={ref}
    >
      <TiltCard
        imgSrc={data.flickr_images?.[1] ?? data.flickr_images?.[0] ?? ""}
        className="smol-card-component overflow-hidden rounded-box"
      >
        <header className="mx-auto w-full rounded-t-box bg-linear-to-b from-neutral/40 to-neutral/60 py-3 text-center text-neutral-content mix-blend-hard-light backdrop-blur-sm focus-visible:outline-none">
          <h3 className="m-0 p-0 text-center text-3xl font-bold text-neutral-content uppercase">
            {data.name}
          </h3>
        </header>
        <p className="m-0 overflow-hidden rounded-b-box bg-linear-to-b from-neutral/60 to-neutral/80 px-6 pt-3 pb-6 text-neutral-content mix-blend-hard-light backdrop-blur-sm">
          {data.description}
        </p>
      </TiltCard>
    </Link>
  );
};

export default Rocket;
