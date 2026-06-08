import type { FC } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { motion, LayoutGroup } from "framer-motion";

import NavLink, { NavLinkProps } from "./NavLink";
import ThemePicker from "./ThemePicker";
import ScrollIndicator from "./ScrollIndicator";

const navLinks = [
  {
    href: "/launches",
    text: "Launches",
    pages: ["all", "past", "upcoming", "next"],
  },
  {
    href: "/rockets",
    text: "Rockets",
  },
  {
    href: "/crew",
    text: "Crew",
  },
  {
    href: "/missions",
    text: "Missions",
  },
  {
    href: "/payloads",
    text: "Payloads",
  },
  {
    href: "/capsules",
    text: "Capsules",
  },
  {
    href: "/launchpad",
    text: "Launchpads",
  },
  {
    href: "/ship",
    text: "Ships",
  },
  {
    href: "/roadster",
    text: "Roadster",
  },
] satisfies Array<Omit<NavLinkProps, "position">>;

// top-[calc(theme(spacing.16)-theme(spacing.1))]

const NavBar: FC = () => {
  return (
    <div
      className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-300/60 text-base-content shadow backdrop-blur transition-all duration-100"
    >
      <ScrollIndicator className="top-15 fixed bottom-0 left-0 right-0 h-1 origin-[0%]" />
      <nav aria-label="primary" className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle btn lg:hidden">
              <FiMenu
                className="h-5 w-5 fill-none stroke-current"
                strokeWidth="2"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
            >
              <LayoutGroup id="navlinks">
                {navLinks.map((link) => (
                  <NavLink key={link.href} position="start" {...link} />
                ))}
              </LayoutGroup>
            </ul>
          </div>

          <Link
            href="/"
            className="btn-ghost rounded-btn btn text-lg normal-case md:text-xl"
          >
            SpaceX
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 py-0">
            <LayoutGroup id="navlinks-center">
              {navLinks.map((link) => (
                <NavLink key={link.href} position="center" {...link} />
              ))}
            </LayoutGroup>
          </ul>
        </div>

        <div className="navbar-end w-1/2">
          <ThemePicker />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

/*
<div className='navbar-start'>
  <div className='dropdown'>
    <label tabIndex={0} className='btn btn-square btn-ghost lg:hidden'>
      <FiMenu className='w-5 h-5 stroke-current fill-none' strokeWidth='2' />
    </label>
    <ul
      tabIndex={0}
      className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52'
    >
      {navLinks.map(({ href, text, pages }) => (
        <Fragment key={href}>
          <li tabIndex={pages ? 0 : undefined}>
            {pages ? (
              <>
                <div className='justify-between'>
                  {text}
                  <TbChevronRight />
                </div>
                <ul className='p-2 bg-base-200'>
                  {pages.map(page => (
                    <li key={page}>
                      <Link href={`${href}/${page}`} className='capitalize'>
                        {page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={href}>{text}</Link>
            )}
          </li>
        </Fragment>
      ))}
    </ul>
  </div>

  <Link
    href='/'
    className='btn btn-ghost rounded-btn normal-case text-lg md:text-xl'
  >
    SpaceX
  </Link>
</div>

<div className='navbar-center hidden lg:flex'>
  <ul className='menu menu-horizontal p-0'>
    {navLinks.map(({ href, text, pages }) => (
      <Fragment key={href}>
        {pages ? (
          <li tabIndex={0}>
            <div className='px-3 normal-case'>
              {text}
              <TbChevronDown />
            </div>

            <ul className='p-3 bg-base-200 z-40 shadow-xl rounded'>
              {pages.map(page => (
                <li
                  key={page}
                  className='text-base-content w-full cursor-pointer font-sans'
                >
                  <Link href={`${href}/${page}`} className='capitalize'>
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={href}>
            <Link href={href} className='px-3 normal-case'>
              {text}
            </Link>
          </li>
        )}
      </Fragment>
    ))}
  </ul>
</div>
*/
