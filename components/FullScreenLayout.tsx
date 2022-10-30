import type { FC, PropsWithChildren, ReactNode } from "react"
import cn from "classnames"

import Seo from "components/Seo"

// type LayoutProps = PropsWithChildren<{
// date?: string
// title?: string
// description?: string
// image?: string
// type?: string
// className?: string
// containerClassName?: string
// headerTag?: "h1" | "h2" | null
// }>

type FullScreenLayoutProps = {
  children: NonNullable<ReactNode>
  className?: string
}

const FullScreenLayout: FC<FullScreenLayoutProps> = ({ children, className }) => {
  return (
    <>
      <Seo />
      <main id='skip' className={cn(className, "min-h-full w-screen p-0 m-0")}>
        {children}
      </main>
    </>
  )
}

export default FullScreenLayout
