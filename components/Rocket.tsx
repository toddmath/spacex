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
        className="smol-card-component rounded-box overflow-hidden"
      >
        <header className="rounded-t-box mx-auto w-full bg-linear-to-b from-neutral/40 to-neutral/60 py-3 text-center text-neutral-content mix-blend-hard-light backdrop-blur-sm focus-visible:outline-none">
          <h3 className="m-0 p-0 text-center text-3xl font-bold uppercase text-neutral-content">
            {data.name}
          </h3>
        </header>
        <p className="rounded-b-box m-0 overflow-hidden bg-linear-to-b from-neutral/60 to-neutral/80 px-6 pb-6 pt-3 text-neutral-content mix-blend-hard-light backdrop-blur-sm">
          {data.description}
        </p>
      </TiltCard>
    </Link>
  );
};

export default Rocket;
