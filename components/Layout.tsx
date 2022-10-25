import type { FC, PropsWithChildren } from "react"
import cn from "classnames"
// import Head from "next/head"

import Seo from "components/Seo"
import Header from "components/Header"
// import NavBar from "components/NavBar"
// import Footer from "components/Footer"

type LayoutProps = PropsWithChildren<{
  date?: string
  title?: string
  description?: string
  image?: string
  type?: string
  className?: string
  containerClassName?: string
  headerTag?: "h1" | "h2" | null
}>

const Layout: FC<LayoutProps> = ({
  headerTag = "h1",
  title = "SpaceX",
  className,
  containerClassName = "my-14",
  ...props
}) => {
  const { children, ...customMeta } = props

  const meta = {
    title: title === "SpaceX" ? title : `SpaceX - ${title}`,
    description:
      "Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, Elon Musk's tesla roadster, company info, and more.",
    image: "/static/image/spacex-logo.svg",
    type: "website",
    ...customMeta,
  }

  return (
    <div
      className={cn(
        containerClassName,
        "transition-colors w-full bg-base-100 text-base-content relative space-y-14"
      )}
    >
      <Seo {...meta} />
      {/* <NavBar /> */}
      {headerTag ? <Header title={title} tag={headerTag} /> : null}
      <main
        id='skip'
        className={cn(
          className,
          "flex gap-y-14 flex-col justify-start items-start px-8 h-full min-h-[70vh] bg-inherit text-inherit"
        )}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
