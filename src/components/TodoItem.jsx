import { Trans} from '@lingui/react/macro'
import { t } from '@lingui/core/macro'

export function TodoItem({ task, onToggle, onDelete, onStartEdit, onSaveEdit, onEditTitle, onEditContent, isEditing, editTitle, editContent, onCancelEdit }) {

  // const priorityTextColor = {
  //   high: 'text-red-600',
  //   medium: 'text-yellow-600',
  //   low: 'text-green-600'
  // }
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

  const selectedPriority = priorityOptions.find(option => option.value === task.priority);
  
  if(!isEditing){
    return (
      <li
      key={task.id}
      className={`flex justify-between items-center p-3 sm:p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
        task.completed 
          ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'
      }`}
    >
      <div className="flex-1 min-w-0 relative">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            {/* Badge de completado */}
            {task.completed && (
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700 transition-colors duration-300">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Completed
                </span>
              </div>
            )}
            
            <h3 className={`font-medium text-gray-900 dark:text-white truncate transition-colors duration-300 ${
              task.completed ? 'line-through text-gray-500 dark:text-gray-400 opacity-60' : ''
            }`}>
              {task.text}
            </h3>
            {task.content && (
              <p className={`text-sm text-gray-600 dark:text-gray-300 mt-1 break-words transition-colors duration-300 ${
                task.completed ? 'line-through text-gray-400 dark:text-gray-500 opacity-60' : ''
              }`}>
                {task.content}
              </p>
            )}
            {/* Etiqueta de prioridad */}
            {task.priority && (
              <span className={`text-xs font-medium ${selectedPriority?.color || 'text-gray-500 dark:text-gray-400'} mt-1 inline-block transition-colors duration-300`}>
                {selectedPriority?.label || task.priority} {t`Priority`}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 sm:gap-1.5 ml-3 sm:ml-4 flex-col">
        <button
          onClick={() => onToggle(task.id)}
          className={`p-3 sm:p-1.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            task.completed
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white shadow-sm'
              : 'bg-green-500 hover:bg-green-600 focus:ring-green-500 text-white shadow-sm'
          }`}
          title={task.completed ? t`Undo` : t`Complete`}
        >
          {task.completed ? (
            <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-3 sm:p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm"
          title={t`Delete`}
        >
          <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button
          onClick={() => onStartEdit(task)}
          className="p-3 sm:p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm"
          title={t`Edit`}
        >
          <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
    </li> 
    )
  }

  return (
    <li className="p-3 sm:p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="mb-3 sm:mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h3 className="font-medium text-lg transition-colors duration-300">
            <Trans>Editing task</Trans>
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
          <Trans>Modify the name and description of your task</Trans>
        </p>
      </div>
      
      <form onSubmit={e => e.preventDefault()} className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
            <Trans>Name</Trans>
          </label>
          <input
            id="editTitle"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={editTitle}
            onChange={e => onEditTitle(e.target.value)}
            placeholder=""
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="editContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
            <Trans>Description</Trans>
          </label>
          <textarea
            id="editContent"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-y min-h-[80px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={editContent}
            onChange={e => onEditContent(e.target.value)}
            placeholder=""
            rows="3"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            type="submit" 
            onClick={() => onSaveEdit(task.id)} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Trans>Save</Trans>
          </button>
          <button 
            onClick={onCancelEdit} 
            className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Trans>Cancel</Trans>
          </button>
        </div>
      </form>
    </li>
  )
}

