import type { FC, ReactNode, PropsWithChildren } from "react";
import cn from "classnames";
import {
  Disclosure,
  Transition,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

type SpecsProps = PropsWithChildren<{
  title?: string;
  summary?: string;
  data?: Array<SpecData>;
}>;

export type SpecData = {
  title: string;
  description: NonNullable<ReactNode>;
};

const Specs: FC<SpecsProps> = ({ title, summary, data, children }) => {
  return (
    <div className="not-prose w-full overflow-hidden first:rounded-t-box last:rounded-b-box">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton
              className={cn(
                "flex w-full items-center justify-between bg-primary px-4 py-2 text-left text-primary-content",
                "focus-visible:ring-opacity-75 focus:outline-none focus-visible:ring focus-visible:ring-accent",
              )}
            >
              <>
                <header className="flex w-full flex-col items-start justify-start">
                  <h4 className="text-lg leading-6 font-medium">{title}</h4>
                  <p className="max-w-2xl text-sm">{summary}</p>
                </header>
                <ChevronUpIcon
                  title={open ? "down" : "up"}
                  className={cn(
                    "size-5 size-5 text-primary-content transition-transform",
                    {
                      "rotate-180": open,
                    },
                  )}
                />
              </>
            </DisclosureButton>

            <Transition
              enter="transition-all duration-150 ease-out origin-top"
              enterFrom="scale-y-0 opacity-60"
              enterTo="scale-y-100 opacity-100"
              leave="transition duration-100 ease-out origin-top"
              leaveFrom="scale-y-100 opacity-100"
              leaveTo="scale-y-0 opacity-50"
            >
              <DisclosurePanel className="overflow-hidden">
                {data ? (
                  <dl>
                    {data.map(({ title, description }) => (
                      <div
                        key={title}
                        className="border-t bg-neutral px-4 py-5 text-neutral-content first:border-none sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                      >
                        <dt className="text-sm font-medium">{title}</dt>
                        <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                          {description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  children
                )}
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Specs;
