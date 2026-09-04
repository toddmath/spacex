import { useTheme } from "next-themes"
import cn from "classnames"
import { TbChevronDown, TbColorSwatch } from "react-icons/tb"
import { useSyncExternalStore } from "react"

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const ThemePicker: React.FC = () => {
  const { setTheme, themes, theme: currentTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

  if (!mounted) {
    return (
      <div className='dropdown dropdown-end transition-all' title='Change Theme'>
        <div tabIndex={0} className='btn gap-x-1 gap-y-0 btn-ghost px-2 normal-case'>
          <TbColorSwatch
            aria-hidden='true'
            className='inline-block size-5 stroke-current md:size-6'
          />
          <span className='hidden md:inline'>Theme</span>
          <TbChevronDown
            aria-hidden='true'
            className='hidden size-3 stroke-current opacity-70 sm:inline-block'
          />
        </div>
      </div>
    )
  }

  if (mounted) {
    return (
      <div className='dropdown dropdown-end transition-all' title='Change Theme'>
        <div tabIndex={0} className='btn gap-x-1 gap-y-0 btn-ghost px-2 normal-case'>
          <TbColorSwatch
            aria-hidden='true'
            className='inline-block size-5 stroke-current md:size-6'
          />
          <span className='hidden md:inline'>Theme</span>
          <TbChevronDown
            aria-hidden='true'
            className='hidden size-3 stroke-current opacity-70 sm:inline-block'
          />
        </div>

        <div
          tabIndex={0}
          className='dropdown-content top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto rounded-field bg-base-200 text-base-content shadow-2xl'
        >
          <menu
            role='list'
            aria-label='Change theme'
            className='menu grid grid-cols-1 gap-3 p-3'
          >
            {themes.map(theme => (
              <li
                key={theme}
                role='listitem'
                aria-label={theme}
                aria-current={theme === currentTheme}
                data-theme={theme}
                className='rounded-btn overflow-hidden outline-2 outline-offset-2 outline-base-content'
              >
                <div
                  data-theme={theme}
                  data-set-theme={theme}
                  className={cn(
                    "m-0 block w-full cursor-pointer border-2 bg-base-100 p-0 font-sans text-base-content",
                    {
                      "border-primary shadow-inner": theme === currentTheme,
                      "border-transparent shadow-lg": theme !== currentTheme,
                    }
                  )}
                  onClick={() => setTheme(theme)}
                >
                  <div className='flex gap-1 px-4 py-3'>
                    <div className='grow text-sm font-bold'>{theme}</div>
                    <div
                      className='flex shrink-0 flex-wrap items-center gap-x-1 overflow-hidden rounded-field'
                      aria-hidden='true'
                    >
                      <div className='size-3 rounded-full bg-primary'></div>
                      <div className='size-3 rounded-full bg-secondary'></div>
                      <div className='size-3 rounded-full bg-accent'></div>
                      <div className='size-3 rounded-full bg-neutral'></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </menu>
        </div>
      </div>
    )
  }
}

export default ThemePicker
