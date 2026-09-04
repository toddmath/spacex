import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import bgUrl from "../public/static/image/starship_ship24-3840x2160.jpg";

const FourZeroFour: NextPage = () => {
  return (
    <div className="size-full object-cover">
      <picture className="filter block h-screen w-full bg-bottom brightness-75 saturate-150">
        <Image
          src={bgUrl}
          width={3840}
          height={2160}
          loading="lazy"
          placeholder="blur"
          alt="starship at starbase"
          className="block size-full object-cover"
        />
      </picture>

      <div className="absolute inset-0 flex size-full items-center justify-center">
        <div className="relative mx-auto self-center rounded-box bg-base-300/75 p-6 text-center text-base-content md:p-8">
          <h1 className="text-shadow relative font-sans text-9xl font-bold tracking-tighter [text-shadow:-8px_0_0_var(--color-indigo-600)]">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
          <p className="absolute top-2 -ml-12 translate-x-1/2 transform text-lg font-semibold md:top-4">
            Oops!
          </p>
          <h2 className="-mt-3 font-semibold capitalize">Page not found</h2>
          <p className="mt-2 mb-6">
            Sorry, but the page you requested was not found.
          </p>
          <Link href="/" className="rounded-btn btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FourZeroFour;
