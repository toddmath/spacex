import { useTheme } from "next-themes"
import cn from "classnames"
import { TbChevronDown, TbColorSwatch } from "react-icons/tb"

import themeConfig from "themes.config.json"

const { themes } = themeConfig


const ThemePicker: React.FC = () => {
  const { setTheme, theme: currentTheme, systemTheme } = useTheme()

  const isTheme = (t: string) => t === currentTheme

  return (
    <div className='dropdown dropdown-end transition-all' title='Change Theme'>
      <div tabIndex={0} className='btn btn-ghost gap-x-1 gap-y-0 normal-case px-2'>
        <TbColorSwatch
          aria-hidden='true'
          className='inline-block h-5 w-5 stroke-current md:h-6 md:w-6'
        />
        <span className='hidden md:inline'>Theme</span>
        <TbChevronDown
          aria-hidden='true'
          className='hidden h-3 w-3 stroke-current opacity-70 sm:inline-block'
        />
      </div>

      <div
        tabIndex={0}
        className='dropdown-content shadow-2xl bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] overflow-y-auto w-52 mt-16'
      >
        <menu
          role='list'
          aria-label='Change theme'
          className='grid grid-cols-1 gap-3 p-3 menu'
        >
          {themes.map(theme => (
            <li
              key={theme}
              role='listitem'
              aria-label={theme}
              // data-set-theme={theme}
              aria-current={isTheme(theme)}
              data-theme={theme}
              className='outline-base-content overflow-hidden rounded-btn outline-2 outline-offset-2'
            >
              <div
                data-theme={theme}
                data-set-theme={theme}
                className={cn(
                  "bg-base-100 text-base-content w-full cursor-pointer font-sans p-0 m-0 block border-2",
                  {
                    "border-primary shadow-inner": isTheme(theme),
                    "border-transparent shadow-lg": !isTheme(theme),
                  }
                )}
                onClick={() => setTheme(theme)}
              >
                {/* <div className='grid grid-cols-5 grid-rows-3'> */}
                <div className='flex gap-1 py-3 px-4'>
                  <div className='flex-grow text-sm font-bold'>{theme}</div>
                  <div
                    className='flex items-center flex-shrink-0 flex-wrap gap-x-1 rounded overflow-hidden'
                    aria-hidden='true'
                  >
                    <div className='rounded-full bg-primary w-3 h-3'></div>
                    <div className='rounded-full bg-secondary w-3 h-3'></div>
                    <div className='rounded-full bg-accent w-3 h-3'></div>
                    <div className='rounded-full bg-neutral w-3 h-3'></div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </li>
          ))}
        </menu>
      </div>
    </div>
  )
}

export default ThemePicker
