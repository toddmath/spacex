import type { FC } from "react";
import Link from "next/link";

import { TbBrandTwitter, TbExternalLink } from "react-icons/tb";
import { MdReadMore } from "react-icons/md";
import { FaWikipediaW } from "react-icons/fa";
import type { Mission as IMission } from "types/missions";

type MissionCardProps = { data: IMission };

const MissionCard: FC<MissionCardProps> = ({ data }) => (
  <li
    role="listitem"
    key={data.mission_id}
    aria-label={data.mission_name}
    className="card-bordered card w-full border-4 border-primary bg-base-200 text-base-content shadow-xl"
  >
    <article className="card-body w-full" aria-label={data.mission_name}>
      <header className="card-title">
        <h3 className="w-full text-center text-2xl text-base-content">
          {data.mission_name}
        </h3>
      </header>

      <p className="line-clamp-6">{data.description}</p>

      <footer className="mt-6 card-actions justify-end">
        <div className="rounded-btn inline-flex overflow-hidden border-2 border-secondary shadow">
          <Link
            href={`/mission/${encodeURIComponent(data.mission_id)}`}
            className="btn btn-square rounded-none border-none btn-outline text-lg btn-secondary"
          >
            <MdReadMore title="read more details" className="size-5" />
          </Link>
          {data.twitter && (
            <a
              href={data.twitter}
              className="btn btn-square rounded-none border-none btn-outline text-lg btn-secondary"
            >
              <TbBrandTwitter title="twitter" className="size-5" />
            </a>
          )}
          <a
            href={data.wikipedia}
            className="btn btn-square rounded-none border-none btn-outline text-lg btn-secondary"
          >
            <FaWikipediaW title="wikipedia" className="size-5" />
          </a>
          <a
            href={data.website}
            className="btn btn-square rounded-none border-none btn-outline text-lg btn-secondary"
          >
            <TbExternalLink title="external page" className="size-5" />
          </a>
        </div>
      </footer>
    </article>
  </li>
);

export default MissionCard;
