import type { ReactNode } from "react";
import { Dropdown, DropdownItem, DropdownHeader } from "flowbite-react";

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
      {header && <DropdownHeader>{header}</DropdownHeader>}
      {items.map((item) => (
        <DropdownItem key={String(item)} onClick={onClick}>
          {item}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default DropDown;
