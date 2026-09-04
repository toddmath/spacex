import type {
  PropsWithChildren,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import Image, { type ImageProps } from "next/image";
import cn from "classnames";
import { motion } from "framer-motion";

import { is } from "lib/utils";

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
    ref,
  ) => {
    const cardTitle = is.string(title) ? title : undefined;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.33 }}
        viewport={{ amount: "some" }}
        className="@container/card h-full"
      >
        <section
          aria-label={cardTitle}
          className={cn(
            className,
            "card-compact group/card @md/card:card-normal card isolate h-full overflow-hidden shadow-xl",
            {
              "bg-base-100 @xs/card:image-full @sm/card:image-full @md/card:flex @md/card:card-side":
                image,
              "bg-neutral text-neutral-content": !image,
            },
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
                  "@xs/card:w-full @xs/card:rounded-none @xs/card:object-cover",
                )}
                loading={
                  imageProps.loading ?? (imageProps.preload ? "eager" : "lazy")
                }
                {...imageProps}
              />
            </figure>
          ) : null}

          <div className="card-body @md/card:gap-3 @lg/card:gap-4 @lg/card:text-lg">
            <header className="flex flex-wrap items-center text-center">
              <h2 className="mx-auto card-title flex-wrap text-xl @sm/card:text-2xl @md/card:text-3xl">
                {title}
              </h2>
            </header>
            {children}
          </div>
        </section>
      </motion.div>
    );
  },
);

Card.displayName = "Card";

export default Card;
