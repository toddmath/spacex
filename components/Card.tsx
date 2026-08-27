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
import { useParallax } from "lib/useParallax";

type ContainProps = Partial<{
  contain:
    | "content"
    | "strict"
    | "layout"
    | "paint"
    | "size"
    | "style"
    | "none";
  contentVisibility: "auto" | "hidden";
}>;

type CardProps = Omit<ComponentPropsWithoutRef<"section">, "title"> &
  PropsWithChildren<{
    image?: string;
    title: NonNullable<ReactNode>;
    className?: string;
    containProps?: ContainProps;
    imageProps?: Partial<Omit<ImageProps, "src">>;
    imageClassName?: string;
    wrapperClassName?: string;
  }>;

const Card = forwardRef<HTMLLIElement, CardProps>(function Card(
  {
    children,
    id,
    image,
    title,
    className,
    wrapperClassName,
    containProps,
    imageProps = {
      fill: true,
      sizes: "50vw",
      loading: "lazy",
      decoding: "async",
    } as Partial<ImageProps>,
    imageClassName,
    ...props
  },
  fwRef,
) {
  const { priority, loading, ...imgProps } = imageProps;
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  // const isInView = useInView(sectionRef)

  const { scrollYProgress } = useScroll({ target: scrollRef });
  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.li
      role="listitem"
      ref={fwRef}
      key={id}
      layout
      // layoutId={id}
      className={cn(wrapperClassName)}
    >
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.25 }}
        // layout
        layoutId={id}
        className="h-full w-full"
      >
        <motion.div
          ref={scrollRef}
          layoutScroll
          layoutId={id + "_inner"}
          style={{ y }}
          initial={{ opacity: 0.4 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.33 }}
          viewport={{ amount: "some" }}
          // animate={{ opacity: isInView ? 1 : 0.4 }}
          className="h-full w-full"
        >
          <section
            {...props}
            aria-label={is.string(title) ? title : props["aria-label"]}
            className={cn(
              className,
              "group/card card rounded-box isolate h-full w-full flex-1 overflow-hidden shadow-xl @container/card",
              {
                [`[contain:${containProps?.contain}] [contain-intrinsic-size:auto_--spacing(96)]`]:
                  containProps?.contain,
                [`[content-visibility:${containProps?.contentVisibility}] [contain-intrinsic-size:auto_--spacing(96)]`]:
                  containProps?.contentVisibility,
                "image-full bg-base-100": image,
                "bg-neutral text-neutral-content": !image,
              },
            )}
          >
            {image ? (
              <figure className="relative items-stretch rounded-none object-cover">
                <Image
                  src={image}
                  alt={is.string(title) ? title : ""}
                  className={cn(
                    imageClassName,
                    "w-full rounded-none object-cover",
                  )}
                  priority={priority}
                  loading={priority ? "eager" : "lazy"}
                  {...imgProps}
                />
              </figure>
            ) : null}
            <div className="card-body w-full @md/card:gap-3 @lg/card:gap-4">
              <header className="flex flex-wrap items-center text-center">
                <motion.h2 className="card-title mx-auto flex-wrap text-2xl @md/card:text-3xl">
                  {title}
                </motion.h2>
              </header>
              {children}
            </div>
          </section>
        </motion.div>
      </motion.div>
    </motion.li>
  );
});

Card.displayName = "Card";

export default Card;
