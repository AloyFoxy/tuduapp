import { Trans } from '@lingui/react/macro'
import { IconAlertTriangle, IconX } from '@tabler/icons-react';

export function ErrorPopUp({isOpen, errorMessage, onClose}){
  return (
    <div role="alert" className={`
      fixed top-4 w-full max-w-sm left-1/2 transform -translate-x-1/2 transition-all duration-500 z-50
      ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
    `}>
    
    <div className="flex items-start gap-4 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg shadow-lg p-4 max-w-md transition-colors duration-300">
    <IconAlertTriangle stroke={2} className='text-red-400 flex-shrink-0 mt-0.5'/>
    
    <div className="flex-1">
      <strong className="font-medium text-gray-900 dark:text-white">
        <Trans>Something went wrong</Trans>
      </strong>
      <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">{errorMessage}</p>
    </div>

    <button
      onClick={onClose}
      className="-m-3 rounded-full cursor-pointer p-1.5 text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 flex-shrink-0"
      type="button"
      aria-label="Dismiss alert"
    >
      <IconX size={16} />
    </button>
  </div>
</div>
  )
}