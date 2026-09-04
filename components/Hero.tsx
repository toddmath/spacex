import type { FC, PropsWithChildren } from "react";
import Image from "next/image";

import bg from "@/public/static/image/launch.jpg";

type HeroProps = PropsWithChildren<{
  title: string;
  summary: string;
}>;

const Hero: FC<HeroProps> = ({ title, summary, children }) => {
  return (
    <div className="hero -mt-16 h-screen">
      <figure className="size-full max-h-screen object-cover">
        <Image
          src={bg}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          placeholder="blur"
          alt="rocket ship launching during daytime"
          className="size-full object-cover object-[25%_25%]"
        />
      </figure>
      <div className="hero-overlay bg-primary/10 mix-blend-screen" />

      <div className="prose-xl depth hero-content prose block max-w-lg rounded-box glass text-center text-accent-content md:p-6 lg:p-8">
        <h1 className="text-accent-content">{title}</h1>
        <p>{summary}</p>
        {children}
      </div>
    </div>
  );
};

export default Hero;
