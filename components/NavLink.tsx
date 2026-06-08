import { forwardRef, type FC } from "react";
import Link from "next/link";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import { motion } from "framer-motion";
import cn from "classnames";

export type NavLinkProps = {
  position: "start" | "center";
  href: string;
  text: string;
  pages?: string[] | null;
};

const NavLink: FC<NavLinkProps> = ({ position, href, text, pages }) => {
  if (pages) {
    return (
      <motion.li tabIndex={0} layout>
        <motion.div
          className={cn({
            "gap-1 px-3 normal-case": position === "center",
            "justify-between": position === "start",
          })}
        >
          {text}
          {position === "start" ? (
            <TbChevronRight />
          ) : (
            <TbChevronDown
              aria-hidden="true"
              className="h-3 w-3 stroke-current opacity-70"
            />
          )}
        </motion.div>
        <motion.ul
          className={cn({
            "z-40 rounded bg-base-200 p-3 shadow-xl": position === "center",
            "bg-base-200 p-2": position === "start",
          })}
          layout
        >
          {pages.map((page) => (
            <motion.li
              key={page}
              tabIndex={position === "center" ? 0 : undefined}
              layout
              className={cn({
                "w-full cursor-pointer font-sans text-base-content":
                  position === "center",
              })}
            >
              <Link href={`${href}/${page}`} className="capitalize">
                {page}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.li>
    );
  }

  return (
    <motion.li layout>
      <Link
        href={href}
        className={cn({ "px-3 normal-case": position === "center" })}
      >
        {text}
      </Link>
    </motion.li>
  );
};

export default NavLink;
