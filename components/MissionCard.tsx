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

      <footer className="card-actions mt-6 justify-end">
        <div className="rounded-btn inline-flex overflow-hidden border-2 border-secondary shadow">
          <Link
            href={`/mission/${encodeURIComponent(data.mission_id)}`}
            className="btn-outline btn-secondary btn-square btn rounded-none border-none text-lg"
          >
            <MdReadMore title="read more details" className="h-5 w-5" />
          </Link>
          {data.twitter && (
            <a
              href={data.twitter}
              className="btn-outline btn-secondary btn-square btn rounded-none border-none text-lg"
            >
              <TbBrandTwitter title="twitter" className="h-5 w-5" />
            </a>
          )}
          <a
            href={data.wikipedia}
            className="btn-outline btn-secondary btn-square btn rounded-none border-none text-lg"
          >
            <FaWikipediaW title="wikipedia" className="h-5 w-5" />
          </a>
          <a
            href={data.website}
            className="btn-outline btn-secondary btn-square btn rounded-none border-none text-lg"
          >
            <TbExternalLink title="external page" className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </article>
  </li>
);

export default MissionCard;
