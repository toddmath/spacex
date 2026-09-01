import type { ReactNode } from "react";
import { Dropdown } from "flowbite-react";
// import cn from "classnames"

type DropdownProps = {
  inline?: boolean;
  label: string;
  header?: ReactNode;
  items: NonNullable<ReactNode>[];
  onClick?: () => void;
};

const DropDown: React.FC<DropdownProps> = ({
  inline,
  label,
  header,
  items,
  onClick,
}) => {
  return (
    <Dropdown inline={inline} label={label}>
      {header && <Dropdown.Header>{header}</Dropdown.Header>}
      {items.map((item) => (
        <Dropdown.Item key={String(item)} onClick={onClick}>
          {item}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default DropDown;
