import { Todo } from '@/dto/todos.types';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type TodosToDeleteType = [Todo[], Dispatch<SetStateAction<Todo[]>>];

export const TodosToDeleteContext = createContext<TodosToDeleteType | undefined>(undefined);

export const getTodosToDeleteContext = () => {
  const context = useContext(TodosToDeleteContext);
  if (context === undefined) {
    throw new Error('TodosToDeleteContext must be used within a TodosToDeleteProvider');
  }
  return context;
}