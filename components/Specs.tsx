import type { FC, ReactNode, PropsWithChildren } from "react"
import cn from "classnames"

import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/20/solid"

type SpecsProps = PropsWithChildren<{
  title?: string
  summary?: string
  data?: Array<SpecData>
}>

export type SpecData = {
  title: string
  description: NonNullable<ReactNode>
}

// const isOdd = (n: number): boolean => n % 2 === 0

const Specs: FC<SpecsProps> = ({ title, summary, data, children }) => {
  return (
    <div className='first-child:rounded-t-box last-child:rounded-b-box w-full overflow-hidden not-prose border-primary-content'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              // as='header'
              className={cn(
                "w-full flex justify-between items-center px-4 py-2 bg-primary text-primary-content text-left",
                "focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75"
              )}
            >
              <>
                <header className='flex flex-col w-full items-start justify-start'>
                  <h4 className='text-lg font-medium leading-6'>{title}</h4>
                  <p className='max-w-2xl text-sm'>{summary}</p>
                </header>
                <ChevronUpIcon
                  className={cn("h-5 w-5 text-primary-content", {
                    "rotate-180 transform": open,
                  })}
                />
              </>
            </Disclosure.Button>

            <Transition
              enter='transition duration-200 ease-out'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition duration-100 ease-out'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Disclosure.Panel>
                {data ? (
                  <dl>
                    {data.map(({ title, description }, i) => (
                      <div
                        key={title}
                        className={cn(
                          "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-neutral text-neutral-content border-t first:border-none"
                        )}
                      >
                        <dt className='text-sm font-medium'>{title}</dt>
                        <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                          {description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  children
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Specs
