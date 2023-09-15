import { createContext, Dispatch, SetStateAction } from 'react';

import { Todo } from '../dto/todos.types';

type TodosContextType = [Todo[], Dispatch<SetStateAction<Todo[]>>];

export const TodosContext = createContext<TodosContextType | undefined>(undefined);