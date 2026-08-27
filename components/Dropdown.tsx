import type { ReactNode } from "react";
import { Dropdown as DropD } from "flowbite-react";
// import cn from "classnames"

type DropdownProps = {
  inline?: boolean;
  label: string;
  header?: ReactNode;
  items: NonNullable<ReactNode>[];
  onClick?: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  inline,
  label,
  header,
  items,
  onClick,
}) => {
  return (
    <DropD inline label={label}>
      {header ? <DropD.Header>{header}</DropD.Header> : null}
      {items.map((item) => (
        <DropD.Item key={item.toString()} onClick={onClick}>
          {item}
        </DropD.Item>
      ))}
    </DropD>
  );
};

export default Dropdown;
