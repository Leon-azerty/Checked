import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

import { Todo } from '../app/todos.types';

type TodosContextType = [Todo[], Dispatch<SetStateAction<Todo[]>>];

export const TodosContext = createContext<TodosContextType | undefined>(undefined);