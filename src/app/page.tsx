'use client';
import Menu from '@/app/menu';
import Body from './body';
import { useEffect, useState } from 'react';
import { Todo } from './todos.types';
import { TodosContext } from './todosContext';


export default function Home() {
  const [isFavoriteTodos, setIsFavoriteTodos] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchData = async () => {
    console.log('fetch');
    const res = await fetch('http://localhost:8080/todo', {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    console.log(data);
    setTodos(data);
    todos.map((e, i) => console.log("var = " + i));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className='w-screen h-screen flex'>
      <TodosContext.Provider value={[todos, setTodos]}>
        <Menu isFavoriteTodosVisible={isFavoriteTodos} setIsFavoriteTodosVisible={setIsFavoriteTodos} />
        <Body isFavoriteTodosVisible={isFavoriteTodos} />
      </TodosContext.Provider>
    </main>
  )
}
