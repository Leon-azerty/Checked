import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { Todo } from '@/dto/todos.types'

type TodosContextType = [Todo[], Dispatch<SetStateAction<Todo[]>>]

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined
)

export const getTodosContext = () => {
  const context = useContext(TodosContext)
  if (context === undefined) {
    throw new Error('TodosContext must be used within a TodosProvider')
  }
  return context
}
