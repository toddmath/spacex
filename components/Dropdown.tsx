import type { ReactNode } from "react";
// import { Dropdown } from "flowbite-react";
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
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        {label}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {header && <li className="menu-title">{header}</li>}
        {items.map((item) => (
          <li key={String(item)} onClick={onClick}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  // return (
  //   <Dropdown inline={inline} label={label}>
  //     {header && <Dropdown.Header>{header}</Dropdown.Header>}
  //     {items.map((item) => (
  //       <Dropdown.Item key={String(item)} onClick={onClick}>
  //         {item}
  //       </Dropdown.Item>
  //     ))}
  //   </Dropdown>
  // );
};

export default DropDown;
