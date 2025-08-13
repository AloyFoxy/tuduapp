import { useEffect, useRef, useState } from 'react'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react/macro'
import { activateLocale } from '../i18n/activate'
import { IconLanguage, IconChevronDown } from '@tabler/icons-react'

export function LanguageSelect() {
  const containerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const OPTIONS = [
    { value: 'es', label: 'ES' },
    { value: 'en', label: 'EN' },
  ]

  async function handleSelect(locale) {
    await activateLocale(locale)
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Language selector"
        className="group p-2 cursor-pointer rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
      >          
        <IconLanguage className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-10 w-32 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl shadow-lg">
          {OPTIONS.map(option => {
            const isActive = i18n.locale?.startsWith(option.value)
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isActive}
                className={`w-full cursor-pointer px-4 py-3 text-left text-sm transition-all duration-300 first:rounded-t-xl last:rounded-b-xl ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-700/80'
                }`}
              >
                {option.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}