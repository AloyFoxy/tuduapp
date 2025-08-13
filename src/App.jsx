import { useState, useEffect } from 'react'
import { Trans} from '@lingui/react/macro'
import { t } from '@lingui/core/macro'
import { v4 as uuidv4 } from 'uuid';
import {  AnimatePresence, motion } from 'framer-motion';
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'
import { ErrorPopUp } from './components/ErrorPopUp';
import { LanguageSelect } from './components/LanguageSelect'
import { ThemeToggle } from './components/ThemeToggle'
import { FilterSelect } from './components/FilterSelect'

function App() {
  const [inputText, setInputText] = useState('')
  const [contentText, setContentText] = useState('')
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks')
    return stored ? JSON.parse(stored) : []
  })
  const [filter, setFilter] = useState('all')
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [priorityTask, setPriorityTask] = useState('')

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editPriority, setEditPriority] = useState('')

  function handleChange(event){
    const {name, value} = event.target

    if(name === 'textInput'){
      setInputText(value)
    } else if (name === 'contentInput') {
      setContentText(value)
    }
  }

  function handleSubmit(event){
    event.preventDefault()
    if (!inputText || !contentText || !priorityTask){
      setErrorMessage(t`Please fill in all required fields and set a priority`)
      setShowError(true)
  
      // Ocultar el popup después de 3 segundos
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } else {

    const newTask = {
      id: uuidv4(),
      text: inputText,
      content: contentText,
      priority: priorityTask,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInputText('')
    setContentText('')
    setPriorityTask('')
    }

  }


  function handleToggleComplete(id){ 
    setTasks(tasks.map(task =>
      task.id === id
      ? {...task, completed: !task.completed }
      : task
    ))
  }

  function handleDelete(id){
    // Pequeño delay para permitir que la animación de salida se complete
    setTimeout(() => {
      const filtered = tasks.filter(task => task.id !== id)
      setTasks(filtered)
    }, 400) // 400ms coincide con la nueva duración de la animación de salida
  }
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
  })

  function handleStartEdit(task){
    setEditId(task.id)
    setEditText(task.text)
    setEditContent(task.content)
    setEditPriority(task.priority)
  }

  function handleCancelEdit(){
    setEditId(null)
    setEditText('')
    setEditContent('')
    setEditPriority('')
  }

  function handleSaveEdit(id){
    if (!editText || !editContent || !editPriority) return // simple validation

    setTasks(tasks.map(task =>
      task.id === id
      ? {...task, text: editText, content: editContent, priority: editPriority}
      : task
    ))

    handleCancelEdit()
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <main className='min-h-screen flex flex-col items-center justify-center py-8 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      <div className="fixed top-0 right-0 w-full flex justify-end p-2 gap-2 bg-white dark:bg-gray-800 transition-colors duration-300">
        <ThemeToggle />
        <LanguageSelect />
      </div>
      
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2 tracking-wide transition-colors duration-300">
            Tudu App
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase transition-colors duration-300">
            Task Management
          </p>
          <div className="w-12 sm:w-16 h-0.5 bg-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <ErrorPopUp
          isOpen={showError}
          errorMessage={errorMessage}
          onClose={() => setShowError(false)}
        />

        <TodoForm
        inputText={inputText}
        contentText={contentText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        priority={priorityTask}
        setPriority={setPriorityTask}
        />

        {tasks.length > 0 && (
          <div className="w-full mt-4 max-w-sm sm:max-w-md mb-6">
            <FilterSelect filter={filter} setFilter={setFilter} />
          </div>
        ) }
        

        <ul className="w-full max-w-sm sm:max-w-md space-y-2 sm:space-y-3">
          <AnimatePresence mode="sync">
            {filteredTasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  scale: 0.9,
                  transition: { 
                    duration: 0.4, 
                    ease: "easeInOut",
                    opacity: { duration: 0.3 },
                    x: { duration: 0.4 },
                    scale: { duration: 0.2 }
                  }
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                layout="position"
              >
                <TodoItem
                  task={task}
                  onToggle={handleToggleComplete}
                  onDelete={handleDelete}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onEditTitle={setEditText}
                  onEditContent={setEditContent}
                  isEditing={editId === task.id}
                  editTitle={editText}
                  editContent={editContent}
                  onCancelEdit={handleCancelEdit}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </main>
  )
}

export default App
