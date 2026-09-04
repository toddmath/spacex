import type { FC, PropsWithChildren } from "react";
import Image from "next/image";

import bg from "@/public/static/image/launch.jpg";

type HeroProps = PropsWithChildren<{
  title: string;
  summary: string;
}>;

const Hero: FC<HeroProps> = ({ title, summary, children }) => {
  return (
    <div className="hero h-screen -mt-16">
      <figure className="w-full h-full max-h-screen object-cover">
        <Image
          src={bg}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          placeholder="blur"
          alt="rocket ship launching during daytime"
          className="w-full h-full object-cover object-[25%_25%]"
        />
      </figure>
      <div className="bg-primary/10 hero-overlay mix-blend-screen" />

      <div className="glass text-accent-content prose prose-xl hero-content block text-center max-w-lg rounded-box md:p-6 lg:p-8 depth">
        <h1 className="text-accent-content">{title}</h1>
        <p>{summary}</p>
        {children}
      </div>
    </div>
  );
};

export default Hero;
