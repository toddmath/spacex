import type {
  PropsWithChildren,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { useRef, forwardRef } from "react";
import Image, { type ImageProps } from "next/image";
import cn from "classnames";
import { motion, useScroll } from "framer-motion";

import { is } from "lib/utils";
// import { useParallax } from "lib/useParallax";

type CardProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "title" | "event" | "definition"
> &
  PropsWithChildren<{
    title: NonNullable<ReactNode>;
    image?: string;
    imageProps?: Partial<Omit<ImageProps, "src">>;
    imageClassName?: string;
    className?: string;
  }>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      image,
      title,
      className,
      imageClassName,
      imageProps = {
        fill: true,
        sizes: "50vw",
        loading: "lazy",
        decoding: "async",
      },
      ...props
    },
    ref
  ) => {
    const cardTitle = is.string(title) ? title : undefined;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.33 }}
        viewport={{ amount: "some" }}
        className="h-full @container/card"
      >
        <section
          aria-label={cardTitle}
          className={cn(
            className,
            "group/card card card-compact isolate h-full overflow-hidden shadow-xl @md/card:card-normal",
            {
              "bg-base-100 @xs/card:image-full @sm/card:image-full @md/card:flex @md/card:card-side":
                image,
              "bg-neutral text-neutral-content": !image,
            }
          )}
          {...props}
        >
          {image && image !== "" ? (
            <figure className="relative items-stretch rounded-none object-cover">
              <Image
                src={image}
                alt={cardTitle ?? ""}
                className={cn(
                  imageClassName,
                  "@xs/card:w-full @xs/card:rounded-none @xs/card:object-cover"
                )}
                loading={imageProps.priority ? "eager" : "lazy"}
                {...imageProps}
              />
            </figure>
          ) : null}
          <motion.div className="card-body @md/card:gap-3 @lg/card:gap-4 @lg/card:text-lg">
            <header className="flex flex-wrap items-center text-center">
              <motion.h2 className="card-title mx-auto flex-wrap text-xl @sm/card:text-2xl @md/card:text-3xl">
                {title}
              </motion.h2>
            </header>
            {children}
          </motion.div>
        </section>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
