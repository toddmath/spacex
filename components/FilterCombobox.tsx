import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import cn from "classnames";

type FilterComboboxProps = {
  choices: string[];
  initialChoice: string;
  setChoice: (name: string | null) => void;
  className?: string;
};

const FilterCombobox = ({
  choices,
  initialChoice,
  setChoice,
  className,
}: FilterComboboxProps) => {
  const [selected] = useState(initialChoice);
  const [query, setQuery] = useState("");

  const filteredChoices =
    query === ""
      ? choices
      : choices.filter((choice) =>
          choice.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Combobox value={selected} onChange={setChoice}>
      <ComboboxInput
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          className,
          "relative rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800",
        )}
      />
      <ComboboxOptions className="absolute inset-0 z-50 size-full max-w-md rounded-lg bg-gray-100 text-gray-100 shadow dark:bg-gray-700 dark:text-gray-200">
        {filteredChoices.map((choice) => (
          <ComboboxOption key={choice} value={choice} as={Fragment}>
            {({ focus, selected }) => (
              <li
                className={cn("m-0 w-full list-none px-4 leading-normal", {
                  "text-blue-500 dark:text-blue-600 bg-white dark:bg-gray-600":
                    focus,
                  "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800":
                    !focus,
                  "flex flex-row items-center justify-center gap-x-2": selected,
                })}
              >
                {selected && <CheckIcon className="size-3" />}
                {choice}
              </li>
            )}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default FilterCombobox;
