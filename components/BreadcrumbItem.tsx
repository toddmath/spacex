import type { PropsWithChildren, ComponentPropsWithoutRef } from "react";
import Link, { LinkProps } from "next/link";
import cn from "classnames";
import { UrlObject } from "node:url";

type BreadcrumbItemProps = PropsWithChildren<{
  href: LinkProps<UrlObject>["href"];
  isCurrent: boolean;
}> &
  ComponentPropsWithoutRef<"li">;

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  isCurrent,
  ...props
}) => {
  return (
    <li {...props}>
      <Link
        href={href}
        passHref
        className={cn({ "text-blue-500": isCurrent })}
        aria-current={isCurrent ? "location" : "false"}
      >
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
