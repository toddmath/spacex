import { Children, PropsWithChildren } from "react";
import { Fragment } from "react";

type BreadcrumbProps = PropsWithChildren<unknown>;

const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWithSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span>/</span>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav className="mx-8 mb-8 md:mx-16 lg:mx-32" aria-label="breadcrumb">
      <ol className="flex items-center space-x-4">{childrenWithSeperator}</ol>
    </nav>
  );
};

export default Breadcrumb;
