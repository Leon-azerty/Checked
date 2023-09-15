import { Todo } from '@/dto/todos.types';
import { createContext, Dispatch, SetStateAction } from 'react';

type TodosToDeleteType = [Todo[], Dispatch<SetStateAction<Todo[]>>];

export const TodosToDeleteContext = createContext<TodosToDeleteType | undefined>(undefined);