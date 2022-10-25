import type { ReactNode } from "react"
import { forwardRef } from "react"
// import { useRouter } from "next/router"
import Link from "next/link"
import cn from "classnames"

type NavItemProps = {
  href: string
  children: ReactNode
  className?: string
  isCurrent: boolean
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ href, children, className, isCurrent }, ref) => {
    // const router = useRouter()
    // const isCurrent = router.asPath === href
    // if (router.asPath === "/" && href === "/") return null
    return (
      <Link href={href}>
        <a
          ref={ref}
          className={cn(className, "underlined", { active: isCurrent })}
          aria-current={isCurrent ? "page" : "false"}
        >
          {href === "/" ? <h1>{children}</h1> : children}
        </a>
      </Link>
    )
  }
)

NavItem.displayName = "NavItem"

export default NavItem
