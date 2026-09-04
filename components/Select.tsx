import type { ChangeEventHandler } from "react";
import cn from "classnames";

type Option = string | number | Record<"value" | "text", string>;

type SelectProps = {
  options: Array<Option>;
  id: string;
  label: string;
  defaultOption: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  labelClassName?: string;
};

const Select: React.FC<SelectProps> = ({
  options,
  id,
  label,
  defaultOption,
  onChange,
  className,
  labelClassName,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={cn(
          labelClassName,
          "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400",
        )}
      >
        {label}
      </label>
      <select
        id={id}
        onChange={onChange}
        className={cn(
          className,
          "block w-full rounded-field border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        )}
      >
        <option selected>{defaultOption}</option>
        {options.map((opt) => {
          return typeof opt === "string" || typeof opt === "number" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
