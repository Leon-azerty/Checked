'use client';
import Menu from '@/app/menu';
import Body from './body';
import { useEffect, useState } from 'react';
import { Todo } from './todos.types';
import { TodosContext } from './todosContext';


export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tab, setTab] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch('http://localhost:8080/todo', {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    setTodos(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='w-screen h-full min-h-screen flex'>
      <TodosContext.Provider value={[todos, setTodos]}>
        <Menu tab={tab} setTab={setTab} />
        <Body tab={tab} setTab={setTab} isLoading={isLoading} />
      </TodosContext.Provider>
    </main>
  )
}
