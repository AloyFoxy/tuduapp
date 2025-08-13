import { IconSquareFilled, IconChevronDown } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Trans} from '@lingui/react/macro'
import { t } from '@lingui/core/macro'

export function TodoForm({ inputText, contentText, handleChange, handleSubmit, priority, setPriority }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const containerRef = useRef(null);

    const PRIORITY_LABELS = {
        high:   t`High`,
        medium: t`Medium`,
        low:    t`Low`
    }
    const priorityOptions = [
        { value: 'high', label: PRIORITY_LABELS.high, color: 'text-red-500'},
        { value: 'medium', label: PRIORITY_LABELS.medium, color: 'text-yellow-500'},
        { value: 'low', label: PRIORITY_LABELS.low, color: 'text-green-500'}
    ];

    const selectedPriority = priorityOptions.find(option => option.value === priority);

    const handlePrioritySelect = (value) => {
        setPriority(value);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
          if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsDropdownOpen(false)
          }
        }
        
        // Solo agregar el listener cuando el dropdown esté abierto
        if (isDropdownOpen) {
          document.addEventListener('mousedown', handleClickOutside)
        }
        
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [isDropdownOpen])

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm sm:max-w-md mx-auto space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
                <label htmlFor="textInputTask" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    <Trans>Name</Trans>
                </label>
                <input
                    name="textInput"
                    type="text"
                    id="textInputTask"
                    value={inputText}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <label htmlFor="contentInputTask" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    <Trans>Description</Trans>
                </label>
                <textarea
                    name="contentInput"
                    id="contentInputTask"
                    value={contentText}
                    onChange={handleChange}
                    placeholder=""
                    rows="3"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-y bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    <Trans>Priority</Trans>
                </label>
                <div className="relative" ref={containerRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onKeyDown={(e) => {
                            if(e.key === 'Escape') setIsDropdownOpen(false); //close with escape key
                        }}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <IconSquareFilled className={`w-4 h-4 ${selectedPriority?.color}`} />
                            <span>{selectedPriority?.label ?? t`Select Priority`}</span>
                        </div>
                        <IconChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                            {priorityOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handlePrioritySelect(option.value)}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors duration-300`}
                                >
                                    <IconSquareFilled className={`w-4 h-4 ${option.color}`} />
                                    <span className={option.color}>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
                <Trans>Add Task</Trans>
            </button>
        </form>
    )
}