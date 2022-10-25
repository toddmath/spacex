import type { ChangeEventHandler } from "react"
import cn from "classnames"
// import { Label } from "flowbite-react"

type Option = string | number | { value: string; text: string }

type SelectProps = {
  options: Array<Option>
  id: string
  label: string
  defaultOption: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  className?: string
  labelClassName?: string
}

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
          "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        )}
      >
        {label}
      </label>
      <select
        id={id}
        onChange={onChange}
        className={cn(
          className,
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        )}
      >
        <option selected>{defaultOption}</option>
        {options.map(opt => {
          return typeof opt === "string" || typeof opt === "number" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default Select
