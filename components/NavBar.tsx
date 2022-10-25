import type { FC } from "react"
import { Fragment } from "react"
import Link from "next/link"
import { TbChevronDown, TbChevronRight } from "react-icons/tb"

import ThemePicker from "./ThemePicker"
import { FiMenu } from "react-icons/fi"

const navLinks = [
  {
    href: "/launches",
    text: "Launches",
    pages: ["all", "past", "upcoming", "next"],
  },
  {
    href: "/rockets",
    text: "Rockets",
    pages: null,
  },
  {
    href: "/missions",
    text: "Missions",
    pages: null,
  },
  {
    href: "/payloads",
    text: "Payloads",
    pages: null,
  },
  {
    href: "/roadster",
    text: "Roadster",
    pages: null,
  },
] as const

const NavBar: FC = () => {
  return (
    <div
      className='sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-75 backdrop-blur transition-all duration-100
    bg-base-300 text-base-content shadow'
    >
      <nav aria-label='primary' className='navbar'>
        {/* <a href='#skip' className='skip-nav'>
          Skip to content
        </a> */}
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost md:hidden'>
              <FiMenu className='w-5 h-5 stroke-current fill-none' strokeWidth='2' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52'
            >
              {navLinks.map(({ href, text, pages }) => (
                <Fragment key={href}>
                  {pages ? (
                    <li tabIndex={0}>
                      <div className='justify-between'>
                        {text}
                        <TbChevronRight />
                      </div>
                      <ul className='p-2 bg-base-200'>
                        {pages.map(page => (
                          <li key={page}>
                            <Link href={`${href}/${page}`}>
                              <a className='capitalize'>{page}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link href={href}>
                        <a>{text}</a>
                      </Link>
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>

          <Link href='/'>
            <a className='btn btn-ghost normal-case text-lg md:text-xl'>SpaceX</a>
          </Link>
        </div>

        <div className='navbar-center hidden md:flex'>
          <ul className='menu menu-horizontal p-0'>
            {navLinks.map(({ href, text, pages }) => (
              <Fragment key={href}>
                {pages ? (
                  <li tabIndex={0}>
                    <div className='px-3 lg:px-4'>
                      {text}
                      <TbChevronDown />
                    </div>

                    <ul className='p-3 bg-base-200 z-40 shadow-2xl'>
                      {pages.map(page => (
                        <li
                          key={page}
                          className='text-base-content w-full cursor-pointer font-sans'
                        >
                          <Link href={`${href}/${page}`}>
                            <a className='capitalize'>{page}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={href}>
                    <Link href={href}>
                      <a className='px-3 lg:px-4'>{text}</a>
                    </Link>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>

        <div className='navbar-end w-1/2'>
          <ThemePicker />
        </div>
      </nav>
    </div>
  )
}

export default NavBar
